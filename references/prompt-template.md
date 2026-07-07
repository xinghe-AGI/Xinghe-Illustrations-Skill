# 生图提示词模板

每张图或每张卡片单独生成。根据正文内容替换变量。只有 `comic-strip` 多格漫画允许在一张图内出现 2-4 格；其他任务不要把多个候选拼在一张图里。

## 模板索引

按视觉路由跳读对应模板，不要每次从头到尾套用：

| 路由 | 使用模板 |
|---|---|
| `xinghe-article` / `emotion-anchor` / `explanatory-diagram` | 顶部“通用单图模板” |
| `technical-architecture` / `process-flow` | “技术架构图与流程图模板” |
| `knowledge-card-single` | “知识卡片模板” |
| `comic-strip` | “多格漫画模板” |
| `infographic-poster` | “信息图海报模板” |
| `panoramic-infographic` | “全景信息图模板” |
| `platform-cover` 公众号 | “公众号封面模板” |
| `platform-cover` 小红书 | “小红书封面模板” |
| `prompt-only` 批量交付 | “Prompt-only JSON 格式” |
| 图片返工 | “图像编辑提示” |

文字来源、标题、数字和错字处理统一遵守 `text-rendering-rules.md`；封面标题长度和安全区再读取 `cover-text-rules.md`。
知识卡片任务先读取 `knowledge-card-composition-patterns.md`，按内容关系选择构图骨架，不要默认三点清单或竖版。

