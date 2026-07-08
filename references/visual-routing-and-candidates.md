# 候选方向与生成确认

本文件只负责“路由确定之后，给几个候选、候选字段怎么写、什么时候能真实生成”。路由选择本身以 `cognitive-anchor-routing.md` 为准，具体视觉形态规则以 `visual-formats.md` 为准。

## 输入前提

使用本文件前，应已经完成：

- 已按 `cognitive-anchor-routing.md` 做逐节判断和路由选择。
- 已按 `article-type-visual-strategy.md` 判断文章类型。
- 已按 `route-scoring.md` 输出路由评分。
- 已明确 `primary_route`、`secondary_routes`、`information_density`、`recommended_outputs` 和 `route_risks`。
- 已按 `visual-formats.md` 确认视觉形态边界。
- 已按 `background-density-and-palette.md` 确认背景密度、辅助背景元素、留白控制和配色方案。
- 已确认用户当前要的是策略、prompt-only 还是真实图片文件。

## 候选数量

| 场景 | 默认候选数 | 说明 |
|---|---:|---|
| `xinghe-article` 普通正文选点 | 2 | 一个偏概念隐喻，一个偏动作流程 |
| `xinghe-article` 重点正文选点 | 3 | 增加一个偏场景/情绪/记忆点方向 |
| `platform-cover` 公众号封面 | 3 | 标题强表达、人物动作强表达、留白/品牌感强表达 |
| `platform-cover` 小红书封面 | 3 | 大字标题强表达、底部星禾动作强表达、关键词强调强表达 |
| `knowledge-card-pack` | 先定卡片数，再为关键卡给 2-3 个方向 | 默认 5-9 张卡，关键卡可多候选 |
| `technical-architecture` | 1-2 | 一个偏架构清晰，一个偏阅读友好；人物默认小、局部或不出现 |
| `process-flow` | 1-2 | 一个偏流程顺序，一个偏关键回流/检查点；人物默认小、局部或不出现 |
| `comic-strip` | 1-2 | 先验证每格是否推进意义；有情绪变化时补充 `emotion_arc` |
| `infographic-poster` | 1-2 | 默认最多真实生成 1 张；允许高信息密度，但必须分层分区 |
| `panoramic-infographic` | 1-2 | 默认最多真实生成 1 张；一个偏中央核心循环，一个偏分层/地图全景 |
| 快速任务或省成本 | 1 | 用户明确要快、要少、只要最终图时使用 |

## 候选方向字段

每个候选方向必须写清：

- 候选编号：`A`、`B`、`C`
- 主路由：`primary_route`
- 辅助路由：`secondary_routes`，没有则写 `[]`
- 路由评分：`route_score` 或引用顶层 `route_scores`
- 信息密度：`low`、`medium`、`high` 或 `panoramic-high`
- 文字密度：`text_density_level`、`text_budget`、`text_overflow_plan`
- 背景密度：`background_density_level`，使用 `light`、`medium`、`rich` 或 `dense`
- 辅助背景元素：`supporting_background_elements`，例如白板边框、桌面、便签、夹子、胶带、边栏提示、底部工具带
- 配色方案：`palette_plan`，说明主文字色、辅助色、路径色、风险色和背景分区色
- 留白控制：`blank_space_control`，说明哪里留白、哪里用信息背景层承接
- 核心隐喻：这张图用什么低科技物件或动作承载主题
- 星禾动作或人物呈现等级：`full-character`、`small-character`、`partial-character`、`no-character`
- 构图：标题/人物/物件的位置关系
- 中文标注：最多 5-8 个短词
- 推荐参考图：人物基准图 + 1 张正文或封面参考图
- 适用原因：为什么这个方向值得生成
- 建议比例：3:4、4:3、1:1、2.35:1 或 16:9
- 生成文件名：如 `card-02-a.png`、`comic-01-a.png`、`poster-a.png`
- 结构字段：技术架构图/流程图必须写 `node_count`、`edge_style`、`information_goal`
- 漫画字段：多格漫画必须写 `panel_count`、`panel_progression`，若辅助 `emotion-anchor`，还要写 `emotion_arc`
- 信息图字段：信息图海报必须写 `section_count`、`density_strategy`、`reading_path`
- 全景信息图字段：`panorama_structure`、`section_count`、`label_budget`、`reading_path`、`central_main_path`、`side_explanation`、`overflow_plan`
- 知识卡字段：知识卡片必须写 `knowledge_relation`，说明同一卡内多个知识点如何关联
- 卡片组字段：`knowledge-card-pack` 必须写 `card_pack_narrative`、`card_count`、`card_roles`

## 混合路由候选

混合路由必须把“主路由”和“辅助路由”的职责拆开写：

- `comic-strip + emotion-anchor`：候选中写清每格剧情和情绪变化。漫画负责叙事，情绪负责读者共鸣，不要把每格做成无关表情。
- `infographic-poster + knowledge-card-pack`：候选中写清海报总览负责什么，卡片组负责什么。海报可以信息多，但必须有分区和阅读路径。
- `panoramic-infographic + knowledge-card-pack`：候选中写清全景图负责什么全局关系，卡片组负责拆解哪些模块。全景图可以高密度，但必须有中央主链路、左右输入输出和侧栏解释。
- `knowledge-card-single + explanatory-diagram`：候选中写清卡片内多个知识点的关系骨架，例如并列、因果、分层或汇聚。
- `process-flow + knowledge-card-pack`：候选中写清流程拆卡逻辑，每张卡对应一个阶段、节点或检查点。
- `technical-architecture + process-flow`：候选中写清是否拆成两张图；如果不拆，必须说明主图结构和辅助主路径如何不互相挤压。

如果辅助路由只是装饰，删除辅助路由。若主路由信息已经过密，不要继续叠加辅助路由，应拆图。

## 默认交付

用户没有要求真实生图时，默认输出：

1. 文章理解和文章类型。
2. 路由评分和最终路由决策。
3. 推荐生成清单。
4. 每张图 A/B 候选方向。
5. 每个候选的推荐比例、人物呈现等级、文字密度和参考图。
6. 每个候选的背景密度、辅助背景元素、配色方案和留白控制。
7. prompt 或 prompt-only JSON。
8. 生成前检查清单。

## 输出规则

- 策略模式：每个配图点输出候选方向，不调用生图。
- prompt-only：每个候选方向输出独立 prompt。
- 真实生成：先确认生成哪个候选；如果用户要求多个候选，分别生成独立图片。
- 文件命名：正文候选用 `01-topic-a.png`、`01-topic-b.png`；封面候选用 `cover-a.png`、`cover-b.png`、`cover-c.png`。
- 不覆盖旧图；已有文件时换新序号或询问用户。

## Diagram fallback

`diagram-fallback` 只在技术架构图或流程图仍无法清晰表达时使用。本文件只规定候选输出：

- 说明“不建议直接生成为单张图”的原因：节点超过 9 个、强关系过多、需要工程精确、状态机复杂或权限路径必须可审计。
- 优先建议拆成多张 `technical-architecture` / `process-flow` 图，或输出 Mermaid/Excalidraw 方向。
- 如果用户坚持星禾风格，优先使用 `small-character`、`partial-character` 或 `no-character`，不要画成大人物装饰图。
