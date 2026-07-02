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

## 核心产出结构

策略和 prompt-only 模式下，推荐输出结构如下：

```json
{
  "routing_decision": {
    "article_type": "方法论文章",
    "article_type_confidence": "high",
    "type_signals": ["有框架", "有步骤", "有适用条件"],
    "default_visual_strategy": ["knowledge-card-pack", "infographic-poster"],
    "route_scores": [
      {
        "route": "infographic-poster",
        "score": 5,
        "reason": "文章需要全局地图",
        "risk": "信息过密、文字过小",
        "output_role": "主输出"
      }
    ],
    "primary_route": "infographic-poster",
    "secondary_routes": ["knowledge-card-pack"],
    "information_density": "high",
    "recommended_outputs": ["1 张总览信息图", "5-7 张知识卡片"],
    "route_risks": ["信息过密", "文字过小", "主次不清"]
  },
  "pictures": [
    {
      "position": "第 2 节后 / cover / summary",
      "topic": "这张图要解决的问题",
      "recommended_candidate": "A",
      "candidates": [
        {
          "id": "A",
          "primary_route": "knowledge-card-single",
          "secondary_routes": ["explanatory-diagram"],
          "information_density": "medium",
          "text_density_level": "medium",
          "text_budget": "1 标题 + 4 要点 + 1 底部总结",
          "text_overflow_plan": "超过 5 个要点时拆成第二张卡",
          "knowledge_relation": "流程 / 因果 / 分层 / 输入汇聚 / 决策分流 / 左右对比",
          "card_pack_narrative": "总览 -> 分层解释 -> 决策树 -> 流程图 -> 行动卡",
          "composition_pattern": "左因右果路径卡",
          "layout_flow": "左侧问题 -> 中间机制 -> 右侧结果",
          "character_presence": "small-character",
          "aspect_ratio": "4:3",
          "prompt": "完整生图提示词"
        }
      ]
    }
  ]
}
```

字段含义：

- `primary_route`：这张图最主要的视觉形态。
- `secondary_routes`：辅助表达方式，没有则为空数组。
- `route_scores`：候选图型评分，包含分数、理由、风险和输出角色。
- `information_density`：信息密度，取 `low`、`medium` 或 `high`。
- `recommended_outputs`：建议最终生成哪些图，而不是盲目按小节凑图。
- `route_risks`：提前暴露可能失败的点，例如信息过密、情绪过火、人物遮挡结构。
- `knowledge_relation`：同一卡内多个知识点之间的关系；没有关系就拆卡。
- `text_density_level`：文字密度等级；超过预算时拆图，不缩小字号硬塞。

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

## 双参考图机制

真实生图前按人物呈现等级选择视觉锚点：

| 参考图 | 用途 |
|---|---|
| `assets/examples/00-xinghe-ip-baseline.png` | 画面含星禾人物、手部、半身或侧影时，用来锁定脸、发型、服饰和气质 |
| `assets/examples/01-14-*.png` | 参考正文锚点、解释图、技术架构图、流程图、知识卡片、轻分镜和信息图海报的构图、动作、留白、线条和批注密度 |
| `assets/examples/15-20-*.png` | 参考微信公众号文章封面和小红书笔记封面的标题区、人物区、安全边距和排版关系 |

画面含人物时，通过 Node CLI 生成优先使用：

```bash
--style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-match>.png"
```

人物基准图负责星禾形象，场景参考图只负责构图、动作、留白、线条和批注密度。含人物时不要只传场景图而漏掉人物基准图。明确 `no-character` 的技术架构图或流程图可以不展示人物，但不要声称它是人物一致的星禾图。

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

