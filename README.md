# Xinghe Illustrations Skill

无原生生图 Agent 版星禾正文配图 skill。

用于 OpenClaw、Hermes 或其他没有原生图片生成能力的 Agent：读取中文文章或运营内容，输出星禾个人 IP 风格的正文配图策略、shot list、最终提示词，并通过内置 Node CLI 调用 OpenAI official 或第三方 proxy 图片接口生成 PNG。

## 适用场景

- 无原生生图工具的 Agent runtime
- 需要通过 `scripts/xinghe_image_assets_cli.js` 出图
- 需要 official/proxy、Responses API、Images API 兼容
- 需要 manifest、dry-run、inspect、断点补生成等批量能力

## 视觉锚点

- 人物基准图：`assets/examples/00-xinghe-ip-baseline.png`
- 场景参考图：`assets/examples/01-*.png`
- 真实生图时默认使用双参考图：人物基准图锁定星禾形象，场景参考图只控制构图、动作、留白、线条和批注密度。

## 安装

复制本仓库目录到 Agent skills 目录：

```text
C:\Users\<you>\.codex\skills\xinghe-illustrations-skill\
```

重启 Agent 或开启新会话后使用：

```text
Use $xinghe-illustrations-skill 为这篇文章生成星禾风格正文配图。
```

真实 API key 和 endpoint 只应配置在本机私有环境变量或 runtime secrets 中，不要写入仓库文件。

