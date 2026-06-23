---
name: xinghe-illustrations-skill
description: 生成“星禾”个人 IP 风格的中文配图、微信公众号文章封面、小红书笔记封面、文章头图和社媒首图，适合所有支持本地 skills、Node CLI 或外部工具调用的 Agent / AI 工作流环境。用于社媒内容、账号运营、AI 自动化、工作流 SOP、内容日历、选题生产、发布复盘、私域承接、个人品牌、产品策略、方法论、研究笔记和观点表达；可输出配图策略、shot list、单张生图提示词、改图提示，并在 API key/endpoint 可用且用户授权外部上传风险时，通过内置 Node CLI 调用官方 OpenAI 或第三方兼容 Images API 生成 PNG。真实生图必须通过 `--style-references` 传入 `assets/examples/00-xinghe-ip-baseline.png` 人物基准图；如果当前接口不能上传人物基准图，不得只靠文字 prompt 声称生成合格星禾图；调用 official/proxy/API 前必须确认用户确实授权真实生图及外部数据上传风险；遇到“公众号封面”“微信文章头图”“小红书封面”“笔记首图”“生成封面图”“生成正文配图”等请求时使用。
---

# 星禾内容配图

## 核心定位

为中文文章、社媒内容和运营自动化文档设计 16:9 横版正文配图，也为微信公众号文章和小红书笔记生成平台化封面。目标不是商业插画、PPT 信息图、课程课件或可爱头像，而是把灵感、内容生产、运营流程、复盘闭环和关键判断，变成一张清爽、轻盈、有个人记忆点、可读但不说明书的蜡笔手绘解释图。封面可以有清晰标题，但仍要保持星禾 IP、白底蜡笔、留白和动作绑定。

默认视觉 IP 是“星禾”：黑色长发或微卷长发、轻薄空气刘海、圆润大眼睛、浅笑；固定服饰为白色宽松拉链连帽外套，内搭深蓝水手领上衣和白色领结，下身为深蓝百褶裙。星禾是元气创造者 + 运营小导师，带一点清醒研究员气质。她必须参与画面的核心动作，且动作必须根据当前图片内容改变，例如搬起卡住的素材箱、接住掉落内容、亲手铺证据卡、拉起复盘回流线、整理内容卡片、排内容日历、称量证据、圈出关键节点。透明小玻璃灵感瓶只在“灵感捕捉/创意启动”场景默认出现，不能把所有图都画成举瓶姿势。

## 先读这些参考

按任务需要读取，不要一次塞满上下文：

- `references/style-dna.md`：风格 DNA、颜色、文字、禁忌。
- `references/xinghe-ip.md`：星禾 IP 的形象、性格、动作库和禁忌。
- `references/illustration-selection.md`：智能选点、图型分类、数量建议、prompt-only 模式。
- `references/visual-routing-and-candidates.md`：视觉路由、多候选方向、diagram fallback；在策略、封面或配图生成前读取。
- `references/visual-learning-log.md`：人工确认好图后的经验沉淀；只在用户反馈“这张好 / 采用 / 效果好”或要求优化规则时读取。
- `references/composition-patterns.md`：构图模式。
- `references/prompt-template.md`：单张生图和改图提示词模板。
- `references/platform-cover-standards.md`：公众号封面、小红书封面、文章头图和正文配图的差异标准；只在用户要求封面/首图/平台适配时读取。
- `references/cover-text-rules.md`：封面标题、关键词强调、中文可读性和文字密度规则；只在封面含标题时读取。
- `references/cover-composition-patterns.md`：公众号横版封面、小红书竖版封面和大字标题卡片构图；只在封面任务读取。
- `references/cover-qa-checklist.md`：封面生成后的验收和迭代清单；只在封面任务读取。
- `references/prompt-template-images-api.md`：旧版 Images API 的精简提示词模板。
- `references/qa-checklist.md`：生成后检查和迭代规则。
- `references/image-generation-runtime.md`：Node CLI 调用协议、输出 JSON、失败处理。
- `references/access-modes.md`：official/proxy、环境变量和安全边界。
- `references/reference-images.md`：使用 `assets/examples/` 作为星禾 IP 风格锚点的规则。
- `assets/examples/`：只低频参考留白和批注密度，不要复刻旧参考图的人物形象、旧物件或旧构图。

## 统一使用边界

本 skill 统一面向所有支持本地 skills、Node CLI 或外部工具调用的 Agent / AI 工作流环境。真实出图统一通过本 skill 内置 Node CLI 调用官方 OpenAI 或第三方兼容图片接口完成；是否能生成合格星禾图，取决于接口能否上传 `assets/examples/00-xinghe-ip-baseline.png` 人物基准图和场景参考图。不要依赖某个 Agent 自带的纯文本生图能力来冒充参考图约束；如果当前接口不能上传参考图，默认交付 prompt-only、shot list 或候选方向。只有用户明确授权使用外部 CLI/API，并理解文章提示词、本地人物基准图和场景参考图可能被发送到官方 OpenAI 或第三方中转服务后，才可以调用本 skill 的 Node CLI。

