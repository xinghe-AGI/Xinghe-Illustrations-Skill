#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { URL } = require("node:url");

const VERSION = "1.0.0";
const DEFAULT_RESPONSES_MODEL = process.env.XINGHE_TEXT_MODEL || "gpt-5.5";
const DEFAULT_IMAGE_MODEL = process.env.GPT_IMAGE_MODEL || process.env.XINGHE_IMAGE_MODEL || "gpt-image-2";
const DEFAULT_SIZE = "1536x1024";
const DEFAULT_QUALITY = "high";
const DEFAULT_FORMAT = "png";
const FORMATS = new Set(["png", "jpeg", "webp"]);
const MODES = new Set(["official", "proxy"]);
const API_STYLES = new Set(["responses", "images", "auto"]);
const SKILL_ROOT = path.resolve(__dirname, "..");

function usage() {
  return `xinghe_image_assets_cli v${VERSION}

Generate Xinghe-style image assets through Responses API image_generation or Images API edits with reference images.

Usage:
  node scripts/xinghe_image_assets_cli.js generate --prompt <text> --output <path> [options]
  node scripts/xinghe_image_assets_cli.js generate --manifest <path> --output-dir <dir> [options]
  node scripts/xinghe_image_assets_cli.js inspect --prompt <text> --output <path> [options]
  node scripts/xinghe_image_assets_cli.js probe --mode proxy --base-url <url> [options]
  node scripts/xinghe_image_assets_cli.js --help

Required:
  --prompt <text>              Final image prompt. Keep Xinghe visual DNA in the prompt.
  --output <path>              Local output file path.
  --manifest <path>            Batch manifest JSON. Uses pictures[], images[], or a top-level array.
  --output-dir <dir>           Batch output directory when --manifest is used.

Options:
  --mode official|proxy        Access mode. Default: official.
  --api responses|images|auto  API protocol. Default: official=responses, proxy=auto.
  --api-mode responses|images|auto Alias of --api.
  --model <name>               Override model. Responses default: ${DEFAULT_RESPONSES_MODEL}; Images default: ${DEFAULT_IMAGE_MODEL}.
  --output-format png|jpeg|webp Output format. Default: inferred from --output or png.
  --size <value>               Image size. Default: ${DEFAULT_SIZE}.
  --quality <value>            Image quality. Default: ${DEFAULT_QUALITY}.
  --image <path>               Optional local reference image for image-to-image.
  --reference <path>           Optional Xinghe style anchor image. Alias of --image when --image is absent.
  --references <paths>         Optional comma/semicolon-separated style anchor images.
  --style-reference <path>     Explicit Xinghe style/IP anchor. Uploaded like --reference.
  --style-references <paths>   Multiple explicit style/IP anchors.
  --prefix <name>              Batch filename prefix. Default: manifest basename.
  --force                      Allow overwriting existing output. Batch mode regenerates all items.
  --regenerate <ids>           Batch mode: regenerate only comma-separated ids, e.g. 3,5,7.
  --result-manifest <path>     Batch result JSON path. Default: <manifest>.results.json.
  --dry-run                    Validate inputs and output paths without calling the API.
  --validate-manifest          Alias for --dry-run in batch mode.
  --base-url <url>             Proxy base URL. Appends /v1/responses unless already present.
  --api-key <key>              API key. Prefer env vars over command-line secrets.
  --permission-code <code>     Optional proxy permission code header.
  --provider-name <name>       Optional proxy provider name header.

Environment:
  OPENAI_API_KEY               Official OpenAI key, also proxy fallback.
  GPT_IMAGE_BASE_URL           Proxy base URL.
  GPT_IMAGE_API_KEY            Proxy API key.
  GPT_IMAGE_PROVIDER           Proxy provider name.
  GPT_IMAGE_API_MODE           Proxy API protocol: responses, images, or auto.
  GPT_IMAGE_API_STYLE          Backward-compatible alias of GPT_IMAGE_API_MODE.
  GPT_IMAGE_MODEL              Images API model. Default: ${DEFAULT_IMAGE_MODEL}.
  XINGHE_TEXT_MODEL            Responses model. Default: ${DEFAULT_RESPONSES_MODEL}.

Examples:
  node scripts/xinghe_image_assets_cli.js generate --mode official --prompt "Generate one standalone 16:9..." --output assets/xinghe.png
  node scripts/xinghe_image_assets_cli.js inspect --mode proxy --api-mode images --style-references assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png --base-url https://gateway.example.com --prompt "..." --output assets/xinghe.png
  node scripts/xinghe_image_assets_cli.js generate --mode proxy --api-mode images --style-references assets/examples/00-xinghe-ip-baseline.png,assets/examples/01-two-breakpoints.png --base-url https://gateway.example.com --prompt "..." --output assets/xinghe.png
  node scripts/xinghe_image_assets_cli.js probe --mode proxy --api-mode auto --base-url https://gateway.example.com
  node scripts/xinghe_image_assets_cli.js generate --manifest assets/article/manifest.json --output-dir assets/article --prefix article
`;
}

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }
    const raw = token.slice(2);
    const eq = raw.indexOf("=");
    if (eq >= 0) {
      args[raw.slice(0, eq)] = raw.slice(eq + 1);
      continue;
    }
    if (raw === "help" || raw === "version") {
      args[raw] = true;
      continue;
    }
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[raw] = true;
      continue;
    }
    args[raw] = next;
    i += 1;
  }
  return args;
}

