# 失败回收策略

本文件用于把失败结果快速转成返工指令。生成后先用 `qa-checklist.md` 判断问题，再按本文件选择修复策略。

## 常见失败与修复

| 失败类型 | 判断信号 | 修复策略 |
|---|---|---|
| 人物漂移 | 发型、服饰、气质不像星禾 | 强化人物基准图；减少复杂姿势；只保留一个人物 |
| 人物太抢 | 人物遮挡节点、箭头或文字 | 降级为 `small-character`、`partial-character` 或 `no-character` |
| 文字错字 | 标题、术语、数字出错 | 减少文字；只保留原文短标签；优先重生或局部编辑 |
| 信息太散 | 不知道从哪里开始看 | 增加 `reading_path`；改用路径卡、决策树或分层卡 |
| 信息太挤 | 字小、节点多、看不清 | 拆成知识卡片组；降低文字密度；减少节点 |
| 太像 PPT | 规则框、硬箭头、商业课件感 | 改成手绘分区、浅蓝灰模块、蜡笔线和短批注 |
| 背景太空 | 信息漂在白底上 | 增加浅蓝灰分区、虚线边界、点阵或轻量承载面 |
| 情绪过火 | 哭喊、鸡血、表情包化 | 降低表情强度；让动作承担情绪，不靠夸张脸 |
| 信息图过密 | 海报塞全文 | 只保留总览，细节拆成 `knowledge-card-pack` |
| 卡片无关系 | 多个知识点只是堆放 | 写清 `knowledge_relation`；无关系则拆卡 |
| 漫画无推进 | 每格重复同一句 | 删除无效格；降级为解释图或单张知识卡 |

## 修复 prompt 模板

### 人物漂移

```text
Regenerate with stronger Xinghe identity. Use the baseline character reference as the primary identity anchor. Keep one Xinghe only: long black slightly wavy hair, airy bangs, white zip hoodie, dark navy sailor collar top, white neckerchief, dark navy pleated skirt. Simplify the pose and keep the original information structure.
```

### 文字错字

```text
Regenerate with fewer Chinese labels. Use only these exact source-locked words: {labels}. Do not add new words, numbers, English, contact info, QR codes, or fake UI text. Keep labels large and readable.
```

### 信息太散

```text
Regenerate with a clear reading path: {start} -> {middle} -> {end}. Make the primary panel visually dominant, secondary panels smaller, and use subtle hand-drawn dividers to guide the eye.
```

### 信息太挤

```text
Reduce the amount of text and nodes. Keep only {must_keep_items}. Split overflow content into a separate knowledge card instead of shrinking the text.
```

### 太像 PPT

```text
Keep the same logic, but remove the PPT-template feeling. Use cool white or very light blue-gray background, hand-drawn crayon panels, soft dashed dividers, short note labels, and organic spacing. Avoid rigid business slide layout.
```

## 输出字段

返工建议使用：

```json
{
  "failure_type": "信息太挤",
  "root_cause": "单张图承载了 10 个节点和长句",
  "recovery_action": "拆成 3 张知识卡片",
  "rewrite_prompt": "..."
}
```
