# 通用生图运行协议

本 reference 给 OpenClaw、Hermes 和其他没有原生生图工具的 Agent Skills runtime 使用。不要依赖某个 runtime 专属图片工具；只有在用户明确要求真实生成图片、环境具备可用 API key/endpoint、能上传星禾人物基准图、且输出路径安全时，才调用本 skill 内置的 Node CLI。

## 通用 image_gen 禁止绕过

只接受文字 prompt 的通用 `image_gen`、网页生图按钮、纯文本图片生成 API，不能作为星禾人物图的真实生成链路。文字里描述“星禾、黑发、白外套、水手领、学习风格”不能替代 `assets/examples/00-xinghe-ip-baseline.png`。

含星禾人物、手部、半身或侧影的任务，如果当前链路不能上传本地参考图，必须停止在 prompt-only、manifest、inspect 命令建议或阻塞说明。不要为了快速给用户图片而改用通用生图；那会变成泛化二次元知识插图，不是稳定星禾 IP 图。只有明确 `no-character` 的技术架构图、流程图、全景信息图或结构图，才可以在无人物模式下继续真实生成。

## 人物基准图硬门槛

含星禾人物、手部、半身或侧影的真实生成必须上传 `assets/examples/00-xinghe-ip-baseline.png`。优先通过 `--style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-match>.png"` 同时传入人物基准图和场景/封面参考图。明确 `no-character` 的技术架构图或流程图可以不上传人物基准图，但不要声称生成了人物一致的星禾图。

- 正文配图：第二张参考图从 `assets/examples/01-14-*.png` 中选。
- 微信公众号封面、小红书笔记封面、文章头图：第二张参考图从 `assets/examples/15-20-*.png` 中选。
- 含人物任务没有人物基准图、路径不存在、endpoint 不支持图片输入、命令没有图片参考参数、或当前只剩通用 `image_gen` 时，不要调用真实生图，只输出 prompt/命令建议和阻塞原因。

## 最小前置

- Node.js 18+，不需要安装 npm 包。
- official 模式需要 `OPENAI_API_KEY`。
- proxy 模式需要 `GPT_IMAGE_BASE_URL`，并需要 `GPT_IMAGE_API_KEY` 或可复用的 `OPENAI_API_KEY`。
- Responses 模型来自 `XINGHE_TEXT_MODEL`，未设置时 CLI 使用默认文本模型。
- Images API 模型来自 `GPT_IMAGE_MODEL` 或 `XINGHE_IMAGE_MODEL`，未设置时 CLI 使用 `gpt-image-2`。

## 推荐验证顺序

1. `node --check scripts/xinghe_image_assets_cli.js`：只检查脚本语法。
2. `inspect`：检查环境变量、endpoint 解析、参考图路径和输出覆盖风险，不请求 API。
3. `probe`：检查第三方中转站兼容性。
4. `generate`：确认前置条件后才真实请求图片服务。

真实生图测试属于集成测试，会消耗第三方服务额度并依赖外部 API 稳定性。除非用户明确要求验证完整生成链路，否则不要把它作为常规测试。

## 什么时候不做真实生图

以下情况只做提示词、manifest、静态检查、`inspect` 或 dry-run，不请求第三方图像服务：

- 用户要求策略、shot list、prompt-only、评估或优化 skill。
- 用户明确说不要 CLI 生图、不要真实生成或不要消耗第三方额度。
- API key、proxy endpoint 或图片接口能力尚未确认。
- 当前 official/proxy 链路不能上传 `assets/examples/00-xinghe-ip-baseline.png`。
- 当前环境只提供通用 `image_gen`、纯文本图片生成或不能传参考图的工具，但任务要求出现星禾人物。
- 只是验证脚本语法、manifest 格式、路径覆盖风险或文档一致性。
- 输出路径已有文件且用户没有明确允许覆盖。

## 调用步骤

1. 先按 `references/prompt-template.md` 生成完整英文生图提示词。
2. 确认提示词包含星禾视觉 DNA：冷白/浅蓝灰背景、蜡笔线稿、有结构的呼吸感留白、少量橙色重点和红蓝批注、星禾执行核心动作。
3. 按任务类型选择第二张参考图：正文配图选 `01-14`，封面选 `15-20`。
4. 确认用户要真实图片文件，且 API key/endpoint 可用。
5. 先运行 `inspect`，确认 endpoint、参考图和输出路径无风险。
6. 再运行 `generate`。

### official 示例

零成本检查：

```bash
node scripts/xinghe_image_assets_cli.js inspect \
  --mode official \
  --api-mode responses \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/01-topic.png"
```

真实生成正文配图：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --api-mode responses \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/01-topic.png" \
  --output-format png \
  --size 1536x1024 \
  --quality high
```

如果 official 链路不能上传参考图，停在 prompt-only 或命令建议，不要绕过人物基准图硬门槛。

### proxy 示例

第三方中转站先做兼容性探测：

```bash
node scripts/xinghe_image_assets_cli.js probe \
  --mode proxy \
  --api-mode auto \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --model gpt-image-2