function inferFormat(outputPath, explicitFormat) {
  const value = (explicitFormat || path.extname(outputPath).replace(/^\./, "") || DEFAULT_FORMAT).toLowerCase();
  const normalized = value === "jpg" ? "jpeg" : value;
  if (!FORMATS.has(normalized)) {
    fail(`Unsupported --output-format "${value}". Use png, jpeg, or webp.`);
  }
  return normalized;
}

function resolveApiStyle(args, mode) {
  const value = String(args["api-mode"] || args.api || process.env.GPT_IMAGE_API_MODE || process.env.GPT_IMAGE_API_STYLE || process.env.XINGHE_IMAGE_API_STYLE || (mode === "proxy" ? "auto" : "responses")).toLowerCase();
  if (!API_STYLES.has(value)) {
    fail(`Unsupported --api "${value}". Use responses, images, or auto.`);
  }
  return value;
}

function resolveResponsesEndpoint(mode, baseUrl) {
  if (mode === "official") {
    return "https://api.openai.com/v1/responses";
  }
  if (!baseUrl) {
    fail("Proxy mode requires --base-url or GPT_IMAGE_BASE_URL.");
  }
  const clean = baseUrl.replace(/\/+$/, "");
  if (/\/responses$/i.test(clean)) return clean;
  if (/\/v1$/i.test(clean)) return `${clean}/responses`;
  return `${clean}/v1/responses`;
}

function resolveImagesEndpoint(mode, baseUrl) {
  if (mode === "official") {
    return "https://api.openai.com/v1/images/edits";
  }
  if (!baseUrl) {
    fail("Proxy Images API requires --base-url or GPT_IMAGE_BASE_URL.");
  }
  const clean = baseUrl.replace(/\/+$/, "");
  if (/\/images\/[^/]+$/i.test(clean) && !/\/images\/edits$/i.test(clean)) {
    fail("Only Images edits endpoints with reference images are supported by this skill.");
  }
  if (/\/images\/edits$/i.test(clean)) {
    return clean;
  }
  if (/\/images$/i.test(clean)) return `${clean}/edits`;
  if (/\/v1$/i.test(clean)) return `${clean}/images/edits`;
  if (/\/responses$/i.test(clean)) return clean.replace(/\/responses$/i, "/images/edits");
  return `${clean}/v1/images/edits`;
}

