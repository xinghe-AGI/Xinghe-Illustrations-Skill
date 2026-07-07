# 输出包规范

默认把一次视觉生产交付为一个发布包，而不是零散 prompt。

## 默认目录

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

`images/` 只在真实生图后出现。

## 文件说明

| 文件 | 内容 |
|---|---|
| `source-summary.md` | 来源、核心观点、目标读者、风险点、必须保留的术语和数字 |
| `visual-routing.md` | 逐节配图判断表、深度提炼五问、文章类型、路由评分、主路由/辅助路由、信息密度、建议产物和路由风险 |
| `visual-candidates.md` | 每个配图点或卡片的 A/B/C 候选方向 |
| `prompts.json` | prompt-only 交付，包含每个候选的完整 prompt |
| `manifest.json` | 真实生成用 manifest，可包含混合比例、文件名和参考图 |
| `publish-notes.md` | 使用说明、发布提醒、人工审核清单 |

## prompts.json

```json
{
  "mode": "prompt-only",
  "title": "内容标题",
  "source_type": "wechat / markdown / pasted-text / screenshot / topic",
  "default_output_dir": "outputs/xinghe-illustration-packs/2026-06-30-title",
  "default_delivery": [
    "source_summary",
    "visual_routing",
    "recommended_outputs",
    "visual_candidates",
    "prompts",
    "pre_generation_checklist"
  ],
  "routing_decision": {
    "article_type": "方法论文章",
    "article_type_confidence": "high",
    "type_signals": ["有框架", "有步骤", "有适用条件"],
    "default_visual_strategy": ["knowledge-card-pack", "panoramic-infographic"],
    "route_scores": [
      {
        "route": "panoramic-infographic",
        "score": 5,
        "reason": "文章需要系统全景和主链路总览",
        "risk": "信息过密、文字过小",
        "output_role": "主输出"
      }
    ],
    "primary_route": "panoramic-infographic",
    "secondary_routes": ["knowledge-card-pack"],
    "information_density": "panoramic-high",
    "recommended_outputs": ["1 张横向全景图", "5 张知识卡片"],
    "route_risks": ["信息过密", "主链路不突出", "卡片之间关系不清"]
  },
  "items": [
    {
      "id": 1,
      "route": "knowledge-card-single",
      "primary_route": "knowledge-card-single",
      "secondary_routes": ["explanatory-diagram"],
      "information_density": "medium",
      "position": "第 2 节后",
      "topic": "核心观点卡",
      "aspect_ratio": "4:3",
      "text_density_level": "medium",
      "text_budget": "1 标题 + 4 要点 + 1 底部总结",
      "text_overflow_plan": "超过 5 个要点时拆成 2 张卡",
      "recommended_candidate": "A",
      "candidates": [
        {
          "id": "A",
          "direction": "解释图方向",
          "primary_route": "knowledge-card-single",
          "secondary_routes": ["explanatory-diagram"],
          "information_density": "medium",
          "text_density_level": "medium",
          "text_budget": "1 标题 + 4 要点 + 1 底部总结",
          "text_overflow_plan": "如果要点超过 5 个，拆成第二张卡",
          "composition_pattern": "左因右果路径卡",
          "knowledge_relation": "旧问题到新结果的因果关系",
          "layout_flow": "左侧问题 -> 中间转折 -> 右侧方法卡",
          "reading_path": "先看左侧卡点，再看中间机制，最后看右侧输出",
          "core_metaphor": "把混乱内容整理成三张方法卡",
          "character_presence": "small-character",
          "xinghe_action": "星禾把散落卡片贴到白板上",
          "composition": "左侧标题和结论，右侧三张方法卡，底部一句总结",
          "chinese_labels": ["输入", "整理", "输出"],
          "reference_images": [
            "assets/examples/00-xinghe-ip-baseline.png",
            "assets/examples/08-handoff-copy-toolbox.png"
          ],
          "output_filename_when_generated": "01-core-card-a.png",
          "prompt": "完整生图提示词"
        }
      ]
    }
  ]
}
```

## manifest.json

CLI 已支持逐项 `size` 和逐项 `style_references`。多比例任务可以写成：

```json
{
  "pictures": [
    {
      "id": 1,
      "topic": "小红书封面",
      "filename": "cover-a.png",
      "size": "1024x1536",
      "style_references": "assets/examples/00-xinghe-ip-baseline.png,assets/examples/18-xhs-typed-title-bottom-xinghe.png",
      "prompt": "完整封面 prompt"
    },
    {
      "id": 2,
      "topic": "解释图",
      "filename": "explain-a.png",
      "size": "1536x1152",
      "style_references": "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png",
      "prompt": "完整解释图 prompt"
    }
  ]
}
```

## 命名规则

- 封面：`cover-a.png`、`cover-b.png`、`wechat-cover-a.png`、`xhs-cover-a.png`
- 正文图：`01-topic-a.png`、`02-topic-b.png`
- 知识卡片：`card-01-cover.png`、`card-02-overview.png`
- 多格漫画：`comic-01-a.png`
- 信息图海报：`poster-a.png`
- 全景信息图：`panorama-a.png`、`panorama-system-map-a.png`
- 技术架构图：`architecture-a.png`、`architecture-layered-a.png`
- 流程图：`flow-a.png`、`workflow-a.png`

不覆盖已有文件；除非用户明确要求替换，否则换新序号。

## 默认交付格式

用户没有明确要求真实图片时，默认交付：

1. `source_summary`：文章类型、核心观点、目标读者、必须保留术语。
2. `visual_routing`：逐节判断、路由评分、主/辅路由、信息密度和风险。
3. `recommended_outputs`：建议生成哪些图，每张图承担什么任务。
4. `visual_candidates`：每张图的 A/B 候选方向。
5. `prompts`：每个候选的完整 prompt 或 prompt-only JSON。
6. `pre_generation_checklist`：人物基准图、参考图、文字密度、输出路径和外部上传确认。
