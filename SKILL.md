---
name: xinghe-illustrations-skill
description: 生成“星禾”个人 IP 风格的中文内容视觉资产：文章正文配图、微信公众号封面、小红书封面、情绪锚点图、解释图、多格漫画、知识卡片组、单张知识卡片和信息图海报。用于把公众号文章、Markdown、本地长文、方法论、项目复盘、工作流说明、教程、产品介绍或社媒内容，先做逐节配图判断和深度提炼，再输出视觉路由、候选方向、prompt-only、manifest，或在用户明确授权外部上传风险且 API/endpoint 可用时，通过内置 Node CLI 调用官方 OpenAI 或第三方兼容 Images API 生成 PNG。真实生图必须通过 `--style-references` 传入 `assets/examples/00-xinghe-ip-baseline.png` 人物基准图；如果当前接口不能上传人物基准图，不得只靠文字 prompt 声称生成合格星禾图。
---

# xinghe-illustrations-skill

## 核心定位

这是星禾统一内容生图 skill。它不再只负责 16:9 正文插图，而是负责把一篇中文内容路由成适合发布和阅读的视觉表达：正文配图、平台封面、情绪锚点图、解释图、多格漫画、知识卡片组、单张知识卡片和信息图海报。

第一任务是内容理解和信息设计：先判断哪些段落真的需要图，再决定用哪一种视觉形态。星禾 IP 是画面的记忆点，但不能只是站在旁边装饰；她必须通过整理、对比、接线、标注、解释、搬运、修补、指向或引导，亲手参与当前内容的核心动作。

默认视觉 IP 是“星禾”：黑色长发或微卷长发、轻薄空气刘海、圆润大眼睛、浅笑；固定服饰为白色宽松拉链连帽外套，内搭深蓝水手领上衣和白色领结，下身为深蓝百褶裙。星禾是元气创造者 + 运营小导师，带一点清醒研究员气质。真实生图必须使用 `assets/examples/00-xinghe-ip-baseline.png` 作为人物基准图。

## 先读这些参考

按任务渐进读取，不要一次塞满上下文：

- `references/cognitive-anchor-routing.md`：逐节配图判断、深度提炼、视觉路由和来源锁定；做文章配图、知识卡片或多格漫画前先读。
- `references/visual-formats.md`：情绪图、解释图、多格漫画、知识卡片、信息图海报的构图规则。
- `references/text-rendering-rules.md`：中文标题、术语、数字、代码、表格和错字处理规则。
- `references/visual-routing-and-candidates.md`：多候选数量、候选字段、真实生成前确认规则。
- `references/illustration-selection.md`：正文配图选点、图型分类和候选输出。
- `references/composition-patterns.md`：星禾正文配图的低科技构图母题。
- `references/platform-cover-standards.md`、`references/cover-text-rules.md`、`references/cover-composition-patterns.md`、`references/cover-qa-checklist.md`：公众号封面、小红书封面和文章头图任务读取。
- `references/prompt-template.md`：正文图、封面、知识卡片、解释图、多格漫画、信息图海报的提示词模板。
- `references/output-spec.md`：默认输出目录、交付包字段和 manifest 规范。
- `references/qa-checklist.md`：生成后检查和返工规则。
- `references/image-generation-runtime.md`、`references/access-modes.md`、`references/reference-images.md`：真实生图、API/CLI、参考图和安全边界。
- `references/visual-learning-log.md`：用户确认好图后才读取，用于生成学习日志建议。

## 统一使用边界

用户只要策略、候选方向、shot list、prompt-only、评审、测试或优化 skill 时，不调用 CLI。只有用户明确要真实图片文件、已授权外部数据上传风险、API key/endpoint 可用、输出路径不会覆盖旧文件、并且当前调用能通过 `--style-references` 上传人物基准图时，才调用 Node CLI。

真实生图会把文章衍生 prompt、本地人物基准图、场景/版式参考图和可能的用户素材发送到官方 OpenAI 或第三方中转服务。用户没有明确授权前，必须停在 prompt-only 或命令建议。

不要把真实 API key、permission code、access token 写进 `SKILL.md`、`README.md`、`references/`、`scripts/`、`assets/` 或任何会提交到 GitHub 的文件。

