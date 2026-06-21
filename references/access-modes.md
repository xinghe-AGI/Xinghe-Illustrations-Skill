# 生图访问模式

本 skill 保留两种访问模式：`official` 和 `proxy`；同时支持两种 API 协议：Responses API 和旧版 Images API。

| 概念 | 可选值 | 含义 |
|---|---|---|
| access mode | `official` / `proxy` | 使用 OpenAI 官方端点，或第三方代理端点 |
| API protocol | `responses` / `images` / `auto` | 使用 `/v1/responses` + `image_generation`，或 `/v1/images/*`，或自动回退 |

默认规则：

- `official` 默认 `--api-mode responses`。
- `proxy` 默认 `--api-mode auto`：先尝试 Responses API，失败或未返回 base64 图片时回退 Images API。
- 明确知道代理只支持旧版接口时，直接使用 `--api-mode images` 或设置 `GPT_IMAGE_API_MODE=images`。

## 配置放在哪里

第三方请求地址和 API key 必须配置在本机 agent runtime 的私有环境变量里，不要写进本 skill 仓库，也不要提交到 GitHub。

推荐位置：

| 使用环境 | 推荐配置位置 | 生效方式 |
|---|---|---|
| Windows / 通用 Agent | 系统“用户环境变量”，或本机启动器明确加载的私有 env 文件 | 重启 agent 或开启新会话 |
| macOS / Linux / 通用 Agent | shell profile、系统用户环境变量，或本机启动器明确加载的私有 env 文件 | 重启 shell/agent 或开启新会话 |
| OpenClaw / Hermes / 其他 Agent runtime | 对应 runtime 的私有 `.env`、secrets 或环境变量注入配置 | 按 runtime 文档重启或刷新 |

不要配置在：

- `SKILL.md`
- `README.md`
- `references/*.md`
- `scripts/*.js`
- `assets/`
- 任何会进入 git commit 的文件

示例变量名：

```bash
# official mode
OPENAI_API_KEY=sk-...

# proxy mode
GPT_IMAGE_BASE_URL=https://gateway.example.com
GPT_IMAGE_API_KEY=...
GPT_IMAGE_PROVIDER=optional-provider-name
GPT_IMAGE_PERMISSION_CODE=optional-permission-code
GPT_IMAGE_API_MODE=images # responses / images / auto
GPT_IMAGE_API_STYLE=images # 兼容旧变量名；优先使用 GPT_IMAGE_API_MODE
GPT_IMAGE_MODEL=gpt-image-2
```

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

如果 `compatible_mode` 是 `images-api`，后续生成使用 `--api-mode images`，并优先搭配 `--style-reference`。如果探测失败，不要继续生成，先检查 base URL、API key、模型名和代理是否支持图片接口。

如果只是检查本机配置、endpoint 拼接、参考图路径和输出文件覆盖风险，优先使用零成本 `inspect`，它不会请求 API，也不会消耗额度：

```bash
node scripts/xinghe_image_assets_cli.js inspect \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-reference "assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png"
```

## official

用途：直接调用 OpenAI 官方 Responses API。

要求：

```bash
OPENAI_API_KEY=...
```

命令：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png"
```

默认 endpoint：

```text
https://api.openai.com/v1/responses
```

## proxy

用途：调用企业网关、私有中转或第三方代理。代理可能兼容 Responses API，也可能只兼容旧版 Images API。

要求：

```bash
GPT_IMAGE_BASE_URL=https://gateway.example.com
GPT_IMAGE_API_KEY=...
GPT_IMAGE_PROVIDER=<optional provider name>
```

命令：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode auto \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png"
```

### Responses API endpoint 规则

- 如果传入值以 `/responses` 结尾，直接使用。
- 如果传入值以 `/v1` 结尾，追加 `/responses`。
- 其他情况追加 `/v1/responses`。

### Images API endpoint 规则

当 `--api-mode images` 或 auto fallback 到 Images API 时：

- 纯文本生图调用 `/v1/images/generations`，发送 JSON。
- 带 `--image` 改图调用 `/v1/images/edits`，发送 `multipart/form-data`。
- 如果 `--base-url` 传入 `/v1`，CLI 自动追加 `/images/generations` 或 `/images/edits`。
- 如果 `--base-url` 已经是 `/v1/images/generations` 或 `/v1/images/edits`，CLI 会按是否有 `--image` 纠正到对应 endpoint。

旧版 Images API 示例：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-reference "assets/examples/01-two-breakpoints.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png" \
  --size 1536x1024 \
  --quality high
```

### Nange / gpt-image-2 中转站

用户给出的 nangeagi Apifox 文档如果指向 `/v1/images/edits`，请求体是 `multipart/form-data`，其中 `image` 可传 1 张或多张图片，常用字段包括 `prompt`、`model`、`n`、`size`、`quality`、`background`、`moderation`。这种场景直接使用 Images API，并用 `--style-reference` 上传星禾 IP 参考图：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-reference "assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png" \
  --size 1536x1024 \
  --quality high \
  --output-format png
```

只要存在 `--style-reference`、`--reference`、`--references` 或 `--image`，CLI 会自动把请求切到 `/v1/images/edits` 并发送 multipart；没有图片参数时才走 `/v1/images/generations` JSON。

旧版 Images edit 示例：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --image "path/to/reference.png" \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --prompt "<edit prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic-edit.png"
```

可选 header：

- `--permission-code` 或 `GPT_IMAGE_PERMISSION_CODE` → `x-permission-code`
- `--provider-name` 或 `GPT_IMAGE_PROVIDER` → `x-provider-name`

## 选择顺序

1. 用户明确给了代理端点：用 `proxy`。
2. 用户只配置了 `OPENAI_API_KEY`：用 `official`。
3. 代理文档只写 `/v1/images/generations` 或 `/v1/images/edits`：用 `--api-mode images`。
4. 代理文档写 `/v1/responses` 或 `image_generation tool`：用 `--api-mode responses`。
5. 不确定代理协议：用 `--api-mode auto`。
6. 两者都不可用：不要假装已经生成图片，输出完整提示词和命令，说明缺少密钥。

## 不要做

- 不把只支持 Images API 的代理端点误当作 Responses API。
- 不要求某个 runtime 专属工具；OpenClaw、Hermes 和其他无原生生图 Agent 都应能通过 Node CLI 使用。
- 不把 access token、permission code 或 API key 写进日志、文件名、Markdown 交付结果。