```text
Generate one standalone {aspect_ratio} Chinese content visual in Xinghe IP style.

Visual DNA:
Cool white or very light blue-gray background. Crayon line art with visible grain and slightly wobbly hand-drawn strokes. Breathable spacing, but not empty or floating. Use subtle hand-drawn panels, pale blue-gray blocks, dotted grids, thin dividers, or dashed boundaries when the idea needs structure. Sparse Chinese annotations may use black/dark navy, orange, blue, or blue-gray according to text hierarchy; orange text is allowed for titles, keywords, and short labels, not only for emphasis marks. Bright creator-note and social-ops knowledge-card feeling, friendly but restrained, clean and easy to understand. No gradients, no shadows, no paper texture, no complex decorative background, no commercial vector style, no cold PPT-template look, no cute mascot poster, no children's illustration, no realistic UI, no yellow background.

Character presence:
{full-character / small-character / partial-character / no-character}. For article illustrations, covers, emotional anchors, and comics, use full-character unless the user asks otherwise. For technical architecture, process flow, and dense knowledge cards, prefer small-character, partial-character, or no-character. If any Xinghe character, hand, half body, or side silhouette appears, match the baseline character reference: long black slightly wavy crayon hair, light airy bangs, round bright focused eyes, gentle small smile, oversized white zip hoodie, dark navy sailor collar top with white stripes, white neckerchief, and dark navy pleated skirt. If no-character is selected, do not draw a human; keep Xinghe-style cool white or very light blue-gray crayon notes, hand-drawn labels, orange main path, blue feedback/data lines, and red risk markers.

Action rule:
Choose Xinghe's pose from the image meaning, not from a fixed default. Use the inspiration bottle only for inspiration-capture scenes. For blocked flows, make her move the blockage or reconnect the broken line. For classification, make her sort cards. For automation, make her plug in cables or press a button. For trust or evidence, make her lay evidence cards, inspect them, or build a small bridge. Never keep the same raised-bottle pose across unrelated images.

Theme:
{正文配图主题}

Visual route:
Primary route: {xinghe-article / emotion-anchor / explanatory-diagram / technical-architecture / process-flow / comic-strip / knowledge-card-single / infographic-poster / panoramic-infographic}
Secondary routes: {[] / [emotion-anchor] / [explanatory-diagram] / [knowledge-card-pack] / [process-flow] / [technical-architecture]}
Information density: {low / medium / high / panoramic-high}. High-density is allowed only for infographic posters, panoramic infographics, architecture diagrams, process maps, and relationship-based knowledge cards with clear sections and reading path.
Route score: {1-5 score and one sentence reason from route-scoring.md}
Text density: {very-low / low / medium / medium-high / high}. Follow text-density-rules.md. If text exceeds the budget, split into cards or reduce labels.
Emotion state:
{低落 / 不开心 / 慌张 / 烦躁 / 迷茫 / 专注紧绷 / 释然开心 / none}. For emotion-anchor and comic-strip, choose a visible facial expression and body posture that matches the state. Do not default to a gentle smile. Only use smiling when the state is 释然开心, 鼓励, or完成后的轻松.

Illustration type:
{图型：concept / process / comparison / data / scene / metaphor / handoff / review-loop / emotion-anchor / explanatory-diagram / technical-architecture / process-flow / comic-strip / knowledge-card}

Structure type:
{结构类型：灵感生产小装置 / 内容流水线 / 运营白板 / 自动化小盒子 / 内容日历 / 复盘回流 / 多形态内容 / 清醒判断 / 小分镜 / 左右对比 / 知识卡片 / 信息地图 / 分层架构 / 数据流 / 状态流 / SOP 流程 / 输入-处理-输出}

Core idea:
{这张图要表达的核心意思}

Composition:
{具体画面：信息结构如何布局；如有人物，星禾在哪里、正在做什么、她的动作如何帮助理解；如无人物，说明节点、层级、路径、反馈线和风险标注如何组织}

Suggested elements:
{元素1} / {元素2} / {元素3} / {元素4}

Chinese handwritten labels:
{标注词1} / {标注词2} / {标注词3} / {标注词4} / {可选标注词5}

Color use:
Black or dark navy for main crayon line art, hair, core objects, and baseline readable labels. Orange may be used directly for some title words, keywords, short labels, main flow lines, and arrows. Blue or blue-gray for background panels, AI/assistant state, secondary notes, and feedback. Red only for key breakpoints, warnings, or conclusions. Do not make every label orange.

Text source:
Use only source-locked Chinese words, numbers, and terms from the article or user-confirmed title. Do not invent numbers, promises, platform functions, contact information, QR codes, prices, or random English.

Constraints:
One image explains one core information goal. Xinghe's body pose and hand action must be different when the topic is different. Preserve breathable spacing, but avoid a blank monotone background in explanatory diagrams, flows, architecture diagrams, and knowledge cards. Use subtle cool-tone structure panels to support reading. Use short, readable Chinese labels. Do not write a generic type title in the top-left corner. Do not write the route name or structure type on the image. A hand-drawn explanatory diagram, knowledge card, comic strip, or infographic poster is allowed when it clarifies the content, but it must not become a cold PPT template, course slide, dense UI, or commercial poster. Do not copy prior examples or reuse known case compositions unless explicitly requested; invent a fresh visual metaphor for this specific article.
```

## 平台尺寸预设

默认按视觉路由选择比例，不再固定正文 16:9。用户明确要求平台适配时，以平台标准优先。

| 用途 | 宽高比 | 建议尺寸 | 说明 |
|---|---|---|---|
| 小红书轮播 / 微信竖向图文卡 | 3:4 | 1024x1536 或等比 | 明确移动端竖向阅读时使用 |
| 文章笔记 / 方法论知识卡 / 左右对比 / 轻流程 | 4:3 | 1536x1152 或等比 | 默认阅读型知识卡优先，结构清楚 |
| 横向流程 / 时间线 / 多模块关系 / 公众号正文横图卡 / 全景信息图 | 16:9 | 1536x1024 或等比 | 横向排版更清楚时使用 |
| 技术架构图 / 流程图 | 4:3 或 16:9 | 1536x1152 / 1792x1024 或等比 | 结构关系优先，人物可小或不出现 |
| 单概念卡片 | 1:1 | 1024x1024 | 摘要卡、方形社媒图 |
| 公众号封面 | 2.35:1 | 1792x768 或等比 | 保留标题区空间，但不要做商业海报 |
| 小红书封面 | 3:4 | 1024x1365 或等比 | 星禾动作仍是核心，不做大字报 |

