# Xinghe Illustrations Skill

> 先读懂文章，再自主判断应该生成什么图。
> 本 skill 把中文内容里的判断、流程、情绪、知识结构、技术架构和运营闭环，转化成“星禾”个人 IP 风格的封面、正文图、情绪图、解释图、知识卡片、技术架构图、流程图、多格漫画和信息图。

---

## 这个 Skill 做什么

Xinghe Illustrations Skill 是一个面向中文内容创作者和 AI 工作流的综合生图 skill。它适合为文章、公众号、小红书、运营 SOP、AI 自动化流程、研究笔记、技术说明和方法论内容生成视觉方案、提示词、manifest，或在官方 OpenAI 配置可用时通过内置 Node CLI 生成最终 PNG 图片。

它不是通用插画 prompt，也不是 PPT 信息图模板。它的核心能力是：读完文章后先做视觉路由，判断应该生成封面、情绪图、解释图、技术架构图、流程图、多格漫画、知识卡片、信息图还是普通正文图，再输出候选方向和可生成的 prompt。

这个仓库是当前保留的 Xinghe Illustrations Skill 仓库，适合支持本地 skills、Node CLI 或外部工具调用的 Agent / AI 工作流环境。默认先输出策略和 prompt；只有用户明确要求真实生成、并确认外部上传风险后，才调用图片生成链路。

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

这个 skill 的核心不是“套模板生成一张图”，而是把文章内容转成一套稳定的视觉生产结构：

1. **内容理解层**：读文章，提炼主题、真意、冲突、关键术语和必须保留的数字。
2. **视觉路由层**：判断这次应该做解释图、情绪图、知识卡片、流程图、技术架构图、多格漫画、信息图还是封面图。
3. **角色参与层**：根据内容安排人物动作、位置和参与方式；信息密度高时可以缩小人物、局部出现或不出现。
4. **信息版式层**：根据内容选择横版、竖版、对比、流程、分层、矩阵、总分、卡片组等结构，不默认全部做竖图。
5. **生成落地层**：先给候选方向和 prompt，用户确认后再生成图片或导出 manifest。

更详细的字段规范和生成包结构放在 [references/output-spec.md](references/output-spec.md)，README 只保留使用入口和视觉判断方法。

## 示例效果

这里展示的是用本 skill 重新生成的 README 专用示例图，覆盖正文图、情绪图、解释图、知识卡片、技术架构图、流程图、多格漫画和信息图。完整示例图集见 [docs/examples/visual-gallery.md](docs/examples/visual-gallery.md)。

### 正文图

正文图用于承接文章里的具体场景，让读者先看到“内容正在发生什么”。

<table>
  <tr>
    <td>
      <strong>正文图：内容工作区整理</strong><br>
      <img src="assets/readme-showcase/01-article-illustration.png" alt="正文图：内容工作区整理">
    </td>
  </tr>
</table>

### 情绪图组

情绪图不是固定微笑表情，而是根据内容状态表达低落、慌张、烦躁、迷茫、专注和释然。

<table>
  <tr>
    <td width="33%">
      <strong>低落：没反馈</strong><br>
      <img src="assets/readme-showcase/02a-emotion-low-mood.png" alt="情绪图：低落">
    </td>
    <td width="33%">
      <strong>慌张：任务爆了</strong><br>
      <img src="assets/readme-showcase/02b-emotion-panic.png" alt="情绪图：慌张">
    </td>
    <td width="33%">
      <strong>烦躁：线打结</strong><br>
      <img src="assets/readme-showcase/02c-emotion-irritated.png" alt="情绪图：烦躁">
    </td>
  </tr>
  <tr>
    <td width="33%">
      <strong>迷茫：选哪种</strong><br>
      <img src="assets/readme-showcase/02d-emotion-confused.png" alt="情绪图：迷茫">
    </td>
    <td width="33%">
      <strong>专注：最后检查</strong><br>
      <img src="assets/readme-showcase/02e-emotion-focused.png" alt="情绪图：专注">
    </td>
    <td width="33%">
      <strong>释然：跑通了</strong><br>
      <img src="assets/readme-showcase/02f-emotion-relieved.png" alt="情绪图：释然">
    </td>
  </tr>
</table>

### 解释图组

解释图用于说明机制、因果、对比和轻量流程。

<table>
  <tr>
    <td width="50%">
      <strong>解释图：输入到生成</strong><br>
      <img src="assets/readme-showcase/03-explanatory-diagram.png" alt="解释图：输入到生成">
    </td>
    <td width="50%">
      <strong>解释图：先做路由</strong><br>
      <img src="assets/readme-showcase/03b-explanatory-comparison.png" alt="解释图：先做路由">
    </td>
  </tr>
</table>

### 知识卡片组

知识卡片用于把判断压缩成可阅读、可收藏的结构；可以横版、竖版、矩阵、决策树或对比卡，不默认全做竖图。

<table>
  <tr>
    <td width="33%">
      <strong>形态选择卡</strong><br>
      <img src="assets/readme-showcase/04-knowledge-card.png" alt="知识卡片：内容先选形态">
    </td>
    <td width="33%">
      <strong>决策树卡</strong><br>
      <img src="assets/readme-showcase/04a-knowledge-decision-card.png" alt="知识卡片：决策树">
    </td>
    <td width="33%">
      <strong>矩阵卡</strong><br>
      <img src="assets/readme-showcase/04b-knowledge-matrix-card.png" alt="知识卡片：矩阵">
    </td>
  </tr>
</table>

### 技术架构图 / 流程图

结构类图优先保证关系清楚，人物可以缩小、局部出现或不出现。

<table>
  <tr>
    <td width="50%">
      <strong>技术架构图：输入到输出</strong><br>
      <img src="assets/readme-showcase/05-technical-architecture.png" alt="技术架构图：输入到输出">
    </td>
    <td width="50%">
      <strong>流程图：读内容到检查</strong><br>
      <img src="assets/readme-showcase/06-process-flow.png" alt="流程图：读内容到检查">
    </td>
  </tr>
</table>

### 多格漫画 / 信息图

多格漫画用于表达前后变化；信息图用于承载全局地图和高密度信息。

<table>
  <tr>
    <td width="50%">
      <strong>多格漫画：从需求乱到可复用</strong><br>
      <img src="assets/readme-showcase/07-comic-strip.png" alt="多格漫画：从需求乱到可复用">
    </td>
    <td width="50%">
      <strong>信息图：内容到发布地图</strong><br>
      <img src="assets/readme-showcase/08-infographic-poster.png" alt="信息图：内容到发布地图">
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
