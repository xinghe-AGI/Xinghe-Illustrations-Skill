# Xinghe Illustrations Skill

> 把中文内容里的判断、流程、灵感和运营闭环，转化成“星禾”个人 IP 风格的正文配图。  
> 这是面向没有原生生图能力的 Agent runtime 的版本。

---

## 这个 Skill 做什么

Xinghe Illustrations Skill 是一个面向中文内容创作者和通用 Agent 的配图生成 skill。它适合为文章、公众号、小红书、运营 SOP、AI 自动化流程、研究笔记和方法论内容生成正文配图策略、shot list、单张提示词，或在 API key/endpoint 可用时通过内置 Node CLI 生成最终 PNG 图片。

它不是通用插画 prompt，也不是 PPT 信息图模板。它的核心能力是：先理解内容里的关键认知动作，再把一个判断、流程、状态或隐喻，画成星禾正在亲手参与的轻盈现场。

这个仓库适合 OpenClaw、Hermes 或其他没有原生生图工具的 Agent。Codex 原生生图环境请使用 [Xinghe-Illustrations-Skill-Codex](https://github.com/xinghe-AGI/Xinghe-Illustrations-Skill-Codex)。

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
      <strong>小红书封面：打字标题 + 底部星禾</strong><br>
      <img src="assets/examples/18-xhs-typed-title-bottom-xinghe.png" alt="小红书封面：打字标题和底部星禾">
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
      OpenClaw / Hermes / 通用 Agent 的 API 出图、批量生成、dry-run、inspect、manifest。
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

- 文章配图策略和 shot list
- 每张图的放置位置、选点理由、图型、主题、结构和星禾动作
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
| 配图策略 | 先判断文章哪里值得配图，输出 3-7 张 shot list | 否 |
| prompt-only | 只要最终生图提示词，交给其他平台或人工生成 | 否 |
| 单张真实生成 | 已配置 API key/endpoint，需要输出 PNG | 是 |
| 批量生成 | 多张正文配图，需要 manifest、断点续跑 | 是 |
| inspect/dry-run | 调试参数、检查参考图和覆盖风险 | 否 |

### 只做配图规划

```text
Use $xinghe-illustrations-skill 先不要生图。
请分析下面这篇文章哪里值得配图，输出 5 张左右的 shot list。
每张图写清楚：放在哪段后、选点信号、图型、主题、核心意思、星禾在做什么、建议中文标注词。

<粘贴文章>
```

### 只输出提示词

```text
Use $xinghe-illustrations-skill prompt-only。
请为下面 3 个段落分别设计一张星禾正文配图，只输出最终生图 prompt，不调用 CLI。

<粘贴段落>
```

### 真实生成图片

```text
Use $xinghe-illustrations-skill 为下面这篇文章生成 4 张星禾风格正文配图。
我已经配置好 OPENAI_API_KEY 或兼容的 proxy endpoint，可以调用真实生图。

<粘贴文章>
```

### 编辑已有图片

```text
Use $xinghe-illustrations-skill 帮我编辑这张图。
去掉左上角的“流程图”标题，保留白底蜡笔线稿和星禾主体动作。
```

---

## 安装

克隆仓库：

```bash
git clone https://github.com/xinghe-AGI/Xinghe-Illustrations-Skill.git
```

复制或同步整个目录到你的 Agent Skills 目录。建议安装目录名与 skill 名称保持一致：

```text
<skills-root>/xinghe-illustrations-skill/
```

目录中应保留：

```text
SKILL.md
agents/
assets/
references/
scripts/
```

Codex 本机路径示例：

```text
C:\Users\<you>\.codex\skills\xinghe-illustrations-skill\
```

安装或更新后，重启 Agent 或开启新会话，让 skill 被重新加载。

---

## 第三方中转站生图请求

推荐第三方中转站平台：[NangeAI](https://nangeai.top/)。

这部分面向没有内置生图能力的 Agent，例如 OpenClaw、Hermes 或其他支持 Skills 但不能直接生成图片的运行环境。

Agent 调用第三方中转站时，通常按这个流程工作：

1. 读取文章或用户需求
2. 生成星禾风格配图提示词
3. 调用第三方中转站图片 API
4. 将接口返回的 `b64_json` 解码为 PNG 图片
5. 保存到用户指定目录

默认调用 `gpt-image-2`。除非用户明确要求切换模型，或第三方中转站不支持该模型，否则请求参数中的 `model` 应保持为：

```text
gpt-image-2
```

### 配置请求 URL 和 API Key

不要把真实 API key 写进仓库文件。也不要写进 `SKILL.md`、`README.md`、`references/` 或 `scripts/`。

推荐放在本机 Agent runtime 的私有环境变量里：

| 使用环境 | 推荐配置位置 |
|---|---|
| Windows / 通用 Agent | 系统“用户环境变量”，或本机启动器明确加载的私有 env 文件 |
| macOS / Linux / 通用 Agent | shell profile、系统用户环境变量，或本机启动器明确加载的私有 env 文件 |
| OpenClaw / Hermes | 对应 runtime 的私有 `.env`、secrets 或环境变量注入配置 |

变量名：

```text
GPT_IMAGE_BASE_URL=https://gateway.example.com
GPT_IMAGE_API_KEY=your-api-key
```

可选变量：

```text
GPT_IMAGE_PROVIDER=optional-provider-name
GPT_IMAGE_PERMISSION_CODE=optional-permission-code
GPT_IMAGE_API_MODE=images
GPT_IMAGE_MODEL=gpt-image-2
```

配置完成后，重启 Agent 或打开新会话。

### CLI 能力

内置 CLI 支持三种 API 协议：

| 参数 | 用途 |
|---|---|
| `--api-mode responses` | 调 `/v1/responses` + `image_generation` tool |
| `--api-mode images` | 调旧版 `/v1/images/generations` 或 `/v1/images/edits` |
| `--api-mode auto` | 先尝试 Responses API，失败或未返回 base64 图片时回退 Images API |

如果第三方文档只写了 `/v1/images/generations` 或 `/v1/images/edits`，应使用 `--api-mode images`，或设置 `GPT_IMAGE_API_MODE=images`。

首次配置后先探测 endpoint：

```bash
node scripts/xinghe_image_assets_cli.js probe \
  --mode proxy \
  --api-mode auto \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --model gpt-image-2
```

零成本集成检查可用 `inspect`：

```bash
node scripts/xinghe_image_assets_cli.js inspect \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "assets/<article-slug>-illustrations/01-topic-name.png"
```

真实生成示例：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model gpt-image-2 \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "Generate a Xinghe IP style Chinese article illustration..." \
  --output "assets/demo-illustrations/01-topic.png" \
  --size 1536x1024 \
  --quality high \
  --background opaque
```

### 请求格式

第三方图片编辑接口通常是：

```http
POST /v1/images/edits
Content-Type: multipart/form-data
Accept: application/json
Authorization: Bearer <YOUR_API_KEY>
```

完整请求地址通常是：

```text
<GPT_IMAGE_BASE_URL>/v1/images/edits
```

如果第三方中转站提供的是完整 URL，以中转站文档为准。

星禾正文配图默认参数：

- `model`: `gpt-image-2`
- `n`: `1`
- `quality`: `high`
- `size`: `1536x1024`
- `background`: `opaque`

返回结果中通常包含：

```json
{
  "created": 0,
  "background": "opaque",
  "data": {
    "b64_json": "..."
  },
  "output_format": "png",
  "quality": "high",
  "size": "1536x1024"
}
```

Agent 需要读取 `data.b64_json`，解码后保存为图片文件。

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
- `references/prompt-template.md`：生图和改图提示词模板
- `references/prompt-template-images-api.md`：旧版 Images API 精简 prompt 模板
- `references/qa-checklist.md`：生成后检查与返工规则
- `references/image-generation-runtime.md`：CLI 调用、dry-run、manifest 和失败处理
- `references/access-modes.md`：official/proxy、环境变量和安全边界
- `references/reference-images.md`：风格参考图和星禾 IP 锚定规则
- `scripts/xinghe_image_assets_cli.js`：真实生图、inspect、probe、manifest 和断点续跑 CLI

---

## 相关项目

- [Xinghe Illustrations Skill Codex](https://github.com/xinghe-AGI/Xinghe-Illustrations-Skill-Codex) - Codex 原生生图版，不包含 Node CLI/API 链路。

---

## 关于作者

**xinghe（星禾）**  
AI 内容自动化实践者 / AI 工具链开发者 / AI Workflow Builder

GitHub: [https://github.com/xinghe-AGI](https://github.com/xinghe-AGI)  
微信公众号: 小星禾AI  
小红书: 小星禾AI  
微信号: xinghe_AGI

---
## License

请按仓库实际 license 文件为准。如果后续准备公开发布，建议补充明确的开源协议和必要的二次开发说明。

