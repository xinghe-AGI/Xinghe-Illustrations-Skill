# 安装后配置向导

这个文件用于用户刚安装 `xinghe-illustrations-skill` 后，配置图片生成服务、检查 URL/API key、验证参考图上传能力。

只输出视觉策略、候选方向、prompt 或 manifest 时，不需要 API key。只有用户明确要求真实生成 PNG，并确认可以把 prompt、人物基准图、参考图或用户素材发送到外部图片服务时，才进入真实生图配置。

## 1. 选择调用方式

先确认使用哪一种方式：

| 调用方式 | 适合情况 | 最少配置 |
|---|---|---|
| 官方 OpenAI | 直接使用官方 OpenAI 图片能力 | `OPENAI_API_KEY` |
| 第三方中转站 | 使用兼容 OpenAI 图片接口的网关、代理或中转服务 | `GPT_IMAGE_BASE_URL`、`GPT_IMAGE_API_KEY`、`GPT_IMAGE_API_MODE`、`GPT_IMAGE_MODEL` |
| prompt-only | 暂时不真实生图，只要方案和提示词 | 不需要 key |

不要把真实密钥写进 README、SKILL.md、references、scripts、test-prompts、issue、最终交付文件或会提交到 GitHub 的 `.env`。

## 2. 配置官方 OpenAI

在本机环境变量、Agent runtime 的私有 secrets，或不会提交的私有 env 文件里配置：

```text
OPENAI_API_KEY=你的 API Key
```

配置后重启 Codex、Agent runtime、终端或新开会话，让环境变量生效。

## 3. 配置第三方中转站

在私有环境变量或 runtime secrets 里配置：

```text
GPT_IMAGE_BASE_URL=你的图片接口地址
GPT_IMAGE_API_KEY=你的 API Key
GPT_IMAGE_API_MODE=images
GPT_IMAGE_MODEL=你的图片模型名
```

可选配置：

```text
GPT_IMAGE_PROVIDER=可选的服务商标记
GPT_IMAGE_PERMISSION_CODE=可选的权限码
```

填写建议：

- 如果平台给的是根地址，填根地址即可，CLI 会按模式拼接接口路径。
- 如果平台给的是 `/v1` 结尾地址，也可以直接填写。
- 如果平台明确给了 Images edits endpoint，使用 `GPT_IMAGE_API_MODE=images`。
- 如果平台只支持纯文本生图、不能上传参考图，就不适合生成含星禾人物的图片。

## 4. 检查参考图能力

含星禾人物、手部、半身或侧影时，真实生图必须能上传人物基准图：

```text
assets/examples/00-xinghe-ip-baseline.png
```

技术架构图、流程图、高密度全景图、知识卡片和信息图如果明确为 `no-character`，可以不上传人物基准图，但不能声称它是人物一致的星禾人物图。

全景信息图优先选择：

```text
assets/examples/21-panorama-core-loop.png
assets/examples/22-panorama-layered-architecture.png
assets/examples/23-panorama-before-after-system.png
assets/examples/24-panorama-roadmap-navigation.png
```

## 5. 先 inspect，再 probe

进入 skill 根目录后先检查脚本：

```bash
node --check scripts/xinghe_image_assets_cli.js
```

只检查参数和路径，不请求 API：

```bash
node scripts/xinghe_image_assets_cli.js inspect \
  --mode proxy \
  --api-mode images \
  --model "$GPT_IMAGE_MODEL" \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/18-xhs-typed-title-bottom-xinghe.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/test.png"
```

确认 endpoint、模型、鉴权和参考图上传链路：

```bash
node scripts/xinghe_image_assets_cli.js probe \
  --mode proxy \
  --api-mode images \
  --model "$GPT_IMAGE_MODEL" \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --reference "assets/examples/00-xinghe-ip-baseline.png" \
  --size 1024x1024 \
  --quality low
```

`probe` 失败或超时时，不要连续硬重试。先检查中转站额度、模型名、URL、是否支持参考图上传、响应超时限制，再决定是否改用 prompt-only。

## 6. 首次真实生成

首次建议用低成本、小尺寸、低风险 prompt 做验证：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model "$GPT_IMAGE_MODEL" \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/18-xhs-typed-title-bottom-xinghe.png" \
  --prompt "<short final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/smoke-test.png" \
  --size 1024x1536 \
  --quality low \
  --output-format png
```

生成后检查：

- 人物是否接近 `00-xinghe-ip-baseline.png`。
- 中文标题是否可读、无错字。
- 构图是否符合当前图型，而不是照搬参考图。
- 输出文件没有覆盖旧图。

## 7. 常见问题

| 问题 | 处理 |
|---|---|
| 环境变量配置后仍读不到 | 重启 Codex、runtime 或终端；确认变量配置在当前用户/进程可见位置 |
| 401/403 | 检查 API key、权限码、额度和服务商访问权限 |
| 404/路径错误 | 检查 `GPT_IMAGE_BASE_URL` 是否为服务商要求的根地址或 endpoint |
| 参考图上传失败 | 确认服务支持 Images edits/multipart；不支持时不要生成含人物图 |
| 人物风格漂移 | 同时上传 `00-xinghe-ip-baseline.png` 和合适的场景参考图，减少服饰/发型冲突描述 |
| 中文错字明显 | 优先重生或减少图中文字，不做代码涂改 |
| 高密度图太挤 | 降低字数、拆成卡片组，或改为横向全景信息图 |