function safeEndpointLabel(endpoint) {
  try {
    const u = new URL(endpoint);
    return `${u.origin}${u.pathname}`;
  } catch (_err) {
    return endpoint.replace(/\?.*$/, "");
  }
}

function mimeForFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "image/png";
}

function splitPathList(value) {
  if (!value || value === true) return [];
  return String(value)
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function referenceImagePaths(args) {
  const paths = [];
  if (args.image && args.image !== true) paths.push(args.image);
  if (args.reference && args.reference !== true) paths.push(args.reference);
  if (args["style-reference"] && args["style-reference"] !== true) paths.push(args["style-reference"]);
  paths.push(...splitPathList(args.references));
  paths.push(...splitPathList(args["style-references"]));
  const unique = [];
  const seen = new Set();
  for (const item of paths) {
    const resolved = path.resolve(item);
    if (!seen.has(resolved)) {
      seen.add(resolved);
      unique.push(resolved);
    }
  }
  if (unique.length > 15) {
    fail("Too many reference images. The Images API edit endpoint supports fewer than 16 images.");
  }
  return unique;
}

function readImageAsDataUrl(filePath) {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    fail(`Reference image not found: ${resolved}`);
  }
  const data = fs.readFileSync(resolved);
  return `data:${mimeForFile(resolved)};base64,${data.toString("base64")}`;
}

function buildInput(prompt, imagePaths) {
  const content = [{ type: "input_text", text: prompt }];
  for (const imagePath of imagePaths) {
    content.push({ type: "input_image", image_url: readImageAsDataUrl(imagePath) });
  }
  return [{ role: "user", content }];
}

function responsesModel(args) {
  return args.model || DEFAULT_RESPONSES_MODEL;
}

function imagesModel(args) {
  return args.model || DEFAULT_IMAGE_MODEL;
}

function buildResponsesPayload(args, format) {
  return {
    model: responsesModel(args),
    input: buildInput(args.prompt, referenceImagePaths(args)),
    tools: [
      {
        type: "image_generation",
        size: args.size || DEFAULT_SIZE,
        quality: args.quality || DEFAULT_QUALITY,
        output_format: format,
      },
    ],
    tool_choice: "required",
  };
}

function blobFromFile(filePath) {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    fail(`Reference image not found: ${resolved}`);
  }
  return {
    resolved,
    blob: new Blob([fs.readFileSync(resolved)], { type: mimeForFile(resolved) }),
  };
}

function buildImagesEditBody(args, format) {
  if (typeof FormData === "undefined" || typeof Blob === "undefined") {
    fail("Images edit mode requires Node.js 18+ with built-in FormData and Blob support.");
  }
  const form = new FormData();
  const imagePaths = referenceImagePaths(args);
  if (imagePaths.length === 0) {
    fail("Images edit mode requires --image, --style-reference, --style-references, --reference, or --references.");
  }
  for (const imagePath of imagePaths) {
    const { resolved, blob } = blobFromFile(imagePath);
    form.append("image", blob, path.basename(resolved));
  }
  form.append("prompt", args.prompt);
  form.append("model", imagesModel(args));
  form.append("n", String(args.n || 1));
  form.append("size", args.size || DEFAULT_SIZE);
  form.append("quality", args.quality || DEFAULT_QUALITY);
  form.append("response_format", "b64_json");
  form.append("output_format", format);
  if (args.background) form.append("background", args.background);
  if (args.moderation) form.append("moderation", args.moderation);
  if (args.mask) {
    const mask = blobFromFile(args.mask);
    form.append("mask", mask.blob, path.basename(mask.resolved));
  }
  return form;
}

function parseSse(text) {
  const events = [];
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const data = trimmed.slice(5).trim();
    if (!data || data === "[DONE]") continue;
    try {
      events.push(JSON.parse(data));
    } catch (_err) {
      // Ignore non-JSON heartbeat lines.
    }
  }
  return { events };
}

