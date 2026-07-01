# 生图提示词模板

每张图或每张卡片单独生成。根据正文内容替换变量。只有 `comic-strip` 多格漫画允许在一张图内出现 2-4 格；其他任务不要把多个候选拼在一张图里。

## 模板索引

按视觉路由跳读对应模板，不要每次从头到尾套用：

| 路由 | 使用模板 |
|---|---|
| `xinghe-article` / `emotion-anchor` / `explanatory-diagram` | 顶部“通用单图模板” |
| `knowledge-card-single` | “知识卡片模板” |
| `comic-strip` | “多格漫画模板” |
| `infographic-poster` | “信息图海报模板” |
| `platform-cover` 公众号 | “公众号封面模板” |
| `platform-cover` 小红书 | “小红书封面模板” |
| `prompt-only` 批量交付 | “Prompt-only JSON 格式” |
| 图片返工 | “图像编辑提示” |

文字来源、标题、数字和错字处理统一遵守 `text-rendering-rules.md`；封面标题长度和安全区再读取 `cover-text-rules.md`。

```text
Generate one standalone {aspect_ratio} Chinese content visual in Xinghe IP style.

Visual DNA:
Pure white background. Crayon line art with visible grain and slightly wobbly hand-drawn strokes. Lots of empty white space. Sparse red/orange/blue handwritten Chinese annotations. Bright creator-note and social-ops whiteboard sketch feeling, friendly but restrained, clean and easy to understand. No gradients, no shadows, no paper texture, no complex background, no commercial vector style, no cold PPT-template look, no cute mascot poster, no children's illustration, no realistic UI, no yellow background.

Recurring IP character required:
星禾, a young woman personal IP matching the baseline character reference: long black slightly wavy crayon hair, light airy bangs, round bright focused eyes, gentle small smile, oversized white zip hoodie, dark navy sailor collar top with white stripes, white neckerchief, and dark navy pleated skirt. Draw her with crayon texture, black or dark navy layered hair strokes, simple non-realistic facial features, subtle warm cheek color, and blue-black hoodie folds, zipper, and cuff linework. A small transparent glass inspiration bottle with tiny star ideas is her key memory prop when relevant. 星禾 must perform the core action, not decorate the scene. Make her energetic, warm, reliable, and clear-minded, not childish, not over-cute, and not a realistic portrait.

Action rule:
Choose Xinghe's pose from the image meaning, not from a fixed default. Use the inspiration bottle only for inspiration-capture scenes. For blocked flows, make her move the blockage or reconnect the broken line. For classification, make her sort cards. For automation, make her plug in cables or press a button. For trust or evidence, make her lay evidence cards, inspect them, or build a small bridge. Never keep the same raised-bottle pose across unrelated images.

Theme:
{正文配图主题}

Visual route:
{路由：xinghe-article / emotion-anchor / explanatory-diagram / comic-strip / knowledge-card-single / infographic-poster}

Illustration type:
{图型：concept / process / comparison / data / scene / metaphor / handoff / review-loop / emotion-anchor / explanatory-diagram / comic-strip / knowledge-card}

Structure type:
{结构类型：灵感生产小装置 / 内容流水线 / 运营白板 / 自动化小盒子 / 内容日历 / 复盘回流 / 多形态内容 / 清醒判断 / 小分镜 / 左右对比 / 知识卡片 / 信息地图}

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

Text source:
Use only source-locked Chinese words, numbers, and terms from the article or user-confirmed title. Do not invent numbers, promises, platform functions, contact information, QR codes, prices, or random English.

Constraints:
One image explains one core information goal. Xinghe's body pose and hand action must be different when the topic is different. Preserve generous blank white space unless this is an infographic-poster. Use short, readable Chinese labels. Do not write a generic type title in the top-left corner. Do not write the route name or structure type on the image. A hand-drawn explanatory diagram, knowledge card, comic strip, or infographic poster is allowed when it clarifies the content, but it must not become a cold PPT template, course slide, dense UI, or commercial poster. Do not copy prior examples or reuse known case compositions unless explicitly requested; invent a fresh visual metaphor for this specific article.
```

