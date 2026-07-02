# 星禾内容视觉资产 Skill

> 先读懂文章，再自主判断应该生成什么图。
> 本 skill 把中文内容里的判断、流程、情绪、知识结构、技术架构和运营闭环，转化成“星禾”个人 IP 风格的封面、正文图、情绪图、解释图、知识卡片、技术架构图、流程图、多格漫画和信息图。

---

## 这个 Skill 做什么

星禾内容视觉资产 Skill 是一个面向中文内容创作者和 AI 工作流的综合生图 skill。它适合为文章、公众号、小红书、运营 SOP、AI 自动化流程、研究笔记、技术说明和方法论内容生成视觉方案、提示词、manifest，或在官方 OpenAI 配置可用时通过内置 Node CLI 生成最终 PNG 图片。

它不是通用插画 prompt，也不是 PPT 信息图模板。它的核心能力是：读完文章后先做视觉路由，判断应该生成封面、情绪图、解释图、技术架构图、流程图、多格漫画、知识卡片、信息图还是普通正文图，再输出候选方向和可生成的 prompt。

这个仓库是当前保留的星禾内容视觉资产 skill 仓库，适合支持本地 skills、Node CLI 或外部工具调用的 Agent / AI 工作流环境。默认先输出策略和 prompt；只有用户明确要求真实生成、并确认外部上传风险后，才调用图片生成链路。

---

## 功能简要

- **逐节配图判断**：先按小节判断适合配图、不适合配图、适合卡片还是适合封面，不按标题平均配图。
- **深度提炼**：提炼文体、真意、张力、灵魂句和必须出现的原文术语/数字。
- **文章类型策略**：先识别方法论、项目复盘、技术说明、观点文章、工具介绍、故事型文章等类型，再给默认视觉策略。
- **路由评分标准**：给候选图型打 1-5 分，输出理由、风险和输出角色，再决定主路由和辅助路由。
- **自主视觉路由**：读完文章后自动判断主路由和辅助路由，支持 `emotion-anchor`、`explanatory-diagram`、`technical-architecture`、`process-flow`、`comic-strip`、`knowledge-card-pack`、`knowledge-card-single`、`infographic-poster`、`platform-cover` 和常规正文图。
- **混合路由编排**：支持 `comic-strip + emotion-anchor`、`infographic-poster + knowledge-card-pack`、`knowledge-card-single + explanatory-diagram`、`process-flow + knowledge-card-pack` 等组合，但会明确主次和拆图边界。
- **多候选方向**：正文配图默认每个选点给 2 个候选方向，重点图可给 3 个；公众号封面和小红书封面默认给 3 个方向。
- **知识卡片生产**：支持横版/竖版知识卡片组、单张总结卡、对比卡、流程卡、架构卡和清单卡；多个相关知识点可以放进同一卡，但必须有并列、因果、流程、分层、汇聚、决策或对比关系；按内容排版和发布场景选择 `4:3`、`16:9`、`3:4` 或 `1:1`。
- **卡片组叙事结构**：支持“问题-原因-方法-案例-总结”“误区-真相-做法-检查-收藏”等卡片组阅读路径。
- **文字密度分级**：按图型控制文字量；封面极低、情绪图低、解释图中等、知识卡中高、信息图高密度但必须分区。
- **高密度信息图**：信息图海报允许承载较多文章信息，但必须短标签化、分区化、有清晰阅读路径；信息过多时拆成知识卡片组。
- **失败回收策略**：针对人物漂移、错字、太挤、太散、太像 PPT 等问题给出返工动作和重写 prompt。
- **样例任务包**：提供方法论、技术说明、项目复盘、小红书首图和高密度文章的 dry-run 样例。
- **技术结构表达**：支持技术架构图、流程图、节点关系图、SOP 流程和自动化链路图。
- **平台封面适配**：支持微信公众号 2.35:1 封面、小红书 3:4 封面、文章头图和正文配图。
- **星禾 IP 稳定性**：含人物的真实生图必须传入人物基准图，并搭配正文或封面参考图，减少人物漂移。
- **prompt-only / 真实生图双模式**：可以只输出提示词，也可以在配置好官方 OpenAI 后通过 Node CLI 生成 PNG。
- **批量与调试**：支持 manifest 批量生成、断点续跑、inspect 和 dry-run，方便先检查再花成本生成。
- **人物缩放机制**：技术架构图、流程图和高密度知识卡片可使用小人物、局部人物或无人物，让结构先读清楚。
- **中文文字铁律**：标题、术语、数字来自原文或用户确认；错字优先重生或减少文字，不做代码涂改。
- **视觉学习日志**：当人工确认某张图效果好时，可沉淀为学习日志条目，后续再决定是否升级成长期规则。

