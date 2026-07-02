# 样例任务包

本文件提供可复用的 dry-run 案例。它们用于评估 skill 是否能稳定输出路由、候选方向和 prompt，不用于真实生图。

## 1. 方法论文章 -> 知识卡片组

输入摘要：文章讲一套 AI 工作区方法论，包含规则、台账、skills 和复盘。

预期：

- `article_type`: 方法论文章
- `primary_route`: `knowledge-card-pack`
- `secondary_routes`: [`infographic-poster`]
- `card_pack_narrative`: 总览 -> 分层解释 -> 决策树 -> 流程图 -> 行动卡
- 输出：1 张总览信息图候选，5-7 张知识卡片计划

## 2. 技术说明 -> 架构图 + 流程图

输入摘要：文章解释内容摄取、清洗、LLM 生成、人工审核、生图和归档链路。

预期：

- `article_type`: 技术说明
- `primary_route`: `technical-architecture`
- `secondary_routes`: [`process-flow`]
- 人物呈现：`small-character` / `partial-character` / `no-character`
- 输出：1 张架构图候选，1 张流程图候选

## 3. 项目复盘 -> 情绪图 + 流程图

输入摘要：项目从混乱需求开始，经历重构、返工、清单治理，最终形成稳定流程。

预期：

- `article_type`: 项目复盘
- `primary_route`: `process-flow`
- `secondary_routes`: [`emotion-anchor`]
- 输出：1 张流程图，1 张情绪锚点图或总结卡

## 4. 小红书首图 -> 封面候选

输入摘要：标题为“我把 Codex 从对话工具变成了工作区系统”。

预期：

- `article_type`: 产品/服务介绍 或 方法论文章
- `primary_route`: `platform-cover`
- `secondary_routes`: [`emotion-anchor`]
- 比例：`3:4`
- 输出：3 个封面方向，分别偏标题、人物动作、关键词表达

## 5. 高密度文章 -> 信息图 + 卡片组

输入摘要：文章同时包含背景、问题、路径、工具、检查点、结果和风险。

预期：

- `article_type`: 高密度资料整理
- `primary_route`: `infographic-poster`
- `secondary_routes`: [`knowledge-card-pack`]
- `information_density`: `high`
- 输出：1 张总览信息图，5-9 张知识卡片计划

## 使用方式

```text
Use $xinghe-illustrations-skill 先不要生图。
请用 docs/examples/sample-task-packs.md 的第 1 个样例做 dry-run。
输出文章类型、路由评分、推荐产物、候选方向和默认 prompt-only 交付格式。
```