function parseResponseBody(text, contentType) {
  if (/text\/event-stream/i.test(contentType) || /^data:/m.test(text)) {
    return parseSse(text);
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    fail(`Response was not valid JSON or SSE: ${err.message}`);
  }
}

function looksLikeBase64Image(value) {
  if (typeof value !== "string") return false;
  const raw = value.startsWith("data:image/") ? value.split(",").pop() : value;
  if (!raw || raw.length < 1000) return false;
  return /^[A-Za-z0-9+/=\r\n]+$/.test(raw);
}

function collectCandidates(node, out = { images: [], revisedPrompts: [] }) {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    for (const item of node) collectCandidates(item, out);
    return out;
  }

  if (node.type === "image_generation_call" && typeof node.result === "string") {
    out.images.push({ b64: node.result, source: "image_generation_call.result" });
  }
  for (const key of ["b64_json", "image_base64", "base64", "result"]) {
    if (looksLikeBase64Image(node[key])) {
      out.images.push({ b64: node[key], source: key });
    }
  }
  for (const key of ["revised_prompt", "revisedPrompt", "prompt"]) {
    if (typeof node[key] === "string" && node[key].length > 20) {
      out.revisedPrompts.push(node[key]);
    }
  }
  for (const value of Object.values(node)) collectCandidates(value, out);
  return out;
}

function decodeBase64Image(value) {
  const raw = value.startsWith("data:image/") ? value.split(",").pop() : value;
  const cleaned = raw.replace(/\s+/g, "");
  const buffer = Buffer.from(cleaned, "base64");
  if (buffer.length < 100) {
    fail("Decoded image is unexpectedly small; endpoint did not return image data.");
  }
  return buffer;
}

function validateSignature(buffer, format) {
  if (format === "png") {
    const ok = buffer.length >= 8 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47 && buffer[4] === 0x0d && buffer[5] === 0x0a && buffer[6] === 0x1a && buffer[7] === 0x0a;
    if (!ok) fail("Output bytes do not match PNG signature.");
  }
  if (format === "jpeg") {
    const ok = buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    if (!ok) fail("Output bytes do not match JPEG signature.");
  }
  if (format === "webp") {
    const ok = buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
    if (!ok) fail("Output bytes do not match WebP signature.");
  }
}

async function requestImage({ endpoint, apiStyle, headers, body, apiKey, format, model, mode, size, quality, outputPath }) {
  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers,
      body,
    });
  } catch (err) {
    fail(`${apiStyle} request failed before receiving a response: ${err.message}`);
  }

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();
  if (!response.ok) {
    const short = text.slice(0, 1200).replace(apiKey, "[redacted]");
    fail(`${apiStyle} endpoint returned HTTP ${response.status}. ${short}`);
  }

  const parsed = parseResponseBody(text, contentType);
  const candidates = collectCandidates(parsed);
  if (candidates.images.length === 0) {
    fail(`No base64 image data found in the ${apiStyle} response.`);
  }

  const selected = candidates.images[0];
  const buffer = decodeBase64Image(selected.b64);
  validateSignature(buffer, format);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);

  return {
    ok: true,
    mode,
    api: apiStyle,
    endpoint: safeEndpointLabel(endpoint),
    model,
    output: outputPath,
    bytes: buffer.length,
    format,
    size,
    quality,
    source: selected.source,
    revised_prompt: candidates.revisedPrompts[0] || null,
  };
}

async function generateViaResponses(args, context) {
  const endpoint = resolveResponsesEndpoint(context.mode, context.baseUrl);
  const headers = {
    "content-type": "application/json",
    authorization: `Bearer ${context.apiKey}`,
  };
  if (context.permissionCode) headers["x-permission-code"] = context.permissionCode;
  if (context.providerName) headers["x-provider-name"] = context.providerName;
  return requestImage({
    endpoint,
    apiStyle: "responses",
    headers,
    body: JSON.stringify(buildResponsesPayload(args, context.format)),
    apiKey: context.apiKey,
    format: context.format,
    model: responsesModel(args),
    mode: context.mode,
    size: args.size || DEFAULT_SIZE,
    quality: args.quality || DEFAULT_QUALITY,
    outputPath: context.outputPath,
  });
}