- 每张图只讲一个核心结构；整篇总览只能走信息图海报或知识卡片组，不把全文硬塞进一张图。
- 正文图、封面、情绪图和漫画里，星禾必须承担核心动作；如果去掉星禾画面仍然完全成立，说明角色太装饰。
- 技术架构图、流程图和高密度知识卡片里，结构必须优先可读；星禾可以是小人物、局部人物或无人物。
- 中文批注尽量短，避免错字和说明书感。
- 不做模板 PPT、课程页、冷硬正式流程图、科技 UI 或商业插画；但可以做冷白/浅蓝灰底蜡笔风格的技术架构图、流程图、手绘解释图、知识卡片、多格漫画和信息图海报。
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
- 视觉路由决策：`article_type`、`route_scores`、`primary_route`、`secondary_routes`、`information_density`、`recommended_outputs` 和 `route_risks`
- 每个配图选点的放置位置、选点理由、图型、主题、结构、星禾动作和推荐候选
- 逐节配图判断表和视觉路由
- 情绪锚点图、解释图、技术架构图、流程图、多格漫画、知识卡片组、单张知识卡片和信息图海报方案
- 单张完整生图提示词
- `outputs/xinghe-illustration-packs/{日期}-{短标题}/` 发布包
- 改图提示词
- 在用户明确要求真实生成且环境可用时，通过 Node CLI 输出 PNG 图片

默认不输出：

- PPTX、PDF、Keynote 或课程课件
- SVG、HTML、Canvas 可编辑源文件
- 商业海报、品牌 KV、工程精确到可审计的复杂系统拓扑图
- 大段文字型信息图或把全文硬塞进一张图

---

## 你可以怎么用

| 模式 | 适合场景 | 是否真实生图 |
|---|---|---|
| 配图策略 | 先判断文章哪里值得配图，输出 3-7 个选点和候选方向 | 否 |
| 正文多候选 | 每个正文配图选点给 A/B 方向，重点图可给 A/B/C | 否 |
| 平台封面候选 | 为公众号封面或小红书封面先给 3 个不同视觉方向 | 否 |
| 知识卡片组 | 根据内容和发布场景拆成 5-9 张横版或竖版卡片 | 否 |
| 技术架构图 | 表达系统组件、服务边界、数据流、模块依赖 | 否 |
| 流程图 | 表达 SOP、自动化流程、审批流、状态流、内容生产流程 | 否 |
| 情绪图/解释图/多格漫画 | 根据内容张力、机制和因果节奏选择合适形态 | 否 |
| 信息图海报 | 整篇流程、矩阵或地图式总览，默认最多一张 | 否 |
| 自主路由 | 读完文章后自动判断应该生成哪些图，而不是用户先选图型 | 否 |
| 路由评分 | 给候选图型打分，解释为什么选或不选 | 否 |
| 混合路由 | 漫画搭配情绪图、信息图搭配知识卡、知识卡内嵌解释图 | 否 |
| 失败回收 | 针对出图失败生成返工动作和重写 prompt | 否 |
| prompt-only | 每个候选方向输出独立 prompt，交给用户后续生成或人工处理 | 否 |
| 单张真实生成 | 用户确认某个候选后，通过 Node CLI 输出 PNG | 是 |
| 多候选真实生成 | 用户明确要多个候选文件时，分别生成 `cover-a.png`、`cover-b.png` 等 | 是 |
| 结构处理 | 技术结构走架构图/流程图；过复杂才拆图或 diagram fallback | 否 |
| 学习日志 | 用户确认某张图效果好后，生成可写入学习日志的条目建议 | 否 |
| inspect/dry-run | 调试参数、检查参考图和覆盖风险 | 否 |
| 改图提示 | 修改已有图片、纠正不符合 QA 的结果 | 视用户要求 |

### 视觉形态怎么选

| 形态 | 优先使用场景 | 不适合场景 |
|---|---|---|
| 正文锚点图 | 文章中一个判断、动作、转折、场景瞬间 | 需要承载整篇文章全部信息 |
| 情绪锚点图 | 痛点、误区、理想现实反差、压力和卡点 | 纯步骤教程或精确流程 |
| 解释图 | 抽象概念、轻量机制、因果链、3-5 步流程 | 数据库拓扑、权限流、复杂技术依赖 |
| 技术架构图 | 系统组件、服务边界、数据流、模块依赖、权限边界 | 纯情绪表达或封面点击图 |
| 流程图 | SOP、自动化流程、审批流、状态流、内容生产流程 | 只有单个观点或一句结论 |
| 多格漫画 | 有明显前后变化、累积、转折或因果推进 | 每格只是重复同一个观点 |
| 知识卡片组 | 长文总结、文章笔记、小红书轮播、方法论拆解 | 只需要一张封面或一个情绪瞬间 |
| 单张知识卡 | 单观点、单流程、单对比、单清单 | 信息超过手机端单屏可读范围 |
| 信息图海报 | 整篇流程、矩阵、地图式总览 | 把全文原文硬塞进一张图 |
| 平台封面 | 公众号头图、小红书首图、文章封面 | 正文里解释复杂机制 |