---

## 推荐工作流

默认不要一上来直接生图。推荐按下面顺序推进：

1. **读内容**：读取文章、Markdown、截图、标题或主题，提炼文体、真意、张力、灵魂句和必须保留的术语/数字。
2. **判类型**：识别 `article_type`、可信度、类型信号和默认视觉策略。
3. **做评分**：按 1-5 分给候选路由评分，输出理由、风险和输出角色。
4. **做路由**：自主选择 `primary_route` 和 `secondary_routes`，决定走正文图、封面、情绪图、解释图、技术架构图、流程图、多格漫画、知识卡片组、单张知识卡片、信息图海报或混合路由。
5. **给候选**：先输出 A/B/C 候选方向，每个候选都写清核心隐喻、星禾动作、构图、中文标注、文字密度、参考图、比例和文件名。
6. **写 prompt/manifest**：用户确认方向后，再输出完整 prompt 或批量生成 manifest。
7. **真实生成**：只有在用户明确授权外部上传风险，并且 API/endpoint 能上传任务所需参考图时，才调用 Node CLI 生成 PNG；含人物图必须能上传人物基准图。
8. **检查返工**：生成后检查星禾是否参与核心动作、中文是否可读、信息层级是否适合手机端、是否有错字/水印/品牌误用；失败时按失败回收策略返工。

---

## 产出核心结构

这个 skill 的核心不是“套模板生成一张图”，而是把文章内容转成一套稳定的星禾视觉 IP 表达：

1. **内容理解层**：读文章，提炼主题、真意、冲突、关键术语和必须保留的数字。
2. **视觉路由层**：判断这次应该做解释图、情绪图、知识卡片、流程图、技术架构图、多格漫画、信息图还是封面图。
3. **星禾视觉 IP 层**：根据内容安排星禾的动作、位置和参与方式；信息密度高时可以缩小人物、局部出现或不出现。
4. **信息版式层**：根据内容选择横版、竖版、对比、流程、分层、矩阵、总分、卡片组等结构，不默认全部做竖图。
5. **生成落地层**：先给候选方向和 prompt，用户确认后再生成图片或导出 manifest。

更详细的字段规范和生成包结构放在 [references/output-spec.md](references/output-spec.md)，README 只保留使用入口和视觉判断方法。

---

## 星禾视觉 IP

默认视觉角色是“星禾”：

- 黑色长发或微卷长发，轻薄空气刘海
- 圆润大眼睛，浅笑，亲切但不卖萌
- 白色宽松拉链连帽外套
- 内搭深蓝水手领上衣和白色领结
- 下身为深蓝百褶裙
- 气质是元气创造者 + 运营小导师，也带一点清醒研究员感
- 正文图、封面、情绪图和漫画里必须参与核心动作，不能只是站在旁边当装饰
- 技术架构图、流程图和高密度知识卡片里可以很小、局部出现，或不出现

人物形象以 `assets/examples/00-xinghe-ip-baseline.png` 为基准。星禾的动作要根据内容变化：搬起卡住的素材箱、接住掉落内容、铺证据卡、拉复盘回流线、整理内容卡片、排内容日历、称量证据、圈关键节点。透明小玻璃灵感瓶只适合“灵感捕捉 / 创意启动”场景，不是固定姿势。结构类图优先保证可读性，人物可以缩成角落里的小标注者、只露手贴标签，或完全不出现。