async function generateViaImages(args, context) {
  if (referenceImagePaths(args).length === 0) {
    fail("Images API mode requires reference images. Pure text image generation is not supported.");
  }
  const endpoint = resolveImagesEndpoint(context.mode, context.baseUrl);
  const headers = {
    authorization: `Bearer ${context.apiKey}`,
  };
  if (context.permissionCode) headers["x-permission-code"] = context.permissionCode;
  if (context.providerName) headers["x-provider-name"] = context.providerName;

  const body = buildImagesEditBody(args, context.format);

  return requestImage({
    endpoint,
    apiStyle: "images",
    headers,
    body,
    apiKey: context.apiKey,
    format: context.format,
    model: imagesModel(args),
    mode: context.mode,
    size: args.size || DEFAULT_SIZE,
    quality: args.quality || DEFAULT_QUALITY,
    outputPath: context.outputPath,
  });
}

async function performGenerate(args) {
  const mode = args.mode || "official";
  if (!MODES.has(mode)) fail(`Unsupported --mode "${mode}". Use official or proxy.`);
  if (!args.prompt || args.prompt === true) fail("Missing required --prompt.");
  if (!args.output || args.output === true) fail("Missing required --output.");

  const outputPath = path.resolve(args.output);
  const format = inferFormat(outputPath, args["output-format"]);
  if (fs.existsSync(outputPath) && !args.force) {
    fail(`Output already exists: ${outputPath}. Use --force to overwrite or choose another path.`);
  }
  if (args["dry-run"] || args["validate-manifest"]) {
    for (const imagePath of referenceImagePaths(args)) {
      if (!fs.existsSync(path.resolve(imagePath))) {
        fail(`Reference image not found: ${path.resolve(imagePath)}`);
      }
    }
    return {
      ok: true,
      dry_run: true,
      output: outputPath,
      format,
      size: args.size || DEFAULT_SIZE,
      quality: args.quality || DEFAULT_QUALITY,
    };
  }
  const apiStyle = resolveApiStyle(args, mode);
  const baseUrl = args["base-url"] || process.env.GPT_IMAGE_BASE_URL;
  const apiKey = args["api-key"] || (mode === "official" ? process.env.OPENAI_API_KEY : process.env.GPT_IMAGE_API_KEY || process.env.OPENAI_API_KEY);
  if (!apiKey) {
    fail(mode === "official" ? "Official mode requires OPENAI_API_KEY or --api-key." : "Proxy mode requires GPT_IMAGE_API_KEY, OPENAI_API_KEY, or --api-key.");
  }

  const context = {
    mode,
    baseUrl,
    apiKey,
    permissionCode: args["permission-code"] || process.env.GPT_IMAGE_PERMISSION_CODE,
    providerName: args["provider-name"] || process.env.GPT_IMAGE_PROVIDER,
    outputPath,
    format,
  };

  if (apiStyle === "responses") return generateViaResponses(args, context);
  if (apiStyle === "images") return generateViaImages(args, context);

  try {
    return await generateViaResponses(args, context);
  } catch (responsesErr) {
    const imagesResult = await generateViaImages(args, context);
    return {
      ...imagesResult,
      api: "images",
      fallback_from: "responses",
      fallback_reason: responsesErr.message,
    };
  }
}

function defaultProbeReference() {
  const candidate = path.join(SKILL_ROOT, "assets", "examples", "01-two-breakpoints.png");
  return fs.existsSync(candidate) ? candidate : null;
}

