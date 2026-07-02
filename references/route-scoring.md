# 路由评分标准

本文件用于把“应该生成什么图”从直觉判断变成可复核评分。读完文章后，先给候选路由打分，再决定 `primary_route` 和 `secondary_routes`。

## 评分字段

每个候选路由使用 1-5 分：

| 分数 | 含义 |
|---:|---|
| 5 | 强匹配，应该优先生成 |
| 4 | 匹配度高，适合作为主路由或重要辅助 |
| 3 | 有价值，但需要和其他路由组合或降级 |
| 2 | 弱匹配，除非用户明确要求，否则不建议 |
| 1 | 不匹配，不生成 |

每次评分必须写明 `score`、`reason`、`risk` 和 `output_role`。

```json
{
  "route_scores": [
    {
      "route": "knowledge-card-pack",
      "score": 5,
      "reason": "文章知识点多且需要分张阅读",
      "risk": "卡片之间可能像散点清单",
      "output_role": "主输出"
    }
  ]
}
```

## 路由评分维度

| 路由 | 高分信号 | 降分信号 |
|---|---|---|
| `platform-cover` | 用户要封面、标题强、需要第一眼点击 | 只是正文解释，不需要首图 |
| `emotion-anchor` | 有强痛点、反差、误区、压力、松一口气 | 内容是纯技术步骤或精确结构 |
| `explanatory-diagram` | 有抽象概念、机制、因果、轻流程 | 节点太多、工程关系太精确 |
| `technical-architecture` | 有组件、数据流、边界、模块、权限 | 只是方法论或情绪表达 |
| `process-flow` | 有步骤、状态、审批、回流、SOP | 只有一个观点，没有过程 |
| `comic-strip` | 有前后变化、误会解除、转折、情绪阶段 | 只是列表拆格，删一格不影响理解 |
| `knowledge-card-pack` | 长文、多知识点、适合收藏复习 | 只有单一观点或一张图就够 |
| `knowledge-card-single` | 单观点、单对比、单流程、单清单 | 信息超过单屏可读 |
| `infographic-poster` | 全景、地图、矩阵、方法全貌、路径总览 | 只是想把全文压进一张图 |
| `xinghe-article` | 一个正文锚点、一图一概念、场景瞬间 | 应该走结构图、卡片或封面 |

## 选择规则

- `primary_route` 通常选择最高分路由。
- `secondary_routes` 只选择 4 分及以上，或 3 分但能明显补足主路由短板的路由。
- 如果两个路由都是 5 分，不要硬塞到一张图里，优先拆成两个输出。
- 如果最高分只有 3 分，先输出“不建议强行生图”的理由，并给 prompt-only 或文字结构建议。
- 如果 `infographic-poster` 是 5 分且 `knowledge-card-pack` 也是 4-5 分，默认建议“1 张总览信息图 + 多张知识卡片”。
- 如果 `comic-strip` 是 4-5 分且 `emotion-anchor` 是 4-5 分，漫画必须写 `emotion_arc`。

## 输出要求

在 `visual-routing.md` 或 prompt-only JSON 中保留：

- `article_type`
- `route_scores`
- `primary_route`
- `secondary_routes`
- `why_this_route`
- `information_density`
- `recommended_outputs`
- `route_risks`