## 工作流

### 1. 读取来源并建立内容锚点

支持粘贴正文、Markdown、本地文本文件、截图、文章大纲或 URL。遇到微信公众号链接时，如可用，优先使用 `$wechat-content-ingestion` 抓取和清洗文章；读取失败时请用户粘贴正文，不绕过平台限制。

先输出或内部完成“逐节配图判断表”：

- 段落或小节名称
- 内容信号：观点、步骤、冲突、案例、数据、情绪、总结
- 非专业读者会卡住的地方
- 适合配图 / 不适合配图
- 推荐视觉路由
- 配图理由或不配理由

然后做深度提炼：

- 文体：观点、教程、复盘、产品介绍、方法论、故事或发布包
- 真意：这篇内容真正想让读者理解什么
- 张力：理想与现实、误区与真相、混乱与秩序、手工与自动化
- 灵魂句：最适合变成封面标题、卡片标题或图中短标注的句子
- 必须出现内容：原文里的关键术语、数字、步骤、案例和风险边界

### 2. 选择视觉路由

根据内容选择一个或多个路由：

- `platform-cover`：公众号封面、小红书封面、文章头图。
- `emotion-anchor`：用人物动作、表情和场景张力抓住情绪或矛盾。
- `explanatory-diagram`：解释抽象概念、机制、因果、步骤或轻量结构。
- `comic-strip`：2-4 格漫画，用于有因果、转折、累积或前后变化的内容。
- `knowledge-card-pack`：整篇文章拆成 5-9 张可阅读、可收藏的知识卡片。
- `knowledge-card-single`：单张总结卡、对比卡、流程卡、清单卡或观点卡。
- `infographic-poster`：整篇流程、矩阵或地图式总结；默认最多 1 张。
- `xinghe-article`：常规星禾正文配图。
- `prompt-only`：用户只要提示词，或当前环境不能满足真实生图门槛。

不再一刀切禁止流程、结构、漫画或知识卡片。判断标准改为：这张图是否能让读者更快理解。如果解释图、卡片组或多格漫画更清楚，就使用对应路由；如果内容需要精确技术拓扑、数据库依赖、权限流或超过 8 个强关系节点，才建议 diagram fallback、Mermaid/Excalidraw 或拆成多张图。

### 3. 设计候选方向

策略或 prompt-only 模式先给候选方向，不直接生图。

- 正文选点：默认每个选点 2 个候选方向；重点图可给 3 个；快速任务或用户明确省成本时给 1 个。
- 平台封面：默认 3 个方向，分别偏标题强表达、人物动作强表达、留白/品牌感强表达。
- 知识卡片组：先给卡片结构，再为关键卡给 2-3 个候选方向。
- 多格漫画：先判断是否真的需要多格；如果删掉任一格不影响理解，降级为单张图或知识卡片。
- 信息图海报：只在整篇内容需要总览地图时使用，默认最多 1 张，不用于硬塞全文。

每个候选方向必须写清：核心隐喻、星禾动作、构图、中文标注、参考图、适用原因、建议比例和生成文件名。

### 4. 选择比例和输出包

比例按内容形态决定，不再把 16:9 当作所有正文图默认：

- 小红书封面、知识卡片组、竖向总结卡：优先 `3:4`。
- 左右对比、轻流程、解释图：优先 `4:3`。
- 单概念卡片、九宫格摘录、方形社媒图：可用 `1:1`。
- 公众号横版封面：使用 `2.35:1`。
- 横版文章正文配图：可用 `16:9`，但只在横向阅读更清楚时使用。

默认输出目录：

```text
outputs/xinghe-illustration-packs/{日期}-{短标题}/
  source-summary.md
  visual-routing.md
  visual-candidates.md
  prompts.json
  manifest.json
  publish-notes.md
  images/
```

真实生成后的图片放入 `images/`；如果用户明确要求作为项目资产发布，可以再复制或导出到项目的 `assets/` 目录。

### 5. 写提示词

所有提示词必须包含：