---

## 示例效果

这里只放精选示例，帮助快速判断这个 skill 能产出什么类型的视觉资产。完整示例图集见 [docs/examples/visual-gallery.md](docs/examples/visual-gallery.md)。

### 解释图 / 正文结构图

适合解释机制、流程、分层、承接路径和内容工作台。

<table>
  <tr>
    <td width="50%">
      <strong>最小闭环</strong><br>
      <img src="assets/examples/02-minimum-loop.png" alt="最小闭环">
    </td>
    <td width="50%">
      <strong>承接路径</strong><br>
      <img src="assets/examples/05-handoff-path.png" alt="承接路径">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>交接文案工具箱</strong><br>
      <img src="assets/examples/08-handoff-copy-toolbox.png" alt="交接文案工具箱">
    </td>
    <td width="50%">
      <strong>系统承重</strong><br>
      <img src="assets/examples/13-system-bearing.png" alt="系统承重">
    </td>
  </tr>
</table>

### 情绪图 / 卡点表达

适合表达混乱、卡住、压力、转折和“终于理顺”的情绪变化。

<table>
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
      <strong>常见坑位</strong><br>
      <img src="assets/examples/09-common-pits-no-title.png" alt="常见坑位">
    </td>
    <td width="50%">
      <strong>两个断点</strong><br>
      <img src="assets/examples/01-two-breakpoints.png" alt="两个断点">
    </td>
  </tr>
</table>

### 封面图

微信公众号封面偏横版信息判断，小红书封面偏竖版大字标题和首屏停留。

<table>
  <tr>
    <td width="50%">
      <strong>微信公众号封面：左标题右行动</strong><br>
      <img src="assets/examples/15-wechat-left-title-right-action.png" alt="微信公众号封面：左标题右行动">
    </td>
    <td width="50%">
      <strong>微信公众号封面：宽留白单物件</strong><br>
      <img src="assets/examples/16-wechat-wide-white-space.png" alt="微信公众号封面：宽留白单物件">
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
</table>

### 综合结构 / 知识卡片方向

适合表达多来源、内容分工、信任建立和一图多用的结构。

<table>
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
      <strong>一鱼多吃</strong><br>
      <img src="assets/examples/04-one-fish-many-uses.png" alt="一鱼多吃">
    </td>
    <td width="50%">
      <strong>信任桥</strong><br>
      <img src="assets/examples/14-trust-bridge.png" alt="信任桥">
    </td>
  </tr>
</table>

---

## 你可以怎么用

最简单的方式：把文章、标题、主题或本地文件发给 Agent，并明确你要“先给方案”还是“直接生成图片”。

| 你想做什么 | 可以这样说 |
|---|---|
| 让 skill 自主判断图型 | `请读完这篇文章，判断适合生成哪些图，先不要生图。` |
| 做文章正文配图 | `请给这篇文章 3-7 个配图选点，每个点给 A/B 候选方向。` |
| 做公众号封面 | `请为这篇文章做 3 个公众号封面候选方向。` |
| 做小红书封面 | `请为这个标题做 3 个小红书首图候选方向。` |
| 做知识卡片组 | `请把这篇文章拆成知识卡片组，先判断横版还是竖版。` |
| 做技术架构图 / 流程图 | `请把这段说明设计成技术架构图或流程图，人物可以小一点或不出现。` |
| 真实生成图片 | `我确认生成候选 A，请先 inspect，再生成 PNG。` |

详细请求模板、真实生成命令、manifest 和 dry-run 示例见 [docs/usage-and-generation.md](docs/usage-and-generation.md)。

---

## 视觉形态怎么选

先看内容要解决的问题，再选图型：