## 平台尺寸预设

默认按视觉路由选择比例，不再固定正文 16:9。用户明确要求平台适配时，以平台标准优先。

| 用途 | 宽高比 | 建议尺寸 | 说明 |
|---|---|---|---|
| 知识卡片 / 小红书轮播 | 3:4 | 1024x1536 或等比 | 移动端可读优先 |
| 解释图 / 左右对比 | 4:3 | 1536x1152 或等比 | 结构清楚，手机端仍可读 |
| 单概念卡片 | 1:1 | 1024x1024 | 摘要卡、方形社媒图 |
| 正文横图 | 16:9 | 1536x1024 | 横向阅读更清楚时使用 |
| 公众号封面 | 2.35:1 | 1792x768 或等比 | 保留标题区空间，但不要做商业海报 |
| 小红书封面 | 3:4 | 1024x1365 或等比 | 星禾动作仍是核心，不做大字报 |

平台适配时仍遵守星禾 IP、白底蜡笔、少量批注和动作绑定规则。不要因为做封面、卡片或海报就改成暗色科技风、营销海报或课程页。

## 知识卡片模板

```text
Generate one standalone 3:4 vertical Chinese knowledge card in Xinghe IP style.

Visual DNA:
Pure white background, crayon line art, clean mobile-readable layout, friendly creator-note feeling. Use simple panels, rounded hand-drawn boxes, short labels, and generous spacing. Not a PPT slide, not a commercial poster, not a dense long-image.

Card role:
{封面卡 / 总览卡 / 核心观点卡 / 对比卡 / 流程卡 / 清单卡 / 总结卡}

Chinese text:
Render these Chinese words exactly and only these words:
Title: "{卡片标题}"
Bullets: "{要点1}" / "{要点2}" / "{要点3}" / "{可选要点4}"
Bottom note: "{可选底部总结}"

Xinghe action:
星禾 matches the baseline character reference. She is {整理卡片 / 贴标题 / 称量两侧观点 / 接通流程线 / 圈出重点 / 把混乱信息收进卡片盒}. She must guide the knowledge structure, not decorate it.

Composition:
{上标题 + 中部 3 点卡片 + 底部总结条 / 左右对比 + 中间星禾称量 / 顶部结论 + 中部流程 + 底部提醒}. Keep all text large enough for phone reading.

Constraints:
Do not copy reference image text, character, watermark, brand, or color scheme. Do not put paragraphs into the card. If text is too long, split into multiple cards.
```

## 多格漫画模板

```text
Generate one standalone {2-panel / 3-panel / 4-panel} comic-strip image in Xinghe IP style.

Visual DNA:
Pure white background, crayon line art, clean hand-drawn panel borders, consistent scene world, readable Chinese labels. Not a manga poster, not a busy commercial comic page.

Story logic:
Panel 1: {起点或误区}
Panel 2: {冲突、卡住或发现}
Panel 3: {星禾采取动作}
Panel 4: {结果或反转，可选}

Xinghe:
Use one consistent Xinghe character matching the baseline reference across panels. Her action must change in each panel according to the story.

Chinese text:
Use only short source-locked labels or one short line per panel. No long dialogue.

Constraints:
Each panel must advance the meaning. If a panel does not change the story, remove it. Do not create multiple unrelated mini illustrations.
```

## 信息图海报模板

