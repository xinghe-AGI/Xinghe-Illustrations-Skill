# 黄金测试集运行说明

`golden-test-set.json` 是 skill 的固定 dry-run 回归测试集。它用于每次修改规则、README、prompt 模板、CLI 或参考图体系后，快速判断输出是否还稳定。

它不用于真实生图，不请求 API。

## 使用方式

把其中任一 case 交给 Agent：

```text
Use $xinghe-illustrations-skill 先不要真实生图。
请读取 docs/tests/golden-test-set.json 的 golden-07-panoramic-infographic 用例，做 dry-run。
输出 article_type、route_scores、primary_route、secondary_routes、recommended_outputs、visual_candidates、text_inventory、reference_images、manifest_ready_items 和 route_risks。
最后对照 must_check / must_not 自评是否通过。
```

整套回归时，按 13 个 case 逐个跑，不要跳过失败项。

## 通过标准

每个 case 都要检查：

- `primary_route` 是否符合预期。
- `secondary_routes` 是否合理，不乱加无关路由。
- 比例是否匹配平台和内容。
- 人物呈现是否符合图型：封面/情绪/漫画需要服务内容，架构/流程/全景可小人物或无人物。
- 是否输出 `text_inventory`，且画面文字来源清楚。
- 是否给出可生成的 `reference_images`。
- 是否停在 prompt-only / dry-run，未请求 API。
- 是否解释 `must_check` 和 `must_not` 的通过情况。

建议结果格式：

```text
用例：golden-07-panoramic-infographic
结论：通过 / 部分通过 / 不通过
主要路由：panoramic-infographic
辅助路由：knowledge-card-pack
命中项：
- ...
风险：
- ...
需要修正规则：
- ...
```

## 失败处理

- 路由错：回到 `references/route-scoring.md`、`references/visual-routing-and-candidates.md`。
- 比例错：回到 `references/prompt-template.md` 和 `docs/usage-and-generation.md`。
- 文字失控：回到 `references/text-rendering-rules.md`。
- 人物过大或漂移：回到 `references/xinghe-ip.md`、`references/technical-architecture-and-flow.md`、`references/reference-images.md`。
- 全景图过密：回到 `references/panoramic-infographic.md` 和 `references/text-density-rules.md`。
- manifest 无法 dry-run：回到 `references/output-spec.md` 和 `scripts/xinghe_image_assets_cli.js`。

## 维护规则

- 新增能力时，至少新增 1 个 golden case。
- 修复一次真实返工时，如果它代表高频失败，也新增或修改 golden case。
- 不把真实 API key、URL、客户信息或未公开文章全文写进测试集。
- 测试集只保存短摘要和预期行为，不保存长文章原文。