### 自主判断生成什么图

```text
Use $xinghe-illustrations-skill 先不要生图。
请读完下面这篇文章后，自主判断应该生成哪些类型的图。
不要让我先选图型。

请输出：
1. 逐节配图判断表
2. routing_decision：primary_route、secondary_routes、information_density、recommended_outputs、route_risks
3. route_scores：每个候选图型的分数、理由、风险和输出角色
4. 每张建议图片的 A/B 候选方向
5. 每个候选的推荐比例、人物呈现等级、文字密度、参考图和适用原因

<粘贴文章>
```

### 路由评分 dry-run

```text
Use $xinghe-illustrations-skill 先不要生图。
请只做路由评分，不写完整 prompt。
先判断文章类型，再给 platform-cover、emotion-anchor、explanatory-diagram、technical-architecture、process-flow、comic-strip、knowledge-card-pack、knowledge-card-single、infographic-poster 分别打 1-5 分。
每个路由写 reason、risk 和 output_role，最后给 primary_route、secondary_routes 和 recommended_outputs。

<粘贴文章>
```

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
请为公众号文章封面标题《我把 AI 对话工具变成了工作区系统》给 3 个候选方向。
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
我已经配置好 OPENAI_API_KEY。
请先用 inspect 检查人物基准图、场景参考图和输出路径，再生成 PNG。
```

### 生成多个候选文件

```text
Use $xinghe-illustrations-skill 生成小红书封面候选 A 和 B。
两个候选分别保存为 xhs-cover-a.png 和 xhs-cover-b.png，不要合成一张，也不要覆盖已有文件。
```

### 技术架构图 / 流程图

```text
Use $xinghe-illustrations-skill 先不要生图。
请把下面这段技术说明设计成一张技术架构图或流程图。
要求先判断 route 是 technical-architecture 还是 process-flow。
人物呈现优先 small-character / partial-character / no-character，不要让完整人物抢走节点和箭头。
输出节点、边、层级、人物呈现等级、候选方向和 prompt。

<粘贴复杂段落>
```

### 横版知识卡片组

```text
Use $xinghe-illustrations-skill 先不要生图。
请把下面这篇方法论文章拆成横版知识卡片组，不是小红书轮播。
先根据内容判断每张卡适合 4:3 还是 16:9；流程、对比、结构关系清楚时优先横版。
输出 5-7 张卡片计划，每张卡包含：卡片角色、标题、信息目标、推荐比例、布局、人物呈现等级、卡面文字、候选方向和推荐参考图。流程卡、架构卡和清单卡可以使用小人物、局部人物或无人物。

<粘贴文章>
```

### 小红书竖版知识卡片组

```text
Use $xinghe-illustrations-skill 先不要生图。
请把下面这篇文章拆成小红书 3:4 知识卡片组。
这是小红书轮播场景，所以使用竖版；每张卡只保留一个信息目标。
输出 5-9 张卡片计划，每张卡包含：卡片角色、标题、信息目标、布局、人物呈现等级、卡面文字、候选方向和推荐参考图。

<粘贴文章>
```

### 情绪图 / 解释图 / 多格漫画

```text
Use $xinghe-illustrations-skill 先判断视觉路由。
这段内容如果适合情绪锚点图、解释图或多格漫画，请分别给出候选方向；
如果多格漫画删掉任一格也不影响理解，就降级成单张解释图。

<粘贴段落>
```

### 多格漫画 + 情绪锚点

```text
Use $xinghe-illustrations-skill 先不要生图。
请判断下面这段内容是否适合 comic-strip + emotion-anchor。
如果适合，请输出 panel_count、panel_progression 和 emotion_arc。
每格必须推进剧情，同时体现情绪阶段；不要做无关表情包。

<粘贴有误区、压力、转折或成长过程的段落>
```

### 信息图海报

```text
Use $xinghe-illustrations-skill prompt-only。
请把这篇方法论文章做成一张 3:4 信息图海报 prompt。
默认最多一张，不要把全文硬塞进去，只保留全局结构、关键路径和短标签。

