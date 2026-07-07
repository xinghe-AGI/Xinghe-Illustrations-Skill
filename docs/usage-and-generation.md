# 使用与生图配置指南

这份文档承接 README 中不适合展开的使用细节：如何提需求、如何生成候选方向、如何配置官方 OpenAI 或第三方中转站、如何验证参数，以及如何真实生成图片。

## 1. 推荐使用顺序

默认先让 skill 做视觉判断，不要一上来直接生图：

1. 贴文章、主题、标题或本地文件路径。
2. 让 skill 先输出视觉路由、推荐图型和候选方向。
3. 人工确认要生成哪一个候选。
4. 再生成 prompt、manifest 或 PNG 图片。
5. 出图后检查人物一致性、文字可读性和信息密度。

## 2. 最常用请求模板

### 只做视觉方案

```text
Use $xinghe-illustrations-skill 先不要生图。
请读完下面这篇文章，自主判断应该生成哪些类型的图。
输出：推荐图型、推荐数量、A/B 候选方向、建议比例、人物呈现方式和适用原因。

<粘贴文章>
```

### 做文章配图候选

```text
Use $xinghe-illustrations-skill 先不要生图。
请分析这篇文章哪里值得配图，输出 3-7 个配图选点。
每个选点给 A/B 候选方向，重点图可以给 A/B/C。

<粘贴文章>
```

### 做公众号封面

```text
Use $xinghe-illustrations-skill 先不要生图。
请为这篇文章做微信公众号封面候选，给 3 个方向：
标题强表达、人物动作强表达、留白品牌感强表达。

标题：<文章标题>
摘要：<文章摘要>
```

### 做小红书封面

```text
Use $xinghe-illustrations-skill 先不要生图。
请为小红书首图做 3 个封面候选。
要求包含大字标题、关键词强调、星禾动作、建议比例和参考图方向。

标题：<小红书标题>
```

### 做知识卡片组

```text
Use $xinghe-illustrations-skill 先不要生图。
请把下面这篇文章拆成知识卡片组。
先判断应该横版还是竖版，不要默认全部做竖图。
输出每张卡的标题、信息目标、布局、比例、人物呈现方式和卡面文字。

<粘贴文章>
```

### 做技术架构图 / 流程图

```text
Use $xinghe-illustrations-skill 先不要生图。
请把下面这段说明设计成技术架构图或流程图。
人物可以小一点、局部出现，或者不出现，优先保证结构清楚。

<粘贴技术说明>
```

### 做高密度全景信息图

```text
Use $xinghe-illustrations-skill 先不要生图。
请把下面这篇文章做成一张高密度全景信息图。
先判断适合核心循环、分层架构、前后对照还是路线图结构。
人物可以很小、局部出现，或者不出现，优先保证分区、阅读路径和信息密度。

<粘贴文章或说明>
```

### 确认候选后生成图片

```text
Use $xinghe-illustrations-skill 生成刚才候选 A。
我已确认可以调用外部图片生成服务。
请先 inspect 检查参数和输出路径，再生成 PNG。
```

## 3. 视觉形态怎么选

| 形态 | 适合场景 | 常用比例 |
|---|---|---|
| 公众号封面 | 横版头图、文章入口图 | `2.35:1` |
| 小红书封面 | 首图、大字标题、收藏型封面 | `3:4` |
| 情绪图 | 痛点、卡点、压力、转折、误区真相 | `3:4` / `4:3` |
| 解释图 | 概念、机制、因果、轻流程 | `4:3` / `16:9` |
| 技术架构图 | 组件、模块、数据流、服务边界 | `4:3` / `16:9` |
| 流程图 | SOP、自动化链路、审批流、状态流 | `4:3` / `16:9` |
| 知识卡片组 | 长文总结、文章笔记、方法论拆解 | 按内容选 `4:3`、`16:9` 或 `3:4` |
| 信息图海报 | 全局地图、矩阵、路径总览 | `3:4` / `16:9` |
| 全景信息图 | 系统地图、方法全貌、能力总览、交付路径、架构总览 | `16:9` / `4:3` |
| 多格漫画 | 前后变化、转折、因果推进、情绪变化 | `3:4` / `4:3` |

判断原则：

- 小红书、手机轮播、微信竖向图文：优先竖版。
- 方法论总结、流程、对比、结构卡：优先横版。
- 技术架构图和流程图：人物不必占主体，结构先读清楚。
- 信息太多时拆成卡片组，不把全文硬塞进一张图。

## 4. 生图配置

真实生图需要配置图片服务。只做策略、候选方向和 prompt 时不需要配置 API key。

安装后的完整配置向导见 [setup-wizard.md](setup-wizard.md)。下面保留常用配置摘要和命令示例。

不要把真实密钥写进仓库、README、SKILL.md、references 或命令记录里。推荐放在系统用户环境变量、Agent runtime 的私有 secrets，或本机不会提交的私有 env 文件里。

