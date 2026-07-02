---
name: xinghe-illustrations-skill
description: 生成“星禾”个人 IP 风格的中文内容视觉资产：文章正文配图、微信公众号封面、小红书封面、情绪锚点图、解释图、多格漫画、知识卡片组、单张知识卡片、信息图海报、技术架构图和流程图。用于公众号文章、Markdown、本地长文、方法论、项目复盘、技术说明、工作流说明、教程、产品介绍或社媒内容的视觉路由、候选方向、prompt-only、manifest 和 PNG 生成。含人物时必须传入 `assets/examples/00-xinghe-ip-baseline.png` 人物基准图；结构主导图可让人物变小、局部出现或不出现。
---

# xinghe-illustrations-skill

## 核心定位

这是星禾统一内容生图 skill。它不再只负责 16:9 正文插图，而是负责把一篇中文内容路由成适合发布和阅读的视觉表达：正文配图、平台封面、情绪锚点图、解释图、多格漫画、知识卡片组、单张知识卡片、信息图海报、技术架构图和流程图。

第一任务是内容理解和信息设计：先判断哪些段落真的需要图，再决定用哪一种视觉形态。星禾 IP 是画面的记忆点，但不能只是站在旁边装饰；在正文图、封面、情绪图和漫画里，她必须通过整理、对比、接线、标注、解释、搬运、修补、指向或引导，亲手参与当前内容的核心动作。在技术架构图、流程图和高密度知识卡片里，信息结构可以成为主体，星禾可以缩小、只露手/半身/侧影，或完全不出现。

默认视觉 IP 是“星禾”：黑色长发或微卷长发、轻薄空气刘海、圆润大眼睛、浅笑；固定服饰为白色宽松拉链连帽外套，内搭深蓝水手领上衣和白色领结，下身为深蓝百褶裙。星禾是元气创造者 + 运营小导师，带一点清醒研究员气质。画面含人物、手部、半身或侧影时，真实生图必须使用 `assets/examples/00-xinghe-ip-baseline.png` 作为人物基准图。

## 先读这些参考

按任务渐进读取，不要一次塞满上下文：

- `references/cognitive-anchor-routing.md`：逐节配图判断、深度提炼、视觉路由和来源锁定；做文章配图、知识卡片或多格漫画前先读。
- `references/README.md`：references 目录索引；需要重组规则或判断该读哪个 reference 时先读。
- `references/article-type-visual-strategy.md`：文章类型到默认视觉策略；读完整篇文章后先读。
- `references/route-scoring.md`：路由评分标准；自主选择主路由和辅助路由时读取。
- `references/visual-formats.md`：情绪图、解释图、多格漫画、知识卡片、信息图海报的构图规则。
- `references/knowledge-card-composition-patterns.md`：知识卡片横版/竖版构图骨架；做文章笔记、方法论总结、路径图、决策图和卡片组时读取。
- `references/card-pack-narrative-structures.md`：知识卡片组叙事结构；做 `knowledge-card-pack` 时读取。
- `references/text-density-rules.md`：不同图型的文字密度、文字上限和溢出拆图规则。
- `references/technical-architecture-and-flow.md`：技术架构图、流程图、节点关系图和人物缩放/可省略规则。
- `references/text-rendering-rules.md`：中文标题、术语、数字、代码、表格和错字处理规则。
- `references/visual-routing-and-candidates.md`：多候选数量、候选字段、真实生成前确认规则。
- `references/illustration-selection.md`：正文配图选点、图型分类和候选输出。
- `references/composition-patterns.md`：星禾正文配图的低科技构图母题。
- `references/platform-cover-standards.md`、`references/cover-text-rules.md`、`references/cover-composition-patterns.md`、`references/cover-qa-checklist.md`：公众号封面、小红书封面和文章头图任务读取。
- `references/prompt-template.md`：正文图、封面、知识卡片、解释图、多格漫画、信息图海报的提示词模板。
- `references/output-spec.md`：默认输出目录、交付包字段和 manifest 规范。
- `references/qa-checklist.md`：生成后检查和返工规则。
- `references/failure-recovery-playbook.md`：生成失败后的问题分类和返工 prompt。
- `references/image-generation-runtime.md`、`references/access-modes.md`、`references/reference-images.md`：真实生图、API/CLI、参考图和安全边界。
- `docs/examples/sample-task-packs.md`：典型任务 dry-run 样例；测试路由稳定性时读取。
- `learning/visual-learning-log.md`：用户确认好图后才读取，用于生成学习日志建议；学习系统不混入 references 主流程。

