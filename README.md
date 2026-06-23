# 星禾内容配图

> 把中文内容里的判断、流程、灵感和运营闭环，转化成“星禾”个人 IP 风格的正文配图。
> 这是统一版本：策略、prompt-only、参考图约束生图和 CLI/API 生成都在一个 skill 内完成。

---

## 这个 Skill 做什么

星禾内容配图是一个面向中文内容创作者和 AI 工作流的配图生成 skill。它适合为文章、公众号、小红书、运营 SOP、AI 自动化流程、研究笔记和方法论内容生成正文配图策略、shot list、单张提示词，或在 API key/endpoint 可用时通过内置 Node CLI 生成最终 PNG 图片。

它不是通用插画 prompt，也不是 PPT 信息图模板。它的核心能力是：先理解内容里的关键认知动作，再把一个判断、流程、状态或隐喻，画成星禾正在亲手参与的轻盈现场。

这个仓库是唯一保留的星禾内容配图 skill 仓库。Codex 原生 `image_gen` 若不能传入参考图，只用于 prompt-only 或候选方向；需要真实图片参考约束时，必须在用户明确授权外部上传风险后，通过本仓库内置 Node CLI/API 路线生成。

---

## 功能简要

- **智能选点**：先理解文章内容，挑出最值得画的段落，不按标题平均配图。
- **多候选方向**：正文配图默认每个选点给 2 个候选方向，重点图可给 3 个；公众号封面和小红书封面默认给 3 个方向。
- **平台封面适配**：支持微信公众号 2.35:1 封面、小红书 3:4 封面、文章头图和正文 16:9 配图。
- **星禾 IP 稳定性**：真实生图必须传入人物基准图，并搭配正文或封面参考图，减少人物漂移。
- **prompt-only / 真实生图双模式**：可以只输出提示词，也可以在配置好官方 OpenAI 或第三方中转站后通过 Node CLI 生成 PNG。
- **批量与调试**：支持 manifest 批量生成、断点续跑、inspect、probe 和 dry-run，方便先检查再花成本生成。
- **结构图降级**：复杂架构、数据管线、节点关系图不强行套星禾 IP，优先建议 diagram fallback 或 prompt-only。
- **视觉学习日志**：当人工确认某张图效果好时，可沉淀为学习日志条目，后续再决定是否升级成长期规则。

---

## 星禾视觉 IP

默认视觉角色是“星禾”：

- 黑色长发或微卷长发，轻薄空气刘海
- 圆润大眼睛，浅笑，亲切但不卖萌
- 白色宽松拉链连帽外套
- 内搭深蓝水手领上衣和白色领结
- 下身为深蓝百褶裙
- 气质是元气创造者 + 运营小导师，也带一点清醒研究员感
- 必须参与画面的核心动作，不能只是站在旁边当装饰

人物形象以 `assets/examples/00-xinghe-ip-baseline.png` 为基准。星禾的动作要根据内容变化：搬起卡住的素材箱、接住掉落内容、铺证据卡、拉复盘回流线、整理内容卡片、排内容日历、称量证据、圈关键节点。透明小玻璃灵感瓶只适合“灵感捕捉 / 创意启动”场景，不是固定姿势。

---

## 双参考图机制

真实生图前默认使用两个视觉锚点：

| 参考图 | 用途 |
|---|---|
| `assets/examples/00-xinghe-ip-baseline.png` | 锁定星禾人物脸、发型、服饰和气质 |
| `assets/examples/01-14-*.png` | 参考正文配图的构图、动作、留白、线条和批注密度 |
| `assets/examples/15-20-*.png` | 参考微信公众号文章封面和小红书笔记封面的标题区、人物区、安全边距和排版关系 |

通过 Node CLI 生成时，优先使用：

```bash
--style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-match>.png"
```

人物基准图负责星禾形象，场景参考图只负责构图、动作、留白、线条和批注密度。不要只传场景图而漏掉人物基准图。

