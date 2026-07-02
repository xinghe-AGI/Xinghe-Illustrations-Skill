# 文章类型与默认视觉策略

本文件用于在路由评分前先判断文章类型。文章类型不是最终路由，但会影响默认视觉策略和输出数量。

## 类型判断

| 文章类型 | 内容信号 | 默认视觉策略 |
|---|---|---|
| 方法论文章 | 概念、原则、步骤、框架、适用条件 | `knowledge-card-pack` + `infographic-poster`；关键概念可补 `explanatory-diagram` |
| 项目复盘 | 背景、问题、过程、转折、结果、经验 | `process-flow` + `emotion-anchor` + `knowledge-card-single` |
| 技术说明 | 架构、模块、数据流、权限、接口、部署 | `technical-architecture` + `process-flow`；人物小或不出现 |
| 观点文章 | 判断、反差、立场、误区、金句 | `emotion-anchor` + `knowledge-card-single`；必要时补封面 |
| 工具介绍 | 功能、适用场景、用法、优缺点 | `explanatory-diagram` + `process-flow` + `knowledge-card-single` |
| 故事型文章 | 角色、冲突、变化、结果、情绪推进 | `comic-strip` + `emotion-anchor` |
| 教程文章 | 步骤、操作、检查点、常见问题 | `process-flow` + `knowledge-card-pack` |
| 产品/服务介绍 | 痛点、方案、价值、使用路径、限制 | `platform-cover` + `explanatory-diagram` + `knowledge-card-single` |
| 高密度资料整理 | 多模块、多分类、多阶段、多路径 | `infographic-poster` + `knowledge-card-pack` |

## 输出字段

每次读文章后输出：

```json
{
  "article_type": "方法论文章",
  "article_type_confidence": "high",
  "type_signals": ["有框架", "有步骤", "有适用条件"],
  "default_visual_strategy": ["knowledge-card-pack", "infographic-poster"]
}
```

## 使用原则

- 文章类型只提供先验，不覆盖路由评分结果。
- 一篇文章可以有主类型和副类型，例如“技术说明 + 项目复盘”。
- 如果文章类型混合，先问“读者最需要看懂什么”：结构、流程、情绪、观点还是行动。
- 不要因为文章是方法论就自动做竖版知识卡；发布场景和信息结构仍然决定比例。
