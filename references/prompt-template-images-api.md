# Images Edits API 精简提示词模板

用于只支持 Images edits 且能上传参考图的第三方代理。旧版 Images API 对长 prompt 更容易超时；这里使用短 prompt，把人物一致性交给 `assets/examples/00-xinghe-ip-baseline.png`，把构图动作交给场景参考图。真实生成必须用 `--style-references` 同时传入两类参考图；不支持纯文本 Images 生成作为合格星禾图链路。

## 单张生图模板

```text
Create one {aspect_ratio} Chinese Xinghe content visual.

Cool white or very light blue-gray background, crayon line art, breathable spacing, subtle hand-drawn panels or dotted dividers when structure is needed, light hand-drawn grain. Main character Xinghe must match the baseline reference: young woman, long black slightly wavy hair, airy bangs, gentle smile, oversized white zip hoodie, dark navy sailor collar top, white neckerchief, dark navy pleated skirt. She must perform the core action, not stand as decoration. Show only one Xinghe figure; do not add portrait bubbles, duplicate characters, or avatar insets.

Visual route: {xinghe-article / emotion-anchor / explanatory-diagram / comic-strip / knowledge-card-single / infographic-poster}

Scene: {一句话描述当前文章锚点和星禾动作}

Show only one clear idea: {核心意思}

Elements: {2-4 个物件，例如 inspiration bottle, content cards, calendar, whiteboard, automation box}

Handwritten Chinese labels, short and sparse: {3-5 个短词}

Use black/dark navy for lines and baseline readable labels, cool blue-gray for panels or secondary structure, orange as optional text color for selected title words, keywords, short labels, and main flow, blue for feedback/AI notes, red only for key warning or conclusion.

Do not create a cold PPT template, course slide, commercial poster, cute mascot, realistic UI screenshot, yellow background, generic top-left type title, duplicate Xinghe, or portrait bubble. A simple hand-drawn explanatory diagram, card, comic strip, or infographic map is allowed when it clarifies the content. Use the baseline reference for Xinghe character only; use the scene reference for composition and annotation density only; invent a fresh composition.
```

## 改图/风格锚定模板

配合 `--style-references assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-match>.png` 使用：

```text
Use the provided baseline image as Xinghe character anchor, and the scene reference only as composition/style anchor.
Create a new {aspect_ratio} Chinese Xinghe content visual on a cool white or very light blue-gray background.
Keep Xinghe consistent with the baseline: long black wavy hair, airy bangs, oversized white zip hoodie, dark navy sailor collar top, white neckerchief, dark navy pleated skirt, gentle smile, crayon line art, readable dark labels, cool blue-gray structure, and sparse orange/blue/red handwritten labels.
Show only one Xinghe figure; do not add portrait bubbles, duplicate characters, or avatar insets.

Visual route: {视觉路由}
New scene: {星禾正在做什么}
Core idea: {这张图表达什么}
Labels: {3-5 个中文短词}

Do not copy the reference composition, character, text, watermark, or objects. Do not make a cold PPT template, commercial poster, realistic UI, yellow background, dense text, duplicate Xinghe, or portrait bubble.
```

## 压缩规则

- 控制在 120-180 个英文词以内。
- 不列完整 style DNA，只保留会影响成图的 8-10 个强约束。
- 中文标注最多 5 个，每个 2-8 字。
- 始终搭配 `--style-references` 传入 `00-xinghe-ip-baseline.png` 和 1 张场景参考图，不要只靠文字维持 IP 一致性。