## 统一使用边界

用户只要策略、候选方向、shot list、prompt-only、评审、测试或优化 skill 时，不调用 CLI。只有用户明确要真实图片文件、已授权外部数据上传风险、API key/endpoint 可用、输出路径不会覆盖旧文件、并且当前调用能上传任务所需参考图时，才调用 Node CLI。含人物图必须能通过 `--style-references` 上传人物基准图；`no-character` 结构图不要求人物基准图。

真实生图会把文章衍生 prompt、本地人物基准图、场景/版式参考图和可能的用户素材发送到官方 OpenAI 或第三方中转服务。用户没有明确授权前，必须停在 prompt-only 或命令建议。

不要把真实 API key、permission code、access token 写进 `SKILL.md`、`README.md`、`references/`、`scripts/`、`assets/` 或任何会提交到 GitHub 的文件。

用户刚安装 skill、询问“怎么配置生图”“URL/API key 填哪里”“为什么不能真实生成”时，先读取 `docs/usage-and-generation.md` 和 `references/access-modes.md`，按以下顺序引导：

1. 先确认用户要使用官方 OpenAI 还是第三方中转站。
2. 官方 OpenAI：让用户在本机或 Agent runtime 的私有环境变量中配置 `OPENAI_API_KEY`。
3. 第三方中转站：让用户配置 `GPT_IMAGE_BASE_URL`、`GPT_IMAGE_API_KEY`、`GPT_IMAGE_API_MODE`、`GPT_IMAGE_MODEL`，必要时再配置 `GPT_IMAGE_PROVIDER` 和 `GPT_IMAGE_PERMISSION_CODE`。
4. 强调不要把真实密钥写进仓库文件、聊天记录中准备提交的文档、命令示例或最终交付。
5. 配置后先让用户运行 `inspect` 或 `probe` 检查 URL、API key、模型和参考图上传能力，再真实生成。
6. 如果 endpoint 不能上传 `assets/examples/00-xinghe-ip-baseline.png`，含人物任务停在 prompt-only；只有 `no-character` 的结构图、流程图或技术架构图可以继续真实生成。

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

再按 `references/article-type-visual-strategy.md` 判断文章类型：

- `article_type`
- `article_type_confidence`
- `type_signals`
- `default_visual_strategy`

### 2. 自主选择视觉路由

读完整篇文章后，不要让用户先指定图型，也不要默认只做正文配图。先根据内容信号自主做“视觉路由编排”，为整篇文章选择一个主路由和若干辅助路由：

- `platform-cover`：公众号封面、小红书封面、文章头图。
- `emotion-anchor`：用人物动作、表情和场景张力抓住情绪或矛盾。
- `explanatory-diagram`：解释抽象概念、机制、因果、步骤或轻量结构。
- `technical-architecture`：解释系统组件、服务边界、数据流、权限边界、部署关系或模块依赖。
- `process-flow`：解释 SOP、自动化流程、内容生产流程、审批流、状态流或任务流。
- `comic-strip`：2-4 格漫画，用于有因果、转折、累积或前后变化的内容。
- `knowledge-card-pack`：整篇文章拆成 5-9 张可阅读、可收藏的知识卡片。
- `knowledge-card-single`：单张总结卡、对比卡、流程卡、清单卡或观点卡。
- `infographic-poster`：整篇流程、矩阵或地图式总结；默认最多 1 张。
- `xinghe-article`：常规星禾正文配图。
- `prompt-only`：用户只要提示词，或当前环境不能满足真实生图门槛。