---

## 示例效果

示例图用于校准星禾形象、留白、线条密度、中文批注的数量与密度。实际使用时要根据当前内容重新设计动作和隐喻，不要照抄旧案例的物件和构图。

<table>
  <tr>
    <td width="50%">
      <strong>人物基准图</strong><br>
      <img src="assets/examples/00-xinghe-ip-baseline.png" alt="星禾人物基准图">
    </td>
    <td width="50%">
      <strong>两个断点</strong><br>
      <img src="assets/examples/01-two-breakpoints.png" alt="两个断点">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>最小闭环</strong><br>
      <img src="assets/examples/02-minimum-loop.png" alt="最小闭环">
    </td>
    <td width="50%">
      <strong>按目的分拣</strong><br>
      <img src="assets/examples/03-sort-by-purpose.png" alt="按目的分拣">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>一鱼多吃</strong><br>
      <img src="assets/examples/04-one-fish-many-uses.png" alt="一鱼多吃">
    </td>
    <td width="50%">
      <strong>承接路径</strong><br>
      <img src="assets/examples/05-handoff-path.png" alt="承接路径">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>三个来源</strong><br>
      <img src="assets/examples/06-three-sources.png" alt="三个来源">
    </td>
    <td width="50%">
      <strong>三个内容工作</strong><br>
      <img src="assets/examples/07-three-content-jobs.png" alt="三个内容工作">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>交接文案工具箱</strong><br>
      <img src="assets/examples/08-handoff-copy-toolbox.png" alt="交接文案工具箱">
    </td>
    <td width="50%">
      <strong>常见坑位</strong><br>
      <img src="assets/examples/09-common-pits-no-title.png" alt="常见坑位">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>信息井</strong><br>
      <img src="assets/examples/10-information-well.png" alt="信息井">
    </td>
    <td width="50%">
      <strong>想法压机</strong><br>
      <img src="assets/examples/11-idea-press.png" alt="想法压机">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>内容发酵</strong><br>
      <img src="assets/examples/12-content-fermentation.png" alt="内容发酵">
    </td>
    <td width="50%">
      <strong>系统承重</strong><br>
      <img src="assets/examples/13-system-bearing.png" alt="系统承重">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>信任桥</strong><br>
      <img src="assets/examples/14-trust-bridge.png" alt="信任桥">
    </td>
    <td width="50%">
      <strong>微信公众号封面：左标题右行动</strong><br>
      <img src="assets/examples/15-wechat-left-title-right-action.png" alt="微信公众号封面：左标题右行动">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>微信公众号封面：宽留白单物件</strong><br>
      <img src="assets/examples/16-wechat-wide-white-space.png" alt="微信公众号封面：宽留白单物件">
    </td>
    <td width="50%">
      <strong>微信公众号封面：轻流程线</strong><br>
      <img src="assets/examples/17-wechat-process-line.png" alt="微信公众号封面：轻流程线">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>小红书封面：大字标题 + 底部星禾</strong><br>
      <img src="assets/examples/18-xhs-typed-title-bottom-xinghe.png" alt="小红书封面：大字标题和底部星禾">
    </td>
    <td width="50%">
      <strong>小红书封面：关键词下划线</strong><br>
      <img src="assets/examples/19-xhs-keyword-underline-card.png" alt="小红书封面：关键词下划线">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>小红书封面：标题卡片与方法堆叠</strong><br>
      <img src="assets/examples/20-xhs-title-card-method-stack.png" alt="小红书封面：标题卡片与方法堆叠">
    </td>
    <td width="50%">
      <strong>主要用途</strong><br>
      API 出图、批量生成、dry-run、inspect、manifest。
    </td>
  </tr>
</table>

---

## 设计边界