平台适配时仍遵守星禾 IP、冷白/浅蓝灰底蜡笔、少量批注和动作绑定规则。不要因为做封面、卡片或海报就改成暗色科技风、营销海报或课程页。

## 知识卡片模板

```text
Generate one standalone {3:4 vertical / 4:3 horizontal / 16:9 horizontal / 1:1 square} Chinese knowledge card in Xinghe IP style.

Visual DNA:
Cool white or very light blue-gray background, crayon line art, clean mobile-readable layout, friendly creator-note feeling. Use simple panels, rounded hand-drawn boxes, short labels, subtle dotted grids or dashed dividers, and breathable spacing. Orange can be used as text color for selected title words, keywords, short labels, or the main path, while black/dark navy keeps baseline text readable. Not a PPT slide, not a commercial poster, not a dense long-image.

Card role:
{封面卡 / 总览卡 / 核心观点卡 / 对比卡 / 流程卡 / 清单卡 / 总结卡}

Card pack narrative:
{如果属于 knowledge-card-pack，写：问题 -> 原因 -> 方法 -> 案例 -> 总结 / 误区 -> 真相 -> 做法 -> 检查清单 -> 收藏卡 / 背景 -> 旧流程 -> 新流程 -> 工具链 -> 落地建议 / 总览 -> 分层解释 -> 决策树 -> 流程图 -> 行动卡 / 冲突 -> 转折 -> 重构 -> 稳定 -> 复用}

Knowledge relation:
{说明同一张卡内多个知识点的关系：并列 / 因果 / 流程 / 分层 / 输入汇聚 / 决策分流 / 角色进化 / 左右对比。If the knowledge points are unrelated, split them into multiple cards.}

Aspect ratio decision:
{说明为什么选择当前比例：小红书/微信竖图用 3:4；文章笔记、方法论总结、对比/流程/结构卡用 4:3；横向流程、时间线、多模块关系或公众号正文横图用 16:9；单概念摘录用 1:1。Do not default to vertical cards unless the platform or layout requires it.}

Composition pattern:
{左因右果路径卡 / 顶层原则 + 三列路径卡 / 左定义右分层卡 / 上平台下模块卡 / 顶部原则分发卡 / 三输入汇聚结果卡 / 横向角色进化卡 / 决策树路径卡}

Why this pattern:
{说明当前内容关系为什么适合该构图，例如旧问题到新结果、三条路径、概念组成映射、工具底座分发、原则到行动、多输入汇聚、角色进化或条件分流}

Chinese text:
Render these Chinese words exactly and only these words:
Title: "{卡片标题}"
Bullets: "{要点1}" / "{要点2}" / "{要点3}" / "{可选要点4}"
Bottom note: "{可选底部总结}"

Text budget:
{very-low / low / medium / medium-high / high；例如 1 标题 + 3-5 要点 + 1 底部总结。If the text exceeds the budget, split into another card instead of shrinking font size.}

Character presence:
{full-character / small-character / partial-character / no-character}. For cover card use full-character or small-character. For overview, flow, comparison, architecture, or dense checklist cards, prefer small-character, partial-character, or no-character. If Xinghe appears, she matches the baseline character reference and is {整理卡片 / 贴标题 / 称量两侧观点 / 接通流程线 / 圈出重点 / 把混乱信息收进卡片盒}. If no-character, keep the structure clean and readable without adding any human.

Composition:
{根据 composition_pattern 写具体版式：左 -> 中 -> 右路径 / 顶部原则 -> 三列路径 -> 底部结论 / 左定义 -> 右分层 / 上平台 -> 下模块 / 顶部问题 -> 决策节点 -> 分支 -> 收束结论}. Match the layout to the selected ratio. Keep all text large enough for the target reading surface.

Constraints:
Do not copy reference image text, character, watermark, brand, or color scheme. Do not put paragraphs into the card. If text is too long, split into multiple cards.
```