先按 `references/route-scoring.md` 给候选路由打分。每个路由都要写 `score`、`reason`、`risk` 和 `output_role`；最高分通常成为 `primary_route`，4 分以上或能补足短板的路由进入 `secondary_routes`。

路由可以组合，但必须说明主次：

- `comic-strip + emotion-anchor`：内容有明显误区、压力、反转或成长过程时，多格漫画可以承载情绪变化；每格的表情和动作要推动剧情，不只是卖萌。
- `infographic-poster + knowledge-card-pack`：内容信息量大、需要全局地图时先给 1 张信息图总览，再拆成多张知识卡，不要把全文硬塞进一张海报。
- `knowledge-card-single + explanatory-diagram`：多个相关知识点需要放在同一卡片里时，允许卡片内部使用解释图、对比区、流程区或分层区承载关系。
- `process-flow + knowledge-card-pack`：流程超过 7 步时，优先拆成流程卡片组；每张卡讲一段流程或一个检查点。
- `technical-architecture + process-flow`：系统结构和执行流程都重要时，先架构后流程，或分成两张图，避免一张图同时塞满组件和步骤。
- `platform-cover + emotion-anchor`：封面可以借情绪张力提高点击，但标题、人物动作和核心判断必须服务文章主题。

每次路由决策至少写清：

- `article_type`：文章类型。
- `route_scores`：候选路由评分表。
- `primary_route`：本次最主要的图型。
- `secondary_routes`：可选辅助图型，没有则写空数组。
- `why_this_route`：为什么这种图型最能帮助读者理解。
- `information_density`：`low` / `medium` / `high`。
- `recommended_outputs`：建议生成几张图、分别是什么用途。
- `route_risks`：可能过密、过情绪化、过像 PPT、人物遮挡结构等风险。

不再一刀切禁止流程、结构、漫画、知识卡片、技术架构图或流程图。判断标准改为：这张图是否能让读者更快理解。如果技术关系、节点边界或流程状态本身是重点，就使用 `technical-architecture` 或 `process-flow`。只有当用户需要可执行、可审计、工程精确的拓扑图、数据库依赖、权限流或状态机时，才建议 Mermaid/Excalidraw、diagram fallback 或拆成多张图。

### 3. 设计候选方向

策略或 prompt-only 模式先给候选方向，不直接生图。

- 正文选点：默认每个选点 2 个候选方向；重点图可给 3 个；快速任务或用户明确省成本时给 1 个。
- 平台封面：默认 3 个方向，分别偏标题强表达、人物动作强表达、留白/品牌感强表达。
- 知识卡片组：先判断发布场景和信息排版，再给卡片结构；不要默认竖版。小红书轮播、微信竖向图文、手机长图才优先 `3:4`，文章笔记、方法论总结、流程/对比/结构卡优先 `4:3` 或 `16:9` 横版。
- 技术架构图 / 流程图：默认 1-2 个候选方向；一个偏架构清晰，一个偏阅读友好。人物默认小、局部或不出现。
- 多格漫画：先判断是否真的需要多格；有情绪变化时可以搭配 `emotion-anchor`，让每格承担一种情绪阶段；如果删掉任一格不影响理解，降级为单张图或知识卡片。
- 信息图海报：只在整篇内容需要总览地图时使用，默认最多 1 张；允许承载较多文章信息，但必须分区、分层、短标签化，不把原文段落硬塞进去。
- 知识卡片：允许多个相关知识点放在同一卡片里，但必须有关系骨架，例如并列、因果、输入汇聚、决策分流、分层或左右对比；不把无关系的知识点挤在一起。

知识卡片组必须按 `references/card-pack-narrative-structures.md` 选择 `card_pack_narrative`，例如“问题 -> 原因 -> 方法 -> 案例 -> 总结”或“总览 -> 分层解释 -> 决策树 -> 流程图 -> 行动卡”。