- 每张图只讲一个核心结构，不把整篇文章塞进一张图。
- 星禾必须承担核心动作；如果去掉星禾画面仍然完全成立，说明角色太装饰。
- 中文批注尽量短，避免错字和说明书感。
- 不做 PPT、课程页、正式流程图、科技 UI 或商业插画。
- 不复刻 `assets/examples/` 的旧构图、旧物件或旧案例。
- 不生成多个星禾、头像气泡或右下角 inset portrait。
- 不在左上角写“运营流程 / Workflow / 系统架构图 / 自动化 SOP / 研究框架 / 路线图”等类型标题。
- 不覆盖已有输出文件，除非用户明确要求替换。
- 不在用户只要策略、shot list 或 prompt-only 时调用 CLI。
- 不把 API key、permission code、access token 写入仓库文件、命令示例或最终交付。

---

## 输出内容

默认可以输出：

- 文章配图策略、shot list 和多候选方向
- 每个配图选点的放置位置、选点理由、图型、主题、结构、星禾动作和推荐候选
- 单张完整生图提示词
- 改图提示词
- 在用户明确要求真实生成且环境可用时，通过 Node CLI 输出 PNG 图片

默认不输出：

- PPTX、PDF、Keynote 或课程课件
- SVG、HTML、Canvas 可编辑源文件
- 商业海报、品牌 KV、复杂系统架构图
- 大段文字型信息图

---

## 你可以怎么用

| 模式 | 适合场景 | 是否调用第三方图像服务 |
|---|---|---|
| 配图策略 | 先判断文章哪里值得配图，输出 3-7 个选点和候选方向 | 否 |
| 正文多候选 | 每个正文配图选点给 A/B 方向，重点图可给 A/B/C | 否 |
| 平台封面候选 | 为公众号封面或小红书封面先给 3 个不同视觉方向 | 否 |
| prompt-only | 每个候选方向输出独立 prompt，交给其他平台或人工生成 | 否 |
| 单张真实生成 | 用户确认某个候选后，通过 Node CLI 输出 PNG | 是 |
| 多候选真实生成 | 用户明确要多个候选文件时，分别生成 `cover-a.png`、`cover-b.png` 等 | 是 |
| 结构图降级 | 复杂架构、数据管线、节点关系图改走 diagram fallback 或 prompt-only | 否 |
| 学习日志 | 用户确认某张图效果好后，生成可写入学习日志的条目建议 | 否 |
| inspect/dry-run | 调试参数、检查参考图和覆盖风险 | 否 |
| 改图提示 | 修改已有图片、纠正不符合 QA 的结果 | 视用户要求 |

### 正文配图多候选

```text
Use $xinghe-illustrations-skill 先不要生图。
请分析下面这篇文章哪里值得配图，输出 5 个左右的配图选点。
每个选点给出 A/B 候选方向，重点图可以给 A/B/C。
每个候选方向写清：核心隐喻、星禾动作、构图、中文标注、推荐参考图和适用原因。

<粘贴文章>
```

### 公众号封面三候选

```text
Use $xinghe-illustrations-skill 先不要生图。
请为公众号文章封面标题《我把 Codex 从对话工具变成了工作区系统》给 3 个候选方向。
方向需要覆盖：标题强表达、人物动作强表达、留白/品牌感强表达。
每个方向写清标题区、星禾动作、核心物件、参考图和适用原因。
```

### 小红书封面三候选

```text
Use $xinghe-illustrations-skill 先不要生图。
请为小红书封面标题《这套 AI 工作流我会反复用》给 3 个候选方向。
要求包含大字标题排版、关键词强调方式、底部星禾动作和 18-20 封面参考图建议。
```

### 只输出多候选提示词

```text
Use $xinghe-illustrations-skill prompt-only。
请为下面 3 个段落分别设计星禾正文配图。
每个段落给 A/B 两个候选方向，并为每个候选输出独立完整 prompt。
不要调用 CLI。

<粘贴段落>
```

### 确认候选后真实生成