async function runProbe(args) {
  const mode = args.mode || "proxy";
  if (!MODES.has(mode)) fail(`Unsupported --mode "${mode}". Use official or proxy.`);
  const baseUrl = args["base-url"] || process.env.GPT_IMAGE_BASE_URL;
  const apiKey = args["api-key"] || (mode === "official" ? process.env.OPENAI_API_KEY : process.env.GPT_IMAGE_API_KEY || process.env.OPENAI_API_KEY);
  if (!apiKey) {
    fail(mode === "official" ? "Probe requires OPENAI_API_KEY or --api-key." : "Probe requires GPT_IMAGE_API_KEY, OPENAI_API_KEY, or --api-key.");
  }

  const apiStyle = resolveApiStyle(args, mode);
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "xinghe-probe-"));
  const prompt = args.prompt && args.prompt !== true
    ? args.prompt
    : "Simple test image: a tiny blue circle on a clean white background, no text.";
  const probeSize = args.size || "1024x1024";
  const probeQuality = args.quality || "low";
  const tests = [];

  async function attempt(label, extraArgs) {
    const output = path.join(tempDir, `${label}.png`);
    try {
      const result = await performGenerate({
        ...args,
        ...extraArgs,
        prompt,
        output,
        mode,
        "base-url": baseUrl,
        "api-key": apiKey,
        "output-format": "png",
        size: probeSize,
        quality: probeQuality,
        force: true,
      });
      tests.push({ name: label, ok: true, api: result.api, endpoint: result.endpoint, model: result.model, bytes: result.bytes });
      return result;
    } catch (err) {
      tests.push({ name: label, ok: false, error: err.message || String(err) });
      return null;
    }
  }

  let compatible = null;
  if (apiStyle === "responses" || apiStyle === "auto") {
    const result = await attempt("responses", { api: "responses", "api-mode": "responses" });
    if (result) compatible = "responses-api";
  }
  if (!compatible && (apiStyle === "images" || apiStyle === "auto")) {
    const reference = args.reference || defaultProbeReference();
    const result = reference
      ? await attempt("images-edits-reference", { api: "images", "api-mode": "images", image: null, reference, references: null })
      : null;
    if (result) compatible = "images-api";
  }

  let referenceSupport = "not_tested";
  const reference = args.reference || defaultProbeReference();
  if ((compatible === "images-api" || apiStyle === "images") && reference) {
    const result = await attempt("images-edits-reference", { api: "images", "api-mode": "images", image: null, reference, references: null });
    referenceSupport = result ? "available" : "failed";
  }

  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (_err) {
    // Temp cleanup failure should not hide probe result.
  }

  const summary = {
    ok: Boolean(compatible),
    compatible_mode: compatible,
    model: compatible === "responses-api" ? responsesModel(args) : imagesModel(args),
    reference_support: referenceSupport,
    tests,
  };
  console.log(JSON.stringify(summary, null, 2));
  if (!summary.ok) process.exitCode = 1;
}

function endpointOrError(fn) {
  try {
    return { ok: true, value: safeEndpointLabel(fn()) };
  } catch (err) {
    return { ok: false, error: err.message || String(err) };
  }
}

