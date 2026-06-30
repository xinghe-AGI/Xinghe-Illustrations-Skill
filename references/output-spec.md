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
| `visual-routing.md` | 逐节配图判断表、深度提炼五问、最终视觉路由 |
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
  "items": [
    {
      "id": 1,
      "route": "knowledge-card-single",
      "position": "第 2 节后",
      "topic": "核心观点卡",
      "aspect_ratio": "3:4",
      "recommended_candidate": "A",
      "candidates": [
        {
          "id": "A",
          "direction": "解释图方向",
          "core_metaphor": "把混乱内容整理成三张方法卡",
          "xinghe_action": "星禾把散落卡片贴到白板上",
          "composition": "上方标题，中部三张卡，底部一句总结",
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

不覆盖已有文件；除非用户明确要求替换，否则换新序号。