| 内容目标 | 推荐视觉形态 |
|---|---|
| 让读者点进来 | 公众号封面 / 小红书封面 |
| 解释一个概念或机制 | 解释图 |
| 表达卡住、焦虑、转折、爽点 | 情绪图 |
| 梳理步骤、SOP、状态流 | 流程图 |
| 解释系统组件、数据流、模块边界 | 技术架构图 |
| 汇总一篇文章的知识点 | 知识卡片组 |
| 做全局地图、矩阵、路径总览 | 信息图海报 |
| 表达前后变化或剧情推进 | 多格漫画 |

比例不要固定套竖版：小红书和手机轮播优先 `3:4`；方法论总结、流程、对比、技术结构优先 `4:3` 或 `16:9`；公众号封面使用横版。更完整的判断规则见 [docs/usage-and-generation.md](docs/usage-and-generation.md)。

---

## 安装与生图配置

安装后可以先只做策略和 prompt，不需要 API key。只有要真实生成 PNG 时，才需要配置图片服务。安装完成后先做三件事：

1. 选择调用方式：官方 OpenAI 或第三方中转站。
2. 在本机环境变量或 Agent runtime 的私有 secrets 中配置 URL 和 API key。
3. 先做 `inspect` / `probe` 检查，再真实生成图片。

### 安装

```bash
git clone https://github.com/xinghe-AGI/Xinghe-Illustrations-Skill.git
```

把整个目录放到你的 skills 目录，建议目录名保持为：

```text
<skills-root>/xinghe-illustrations-skill/
```

更新或安装后，重启运行环境或开启新会话，让 skill 被重新加载。

### 生图配置

官方 OpenAI：配置 `OPENAI_API_KEY`。

第三方中转站：配置 `GPT_IMAGE_BASE_URL`、`GPT_IMAGE_API_KEY`、`GPT_IMAGE_API_MODE`、`GPT_IMAGE_MODEL`。

这些变量应放在本机环境变量、Agent runtime 的私有 secrets，或不会提交到 GitHub 的私有 env 文件里。不要写进 README、SKILL.md、references、scripts 或任何仓库文件。

| 调用方式 | 必填配置 | 适合情况 |
|---|---|---|
| 官方 OpenAI | `OPENAI_API_KEY` | 直接使用 OpenAI 官方接口 |
| 第三方中转站 | `GPT_IMAGE_BASE_URL`、`GPT_IMAGE_API_KEY`、`GPT_IMAGE_API_MODE`、`GPT_IMAGE_MODEL` | 使用兼容 OpenAI 图片接口的代理、企业网关或中转服务 |

含星禾人物的真实生图必须能上传人物基准图：

```text
assets/examples/00-xinghe-ip-baseline.png
```

如果你的图片服务不能上传人物基准图，就不要生成含人物的星禾图；可以先停在 prompt-only，或只做无人物的技术架构图 / 流程图。

完整配置、URL/API Key 填写方式、inspect 检查和生成命令见 [docs/usage-and-generation.md](docs/usage-and-generation.md)。

---

## 相关项目

- [Ian Xiaohei Illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) - 本项目参考其中文正文配图 Skill 的开源表达和工作流思路，并在星禾 IP、内容运营场景、runtime 兼容和 CLI 生成链路上做二次开发。
- [xiaohu-ip-studio](https://github.com/xiaohuailabs/xiaohu-ip-studio) - 参考其视觉路由、深度提炼、情绪图、解释图、多格漫画和信息图海报方法，不复制角色、图片和画风。
- [baoyu-skills](https://github.com/JimLiu/baoyu-skills) - 参考文字渲染铁律。
- [juju-content-illustrations](https://github.com/dososo/juju-content-illustrations) - 参考一篇内容内叙事统一的原则。
- [illo-skill](https://github.com/tmchow/illo-skill) - 参考“方法论恒定，角色是参数”的表达思路。
- [orange-line-illustration](https://github.com/orange2ai/orange-line-illustration) - 参考极简场景和比例控制。

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
