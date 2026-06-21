# 通用生图运行协议

本 reference 给 OpenClaw、Hermes 和其他没有原生生图工具的 Agent Skills runtime 使用。不要依赖某个 runtime 专属图片工具；只有在用户明确要求真实生成图片、环境具备可用 API key/endpoint、且输出路径安全时，才调用本 skill 内置的 Node CLI。

## 最小前置

- Node.js 18+，不需要安装 npm 包。
- official 模式需要 `OPENAI_API_KEY`。
- proxy 模式需要 `GPT_IMAGE_BASE_URL`，并需要 `GPT_IMAGE_API_KEY` 或 `OPENAI_API_KEY`。
- Responses 模型来自 `XINGHE_TEXT_MODEL`，未设置时 CLI 使用 `gpt-5.5`。
- Images API 模型来自 `GPT_IMAGE_MODEL` 或 `XINGHE_IMAGE_MODEL`，未设置时 CLI 使用 `gpt-image-2`。

## 什么时候不做真实生图

以下情况只做提示词、manifest、静态检查、`inspect` 或 dry-run，不请求第三方图像服务：

- 用户要求策略、shot list、prompt-only、评估或优化 skill。
- 用户明确说不要 CLI 生图、不要真实生成或不要消耗第三方额度。
- API key、proxy endpoint 或 Responses-compatible image_generation 能力尚未确认。
- 只是验证脚本语法、manifest 格式、路径覆盖风险或文档一致性。
- 输出路径已有文件且用户没有明确允许覆盖。

真实生图测试属于集成测试，会消耗第三方服务额度并依赖外部 API 稳定性。除非用户明确要求验证完整生成链路，否则不要把它作为常规测试。

## 调用步骤

1. 先按 `references/prompt-template.md` 生成完整英文生图提示词。
2. 确认提示词包含星禾视觉 DNA：白底、蜡笔线稿、留白、少量红橙蓝中文批注、星禾执行核心动作。
3. 确认用户要真实图片文件，且 API key/endpoint 可用。
4. 调用：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --api-mode responses \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png" \
  --output-format png \
  --size 1536x1024 \
  --quality high
```

proxy 示例：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode auto \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png"
```

如果第三方 API 文档只提供 `/v1/images/generations` 和 `/v1/images/edits`，直接使用旧版 Images API：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png"
```

参考图改图：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --api-mode responses \
  --image "path/to/reference.png" \
  --prompt "<edit prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic-edit.png"
```

覆盖规则：

- 单图模式默认不覆盖已有文件。
- 如目标文件已存在，改用新文件名或先询问用户。
- 只有用户明确要求替换时才加 `--force`。

验证命令不调用 API：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png" \
  --dry-run
```

零成本集成检查命令也不调用 API。它会检查环境变量是否存在、endpoint 会如何解析、是否因参考图走 Images edit multipart、参考图是否存在、输出文件是否会覆盖：

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

## 批量 manifest

当用户要一次生成多张图，先保存 manifest：

```json
{
  "article": "文章名称",
  "platform": "article-16x9",
  "pictures": [
    {
      "id": 1,
      "topic": "最小闭环",
      "filename": "01-minimum-loop.png",
      "prompt": "Generate one standalone 16:9 horizontal Chinese article illustration..."
    }
  ]
}
```

每个 `pictures[]` item 对应一张独立图片。必填：`id`、`topic`、`prompt`。可选：`filename`、`output`、`image`、`size`、`quality`、`output_format`。

运行：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --manifest "assets/<article-slug>-illustrations/manifest.json" \
  --output-dir "assets/<article-slug>-illustrations" \
  --prefix "<article-slug>"
```

可恢复规则：

- 默认跳过已经存在的输出文件。
- `--force` 强制重生所有 item。
- `--regenerate 3,5,7` 只重生指定 id 或序号。
- `--dry-run` 或 `--validate-manifest` 只检查 manifest、输出路径和覆盖风险，不调用 API。
- 结果写入 `<manifest>.results.json`，也可用 `--result-manifest <path>` 指定。

结果 manifest 会记录每张图的 `id`、`topic`、`prompt`、`output`、是否 `skipped`、是否 `dry_run`、是否 `ok`、失败原因和文件大小。批量模式中单张失败不会直接终止整批；失败项会写入结果 manifest，后续可用 `--regenerate <id>` 补生成。

## CLI 输出

成功时输出 JSON：

```json
{
  "ok": true,
  "mode": "official",
  "endpoint": "https://api.openai.com/v1/responses",
  "model": "gpt-5.5",
  "output": "C:\\...\\01-topic.png",
  "bytes": 123456,
  "format": "png",
  "size": "1536x1024",
  "quality": "high",
  "source": "image_generation_call.result",
  "revised_prompt": null
}
```

交付给用户时必须包含：保存路径、用途、访问模式、文件大小；如果 `revised_prompt` 非空，也要简短说明模型修订过提示词。

## 失败处理

| 触发条件 | 一线修复 | 仍失败兜底 |
|---|---|---|
| 缺少 API key | 让用户配置 `OPENAI_API_KEY` 或 `GPT_IMAGE_API_KEY` | 只输出最终提示词和待运行命令 |
| proxy URL 错误 | 检查 `GPT_IMAGE_BASE_URL`，CLI 会按 `--api` 自动补 `/v1/responses` 或 `/v1/images/*` | 切换 official 模式 |
| endpoint 没有 base64 图片 | 如果是第三方旧接口，改用 `--api-mode images` | 换 official 模式或要求代理方开启对应协议 |
| 文件签名不匹配 | 检查 `--output-format` 是否和端点输出一致 | 改用 `--output-format png` 重试 |
| 参考图不存在 | 改成绝对路径或先复制到 workspace | 退回纯文本生图 |
| 输出文件已存在 | 换新文件名或下一个序号 | 用户明确要求替换时加 `--force` |
| manifest 有失败项 | 修正失败项 prompt、路径或 endpoint | 用 `--regenerate <id>` 补生成 |
| 中文标注错字严重 | 减少提示词里的中文标注数量后重生成 | 用局部编辑提示词移除错误文字 |

## 安全边界

- 不把 API key 写进 SKILL.md、reference、脚本或交付结果。
- 不打印完整带 query 的 endpoint，不打印任何密钥。
- 不覆盖已有输出文件，除非用户明确要求替换；文件存在时先换序号命名或加 `--force`。