<粘贴文章>
```

### 高密度信息图 + 知识卡片组

```text
Use $xinghe-illustrations-skill 先不要生图。
这篇文章信息量很大，请判断是否适合 infographic-poster + knowledge-card-pack。
如果适合，请让信息图只负责全局地图，知识卡片负责分点解释。
输出 section_count、density_strategy、reading_path，以及建议拆成几张知识卡。

<粘贴文章>
```

### 单张知识卡承载多个相关知识点

```text
Use $xinghe-illustrations-skill 先不要生图。
请把下面这些相关知识点放在同一张知识卡片里。
先判断它们的 knowledge_relation 是并列、因果、流程、分层、输入汇聚、决策分流还是左右对比。
如果没有明确关系，请拆成多张卡。

知识点：
1. <知识点一>
2. <知识点二>
3. <知识点三>
4. <知识点四>
```

### 记录视觉学习日志

```text
Use $xinghe-illustrations-skill 这张图我决定采用。
请根据这次采用结果生成一条 learning/visual-learning-log.md 学习日志建议，不要直接改文件。
需要包含：日期、平台/用途、标题或主题、采用方向、为什么好、失败点、后续复用规则、相关文件或参考图。
```

### 失败回收

```text
Use $xinghe-illustrations-skill 先不要重新生图。
这张图的问题是：人物有点漂移、文字太多、画面像 PPT。
请按 failure-recovery-playbook 输出 failure_type、root_cause、recovery_action 和 rewrite_prompt。
```

### 样例任务 dry-run

```text
Use $xinghe-illustrations-skill 先不要生图。
请用 docs/examples/sample-task-packs.md 的第 1 个样例做 dry-run。
输出文章类型、路由评分、推荐产物、候选方向和默认 prompt-only 交付格式。
```

### 编辑已有图片

```text
Use $xinghe-illustrations-skill 帮我编辑这张图。
去掉左上角的“流程图”标题，保留冷白/浅蓝灰底蜡笔线稿和星禾主体动作。
```


---

## 安装与生图配置

这个版本适合所有支持本地 skills、Node CLI 或外部工具调用的 Agent / AI 工作流环境。它可以只输出配图策略和 prompt，也可以在你配置好官方 OpenAI，并明确授权外部上传风险后，通过内置 Node CLI 生成 PNG 图片。

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

本机路径示例：

```text
C:\Users\<you>\.codex\skills\xinghe-illustrations-skill\
```

安装或更新后，重启运行环境或开启新会话，让 skill 被重新加载。

### 2. 选择使用方式

| 使用方式 | 需要配置 | 是否真实请求图片服务 | 适合场景 |
|---|---|---:|---|
| 配图策略 / shot list | 不需要 | 否 | 先判断文章哪里值得配图 |
| prompt-only | 不需要 | 否 | 只要最终提示词，交给用户后续生成或人工处理 |
| 官方 OpenAI 生图 | `OPENAI_API_KEY` | 是 | 直接走 OpenAI 官方端点 |
| inspect / dry-run | 按目标模式可选 | 否 | 检查 endpoint、参考图、输出路径和覆盖风险 |

画面含星禾人物、手部、半身或侧影时，真实生成必须能上传人物基准图，并且建议同时传入场景参考图：

```bash
--style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/<best-match>.png"
```

`00-xinghe-ip-baseline.png` 用来锁定星禾人物形象，第二张参考图用来锁定正文配图或封面构图。正文图、技术架构图、流程图和知识卡片从 `01-14` 选择；微信公众号封面和小红书封面从 `15-20` 选择。如果当前链路只能纯文本生图、不能上传人物基准图，就不要声称生成了合格的星禾人物图片，也不要调用 Images API。明确 `no-character` 的结构图可以不展示人物。

### 3. 配置环境变量

不要把真实 API key 或 access token 写进仓库文件。尤其不要写进：

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

### 4. 官方 OpenAI 调用

官方模式默认使用 OpenAI Responses API，也可以按需要使用支持参考图上传的 Images edits。Responses API 通过 `image_generation` 工具返回图片数据；Images API 在本 skill 中只用于带参考图的编辑式生成。

先做零成本检查：

```bash
node scripts/xinghe_image_assets_cli.js inspect \
  --mode official \
  --api-mode responses \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/01-topic-a.png"