每个候选方向必须写清：主路由、辅助路由、核心隐喻、信息密度、文字密度等级、星禾动作或人物呈现等级、构图、中文标注、参考图、适用原因、建议比例和生成文件名。人物呈现等级使用：`full-character`、`small-character`、`partial-character`、`no-character`。文字密度等级按 `references/text-density-rules.md` 写 `text_density_level`、`text_budget` 和 `text_overflow_plan`。

### 4. 选择比例和输出包

比例按内容形态和实际排版决定，不再把知识卡片固定为竖版，也不把 16:9 当作所有正文图默认：

- 小红书封面、小红书轮播卡、微信竖向图文、手机端长图卡：优先 `3:4`。
- 文章笔记、方法论总结、普通知识卡片组、左右对比、轻流程、解释图：优先 `4:3`。
- 横向流程、时间线、多模块对照、桌面阅读、公众号正文横向配图型知识卡：优先 `16:9`。
- 技术架构图、流程图：优先 `4:3` 或 `16:9`；移动端知识卡片化时可拆成多张 `3:4`。
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
- 人物呈现等级：完整人物 / 小人物 / 局部人物 / 无人物
- 当前图的核心信息目标
- 星禾正在亲手解决的问题
- 构图、信息层级、背景分区和物件
- 画面中文字清单，且来自原文或用户确认标题
- 禁止项：不抄参考图人物/水印/品牌/具体文字，不生成联系方式、二维码、真实 UI 截图，不把星禾变成装饰贴纸

写提示词前先回答：这张图里信息主体是什么？如果是正文图、封面、情绪图或漫画，再回答“星禾正在亲手解决什么问题”。如果是技术架构图、流程图或高密度知识卡片，优先回答“结构如何让读者看懂”，然后决定人物是小、局部还是不出现。不要为了露出人物牺牲结构可读性。

中文文字遵守 `references/text-rendering-rules.md`：标题、术语和数字必须来自原文或用户确认；色值不写进画面；错字优先重生或减少文字，不做代码涂改。
文字数量遵守 `references/text-density-rules.md`：如果超过当前图型上限，拆成知识卡片组或降低密度，不缩小字号硬塞。

### 6. 真实生图

真实生图前，凡是画面中出现星禾人物，必须固定传入人物基准图：

```bash
--style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-layout-reference>.png"
```

正文配图、解释图、知识卡片、流程图、技术架构图和漫画从 `assets/examples/01-14-*.png` 中选择最接近的信息密度、动作/留白参考；平台封面从 `assets/examples/15-20-*.png` 中选择最接近的封面排版参考。场景参考图只用于构图、动作、留白和批注密度，不复制旧人物、旧物件、旧文字或旧布局。若某张技术架构图或流程图明确使用 `no-character`，不要声称它是“星禾人物一致”的图，而应称为“星禾风格结构图”。

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

- 路由是否正确：情绪图、解释图、技术架构图、流程图、漫画、卡片、海报没有互相错用。
- 人物呈现是否正确：正文图/封面/情绪图需要星禾参与核心动作；技术架构图/流程图/知识卡片允许人物小、局部或不出现。
- 中文文字是否短、准、可读。
- 信息层级是否适合手机端阅读。
- 是否复制了第三方参考图或旧案例的具体内容。
- 是否有水印、联系方式、二维码、无关品牌或错字。

如果出现失败结果，读取 `references/failure-recovery-playbook.md`，按失败类型输出 `failure_type`、`root_cause`、`recovery_action` 和 `rewrite_prompt`，再决定局部编辑、重生或拆图。

用户反馈“这张好 / 采用 / 效果好 / 以后沿用”时，读取 `learning/visual-learning-log.md`，生成学习日志建议。只有用户明确要求写入时才修改学习日志；不要把一次生成结果自动升级成长期规则。

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
- 不把复杂技术拓扑强行画成可爱 IP 大人物图；该用技术架构图、流程图或结构图时，让结构成为主体。
- 不在用户尚未授权外部上传风险时静默切换 CLI/proxy/API。
- 不把 API key、permission code、access token 写入文件、命令示例或最终回复。