## 安装后配置提醒

当用户刚安装、更新或第一次要求真实生图时，先引导用户阅读 README 的“安装与生图配置”以及 `references/access-modes.md`。必须区分两条链路：官方 OpenAI 模式配置 `OPENAI_API_KEY`；第三方中转站模式配置 `GPT_IMAGE_BASE_URL` 和 `GPT_IMAGE_API_KEY`，可选 `GPT_IMAGE_PROVIDER`、`GPT_IMAGE_PERMISSION_CODE`、`GPT_IMAGE_API_MODE`、`GPT_IMAGE_MODEL`。

不要把真实 API key、permission code 或 access token 写进 `SKILL.md`、`README.md`、`references/`、`scripts/`、`assets/` 或任何会提交到 GitHub 的文件；应写进本机运行环境的私有环境变量、系统用户环境变量、runtime secrets 或私有 env 文件。真实生成前先用 `inspect` 检查 endpoint、参考图和输出路径；如果 provider 不能上传 `assets/examples/00-xinghe-ip-baseline.png` 人物基准图，就只输出 prompt/命令建议，不声称已生成合格星禾图。

安全边界：official/proxy/API 真实生图通常会把文章衍生 prompt、用户素材、本地人物基准图和场景参考图发送到官方 OpenAI 或第三方中转服务。只要用户没有明确要求外部 API/CLI 真实生图，或尚未明确授权外部数据上传风险，就必须先暂停说明上传内容、目标服务类型和 prompt-only 替代方案，获得明确授权后再执行。

## 工作流

### 0. 确定风格锚点

真实生图前必须固定传入 `assets/examples/00-xinghe-ip-baseline.png` 作为星禾人物基准图，锁定人物脸、发型、服饰和气质；正文配图从 `assets/examples/01-14-*.png` 中选 1 张最接近当前构图/动作的场景参考图，公众号封面和小红书封面从 `assets/examples/15-20-*.png` 中选 1 张最接近标题区、人物区和安全边距的封面参考图。真实调用 CLI 必须使用 `--style-references` 同时传入人物基准图和场景/封面参考图，例如 `assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png`。封面任务不要把正文配图构图硬套到封面上。如果命令、manifest 或 endpoint 不能上传人物基准图，就不要真实生成星禾图；只输出 prompt/命令建议并说明未满足人物基准图硬门槛。不得只传场景图、不得只靠文字描述、不得用单张非基准图作为风格参考。如果第三方代理使用旧版 Images API，同时改用 `references/prompt-template-images-api.md` 的精简 prompt。

### 1. 消化正文并智能选点

先读用户给的正文、链接、Markdown、截图或主题，提炼：核心观点、读者要完成的动作、最容易卡住的步骤、适合物理化的隐喻、哪些内容只适合文字。如果用户要封面，额外提炼：平台、封面主标题、标题关键词、封面卖点、星禾用什么动作承托这个标题判断。

不要平均配图。读取 `references/illustration-selection.md`，用选点信号判断哪里最值得画：抽象概念首次出现、流程步骤、比较取舍、证据反馈、段落转场、情绪或故事高潮。优先选择“内容锚点”，例如灵感进入生产、选题变成内容、AI 自动化接住重复工作、发布复盘回流、关键判断、方法分层、复杂信息被拆清楚的一刻。

为每张候选图标记图型：`concept`、`process`、`comparison`、`data`、`scene`、`metaphor`、`handoff` 或 `review-loop`。图型只用于构思和 QA，不写进画面。

### 2. 视觉路由与多候选方向

读取 `references/visual-routing-and-candidates.md`，先判断视觉路由：正文星禾 IP 图、平台封面、结构图降级或 prompt-only。复杂系统架构、节点关系、泳道流程、数据管线和必须精确表达的结构图，不要强行套星禾 IP；改为建议 diagram fallback、prompt-only，或拆成多个星禾动作瞬间。

用户只要策略、shot list 或 prompt-only 时，输出候选方向，不调用 CLI。正文配图默认每个选点给 2 个候选方向，重点图可给 3 个，快速任务或用户明确要省成本时给 1 个。封面默认给 3 个候选方向：标题强表达、人物动作强表达、留白/品牌感强表达。

每个候选方向必须写清：核心隐喻、星禾动作、构图、中文标注、参考图和适用原因。用户要求真实生成且已有多个候选时，先确认生成哪一个候选；如果用户明确要多个候选，按 `01-topic-a.png`、`01-topic-b.png`、`cover-a.png` 等独立文件命名，不覆盖旧图。