```

如果第三方 API 文档支持 Images edits 且允许上传参考图，可以使用 Images API。真实星禾图必须带 `--style-references`，此时 CLI 会使用 multipart 请求：

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

proxy 生成小红书封面：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/18-xhs-typed-title-bottom-xinghe.png" \
  --prompt "<final xhs cover prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/xhs-cover.png" \
  --size 1024x1536 \
  --quality high \
  --background opaque \
  --output-format png
```

proxy 生成微信公众号封面：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/15-wechat-left-title-right-action.png" \
  --prompt "<final wechat cover prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/wechat-cover.png" \
  --size 2048x1152 \
  --quality high \
  --background opaque \
  --output-format png
```

需要编辑用户提供的图片时，用 `--image "path/to/user-image.png"`，并仍然通过 `--style-references` 传入星禾人物基准图和构图参考图。Images API 会自动使用 `/v1/images/edits` multipart。

## dry-run 与 inspect

验证命令不调用 API：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/01-topic.png" \
  --dry-run
```

零成本集成检查命令也不调用 API。它会检查环境变量是否存在、endpoint 会如何解析、是否因参考图走 Images edit multipart、参考图是否存在、输出文件是否会覆盖：

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

## 批量 manifest

当用户要一次生成多张图，先保存 manifest：

```json
{
  "article": "文章名称",
  "platform": "article-16x9",
  "style_references": [
    "assets/examples/00-xinghe-ip-baseline.png",
    "assets/examples/05-handoff-path.png"
  ],
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

每个 `pictures[]` item 对应一张独立图片。必填：`id`、`topic`、`prompt`。可选：`filename`、`output`、`image`、`style_reference`、`style_references`、`reference_images`、`size`、`quality`、`output_format`。

也可以直接使用 prompt-only 交付包里的 `items[].candidates[]`。CLI 会把每个候选方向展开为独立生成项，并优先使用候选里的 `output_filename_when_generated` 和 `reference_images`：

```json
{
  "default_output_dir": "outputs/xinghe-illustration-packs/<date-slug>",
  "items": [
    {
      "id": "01",
      "topic": "系统全景图",
      "candidates": [
        {
          "id": "A",
          "direction": "中央核心循环型",
          "output_filename_when_generated": "panorama-system-a.png",
          "size": "1536x1024",
          "reference_images": [
            "assets/examples/21-panorama-core-loop.png"
          ],
          "prompt": "完整全景信息图 prompt"
        }
      ]
    }
  ]
}
```

运行：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --api-mode responses \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --manifest "outputs/xinghe-illustration-packs/<date-slug>/manifest.json" \
  --output-dir "outputs/xinghe-illustration-packs/<date-slug>/images" \
  --prefix "<article-slug>"
```

可恢复规则：

- 默认跳过已经存在的输出文件。
- `--force` 强制重生所有 item。
- `--regenerate 3,5,7` 只重生指定 id 或序号。
- `--dry-run` 或 `--validate-manifest` 只检查 manifest、输出路径和覆盖风险，不调用 API。
- 结果写入 `<manifest>.results.json`，也可用 `--result-manifest <path>` 指定。
- 未传 `--output-dir` 时，CLI 会依次使用 manifest 顶层 `output_dir`、`default_output_dir/images`，最后退回 manifest 同级 `images/`。
- 顶层 `reference_images` 或 `style_references` 可作为默认参考图；单个候选里的参考图优先级更高。

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
| proxy URL 错误 | 检查 `GPT_IMAGE_BASE_URL`，CLI 会按 `--api-mode` 自动补 `/v1/responses` 或 `/v1/images/*` | 切换 official 模式 |
| endpoint 没有 base64 图片 | 如果是第三方旧接口，改用 `--api-mode images` | 换 official 模式或要求代理方开启对应协议 |
| endpoint 不能上传参考图 | 换支持 `/v1/images/edits` 或等价图片输入的 provider | prompt-only，不声称已生成合格星禾图 |
| 文件签名不匹配 | 检查 `--output-format` 是否和端点输出一致 | 改用 `--output-format png` 重试 |
| 参考图不存在 | 改成绝对路径或先复制到 workspace | 不做真实星禾图 |
| 输出文件已存在 | 换新文件名或下一个序号 | 用户明确要求替换时加 `--force` |
| manifest 有失败项 | 修正失败项 prompt、路径或 endpoint | 用 `--regenerate <id>` 补生成 |
| 中文标注错字严重 | 减少提示词里的中文标注数量后重生成 | 用局部编辑提示词移除错误文字 |

## 安全边界

- 不把 API key 写进 SKILL.md、reference、脚本或交付结果。
- 不打印完整带 query 的 endpoint，不打印任何密钥。
- 不覆盖已有输出文件，除非用户明确要求替换；文件存在时先换序号命名或加 `--force`。
- 不用纯文本图片生成链路、通用 `image_gen` 或不能上传参考图的工具冒充稳定星禾 IP 出图。
