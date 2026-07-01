# 生图访问模式

本 reference 说明本 skill 如何在通用 Agent runtime 中连接图片生成服务。这里要区分两个概念：

| 概念 | 可选值 | 含义 |
|---|---|---|
| access mode | `official` / `proxy` | 使用 OpenAI 官方端点，或第三方代理/企业网关端点 |
| API protocol | `responses` / `images` / `auto` | 使用 `/v1/responses` + `image_generation`，或 `/v1/images/*`，或自动回退 |

默认规则：

- `official` 默认 `--api-mode responses`。
- `proxy` 默认 `--api-mode auto`：先尝试 Responses API，失败或未返回 base64 图片时回退 Images API。
- 明确知道代理只支持 `/v1/images/generations` 或 `/v1/images/edits` 时，直接使用 `--api-mode images` 或设置 `GPT_IMAGE_API_MODE=images`。
- 含人物的真实星禾图优先选择能上传参考图的模式；不能上传 `assets/examples/00-xinghe-ip-baseline.png` 时，不做含人物真实生成。明确 `no-character` 的结构图可按无人物结构图处理。

## 配置放在哪里

第三方请求地址和 API key 必须配置在本机 Agent runtime 的私有环境变量里，不要写进本 skill 仓库，也不要提交到 GitHub。

推荐位置：

| 使用环境 | 推荐配置位置 | 生效方式 |
|---|---|---|
| Windows / 通用 Agent | 系统“用户环境变量”，或本机启动器明确加载的私有 env 文件 | 重启 Agent 或开启新会话 |
| macOS / Linux / 通用 Agent | shell profile、系统用户环境变量，或本机启动器明确加载的私有 env 文件 | 重启 shell/Agent 或开启新会话 |
| OpenClaw / Hermes / 其他 Agent runtime | 对应 runtime 的私有 `.env`、secrets 或环境变量注入配置 | 按 runtime 文档重启或刷新 |

不要配置在：

- `SKILL.md`
- `README.md`
- `references/*.md`
- `scripts/*.js`
- `assets/`
- 任何会进入 git commit 的文件

官方 OpenAI 模式：

```text
OPENAI_API_KEY=<your-openai-api-key>
```

第三方中转站模式：

```text
GPT_IMAGE_BASE_URL=https://gateway.example.com
GPT_IMAGE_API_KEY=<your-proxy-api-key>
GPT_IMAGE_API_MODE=images
GPT_IMAGE_MODEL=gpt-image-2
```

可选变量：

```text
GPT_IMAGE_PROVIDER=<optional-provider-name>
GPT_IMAGE_PERMISSION_CODE=<optional-permission-code>
```

`GPT_IMAGE_API_STYLE` 是旧变量名，仍兼容；新配置优先使用 `GPT_IMAGE_API_MODE`，可选值为 `responses`、`images`、`auto`。

## 兼容性探测

首次配置第三方中转站后，先运行：

```bash
node scripts/xinghe_image_assets_cli.js probe \
  --mode proxy \
  --api-mode auto \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --model gpt-image-2
```

成功输出示例：

```json
{
  "ok": true,
  "compatible_mode": "images-api",
  "model": "gpt-image-2",
  "reference_support": "available"
}
```

如果 `compatible_mode` 是 `images-api`，后续生成使用 `--api-mode images`，并搭配 `--style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-match>.png"`。如果探测失败，不要继续生成，先检查 base URL、API key、模型名和代理是否支持图片接口。

如果只是检查本机配置、endpoint 拼接、参考图路径和输出文件覆盖风险，优先使用零成本 `inspect`，它不会请求 API，也不会消耗额度：

```bash
node scripts/xinghe_image_assets_cli.js inspect \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/01-topic.png"
```

## official

用途：直接调用 OpenAI 官方端点。官方模式默认使用 Responses API，必要时也可以使用 Images API。

要求：

```text
OPENAI_API_KEY=<your-openai-api-key>
```

零成本检查：

```bash
node scripts/xinghe_image_assets_cli.js inspect \
  --mode official \
  --api-mode responses \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/01-topic.png"
```

真实生成：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --api-mode responses \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/01-topic.png" \
  --size 1536x1024 \
  --quality high \
  --output-format png