### 3. 先出配图策略

如果用户要求“分析怎么配图 / 出配图方案 / shot list”，先给 3-7 个配图选点。每个选点写清：放在哪段后、选点信号、图型、图的主题、核心意思、结构类型，并按当前路由给出 1-3 个候选方向。每个候选方向写清星禾在图里做什么、建议元素、建议中文标注词和推荐参考图。短文 1-3 个选点；长文也不要轻易超过 9 个选点。

### 4. 生成最终提示词

如果用户明确要求“只给提示词 / prompt-only / 不生成图片”，只输出 shot list 和每张完整 prompt，不调用 CLI。

如果用户要求公众号封面、小红书封面、文章头图或笔记首图，先读取 `platform-cover-standards.md`、`cover-text-rules.md`、`cover-composition-patterns.md`，再使用 `prompt-template.md` 中对应平台的封面模板。公众号封面默认 `2.35:1`，小红书封面默认 `3:4`；同时要生成两种平台时，分别出两张图，不要一图多用。

如果用户明确要求“生成 / 输出 / 做图 / 帮我生成”，先判断是否需要真实调用图像服务：只有用户确实要得到图片文件、没有禁止 CLI/真实生图、已授权外部数据上传风险、目标环境已经配置可用 API key 和 endpoint、输出路径不会覆盖已有文件、且本次 CLI 调用能够通过 `--style-references` 上传 `assets/examples/00-xinghe-ip-baseline.png` 人物基准图时，才调用 CLI。若存在多个候选方向，先让用户确认生成哪一个；若用户明确要求多候选真实生成，逐个候选生成独立文件。否则输出完整提示词、建议命令和缺少的前置条件，不要假装已经生成。

正文配图提示词必须包含：16:9 横版中文正文配图、纯白背景、蜡笔线稿、大量留白、少量红橙蓝中文手写批注、星禾作为核心动作主体、星禾固定识别点、与当前主题绑定的动作姿态、1-2 个合适物件、只出现一个星禾人物、禁止头像气泡/重复人物/PPT/商业插画/幼稚可爱/复杂架构/左上角类型标题。

封面提示词必须包含：目标平台和宽高比、精确标题文本、标题行数和安全区、关键词强调方式、星禾固定识别点、星禾承托标题判断的动作、白底蜡笔风、少量物件、禁止营销海报/PPT/课程封面/复杂背景/多人物/二维码/联系方式。生成中文标题时明确要求 render the Chinese title text exactly as provided。

写提示词前先回答：这张图里星禾正在亲手解决什么问题？如果答案只是“举着瓶子 / 站在旁边 / 看着流程”，必须重写动作。

不要复刻过往案例。每次都从当前内容重新发明一个亲切、轻盈、能把想法或流程讲清楚的视觉隐喻。

平台尺寸预设：正文配图默认 `16:9` 和 `1536x1024`；公众号封面用 `2.35:1`；小红书封面用 `3:4`；方图用 `1:1`。除非用户要求封面或平台适配，否则保持正文配图默认横版。

### 5. 真实生图

真实需要生成图片且环境可用、并且用户已经授权外部数据上传风险时，使用内置 CLI 调用官方 OpenAI 或第三方兼容图片接口。所有真实生成命令必须传入人物基准图。先选择 1 张场景参考图，并在 skill 目录运行：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-scene-reference>.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic-name.png" \
  --output-format png \
  --size 1536x1024 \
  --quality high
```

批量或可恢复生成时，使用 manifest：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-scene-reference>.png" \
  --manifest "assets/<article-slug>-illustrations/manifest.json" \
  --output-dir "assets/<article-slug>-illustrations" \
  --prefix "<article-slug>"
```

manifest 中每张图必须包含 `id`、`topic`、`prompt`，可选 `filename`、`image`、`size`、`quality`、`output_format`。默认跳过已存在文件；用 `--force` 强制全部重生；用 `--regenerate 3,5,7` 只重生指定 id。

测试、评估、代码改动验证或批量生成前，优先使用静态检查、manifest 校验或 dry-run。dry-run 只验证参数、输出路径和覆盖风险，不调用第三方图像 API：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --manifest "assets/<article-slug>-illustrations/manifest.json" \
  --output-dir "assets/<article-slug>-illustrations" \
  --dry-run
```

零成本集成检查可用 `inspect`，它不会请求 API，只输出 endpoint 解析、是否会走 `/v1/images/edits`、参考图是否存在、目标文件是否会覆盖、环境变量是否已配置：

```bash
node scripts/xinghe_image_assets_cli.js inspect \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic-name.png"
```

proxy 模式：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode auto \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-scene-reference>.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic-name.png"
```

