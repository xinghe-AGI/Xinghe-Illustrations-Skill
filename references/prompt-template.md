# 生图提示词模板

每张图单独生成。根据正文内容替换变量，不要把多张图拼在一起。

```text
Generate one standalone 16:9 horizontal Chinese article illustration.

Visual DNA:
Pure white background. Crayon line art with visible grain and slightly wobbly hand-drawn strokes. Lots of empty white space. Sparse red/orange/blue handwritten Chinese annotations. Bright creator-note and social-ops whiteboard sketch feeling, friendly but restrained, clean and easy to understand. No gradients, no shadows, no paper texture, no complex background, no commercial vector style, no PPT infographic look, no cute mascot poster, no children's illustration, no realistic UI, no yellow background.

Recurring IP character required:
星禾, a young woman personal IP matching the baseline character reference: long black slightly wavy crayon hair, light airy bangs, round bright focused eyes, gentle small smile, oversized white zip hoodie, dark navy sailor collar top with white stripes, white neckerchief, and dark navy pleated skirt. Draw her with crayon texture, black or dark navy layered hair strokes, simple non-realistic facial features, subtle warm cheek color, and blue-black hoodie folds, zipper, and cuff linework. A small transparent glass inspiration bottle with tiny star ideas is her key memory prop when relevant. 星禾 must perform the core action, not decorate the scene. Make her energetic, warm, reliable, and clear-minded, not childish, not over-cute, and not a realistic portrait.

Action rule:
Choose Xinghe's pose from the image meaning, not from a fixed default. Use the inspiration bottle only for inspiration-capture scenes. For blocked flows, make her move the blockage or reconnect the broken line. For classification, make her sort cards. For automation, make her plug in cables or press a button. For trust or evidence, make her lay evidence cards, inspect them, or build a small bridge. Never keep the same raised-bottle pose across unrelated images.

Theme:
{正文配图主题}

Illustration type:
{图型：concept / process / comparison / data / scene / metaphor / handoff / review-loop}

Structure type:
{结构类型：灵感生产小装置 / 内容流水线 / 运营白板 / 自动化小盒子 / 内容日历 / 复盘回流 / 多形态内容 / 清醒判断 / 小分镜}

Core idea:
{这张图要表达的核心意思}

Composition:
{具体画面：星禾在哪里、正在做什么、她的动作如何解决这张图的核心问题、主要物件是什么、信息如何流动}

Suggested elements:
{元素1} / {元素2} / {元素3} / {元素4}

Chinese handwritten labels:
{标注词1} / {标注词2} / {标注词3} / {标注词4} / {可选标注词5}

Color use:
Black or dark navy for main crayon line art, hair, and core objects. Blue for hoodie folds, AI/assistant state, secondary notes, and feedback. Orange for the main creative or operational flow line and arrows. Red only for key breakpoints, warnings, or conclusions.

Constraints:
One image explains only one core creative or operational structure. Xinghe's body pose and hand action must be different when the topic is different. Keep the main subject around 40%-60% of the canvas. Preserve at least 35% blank white space. Use at most 5-8 short handwritten Chinese labels. Do not write a title in the top-left corner. Do not write the structure type on the image. Do not make it a formal diagram, course slide, or dense explainer. Do not copy prior examples or reuse known case compositions unless explicitly requested; invent a fresh visual metaphor for this specific article. It should be clear but not instructional, energetic but not childish, operational but not PPT-like, insightful but not crowded.
```

## 平台尺寸预设

默认只做正文配图。用户明确要求封面或平台适配时再切换尺寸。

| 用途 | 宽高比 | 建议尺寸 | 说明 |
|---|---|---|---|
| 正文配图 | 16:9 | 1536x1024 | 默认；用于公众号、长文、社媒正文 |
| 公众号封面 | 2.35:1 | 1792x768 或等比 | 保留标题区空间，但不要做商业海报 |
| 小红书封面 | 3:4 | 1024x1365 或等比 | 星禾动作仍是核心，不做大字报 |
| 方图 | 1:1 | 1024x1024 | 用于头像式摘要或卡片封面 |

平台适配时仍遵守星禾 IP、白底蜡笔、少量批注和动作绑定规则。不要因为做封面就改成暗色科技风、营销海报或大标题封面。

## Prompt-only JSON 格式

用户要求 prompt-only、只要提示词、不调用 API 时，可输出：

```json
{
  "mode": "prompt-only",
  "article": "文章或主题名称",
  "platform": "article-16x9",
  "pictures": [
    {
      "id": 1,
      "position": "放在哪段后",
      "selection_signal": "流程或步骤描述",
      "illustration_type": "process",
      "topic": "图的主题",
      "xinghe_action": "星禾正在接线并把卡住的内容卡放回轨道",
      "prompt": "完整单图生图提示词"
    }
  ]
}
```

`pictures[]` 中每一项对应一张独立图片，严禁把多张图合成一张。

## 灵感场景样张提示词

只用于“灵感捕捉/创意启动”。不要把这个姿势作为所有图片的默认姿势。

```text
Generate one standalone 16:9 horizontal Chinese article illustration.
Pure white background, crayon line art, lots of empty white space, sparse red/orange/blue handwritten Chinese annotations.

星禾, a young woman matching the baseline character reference, with long black slightly wavy hair, light airy bangs, round bright focused eyes, gentle small smile, oversized white zip hoodie with blue-black crayon folds, dark navy sailor collar top, white neckerchief, and dark navy pleated skirt, stands slightly left of center. She raises a small transparent glass inspiration bottle filled with tiny star-shaped ideas. From the bottle, a few star ideas flow through an orange crayon line into a small low-tech content machine on a simple desk. The machine outputs three content cards on the right: "短帖", "长文", "视频脚本". Under the machine, a tiny automation box catches "重复工作" and sends a blue feedback note back toward the bottle. 星禾 uses one hand to hold the bottle and the other hand to guide the orange flow line.

Use black and dark navy crayon for line art and hair, blue for hoodie folds and feedback note, orange for the main creative workflow line, red only to circle "容易断". Keep the image clean, not a PPT, not a formal flowchart, not cute, no top-left title, no yellow background.
```

## 图像编辑提示

增强星禾参与感：

```text
Regenerate this illustration with the same core meaning and simple layout, but make 星禾 more central to the action. 星禾 should be catching inspiration, guiding a workflow, sorting content cards, scheduling, launching automation, weighing evidence, or marking the key point herself, not standing beside the diagram. Keep it pure white, sparse, crayon-textured, friendly, energetic, and not PPT-like.
```

纠正固定姿势：

```text
Regenerate this illustration with the same Xinghe IP appearance and crayon style, but change her pose to match the specific content. Do not use the raised inspiration-bottle pose unless the scene is about catching inspiration. Make Xinghe physically perform the core action: moving the blockage, reconnecting a broken flow, sorting cards, plugging in an automation box, laying evidence cards, building a small bridge, weighing evidence, or sending feedback back into the loop. Keep the composition sparse, pure white, and not PPT-like.
```

去掉左上角标题：

```text
Edit the provided image. Remove only the handwritten title "{要删除的文字}" and its underline from the top-left corner. Fill that area with the same clean white background, matching the surrounding blank area. Preserve everything else exactly: 星禾, labels, paths, line style, composition, aspect ratio, and image quality. Do not add any new text or objects.
```