```text
Generate one standalone {3:4 / 4:3} Chinese infographic poster in Xinghe IP style.

Visual DNA:
Pure white background, crayon line art, hand-drawn map or matrix layout, clear hierarchy, mobile-readable text. It may use sections, arrows, numbered steps, and cards, but it must feel like a hand-drawn knowledge map, not a PPT template.

Whole-map topic:
{整篇文章或流程的总览主题}

Structure:
{流程地图 / 2x2 矩阵 / 三层框架 / 输入-处理-输出 / 问题-方法-结果}

Xinghe role:
星禾 is small but important: {拿笔整理地图 / 指向关键路径 / 把卡片放进矩阵 / 连接输入输出}. She supports the information map without becoming decorative.

Chinese labels:
{分区标题和短标签，全部来自原文}

Constraints:
Default maximum one infographic poster per article. Do not cram the full article into one image. If text becomes dense, split into knowledge cards.
```


## 公众号封面模板

用户要求公众号封面、微信文章头图或横版文章封面时使用。生成前先读取 `platform-cover-standards.md`、`cover-text-rules.md` 和 `cover-composition-patterns.md`。

```text
Generate one standalone WeChat public-account article cover in Xinghe IP style.
Aspect ratio: 2.35:1 wide horizontal cover, recommended size 1792x768 or equivalent.

Visual DNA:
Clean pure white background, crayon line art, generous white space, friendly but restrained creator-notebook feeling. Use black/dark navy for main line art, orange for the main action line, blue for secondary notes, red only for one emphasis or warning. No gradients, no shadows, no commercial poster style, no PPT course cover, no dense infographic, no complex background.

Chinese cover title:
Render this Chinese title text exactly as provided, with no typo, no extra words, and no random English:
"{公众号封面标题}"
Title layout: {1-2 行；左侧或中左；每行不超过 10 个中文字符；标题不得贴边}
Optional subtitle or tiny label: {可为空；最多 1 个很短副标}
Keyword emphasis: {可为空；只强调 1 个词；用红橙/粉紫下划线或圈注}

Xinghe character:
星禾, matching the baseline character reference: long black slightly wavy crayon hair, airy bangs, round focused eyes, gentle small smile, oversized white zip hoodie, dark navy sailor collar top with white stripes, white neckerchief, dark navy pleated skirt. Only one Xinghe character.

Cover action:
星禾 must physically support the article idea, not stand as decoration. She is {整理文件盒 / 托起方法卡 / 铺证据卡 / 拉起流程线 / 圈出关键判断 / 打开工作区盒子}, showing {封面核心判断}.

Composition:
Use {左标题右行动 / 中标题下轻场景 / 宽留白单物件}. Keep the title on the left or center-left with safe margins, Xinghe and one core object on the right or lower-right. Keep all important text and face away from edges. The cover should still be readable as a small chat thumbnail.

Objects:
Use only 1-3 simple objects tied to the article: {文件盒 / 规则卡 / 台账本 / 流程线 / 内容卡 / 小工作台}. Do not add tags, QR codes, contact information, price, or call-to-action text.

Constraints:
One cover communicates one article theme. Do not make it a marketing poster, course slide, tech UI, product ad, or full-page text poster. Do not use multiple people. Do not copy old reference scenes. Preserve Xinghe IP consistency and clean crayon texture.
```

## 小红书封面模板

用户要求小红书封面、笔记首图、竖版首图或类似用户参考图的大字标题卡片时使用。生成前先读取 `platform-cover-standards.md`、`cover-text-rules.md` 和 `cover-composition-patterns.md`。

