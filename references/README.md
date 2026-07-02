# References 使用索引

本目录只放稳定执行规则：如何判断内容、如何选择视觉路由、如何写 prompt、如何检查结果。人工确认后的经验沉淀已经抽离到 `../learning/visual-learning-log.md`，不要在本目录直接记录单次好图经验。

## 读取顺序

1. 内容判断：先读 `cognitive-anchor-routing.md` 和 `illustration-selection.md`，决定哪些段落值得配图。
2. 文章类型：读 `article-type-visual-strategy.md`，判断 `article_type` 和默认视觉策略。
3. 路由评分：读 `route-scoring.md`，给候选路由打分后再确定 `primary_route` 和 `secondary_routes`。
4. 视觉路由：再读 `visual-routing-and-candidates.md`，决定信息密度、候选数量、图型和人物呈现等级。
5. 视觉形态：按任务读取 `visual-formats.md`、`technical-architecture-and-flow.md`、`composition-patterns.md` 或平台封面相关文件；知识卡片组额外读 `card-pack-narrative-structures.md`。
6. 文字密度：读取 `text-density-rules.md`，确认每张图的 `text_density_level`、`text_budget` 和溢出拆图方案。
7. 统一风格：所有任务都以 `style-dna.md` 为最终视觉口径；冷白/浅蓝灰背景、手绘结构分区、文字颜色层级优先在这里统一。
8. 提示词与生成：读取 `prompt-template.md`、`prompt-template-images-api.md`、`reference-images.md`、`access-modes.md` 和 `image-generation-runtime.md`。
9. 验收返工：读取 `qa-checklist.md`；封面任务再读 `cover-qa-checklist.md`；失败返工读 `failure-recovery-playbook.md`。

## 规则归属

- 画风、背景、色彩、留白：归 `style-dna.md`。
- 人物形象和人物大小：归 `xinghe-ip.md` 与 `technical-architecture-and-flow.md`。
- 文章类型与默认策略：归 `article-type-visual-strategy.md`。
- 路由评分：归 `route-scoring.md`。
- 情绪图、解释图、多格漫画、知识卡片、信息图海报：归 `visual-formats.md`。
- 自主路由、主/辅路由和混合路由：归 `cognitive-anchor-routing.md` 与 `visual-routing-and-candidates.md`。
- 知识卡片比例和构图骨架：归 `visual-formats.md`、`knowledge-card-composition-patterns.md` 和 `prompt-template.md`；普通文章笔记不要默认竖版。
- 知识卡片组叙事结构：归 `card-pack-narrative-structures.md`。
- 技术架构图、流程图、结构图：归 `technical-architecture-and-flow.md`。
- 公众号封面和小红书封面：归 `platform-cover-standards.md`、`cover-text-rules.md`、`cover-composition-patterns.md` 和 `cover-qa-checklist.md`。
- 中文文字、数字、术语、错字处理：归 `text-rendering-rules.md`。
- 文字密度和拆图阈值：归 `text-density-rules.md`。
- 失败结果返工：归 `failure-recovery-playbook.md`。
- API、CLI、参考图、安全边界：归 `access-modes.md`、`image-generation-runtime.md` 和 `reference-images.md`。

## 当前视觉口径

- 主背景使用冷白或极浅蓝灰，不做大面积暖黄、米色、纸纹、渐变和商业海报底。
- 解释图、流程图、知识卡片不再只靠大空白；允许使用浅蓝灰分区、细点阵、手绘虚线、浅色模块底和轻量批注，让信息更有承载面。
- 橙色可以用于标题字、关键词、短标签、主路径和行动线；它不是只能作为下划线、圈注或箭头。
- 黑色、深蓝黑、橙色、蓝色和蓝灰共同形成文字层级；不要把所有文字都统一成橙色。