function runInspect(args) {
  const mode = args.mode || "official";
  if (!MODES.has(mode)) fail(`Unsupported --mode "${mode}". Use official or proxy.`);

  const apiStyle = resolveApiStyle(args, mode);
  const baseUrl = args["base-url"] || process.env.GPT_IMAGE_BASE_URL;
  const imagePaths = referenceImagePaths(args);
  const outputPath = args.output && args.output !== true ? path.resolve(args.output) : null;
  const format = outputPath ? inferFormat(outputPath, args["output-format"]) : (args["output-format"] || DEFAULT_FORMAT);
  const referenceChecks = imagePaths.map((imagePath) => {
    const resolved = path.resolve(imagePath);
    return {
      path: resolved,
      exists: fs.existsSync(resolved),
      mime: mimeForFile(resolved),
    };
  });

  const summary = {
    ok: referenceChecks.every((item) => item.exists) && !(apiStyle === "images" && imagePaths.length === 0),
    inspect_only: true,
    no_api_request: true,
    mode,
    api_mode: apiStyle,
    planned_api: apiStyle === "auto" ? "responses first, images fallback" : apiStyle,
    images_request_type: imagePaths.length > 0 ? "edits multipart/form-data" : "unsupported: reference images required",
    reference_count: imagePaths.length,
    references: referenceChecks,
    output: outputPath,
    output_exists: outputPath ? fs.existsSync(outputPath) : null,
    format,
    size: args.size || DEFAULT_SIZE,
    quality: args.quality || DEFAULT_QUALITY,
    model: apiStyle === "responses" ? responsesModel(args) : imagesModel(args),
    env: {
      GPT_IMAGE_BASE_URL: Boolean(process.env.GPT_IMAGE_BASE_URL),
      GPT_IMAGE_API_KEY: Boolean(process.env.GPT_IMAGE_API_KEY),
      OPENAI_API_KEY: Boolean(process.env.OPENAI_API_KEY),
      GPT_IMAGE_API_MODE: process.env.GPT_IMAGE_API_MODE || "",
      GPT_IMAGE_MODEL: process.env.GPT_IMAGE_MODEL || "",
      GPT_IMAGE_PROVIDER: Boolean(process.env.GPT_IMAGE_PROVIDER),
      GPT_IMAGE_PERMISSION_CODE: Boolean(process.env.GPT_IMAGE_PERMISSION_CODE),
    },
    endpoints: {
      responses: endpointOrError(() => resolveResponsesEndpoint(mode, baseUrl)),
      images: endpointOrError(() => resolveImagesEndpoint(mode, baseUrl)),
    },
  };

  if (summary.output_exists && !args.force) {
    summary.ok = false;
    summary.warning = "Output already exists. Choose another path or pass --force for a real generate call.";
  }
  console.log(JSON.stringify(summary, null, 2));
  if (!summary.ok) process.exitCode = 1;
}

function slugify(value) {
  return String(value || "image")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
}

function readBatchItems(manifestPath) {
  const resolved = path.resolve(manifestPath);
  if (!fs.existsSync(resolved)) fail(`Manifest not found: ${resolved}`);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(resolved, "utf8"));
  } catch (err) {
    fail(`Manifest is not valid JSON: ${err.message}`);
  }
  const items = Array.isArray(data) ? data : data.pictures || data.images || data.items;
  if (!Array.isArray(items) || items.length === 0) {
    fail("Manifest must be a non-empty array, or contain pictures[], images[], or items[].");
  }
  return { manifest: data, items, resolved };
}

function parseIdSet(value) {
  if (!value || value === true) return null;
  const set = new Set();
  for (const part of String(value).split(",")) {
    const trimmed = part.trim();
    if (trimmed) set.add(trimmed);
  }
  return set.size ? set : null;
}

function itemId(item, index) {
  return String(item.id || index + 1);
}

function itemOutputPath(args, item, index, format) {
  if (item.output) return path.resolve(item.output);
  const outputDir = args["output-dir"];
  if (!outputDir || outputDir === true) fail("Batch mode requires --output-dir.");
  const prefix = slugify(args.prefix || path.basename(args.manifest, path.extname(args.manifest)));
  const id = String(item.id || index + 1).padStart(2, "0");
  const topic = slugify(item.filename || item.topic || item.title || `image-${id}`);
  const filename = item.filename && /\.[a-z0-9]+$/i.test(item.filename)
    ? item.filename
    : `${prefix}-${id}-${topic}.${format}`;
  return path.resolve(outputDir, filename);
}