### 安装后的配置引导

安装 skill 后，先按下面的顺序完成配置：

1. **选调用方式**：如果你有官方 OpenAI key，选择官方 OpenAI；如果你使用兼容 OpenAI 图片接口的企业网关、代理或中转站，选择第三方中转站。
2. **配置 URL 和 API key**：官方模式只需要 `OPENAI_API_KEY`；中转站模式需要 `GPT_IMAGE_BASE_URL` 和 `GPT_IMAGE_API_KEY`，并配置模型和 API 模式。
3. **重启运行环境**：环境变量变更后，重启 Codex、Agent runtime、终端或新开会话。
4. **先检查再生成**：先运行 `inspect` 或 `probe`，确认 endpoint、模型、鉴权和参考图上传能力正常，再运行真实生成。
5. **确认参考图能力**：含星禾人物的图片必须能上传 `assets/examples/00-xinghe-ip-baseline.png`；如果服务不支持图片参考输入，只能做 prompt-only 或无人物结构图。

配置位置建议：

| 使用环境 | 推荐配置位置 | 生效方式 |
|---|---|---|
| Windows / Codex / 通用 Agent | 系统用户环境变量，或 Agent 启动器私有 env/secrets | 重启 Codex、Agent 或开启新会话 |
| macOS / Linux | shell profile、系统用户环境变量，或 Agent 私有 secrets | 重启 shell、Agent 或开启新会话 |
| OpenClaw / Hermes / 其他 runtime | 对应 runtime 的私有 `.env`、secrets 或环境变量注入 | 按对应 runtime 文档刷新 |

不要把密钥配置在：

- README、SKILL.md、references 或 scripts
- 会提交到 GitHub 的 `.env`
- 公开文档、飞书文档、截图或最终交付内容
- 终端历史里会被同步或公开的长命令

### 官方 OpenAI

最少需要：

```text
OPENAI_API_KEY=<your-openai-api-key>
```

官方模式默认走 OpenAI Responses API；如果使用 Images edits，也必须能上传参考图。

### 第三方中转站

最少需要：

```text
GPT_IMAGE_BASE_URL=https://your-gateway.example.com
GPT_IMAGE_API_KEY=<your-proxy-api-key>
GPT_IMAGE_API_MODE=images
GPT_IMAGE_MODEL=gpt-image-2
```

可选：

```text
GPT_IMAGE_PROVIDER=<optional-provider-name>
GPT_IMAGE_PERMISSION_CODE=<optional-permission-code>
```

第三方中转站的 URL、模型名、鉴权方式和是否支持参考图上传，以你使用的平台文档为准。配置后先做兼容性探测，不要直接生成。

中转站 URL 填写建议：

- 如果平台给的是根地址，例如 `https://gateway.example.com`，填入 `GPT_IMAGE_BASE_URL` 后 CLI 会按模式自动拼接接口路径。
- 如果平台给的是 `/v1` 结尾地址，也可以直接填写，CLI 会继续拼接 Responses 或 Images edits endpoint。
- 如果平台明确给了 Images edits endpoint，可以直接填写该 endpoint，并使用 `GPT_IMAGE_API_MODE=images`。
- 如果平台只支持纯文本生图、不能上传参考图，不适合生成含星禾人物的图片。

## 5. 参考图要求

画面含星禾人物、手部、半身或侧影时，真实生图必须上传人物基准图：

```text
assets/examples/00-xinghe-ip-baseline.png
```

同时建议再搭配一张构图参考图：

- 正文图、解释图、知识卡片、流程图、技术架构图：从 `assets/examples/01-14-*.png` 选择。
- 公众号封面、小红书封面：从 `assets/examples/15-20-*.png` 选择。
- 高密度全景信息图：从 `assets/examples/21-24-*.png` 选择。

如果当前图片服务不能上传人物基准图，就不要生成含人物的星禾图。明确 `no-character` 的技术架构图、流程图、高密度知识卡或全景信息图可以不出现人物。

## 6. CLI 验证与生成

进入 skill 目录后先检查脚本：

```bash
node --check scripts/xinghe_image_assets_cli.js
```

只检查参数和输出路径，不请求 API：

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

第三方中转站改用：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model "$GPT_IMAGE_MODEL" \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/18-xhs-typed-title-bottom-xinghe.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/xhs-cover.png" \
  --size 1024x1536 \
  --quality high \
  --output-format png
```

## 7. 继续阅读

- 完整示例图集：[visual-gallery.md](examples/visual-gallery.md)
- 样例 dry-run：[sample-task-packs.md](examples/sample-task-packs.md)
- 批量 manifest 示例：[manifest-batch-sample.json](examples/manifest-batch-sample.json)
- 访问模式细节：[access-modes.md](../references/access-modes.md)
- 输出包规范：[output-spec.md](../references/output-spec.md)
- 生成后检查：[qa-checklist.md](../references/qa-checklist.md)