## 技术架构图与流程图模板

```text
Generate one standalone {4:3 / 16:9 / 3:4} Chinese {technical architecture diagram / process flow diagram} in Xinghe visual style.

Visual DNA:
Cool white or very light blue-gray background, crayon line art, hand-drawn boxes and arrows, clean technical readability, not a PPT template, not a realistic UI screenshot, not a commercial tech poster. Use pale blue-gray zones to group layers or modules, orange for main flow, blue for data/feedback/status lines, red for risk/failure/permission markers, black or dark navy for nodes and labels.

Route:
{technical-architecture / process-flow}

Information goal:
{读者看完要理解什么}

Structure type:
{分层架构 / 数据流 / 状态流 / SOP 流程 / 自动化链路 / 输入-处理-输出}

Nodes:
{节点1} / {节点2} / {节点3} / {节点4} / {可选节点5-9}

Edges:
Main flow: {主路径}
Feedback or state lines: {可选}
Risk or manual check points: {可选}

Character presence:
{small-character / partial-character / no-character}. Default to small or partial character only if it helps comprehension. Xinghe may be tiny in a corner, pointing at a boundary, holding a label, connecting one cable, or only showing one hand placing a tag. If no-character, draw no human and keep the Xinghe-style white crayon note aesthetic.

Chinese labels:
Use only short source-locked labels. Node labels should be 2-8 Chinese characters when possible. Do not add long explanations inside nodes.

Composition:
{分层布局 / 左到右流程 / 上到下流程 / 中央系统 + 周边输入输出 / 泳道式流程}. Keep node spacing generous. Preserve readable hierarchy. Do not let any character cover nodes or arrows.

Constraints:
No real app screenshot, no real UI, no logo, no QR code, no token, no secret, no fake metrics. Do not invent system components. If the diagram needs more than 9 strong relationship nodes, split into multiple diagrams or suggest Mermaid/Excalidraw.
```

## 多格漫画模板

```text
Generate one standalone {2-panel / 3-panel / 4-panel} comic-strip image in Xinghe IP style.

Visual DNA:
Pure white background, crayon line art, clean hand-drawn panel borders, consistent scene world, readable Chinese labels. Not a manga poster, not a busy commercial comic page.

Story logic:
Panel 1: {起点或误区}
Panel 2: {冲突、卡住或发现}
Panel 3: {星禾采取动作}
Panel 4: {结果或反转，可选}

Emotion arc:
{如果 secondary route includes emotion-anchor，写清每格情绪：期待 / 卡住 / 压力 / 发现 / 行动 / 释然 / 复盘。Emotion must support the story, not become exaggerated crying or hype.}

Xinghe:
Use one consistent Xinghe character matching the baseline reference across panels. Her action must change in each panel according to the story.

Chinese text:
Use only short source-locked labels or one short line per panel. No long dialogue.

Constraints:
Each panel must advance the meaning. If a panel does not change the story, remove it. Do not create multiple unrelated mini illustrations.
```

## 信息图海报模板

```text
Generate one standalone {3:4 / 4:3} Chinese infographic poster in Xinghe IP style.

Visual DNA:
Pure white background, crayon line art, hand-drawn map or matrix layout, clear hierarchy, mobile-readable text. It may use sections, arrows, numbered steps, and cards, but it must feel like a hand-drawn knowledge map, not a PPT template.

Whole-map topic:
{整篇文章或流程的总览主题}

Structure:
{流程地图 / 2x2 矩阵 / 三层框架 / 输入-处理-输出 / 问题-方法-结果}

Information density:
{medium / high}. High density is allowed when the article needs a whole-map summary, but organize it into 3-6 clear sections with a visible reading path.

Reading path:
{读者从哪里开始看，经过哪些分区，最后记住什么}

Xinghe role:
星禾 is small but important: {拿笔整理地图 / 指向关键路径 / 把卡片放进矩阵 / 连接输入输出}. She supports the information map without becoming decorative.

Chinese labels:
{分区标题和短标签，全部来自原文}

Constraints:
Default maximum one infographic poster per article. Do not cram the full article into one image. If text becomes dense, split into knowledge cards.
```