```text
Generate one standalone Xiaohongshu note cover in Xinghe IP style.
Aspect ratio: 3:4 vertical cover, recommended size 1024x1365 or equivalent.

Visual DNA:
Clean pure white or very light dotted white background, crayon line art, generous white space, creator-notebook feeling, friendly but not childish. No gradients, no yellow poster background, no commercial poster style, no PPT slide, no course cover, no dense infographic, no realistic UI.

Chinese cover title:
Render this Chinese title text exactly as provided, with no typo, no extra words, and no random English:
"{小红书封面标题，按 2-4 行给出}"
Title layout: large typed Chinese title in the upper half, 2-4 lines, each line short and readable on mobile. Keep safe margins around all text.
Keyword emphasis: emphasize only "{关键词}" using one pink-purple or orange underline/circle. Do not highlight multiple words.

Xinghe character:
星禾, matching the baseline character reference: long black slightly wavy crayon hair, airy bangs, round focused eyes, gentle small smile, oversized white zip hoodie, dark navy sailor collar top with white stripes, white neckerchief, dark navy pleated skirt. Only one Xinghe character.

Cover action:
In the lower half, 星禾 is {整理文件盒 / 托起一叠方法卡 / 把散落卡片放回系统 / 拉出一条工作流 / 圈出关键卡片}. Her action must support the title claim: {封面核心判断}. She is not a sticker or decorative mascot.

Composition:
Use {上标题下人物 / 标题卡片 + 星禾小场景 / 左上标题右下承托 / 中心大标题 + 底部微动作}. Keep the title dominant and Xinghe clearly visible. Preserve 6%-8% edge margins. Do not place important text near bottom UI/crop areas.

Objects:
Use only 1-3 simple objects tied to the note: {文件盒 / Codex 卡片 / 规则卡 / 台账本 / 复盘卡 / 小工作台}. Extra object labels are optional and limited to 1-2 short words.

Constraints:
This should look like a personal method note cover, not a marketing poster. One cover, one claim. No hashtags, no CTA, no QR code, no contact information, no long subtitle, no multiple people, no copied reference-scene objects.
```
## Prompt-only JSON 格式

用户要求 prompt-only、只要提示词、不调用 API 时，可输出：

```json
{
  "mode": "prompt-only",
  "article": "文章或主题名称",
  "platform": "article / wechat-cover / xhs-cover / knowledge-card-pack / knowledge-card-single / comic-strip / infographic-poster",
  "pictures": [
    {
      "id": 1,
      "position": "放在哪段后，封面可写 cover",
      "selection_signal": "流程或步骤描述",
      "illustration_type": "process",
      "topic": "图的主题",
      "recommended_candidate": "A",
      "candidates": [
        {
          "id": "A",
          "direction": "标题强表达 / 人物动作强表达 / 留白品牌感 / 正文隐喻方向 / 解释图方向 / 知识卡片方向 / 多格漫画方向",
          "core_metaphor": "把卡住的内容流重新接回轨道",
          "xinghe_action": "星禾正在接线并把卡住的内容卡放回轨道",
          "composition": "星禾在画面右侧，左侧留出短标注和流程入口",
          "chinese_labels": ["卡点", "接回", "复盘"],
          "reference_images": [
            "assets/examples/00-xinghe-ip-baseline.png",
            "assets/examples/05-handoff-path.png"
          ],
          "aspect_ratio": "4:3",
          "size": "1536x1152",
          "reason": "适合表现流程重新跑通，动作清楚且不会变成复杂架构图",
          "output_filename_when_generated": "01-topic-a.png",
          "prompt": "完整单图生图提示词"
        },
        {
          "id": "B",
          "direction": "另一个独立视觉方向",
          "core_metaphor": "把散落卡片收进一个小工作台",
          "xinghe_action": "星禾正在整理卡片并贴上简短标签",
          "composition": "中心低科技工作台，四周大量留白",
          "chinese_labels": ["选题", "生产", "发布"],
          "reference_images": [
            "assets/examples/00-xinghe-ip-baseline.png",
            "assets/examples/08-handoff-copy-toolbox.png"
          ],
          "reason": "适合表现内容整理和工作区化，比流程线更亲切",
          "output_filename_when_generated": "01-topic-b.png",
          "prompt": "完整单图生图提示词"
        }
      ]
    }
  ]
}
```

`pictures[]` 中每一项对应一个配图选点；`candidates[]` 中每一项对应一个独立候选方向和独立 prompt。真实生成多候选时必须分别保存为 `01-topic-a.png`、`01-topic-b.png`、`cover-a.png` 等文件，严禁把多张图合成一张，也不要覆盖旧图。

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