- 目标用途和比例
- 星禾人物基准要求
- 当前图的核心信息目标
- 星禾正在亲手解决的问题
- 构图、信息层级、背景分区和物件
- 画面中文字清单，且来自原文或用户确认标题
- 禁止项：不抄参考图人物/水印/品牌/具体文字，不生成联系方式、二维码、真实 UI 截图，不把星禾变成装饰贴纸

写提示词前先回答：这张图里星禾正在亲手解决什么问题？如果答案只是“站在旁边、举瓶子、看着流程”，必须重写动作。

中文文字遵守 `references/text-rendering-rules.md`：标题、术语和数字必须来自原文或用户确认；色值不写进画面；错字优先重生或减少文字，不做代码涂改。

### 6. 真实生图

真实生图前必须固定传入人物基准图：

```bash
--style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-layout-reference>.png"
```

正文配图、解释图、知识卡片和漫画从 `assets/examples/01-14-*.png` 中选择最接近的动作/留白参考；平台封面从 `assets/examples/15-20-*.png` 中选择最接近的封面排版参考。场景参考图只用于构图、动作、留白和批注密度，不复制旧人物、旧物件、旧文字或旧布局。

单张生成示例：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-layout-reference>.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/01-topic-a.png" \
  --output-format png \
  --size 1024x1536 \
  --quality high
```

批量生成使用 manifest。manifest 中每张图必须包含 `id`、`topic`、`prompt`，可选 `filename`、`image`、`size`、`quality`、`output_format`、`style_references`。多候选真实生成时分别命名为 `01-topic-a.png`、`01-topic-b.png`、`cover-a.png`，不覆盖旧图。

测试、评估、代码改动验证或批量生成前，优先使用 `inspect`、`probe`、`--dry-run` 或 `--validate-manifest`，不要把真实生图当作默认测试。

### 7. 检查、迭代和学习

生成后读取 `references/qa-checklist.md`；封面任务读取 `references/cover-qa-checklist.md`。重点检查：

- 路由是否正确：情绪图、解释图、漫画、卡片、海报没有互相错用。
- 星禾是否真的参与核心动作。
- 中文文字是否短、准、可读。
- 信息层级是否适合手机端阅读。
- 是否复制了第三方参考图或旧案例的具体内容。
- 是否有水印、联系方式、二维码、无关品牌或错字。

用户反馈“这张好 / 采用 / 效果好 / 以后沿用”时，读取 `references/visual-learning-log.md`，生成学习日志建议。只有用户明确要求写入时才修改学习日志；不要把一次生成结果自动升级成长期规则。

## 知识卡片合并说明

`xinghe-knowledge-card-illustration` 的能力已经合并到本 skill。后续知识卡片组、单张知识卡、卡片封面、卡片 manifest 和卡片发布包都使用 `xinghe-illustrations-skill`。旧 skill 只保留弃用提示，避免历史调用断掉。

## 🔴 CHECKPOINT · 🛑 STOP

遇到以下情况必须暂停确认：

- 用户只要策略、候选方向、shot list、prompt-only、评审或测试。
- 用户要求真实生图，但尚未授权外部数据上传风险。
- 当前 API/endpoint/命令不能上传 `assets/examples/00-xinghe-ip-baseline.png`。
- 目标输出文件已存在，且用户没有明确要求覆盖。
- 平台、比例或发布场景不清楚，会影响交付形态。
- 用户提供参考图可能有版权、水印、品牌或人物复刻风险。
- 内容含隐私、收入承诺、医疗/法律/金融承诺或无法核验的事实。

## 反例黑名单

不要做：

- 不把星禾画成旁边站着的装饰人物。
- 不复制第三方参考图的人物、品牌、水印、具体文字、原图色系或具体排版。
- 不生成多个星禾或头像气泡；只有多格漫画或用户明确要求多人物叙事时才可例外。
- 不把知识卡片做成普通插画加几个标签。
- 不把信息图海报当成“整篇文章硬塞一张图”。
- 不把复杂技术拓扑强行画成可爱 IP 图；该用结构图就降级。
- 不在用户尚未授权外部上传风险时静默切换 CLI/proxy/API。
- 不把 API key、permission code、access token 写入文件、命令示例或最终回复。