## 全景信息图模板

生成系统全景、方法全貌、能力地图、Agent 架构总览或高密度横向信息图时使用。生成前先读取 `panoramic-infographic.md`。

```text
Generate one standalone 16:9 Chinese panoramic infographic in Xinghe visual style.

Visual DNA:
Cool white or very light blue-gray background, hand-drawn crayon structure, clean module zones, thin dividers, subtle dotted grids, clear reading path, desktop-readable Chinese labels. Use black/dark navy for baseline labels, orange directly for selected title words, main path labels, and key arrows, blue/blue-gray for secondary modules and feedback/status lines, red only for risks or missing pieces. Not a PPT slide, not a dense UI screenshot, not a commercial tech poster, not a copied reference layout.

Whole-map topic:
{全景图主题}

One-sentence understanding:
{读者看完这张图要记住的一句话}

Panorama structure:
{中央核心循环型 / 分层架构全景型 / 左旧右新对比全景型 / 地图导航型}

Top value band:
{顶部主标题 + 价值公式 / 关键判断 / 一句话解释}

Left input stack:
{输入区：用户输入 / 外部事件 / 文件数据 / 历史记录 / 其他入口}

Central main path:
{中央主链路 5-7 个节点，必须是画面视觉重心}

Support layer:
{下方支撑层：记忆 / 检索 / 权限 / 状态 / 调试 / 观察 / 工具 / 安全}

Right output stack:
{输出区：最终答案 / 执行动作 / 交付物 / 报表 / 触发后续流程}

Right side explanation:
{一句话理解 / 为什么重要 / 有无对比 / 工程 Tips / 风险清单，最多 3 个小模块}

Bottom toolbelt:
{可选工具类别，不写真实 logo、密钥、域名或联系方式}

Reading path:
{顶部价值 -> 左侧输入 -> 中央主链路 -> 右侧输出 -> 侧栏解释 -> 底部工具}

Information density:
panoramic-high. Use 7-10 information zones and 18-28 short labels maximum. Every node title should be short and readable. Do not write paragraphs.

Character presence:
{small-character / partial-character / no-character}. Default no-character unless a tiny Xinghe guide helps comprehension. If Xinghe appears, she is small and placed at one edge of the main path, pointing, tagging, checking a boundary, or connecting one line. She must not cover nodes, arrows, formulas, or sidebars.

Chinese labels:
Render only source-locked terms from the article or user-confirmed wording. Use short Chinese labels, numbers, and section titles. Do not copy labels from reference images.

Overflow plan:
If the content exceeds this image, keep this as a panorama map and split details into a knowledge-card-pack.

Constraints:
Do not copy reference image icons, vehicles, shields, brand, text, exact layout, or color scheme. Do not make it a PPT course page. Do not use tiny unreadable text. Do not put all modules at equal weight; central main path must be dominant.
```


## 公众号封面模板

用户要求公众号封面、微信文章头图或横版文章封面时使用。生成前先读取 `platform-cover-standards.md`、`cover-text-rules.md` 和 `cover-composition-patterns.md`。