async function generateBatch(args) {
  const { manifest, items, resolved } = readBatchItems(args.manifest);
  const regenerate = parseIdSet(args.regenerate);
  const results = [];

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const id = itemId(item, i);
    const itemFormat = inferFormat(item.output || item.filename || `image.${args["output-format"] || DEFAULT_FORMAT}`, item.output_format || item["output-format"] || args["output-format"]);
    const outputPath = itemOutputPath(args, item, i, itemFormat);
    const selectedForRegenerate = !regenerate || regenerate.has(id) || regenerate.has(String(i + 1));
    const exists = fs.existsSync(outputPath);

    if (!selectedForRegenerate) {
      results.push({ id, topic: item.topic || item.title || null, prompt: item.prompt || null, output: outputPath, ok: true, skipped: true, reason: "not selected by --regenerate" });
      continue;
    }
    if (exists && !args.force && !regenerate) {
      results.push({ id, topic: item.topic || item.title || null, prompt: item.prompt || null, output: outputPath, ok: true, skipped: true, reason: "output already exists" });
      continue;
    }
    if (!item.prompt || item.prompt === true) {
      results.push({ id, topic: item.topic || item.title || null, prompt: null, output: outputPath, ok: false, skipped: false, error: "missing prompt" });
      continue;
    }

    const itemArgs = {
      ...args,
      prompt: item.prompt,
      output: outputPath,
      image: item.image || args.image,
      reference: item.reference || args.reference,
      references: item.references || args.references,
      "style-reference": item.style_reference || item["style-reference"] || args["style-reference"],
      "style-references": item.style_references || item["style-references"] || args["style-references"],
      size: item.size || args.size,
      quality: item.quality || args.quality,
      force: args.force || Boolean(regenerate),
      "output-format": item.output_format || item["output-format"] || args["output-format"],
    };
    try {
      const result = await performGenerate(itemArgs);
      results.push({ id, topic: item.topic || item.title || null, prompt: item.prompt, ...result, skipped: false });
    } catch (err) {
      results.push({ id, topic: item.topic || item.title || null, prompt: item.prompt, output: outputPath, ok: false, skipped: false, error: err.message || String(err) });
    }
  }

  const resultManifestPath = path.resolve(args["result-manifest"] || `${resolved.replace(/\.json$/i, "")}.results.json`);
  const summary = {
    ok: results.every((item) => item.ok),
    source_manifest: resolved,
    result_manifest: resultManifestPath,
    mode: args.mode || "official",
    dry_run: Boolean(args["dry-run"] || args["validate-manifest"]),
    input_count: items.length,
    generated_count: results.filter((item) => item.ok && !item.skipped && !item.dry_run).length,
    planned_count: results.filter((item) => item.ok && item.dry_run).length,
    dry_run_count: results.filter((item) => item.dry_run).length,
    skipped_count: results.filter((item) => item.skipped).length,
    failed_count: results.filter((item) => !item.ok).length,
    pictures: results,
    original: manifest,
  };
  fs.mkdirSync(path.dirname(resultManifestPath), { recursive: true });
  fs.writeFileSync(resultManifestPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(summary, null, 2));
  if (!summary.ok) process.exitCode = 1;
}

async function generate(args) {
  if (args.manifest && args.manifest !== true) {
    await generateBatch(args);
    return;
  }
  const result = await performGenerate(args);
  console.log(JSON.stringify(result, null, 2));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args._[0] === "help") {
    console.log(usage());
    return;
  }
  if (args.version) {
    console.log(VERSION);
    return;
  }
  const command = args._[0];
  if (command === "inspect") {
    runInspect(args);
    return;
  }
  if (command === "probe") {
    await runProbe(args);
    return;
  }
  if (command !== "generate") {
    console.log(usage());
    process.exit(command ? 1 : 0);
  }
  await generate(args);
}

main().catch((err) => {
  console.error(`Error: ${err && err.message ? err.message : String(err)}`);
  process.exit(err && err.exitCode ? err.exitCode : 1);
});