```text
Use $xinghe-illustrations-skill 生成刚才候选 A。
我已经配置好 OPENAI_API_KEY 或兼容的 proxy endpoint。
请先用 inspect 检查人物基准图、场景参考图和输出路径，再生成 PNG。
```

### 生成多个候选文件

```text
Use $xinghe-illustrations-skill 生成小红书封面候选 A 和 B。
两个候选分别保存为 xhs-cover-a.png 和 xhs-cover-b.png，不要合成一张，也不要覆盖已有文件。
```

### 复杂结构图降级

```text
Use $xinghe-illustrations-skill 先判断这段内容适合星禾 IP 图还是结构图。
如果它更像复杂系统架构、数据管线或节点关系图，请不要硬画星禾图，改给 diagram fallback 或 prompt-only 建议。

<粘贴复杂段落>
```

### 记录视觉学习日志

```text
Use $xinghe-illustrations-skill 这张图我决定采用。
请根据这次采用结果生成一条 visual-learning-log.md 学习日志建议，不要直接改文件。
需要包含：日期、平台/用途、标题或主题、采用方向、为什么好、失败点、后续复用规则、相关文件或参考图。
```

### 编辑已有图片

```text
Use $xinghe-illustrations-skill 帮我编辑这张图。
去掉左上角的“流程图”标题，保留白底蜡笔线稿和星禾主体动作。
```


---

## 安装与生图配置

这个版本统一面向 Codex、OpenClaw、Hermes 和其他支持本地 skills 的环境。它可以只输出配图策略和 prompt，也可以在你配置好官方 OpenAI 或第三方中转站，并明确授权外部上传风险后，通过内置 Node CLI 生成 PNG 图片。

### 1. 安装 Skill

克隆仓库：

```bash
git clone https://github.com/xinghe-AGI/Xinghe-Illustrations-Skill.git
```

复制或同步整个目录到你的 Skills 目录。建议安装目录名保持为：

```text
<skills-root>/xinghe-illustrations-skill/
```

目录中应保留：

```text
SKILL.md
agents/
assets/examples/
references/
scripts/
```

Codex 本机路径示例：

```text
C:\Users\<you>\.codex\skills\xinghe-illustrations-skill\
```

安装或更新后，重启运行环境或开启新会话，让 skill 被重新加载。

### 2. 选择使用方式

| 使用方式 | 需要配置 | 是否真实请求图片服务 | 适合场景 |
|---|---|---:|---|
| 配图策略 / shot list | 不需要 | 否 | 先判断文章哪里值得配图 |
| prompt-only | 不需要 | 否 | 只要最终提示词，交给其他平台生图 |
| 官方 OpenAI 生图 | `OPENAI_API_KEY` | 是 | 直接走 OpenAI 官方端点 |
| 第三方中转站生图 | `GPT_IMAGE_BASE_URL` + `GPT_IMAGE_API_KEY` | 是 | 使用兼容 OpenAI 图片接口的代理或网关 |
| inspect / dry-run | 按目标模式可选 | 否 | 检查 endpoint、参考图、输出路径和覆盖风险 |

真实生成星禾图时必须能上传参考图，并且必须同时传入：

```bash
--style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-match>.png"
```

`00-xinghe-ip-baseline.png` 用来锁定星禾人物形象，第二张参考图用来锁定正文配图或封面构图。正文图从 `01-14` 选择；微信公众号封面和小红书封面从 `15-20` 选择。如果某个 provider 只能纯文本生图、不能上传人物基准图，就不要声称生成了合格的星禾 IP 图片。

### 3. 配置环境变量

不要把真实 API key、permission code 或 access token 写进仓库文件。尤其不要写进：

- `SKILL.md`
- `README.md`
- `references/*.md`
- `scripts/*.js`
- `assets/`
- 任何会进入 git commit 的文件

推荐配置位置：

