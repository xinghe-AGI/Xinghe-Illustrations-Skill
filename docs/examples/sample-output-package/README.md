# 示例输出包

这是一次 `xinghe-illustrations-skill` dry-run 的完整发布包样例，用来展示最终交付物应该长什么样。

样例主题：把“Codex 从对话工具变成工作区系统”的方法论文章，转成视觉生产包。

文件：

- `source-summary.md`：来源摘要、核心观点、风险边界。
- `visual-routing.md`：文章类型、路由评分、主路由和推荐产物。
- `visual-candidates.md`：候选方向和参考图。
- `prompts.json`：prompt-only 结构，可直接用于候选展开。
- `manifest.json`：真实生成前的批量 manifest 示例。
- `publish-notes.md`：发布和人工审核提醒。

这个目录不包含真实生成图片；需要图片时，先对 `manifest.json` 运行 `--validate-manifest`，确认路径和参考图无误后再生成。