```

真实生成：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode official \
  --api-mode responses \
  --style-references "assets/examples/00-xinghe-ip-baseline.png,assets/examples/05-handoff-path.png" \
  --prompt "<final image prompt>" \
  --output "outputs/xinghe-illustration-packs/<date-slug>/images/01-topic-a.png" \
  --size 1536x1024 \
  --quality high \
  --output-format png
```

如果官方链路或当前 runtime 不能上传人物基准图，含人物任务先停在 prompt-only 或命令建议，不要绕过基准图硬门槛。无人物结构图可按 `no-character` 规则处理。

### 5. 推荐验证顺序

1. 检查脚本语法：

```bash
node --check scripts/xinghe_image_assets_cli.js
```

2. 用 `inspect` 检查参数、参考图和输出路径，不请求 API。
3. 确认密钥和输出路径后，再运行 `generate`。

### 6. 常见问题

**为什么含人物时必须传人物基准图？**

星禾是固定个人 IP，单靠文字描述容易漂移。人物基准图负责脸、发型、服饰和气质，场景参考图只负责构图和留白。技术架构图、流程图或高密度知识卡片如果选择 `no-character`，可以不画人物。

---

## 目录结构

```text
.
├── README.md
├── SKILL.md
├── agents/
├── assets/examples/
├── references/
│   ├── cognitive-anchor-routing.md
│   ├── article-type-visual-strategy.md
│   ├── route-scoring.md
│   ├── visual-formats.md
│   ├── knowledge-card-composition-patterns.md
│   ├── card-pack-narrative-structures.md
│   ├── text-density-rules.md
│   ├── text-rendering-rules.md
│   ├── failure-recovery-playbook.md
│   ├── output-spec.md
│   ├── visual-routing-and-candidates.md
│   ├── prompt-template.md
│   └── ...
├── docs/examples/
│   └── sample-task-packs.md
└── scripts/
    └── xinghe_image_assets_cli.js
```

---

## 相关文件

- `SKILL.md`：Skill 触发描述和主工作流
- `references/cognitive-anchor-routing.md`：逐节配图判断、深度提炼、自主路由和混合路由
- `references/article-type-visual-strategy.md`：文章类型和默认视觉策略
- `references/route-scoring.md`：候选路由 1-5 分评分标准
- `references/visual-formats.md`：情绪图、解释图、多格漫画、知识卡片和信息图海报规则
- `references/knowledge-card-composition-patterns.md`：知识卡片横版/竖版构图骨架
- `references/card-pack-narrative-structures.md`：知识卡片组叙事结构
- `references/text-density-rules.md`：不同图型的文字密度分级和拆图阈值
- `references/technical-architecture-and-flow.md`：技术架构图、流程图和人物缩放/可省略规则
- `references/text-rendering-rules.md`：中文文字渲染铁律
- `references/output-spec.md`：输出包目录、prompts.json 和 manifest 规范
- `references/xinghe-ip.md`：星禾形象、动作库和禁忌
- `references/illustration-selection.md`：智能选点、图型分类和 prompt-only 模式
- `references/visual-routing-and-candidates.md`：主/辅路由确定后的候选数量、候选字段和真实生成确认规则
- `learning/visual-learning-log.md`：人工确认好图后的视觉经验沉淀
- `references/prompt-template.md`：生图和改图提示词模板
- `references/prompt-template-images-api.md`：Images edits 精简 prompt 模板
- `references/qa-checklist.md`：生成后检查与返工规则
- `references/failure-recovery-playbook.md`：失败类型、修复动作和重写 prompt
- `references/image-generation-runtime.md`：CLI 调用、dry-run、manifest 和失败处理
- `references/access-modes.md`：官方调用、环境变量和安全边界
- `references/reference-images.md`：风格参考图和星禾 IP 锚定规则
- `scripts/xinghe_image_assets_cli.js`：真实生图、inspect、manifest 和断点续跑 CLI
- `docs/examples/sample-task-packs.md`：典型任务 dry-run 样例

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