| 使用环境 | 推荐位置 | 生效方式 |
|---|---|---|
| Windows / 通用环境 | 系统“用户环境变量”，或本机启动器明确加载的私有 env 文件 | 重启运行环境或开启新会话 |
| macOS / Linux / 通用环境 | shell profile、系统用户环境变量，或本机启动器明确加载的私有 env 文件 | 重启 shell/运行环境或开启新会话 |
| OpenClaw / Hermes / 其他运行环境 | 对应 runtime 的私有 `.env`、secrets 或环境变量注入配置 | 按 runtime 文档重启或刷新 |

官方 OpenAI 模式：

```text
OPENAI_API_KEY=<your-openai-api-key>
```

第三方中转站模式：

```text
GPT_IMAGE_BASE_URL=https://gateway.example.com
GPT_IMAGE_API_KEY=<your-proxy-api-key>
GPT_IMAGE_API_MODE=images
GPT_IMAGE_MODEL=gpt-image-2
```

可选变量：

```text
GPT_IMAGE_PROVIDER=<optional-provider-name>
GPT_IMAGE_PERMISSION_CODE=<optional-permission-code>
```

`GPT_IMAGE_API_STYLE` 是旧变量名，仍兼容；新配置优先使用 `GPT_IMAGE_API_MODE`，可选值为 `responses`、`images`、`auto`。

### 4. 官方 OpenAI 调用

官方模式默认使用 OpenAI Responses API，也可以按需要使用 Images API。Responses API 通过 `image_generation` 工具返回图片数据；Images API 提供 `/images/generations`、`/images/edits` 和 `/images/variations`。

先做零成本检查：

```bash
node scripts/xinghe_image_assets_cli.js inspect \
  --mode official \
  --api-mode responses \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png"
```

真实生成：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --api-mode responses \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic.png" \
  --size 1536x1024 \
  --quality high \
  --output-format png
```

如果官方链路或当前 runtime 不能上传人物基准图，先停在 prompt-only 或命令建议，不要绕过基准图硬门槛。

### 5. 第三方中转站调用

推荐第三方中转站平台：[NangeAI](https://nangeai.top/)。

第三方中转站可以是企业网关、私有代理或兼容 OpenAI 图片接口的平台。配置时以你购买或部署的中转站文档为准。

如果中转站文档提供 `/v1/images/edits`，并支持 `multipart/form-data` 上传 `image`，优先使用：

```text
GPT_IMAGE_API_MODE=images
```

首次配置后，先探测 endpoint：

```bash
node scripts/xinghe_image_assets_cli.js probe \
  --mode proxy \
  --api-mode auto \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --model gpt-image-2
```

再做零成本检查：

```bash
node scripts/xinghe_image_assets_cli.js inspect \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/18-xhs-typed-title-bottom-xinghe.png" \
  --prompt "<final cover prompt>" \
  --output "assets/<article-slug>-covers/xhs-cover.png" \
  --size 1024x1536 \
  --quality high
```

真实生成小红书封面示例：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/18-xhs-typed-title-bottom-xinghe.png" \
  --prompt "Generate one 3:4 Xiaohongshu cover in Xinghe IP style..." \
  --output "assets/demo-covers/xhs-cover.png" \
  --size 1024x1536 \
  --quality high \
  --background opaque \
  --output-format png
```

真实生成微信公众号封面示例：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/15-wechat-left-title-right-action.png" \
  --prompt "Generate one 2.35:1 WeChat article cover in Xinghe IP style..." \
  --output "assets/demo-covers/wechat-cover.png" \
  --size 2048x1152 \
  --quality high \
  --background opaque \
  --output-format png