```text
Generate one standalone WeChat public-account article cover in Xinghe IP style.
Aspect ratio: 2.35:1 wide horizontal cover, recommended size 1792x768 or equivalent.

Visual DNA:
Cool white or very light blue-gray background, crayon line art, breathable spacing, friendly but restrained creator-notebook feeling. Use black/dark navy for main line art, orange for selected title words, short labels, or the main action line, blue for secondary notes, red only for one warning or conclusion. No gradients, no shadows, no commercial poster style, no PPT course cover, no dense infographic, no complex decorative background.

Chinese cover title:
Render this Chinese title text exactly as provided, with no typo, no extra words, and no random English:
"{公众号封面标题}"
Title layout: {1-2 行；左侧或中左；每行不超过 10 个中文字符；标题不得贴边}
Optional subtitle or tiny label: {可为空；最多 1 个很短副标}
Keyword emphasis: {可为空；只强调 1 个词；用红橙/粉紫下划线或圈注}

Xinghe character:
星禾, matching the baseline character reference: long black slightly wavy crayon hair, airy bangs, round focused eyes, gentle small smile, oversized white zip hoodie, dark navy sailor collar top with white stripes, white neckerchief, dark navy pleated skirt. Only one Xinghe character.

Cover action:
星禾 must physically support the article idea, not stand as decoration. She is {整理文件盒 / 托起方法卡 / 铺证据卡 / 拉起流程线 / 圈出关键判断 / 打开工作区盒子}, showing {封面核心判断}.

Composition:
Use {左标题右行动 / 中标题下轻场景 / 宽留白单物件}. Keep the title on the left or center-left with safe margins, Xinghe and one core object on the right or lower-right. Keep all important text and face away from edges. The cover should still be readable as a small chat thumbnail.

Objects:
Use only 1-3 simple objects tied to the article: {文件盒 / 规则卡 / 台账本 / 流程线 / 内容卡 / 小工作台}. Do not add tags, QR codes, contact information, price, or call-to-action text.

Constraints:
One cover communicates one article theme. Do not make it a marketing poster, course slide, tech UI, product ad, or full-page text poster. Do not use multiple people. Do not copy old reference scenes. Preserve Xinghe IP consistency and clean crayon texture.
```

## 小红书封面模板

用户要求小红书封面、笔记首图、竖版首图或类似用户参考图的大字标题卡片时使用。生成前先读取 `platform-cover-standards.md`、`cover-text-rules.md` 和 `cover-composition-patterns.md`。

```text
Generate one standalone Xiaohongshu note cover in Xinghe IP style.
Aspect ratio: 3:4 vertical cover, recommended size 1024x1365 or equivalent.

Visual DNA:
Cool white or very light blue-gray dotted background, crayon line art, breathable spacing, creator-notebook feeling, friendly but not childish. Use subtle panels or dotted dividers if they help the title and lower scene read clearly. No gradients, no yellow poster background, no commercial poster style, no PPT slide, no course cover, no dense infographic, no realistic UI.

Chinese cover title:
Render this Chinese title text exactly as provided, with no typo, no extra words, and no random English:
"{小红书封面标题，按 2-4 行给出}"
Title layout: large typed Chinese title in the upper half, 2-4 lines, each line short and readable on mobile. Keep safe margins around all text.
Keyword color: render only "{关键词}" in orange, pink-purple, or blue text, or use one underline/circle if text coloring is unreliable. Do not color multiple words.

Xinghe character:
星禾, matching the baseline character reference: long black slightly wavy crayon hair, airy bangs, round focused eyes, gentle small smile, oversized white zip hoodie, dark navy sailor collar top with white stripes, white neckerchief, dark navy pleated skirt. Only one Xinghe character.

Cover action:
In the lower half, 星禾 is {整理文件盒 / 托起一叠方法卡 / 把散落卡片放回系统 / 拉出一条工作流 / 圈出关键卡片}. Her action must support the title claim: {封面核心判断}. She is not a sticker or decorative mascot.

Composition:
Use {上标题下人物 / 标题卡片 + 星禾小场景 / 左上标题右下承托 / 中心大标题 + 底部微动作}. Keep the title dominant and Xinghe clearly visible. Preserve 6%-8% edge margins. Do not place important text near bottom UI/crop areas.

Objects:
Use only 1-3 simple objects tied to the note: {文件盒 / Codex 卡片 / 规则卡 / 台账本 / 复盘卡 / 小工作台}. Extra object labels are optional and limited to 1-2 short words.

Constraints:
This should look like a personal method note cover, not a marketing poster. One cover, one claim. No hashtags, no CTA, no QR code, no contact information, no long subtitle, no multiple people, no copied reference-scene objects.
```
## Prompt-only JSON 格式

