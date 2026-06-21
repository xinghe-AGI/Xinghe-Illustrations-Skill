# 风格参考图机制

`assets/examples/00-xinghe-ip-baseline.png` 是星禾个人 IP 的人物形象基准图，用来锁定脸、发型、服饰和人物气质。`assets/examples/01-14-*.png` 是正文配图场景参考图，用来参考构图、动作、留白、线条和批注密度。`assets/examples/15-20-*.png` 是微信公众号文章封面和小红书笔记封面参考图，用来参考标题区、人物区、安全边距和封面排版。

真实生图时必须使用“双参考图”，其中人物基准图是硬门槛：

1. 人物基准图：固定传入 `assets/examples/00-xinghe-ip-baseline.png`。
2. 正文配图参考图：从 `assets/examples/01-14-*.png` 中选择 1 张最接近当前构图和星禾动作的图；封面参考图：从 `assets/examples/15-20-*.png` 中选择 1 张最接近平台版式、标题区和安全边距的图。

不要只传场景参考图而漏掉人物基准图。不要用文字描述替代人物基准图。场景参考图只负责构图和动作，不负责改写星禾人物形象。

## 推荐用法

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png"
```

## 参数区别

- `--style-reference <path>`：单张风格锚点图；真实生成星禾图时不推荐单独使用，除非这张图就是 `assets/examples/00-xinghe-ip-baseline.png` 且任务明确不需要场景参考。
- `--style-references <paths>`：多个风格锚点；默认传入“人物基准图 + 场景参考图”，用逗号或分号分隔；不要超过 15 张。
- `--reference <path>` / `--references <paths>`：旧参数，继续兼容，语义等同于 style reference。
- `--image <path>`：用户提供的待编辑图片，也会作为 API `image` 文件上传。

当 `--api-mode images` 且存在 `--style-reference`、`--style-references`、`--reference`、`--references` 或 `--image` 时，CLI 自动调用 `/v1/images/edits` 并发送 `multipart/form-data`。真实生成星禾图不得走没有图片参数的 `/v1/images/generations`；如果没有上传 `00-xinghe-ip-baseline.png`，本次输出不能判定为合格星禾图。

## 如何选择场景参考图

- 先固定人物基准图：`assets/examples/00-xinghe-ip-baseline.png`。
- 再选构图最接近的场景图，而不是选主题文字最接近的图。
- 灵感、内容生产、工作流类：优先选有星禾参与动作和留白稳定的图。
- 排期、日历、发布节奏类：优先选有卡片、日历、白板的图。
- 判断、复盘、证据类：优先选有圈注、放大镜、小秤或反馈回路的图。

## 构图到参考图映射

优先按构图和星禾动作选图，只有构图接近时才考虑主题词。

| 当前图型/场景 | 场景参考图 | 选择原因 |
|---|---|---|
| handoff、内容交接、从选题到下一步 | `assets/examples/05-handoff-path.png` | 星禾在移动中递交内容卡，适合交接和路径感 |
| process、最小闭环、从输入到输出 | `assets/examples/02-minimum-loop.png` | 闭环感强，适合少节点流程 |
| content cards、按用途分拣、整理素材 | `assets/examples/03-sort-by-purpose.png` | 卡片和分类动作清楚 |
| 一稿多用、多平台分发 | `assets/examples/04-one-fish-many-uses.png` | 适合一个内容源被拆成多用途 |
| 多来源汇总、调研输入 | `assets/examples/06-three-sources.png` | 适合三路输入、资料汇合 |
| 内容任务分层、三类工作 | `assets/examples/07-three-content-jobs.png` | 适合三块任务并列，但要避免画成 PPT |
| 文案交给工具箱、AI 协助生产 | `assets/examples/08-handoff-copy-toolbox.png` | 适合人机协作和工具承接 |
| 常见坑、红色提醒、避坑提示 | `assets/examples/09-common-pits-no-title.png` | 适合少量警示和断点 |
| 信息沉淀、信息井、知识库 | `assets/examples/10-information-well.png` | 适合资料下沉和提取 |
| 灵感压制、把想法变成卡片 | `assets/examples/11-idea-press.png` | 适合创意加工，不要滥用于普通流程 |
| 内容发酵、长期积累 | `assets/examples/12-content-fermentation.png` | 适合时间感和内容成熟 |
| 自动化承重、重复劳动转系统 | `assets/examples/13-system-bearing.png` | 适合“系统接住重复工作”，不是普通流程 |
| 信任桥、私域承接、关系建立 | `assets/examples/14-trust-bridge.png` | 适合连接、承诺、转化和信任 |
| 微信公众号封面、左标题右行动 | `assets/examples/15-wechat-left-title-right-action.png` | 适合方法论、观点文、项目复盘的横版封面，左侧留标题，右侧星禾承接动作 |
| 微信公众号封面、大留白单物件 | `assets/examples/16-wechat-wide-white-space.png` | 适合品牌感、抽象判断、系列文章封面，留白稳定，不像海报 |
| 微信公众号封面、轻流程线 | `assets/examples/17-wechat-process-line.png` | 适合工作流、系统、自动化主题，用手绘线表达闭环，避免正式流程图 |
| 小红书封面、上标题下人物 | `assets/examples/18-xhs-typed-title-bottom-xinghe.png` | 适合打字标题、关键词下划线、底部星禾动作的首图 |
| 小红书封面、关键词下划线 | `assets/examples/19-xhs-keyword-underline-card.png` | 适合突出一个核心词的竖版封面，标题清晰，人物在底部承接 |
| 小红书封面、标题卡片与方法堆叠 | `assets/examples/20-xhs-title-card-method-stack.png` | 适合方法帖、收藏型封面，标题卡片和星禾动作共同表达“可复用方法” |

## 失败处理

| 触发条件 | 一线修复 | 仍失败兜底 |
|---|---|---|
| 星禾 IP 不稳定 | 同时传 `00-xinghe-ip-baseline.png` 和最接近的场景参考图 | 减少 prompt 中的服饰冲突，换更接近构图的场景图 |
| 模型只模仿场景图旧人物 | 强化“baseline controls Xinghe character; scene reference controls composition only” | 只保留基准图 + 1 张低相似度场景图 |
| 参考图把旧构图带偏 | 强化当前提示词里的新构图 | 换场景参考图，不要堆多图 |
| 参考图路径不存在 | 使用相对 skill 根目录的路径，或改绝对路径 | 先复制参考图到 workspace 再运行 |
| 模型照搬参考图元素 | 在 prompt 中明确“use only as style/IP reference, invent a fresh composition” | 换低相似度参考图 |