```

默认 endpoint：

```text
https://api.openai.com/v1/responses
```

注意：如果当前官方调用链路或所在 runtime 不能把人物基准图作为图片参考输入传入，就不要真实生成含人物的星禾图，只输出 prompt/命令建议。无人物结构图不声称人物一致即可。

## proxy

用途：调用企业网关、私有中转或第三方代理。代理可能兼容 Responses API，也可能只兼容旧版 Images API。

要求：

```text
GPT_IMAGE_BASE_URL=https://gateway.example.com
GPT_IMAGE_API_KEY=<your-proxy-api-key>
```

可选：

```text
GPT_IMAGE_PROVIDER=<optional-provider-name>
GPT_IMAGE_PERMISSION_CODE=<optional-permission-code>
GPT_IMAGE_API_MODE=images
GPT_IMAGE_MODEL=gpt-image-2
```

### Responses API endpoint 规则

- 如果传入值以 `/responses` 结尾，直接使用。
- 如果传入值以 `/v1` 结尾，追加 `/responses`。
- 其他情况追加 `/v1/responses`。

### Images API endpoint 规则

当 `--api-mode images` 或 auto fallback 到 Images API 时：

- 纯文本生图调用 `/v1/images/generations`，发送 JSON。
- 带 `--image`、`--style-reference`、`--style-references`、`--reference` 或 `--references` 时，调用 `/v1/images/edits`，发送 `multipart/form-data`。
- 如果 `--base-url` 传入 `/v1`，CLI 自动追加 `/images/generations` 或 `/images/edits`。
- 如果 `--base-url` 已经是 `/v1/images/generations` 或 `/v1/images/edits`，CLI 会按是否有图片参数纠正到对应 endpoint。

旧版 Images API 示例：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/01-two-breakpoints.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/01-topic.png" \
  --size 1536x1024 \
  --quality high \
  --output-format png
```

### NangeAI / gpt-image-2 中转站

NangeAI 可作为第三方中转站示例。具体 base URL、鉴权 header、permission code 和模型支持情况，以你自己的中转站控制台或接口文档为准，不要把真实密钥写进仓库。

如果文档指向 `/v1/images/edits`，请求体是 `multipart/form-data`，其中 `image` 可传 1 张或多张图片，常用字段包括 `prompt`、`model`、`n`、`size`、`quality`、`background`、`moderation`。这种场景直接使用 Images API，并用 `--style-references` 同时上传星禾人物基准图和场景/封面参考图：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/18-xhs-typed-title-bottom-xinghe.png" \
  --prompt "<final cover prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/xhs-cover.png" \
  --size 1024x1536 \
  --quality high \
  --background opaque \
  --output-format png
```

没有图片参数时走 `/v1/images/generations` JSON，不能用于合格星禾图；只能作为普通 prompt-only 或非 IP 强约束测试。

可选 header：

- `--permission-code` 或 `GPT_IMAGE_PERMISSION_CODE` -> `x-permission-code`
- `--provider-name` 或 `GPT_IMAGE_PROVIDER` -> `x-provider-name`

## 星禾图强制参考图

选择访问模式时，优先选择能上传参考图的模式。含人物的真实星禾图必须上传 `assets/examples/00-xinghe-ip-baseline.png`；如果某个 provider 只能纯文本生成、不能使用 `/v1/images/edits` 或等价参考图输入，就不能用于合格星禾人物图生成。明确 `no-character` 的技术架构图或流程图可作为星禾风格结构图处理。

正文配图参考图从 `assets/examples/01-14-*.png` 中选；微信公众号封面和小红书笔记封面从 `assets/examples/15-20-*.png` 中选。封面任务不要把正文配图构图硬套到封面上。

## 选择顺序

1. 用户明确给了代理端点：用 `proxy`。
2. 用户只配置了 `OPENAI_API_KEY`：用 `official`。
3. 代理文档只写 `/v1/images/generations` 或 `/v1/images/edits`：用 `--api-mode images`。
4. 代理文档写 `/v1/responses` 或 `image_generation tool`：用 `--api-mode responses`。
5. 不确定代理协议：用 `--api-mode auto`，先 `probe`，再 `inspect`。
6. 两者都不可用，或无法上传人物基准图：不要假装已经生成图片，输出完整提示词和命令，说明缺少的前置条件。

## 不要做

- 不把只支持 Images API 的代理端点误当作 Responses API。
- 不用只支持纯文本 `/v1/images/generations` 的 provider 生成合格星禾 IP 图。
- 不要求某个 runtime 专属工具；OpenClaw、Hermes 和其他无原生生图 Agent 都应能通过 Node CLI 使用。
- 不把 access token、permission code 或 API key 写进日志、文件名、Markdown 交付结果。