```

当命令包含 `--style-reference`、`--style-references`、`--reference`、`--references` 或 `--image` 时，CLI 会把 Images API 请求切到 `/v1/images/edits` 并发送 multipart。没有图片参数时通常会走 `/v1/images/generations` 的纯 JSON 请求，这类纯文本生图不能用于合格星禾 IP 图。

### 6. 推荐验证顺序

1. 检查脚本语法：

```bash
node --check scripts/xinghe_image_assets_cli.js
```

2. 用 `inspect` 检查参数、参考图、endpoint 和输出路径，不请求 API。
3. 用 `probe` 检查中转站兼容性。
4. 确认密钥和 endpoint 后，再运行 `generate`。

### 7. 常见问题

**为什么必须传人物基准图？**

星禾是固定个人 IP，单靠文字描述容易漂移。人物基准图负责脸、发型、服饰和气质，场景参考图只负责构图和留白。

**官方 OpenAI 和第三方中转站怎么选？**

能直接使用官方 OpenAI 时，优先官方链路；如果你的网络、预算或团队规范要求走代理，就用第三方中转站。无论哪条链路，都必须确认能上传人物基准图。

**为什么中转站经常建议 `--api-mode images`？**
很多中转站先兼容 `/v1/images/generations` 和 `/v1/images/edits`。星禾图需要上传参考图，所以更常用 `/v1/images/edits` multipart。

**如果中转站只支持 `/v1/images/generations` 呢？**
这通常只能纯文本生图，不适合生成稳定星禾 IP。可以输出 prompt 给用户人工处理，或换支持图片参考输入的 endpoint。

**我是 Codex 用户该怎么用？**

统一使用本仓库 `xinghe-AGI/Xinghe-Illustrations-Skill`。如果当前 Codex 原生 `image_gen` 不能传入参考图，不要用它声称生成合格星禾图；先输出 prompt-only，或在用户明确授权外部上传风险后走本仓库的 Node CLI/API。

---

## 目录结构

```text
.
├── README.md
├── SKILL.md
├── agents/
│   └── openai.yaml
├── assets/
│   └── examples/
├── references/
│   ├── access-modes.md
│   ├── composition-patterns.md
│   ├── illustration-selection.md
│   ├── image-generation-runtime.md
│   ├── visual-routing-and-candidates.md
│   ├── visual-learning-log.md
│   ├── prompt-template-images-api.md
│   ├── prompt-template.md
│   ├── qa-checklist.md
│   ├── reference-images.md
│   ├── style-dna.md
│   └── xinghe-ip.md
└── scripts/
    └── xinghe_image_assets_cli.js
```

---

## 相关文件

- `SKILL.md`：Skill 触发描述和主工作流
- `references/xinghe-ip.md`：星禾形象、动作库和禁忌
- `references/illustration-selection.md`：智能选点、图型分类和 prompt-only 模式
- `references/visual-routing-and-candidates.md`：视觉路由、多候选方向和结构图降级规则
- `references/visual-learning-log.md`：人工确认好图后的视觉经验沉淀
- `references/prompt-template.md`：生图和改图提示词模板
- `references/prompt-template-images-api.md`：旧版 Images API 精简 prompt 模板
- `references/qa-checklist.md`：生成后检查与返工规则
- `references/image-generation-runtime.md`：CLI 调用、dry-run、manifest 和失败处理
- `references/access-modes.md`：official/proxy、环境变量和安全边界
- `references/reference-images.md`：风格参考图和星禾 IP 锚定规则
- `scripts/xinghe_image_assets_cli.js`：真实生图、inspect、probe、manifest 和断点续跑 CLI

---

## 相关项目

- [Ian Xiaohei Illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) - 本项目参考其中文正文配图 Skill 的开源表达和工作流思路，并在星禾 IP、内容运营场景、runtime 兼容和 CLI 生成链路上做二次开发。

---

## 关于作者

**xinghe（星禾）**

- AI 内容自动化实践者
- AI 工具链开发者
- AI Workflow Builder

- GitHub: [https://github.com/xinghe-AGI](https://github.com/xinghe-AGI)
- 微信公众号: 小星禾AI
- 小红书: 小星禾AI
- 微信号: xinghe_AGI

---
## License

请按仓库实际 license 文件为准。如果后续准备公开发布，建议补充明确的开源协议和必要的二次开发说明。