用户要求 prompt-only、只要提示词、不调用 API 时，可输出：

```json
{
  "mode": "prompt-only",
  "article": "文章或主题名称",
  "platform": "article / wechat-cover / xhs-cover / knowledge-card-pack / knowledge-card-single / comic-strip / infographic-poster",
  "routing_decision": {
    "article_type": "方法论文章",
    "article_type_confidence": "high",
    "type_signals": ["有框架", "有步骤", "有适用条件"],
    "default_visual_strategy": ["knowledge-card-pack", "infographic-poster"],
    "route_scores": [
      {
        "route": "infographic-poster",
        "score": 5,
        "reason": "文章需要全局地图",
        "risk": "信息过密",
        "output_role": "主输出"
      }
    ],
    "primary_route": "infographic-poster",
    "secondary_routes": ["knowledge-card-pack"],
    "information_density": "high",
    "recommended_outputs": ["1 张总览信息图", "5-7 张知识卡片"],
    "route_risks": ["信息过密", "文字过小", "主次不清"]
  },
  "pictures": [
    {
      "id": 1,
      "position": "放在哪段后，封面可写 cover",
      "selection_signal": "流程或步骤描述",
      "illustration_type": "process",
      "topic": "图的主题",
      "recommended_candidate": "A",
      "candidates": [
        {
          "id": "A",
          "primary_route": "process-flow",
          "secondary_routes": ["knowledge-card-single"],
          "information_density": "medium",
          "text_density_level": "medium",
          "text_budget": "1 标题 + 4 要点 + 1 底部总结",
          "text_overflow_plan": "超过 5 个要点时拆成第二张卡",
          "card_pack_narrative": "总览 -> 分层解释 -> 决策树 -> 流程图 -> 行动卡",
          "direction": "标题强表达 / 人物动作强表达 / 留白品牌感 / 正文隐喻方向 / 解释图方向 / 知识卡片方向 / 多格漫画方向",
          "composition_pattern": "左因右果路径卡 / 顶层原则 + 三列路径卡 / 决策树路径卡 / 三输入汇聚结果卡",
          "why_this_pattern": "说明该构图匹配的内容关系",
          "knowledge_relation": "流程 / 因果 / 分层 / 输入汇聚 / 决策分流 / 左右对比",
          "layout_flow": "左 -> 中 -> 右 / 上 -> 中 -> 下 / 入口 -> 决策 -> 分支 -> 结论",
          "primary_panel": "视觉重心",
          "secondary_panels": "辅助信息块",
          "panel_count": 0,
          "panel_progression": [],
          "emotion_arc": [],
          "section_count": 3,
          "density_strategy": "用 3 个分区承载较多信息，每区只保留短标签",
          "reading_path": "左侧问题 -> 中央机制 -> 右侧输出",
          "core_metaphor": "把卡住的内容流重新接回轨道",
          "character_presence": "small-character",
          "xinghe_action": "星禾正在接线并把卡住的内容卡放回轨道",
          "information_goal": "读者理解流程如何重新跑通",
          "node_count": 3,
          "edge_style": "橙色主流程，蓝色反馈线，红色断点",
          "composition": "星禾在画面右侧，左侧留出短标注和流程入口",
          "chinese_labels": ["卡点", "接回", "复盘"],
          "reference_images": [
            "assets/examples/00-xinghe-ip-baseline.png",
            "assets/examples/05-handoff-path.png"
          ],
          "aspect_ratio": "4:3",
          "size": "1536x1152",
          "reason": "适合表现流程重新跑通，动作清楚且不会变成复杂架构图",
          "output_filename_when_generated": "01-topic-a.png",
          "prompt": "完整单图生图提示词"
        },
        {
          "id": "B",
          "direction": "另一个独立视觉方向",
          "core_metaphor": "把散落卡片收进一个小工作台",
          "character_presence": "partial-character",
          "xinghe_action": "星禾正在整理卡片并贴上简短标签",
          "composition": "中心低科技工作台，四周有呼吸感留白和浅蓝灰分区",
          "chinese_labels": ["选题", "生产", "发布"],
          "reference_images": [
            "assets/examples/00-xinghe-ip-baseline.png",
            "assets/examples/08-handoff-copy-toolbox.png"
          ],
          "reason": "适合表现内容整理和工作区化，比流程线更亲切",
          "output_filename_when_generated": "01-topic-b.png",
          "prompt": "完整单图生图提示词"
        }
      ]
    }
  ]
}
```