第三方文档只提供 `/v1/images/generations` 或 `/v1/images/edits` 时，改用：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-scene-reference>.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic-name.png"
```

为了稳定星禾 IP 形象，真实生图时必须传入人物基准图，并从 `assets/examples/` 选 1 张最接近当前构图的场景参考图，通过 `--style-references` 一起传给 CLI：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/01-two-breakpoints.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic-name.png"
```

多张风格锚点可用 `--style-references "path/a.png,path/b.png"`，不要超过 15 张；旧参数 `--reference` / `--references` 继续兼容。需要编辑用户提供的图片时用 `--image "path/to/user-image.png"`；Images API 会自动使用 `/v1/images/edits` multipart。环境变量见 `references/access-modes.md`。

### 6. 检查与迭代

生成后检查 `references/qa-checklist.md`。如果是公众号封面、小红书封面或文章头图，改用 `references/cover-qa-checklist.md`。如果星禾只是装饰、画面太满、太像流程图/PPT、中文太多或错字严重、左上角出现类型标题、画风太幼稚/商业/课件、背景不是干净白底，优先重生成或局部编辑。
如果用户反馈“这张好 / 采用 / 效果好 / 以后沿用”，读取 `references/visual-learning-log.md`，按固定字段生成一条学习日志建议；只有用户明确要求写入时才修改学习日志。不要把一次生成结果自动升级成长期规则，至少需要人工确认和多次复现。

### 7. 保存交付

如果用户在 workspace 内工作，把最终图保存到：

```text
assets/<article-slug>-illustrations/
```

按顺序命名：

```text
01-topic-name.png
02-topic-name.png
```

保留原始生成文件，不覆盖已有资产，除非用户明确要求替换。交付要包含：生成了几张、每张图的用途、保存路径、访问模式、文件大小、模型是否修订提示词。不要长篇解释风格理论。

## 失败处理

| 触发条件 | 一线修复 | 仍失败兜底 |
|---|---|---|
| 缺少 API key | 配置 `OPENAI_API_KEY` 或 `GPT_IMAGE_API_KEY` | 输出提示词和命令，不声称已生成 |
| proxy 不兼容 Responses | 改用 `--api-mode images` 或设置 `GPT_IMAGE_API_MODE=images` | 切换 official 模式或更换 endpoint |
| CLI 没有返回图片 | 检查 endpoint、模型和工具支持 | 只交付提示词与失败原因 |
| 图像签名校验失败 | 改用 `--output-format png` 重试 | 不交付坏文件 |
| 星禾 IP 形象不一致 | 同时传入 `--style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-match>.png"` 重生成 | 减少提示词冲突，并换 1 张更接近构图的场景参考图 |
| 输出文件已存在 | 换新文件名或下一个序号 | 只有用户明确说替换才加 `--force` |
| 批量生成中断 | 重新运行同一 manifest，已存在图片会跳过 | 用 `--regenerate` 指定补生成失败项 |
| 图像不符合 QA | 减少元素和中文标注后重生成 | 用局部编辑提示词修正 |

## 🔴 CHECKPOINT · 🛑 STOP

遇到以下情况必须暂停确认：

- 用户只要策略、shot list 或 prompt-only，不要调用 CLI。
- 用户在评估、优化、测试或审查 skill，不要把真实生图当作默认测试；优先用静态检查、提示词评审、manifest 校验或 dry-run。
- 目标输出文件已经存在；除非用户明确说“替换/覆盖”，否则换新文件名。
- 缺少 API key、proxy endpoint，endpoint 同时不支持 Responses/Images API，当前 endpoint/命令无法上传 `assets/examples/00-xinghe-ip-baseline.png` 人物基准图，或用户尚未明确授权外部数据上传风险。
- 用户要求封面、平台适配或非默认尺寸，但没有说明平台，先确认是公众号封面、小红书封面还是正文配图。
- 用户要求违反反例黑名单的画面。

## 反例黑名单

不要做：

- 不把多张图拼在一张里。
- 不把星禾画成旁边站着的装饰人物。
- 不生成多个星禾、头像气泡或右下角 inset portrait；默认一张图只出现一个星禾人物。
- 不做 PPT、课程页、正式流程图、科技 UI 或商业插画。
- 不复制 `assets/examples/` 的旧构图、旧物件或旧参考图人物形象。
- 不在左上角写“运营流程 / Workflow / 系统架构图 / 自动化 SOP / 研究框架 / 路线图”等类型标题。
- 不依赖某个 runtime 专属图片工具；需要真实参考图约束时统一通过 Node CLI/API，并在用户授权外部上传风险后使用。
- 不把 API key、permission code、access token 写入文件、命令示例或最终回复。
- 不在用户尚未授权外部上传风险时，静默切换到 CLI/proxy/API；必须先解释上传内容、目标服务类型和 prompt-only 替代方案，并获得明确授权。