`pictures[]` 中每一项对应一个配图选点；`candidates[]` 中每一项对应一个独立候选方向和独立 prompt。真实生成多候选时必须分别保存为 `01-topic-a.png`、`01-topic-b.png`、`cover-a.png` 等文件，严禁把多张图合成一张，也不要覆盖旧图。

## 灵感场景样张提示词

只用于“灵感捕捉/创意启动”。不要把这个姿势作为所有图片的默认姿势。

```text
Generate one standalone 16:9 horizontal Chinese article illustration.
Cool white or very light blue-gray background, crayon line art, breathable but not empty spacing, subtle hand-drawn panels or dotted dividers when structure is needed, sparse black/orange/blue/red handwritten Chinese annotations.

星禾, a young woman matching the baseline character reference, with long black slightly wavy hair, light airy bangs, round bright focused eyes, gentle small smile, oversized white zip hoodie with blue-black crayon folds, dark navy sailor collar top, white neckerchief, and dark navy pleated skirt, stands slightly left of center. She raises a small transparent glass inspiration bottle filled with tiny star-shaped ideas. From the bottle, a few star ideas flow through an orange crayon line into a small low-tech content machine on a simple desk. The machine outputs three content cards on the right: "短帖", "长文", "视频脚本". Under the machine, a tiny automation box catches "重复工作" and sends a blue feedback note back toward the bottle. 星禾 uses one hand to hold the bottle and the other hand to guide the orange flow line.

Use black and dark navy crayon for line art, hair, and baseline labels; orange may be used for selected labels and the main creative workflow line; blue for hoodie folds and feedback note; red only to circle "容易断". Keep the image clean, not a PPT, not a formal flowchart, not cute, no top-left title, no yellow background.
```

## 图像编辑提示

增强星禾参与感：

```text
Regenerate this illustration with the same core meaning and simple layout, but make 星禾 more central to the action. 星禾 should be catching inspiration, guiding a workflow, sorting content cards, scheduling, launching automation, weighing evidence, or marking the key point herself, not standing beside the diagram. Keep a cool white or very light blue-gray background, breathable but not empty spacing, crayon texture, friendly energy, and not PPT-like.
```

纠正固定姿势：

```text
Regenerate this illustration with the same Xinghe IP appearance and crayon style, but change her pose to match the specific content. Do not use the raised inspiration-bottle pose unless the scene is about catching inspiration. Make Xinghe physically perform the core action: moving the blockage, reconnecting a broken flow, sorting cards, plugging in an automation box, laying evidence cards, building a small bridge, weighing evidence, or sending feedback back into the loop. Keep the composition breathable, cool white or very light blue-gray, and not PPT-like.
```

去掉左上角标题：

```text
Edit the provided image. Remove only the handwritten title "{要删除的文字}" and its underline from the top-left corner. Fill that area with the same cool white or very light blue-gray background, matching the surrounding blank area or subtle dotted/panel texture. Preserve everything else exactly: 星禾, labels, paths, line style, composition, aspect ratio, and image quality. Do not add any new text or objects.
```
