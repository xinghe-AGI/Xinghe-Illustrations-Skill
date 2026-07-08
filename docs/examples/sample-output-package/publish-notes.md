# Publish Notes

## 生成前检查

- 已确认是否需要真实生图。
- 已确认外部上传风险。
- 含人物图已传入 `assets/examples/00-xinghe-ip-baseline.png`。
- 全景信息图为 `no-character`，不需要人物基准图。
- 标题和图中文字已进入 `text_inventory`。
- 输出路径不会覆盖旧图。

## 建议命令

先 dry-run：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --manifest "docs/examples/sample-output-package/manifest.json" \
  --validate-manifest \
  --result-manifest "outputs/xinghe-illustration-packs/2026-07-08-codex-workspace-system/manifest.dry-run.json"
```

确认后真实生成：

```bash
node scripts/xinghe_image_assets_cli.js generate \
  --mode proxy \
  --api-mode images \
  --model "$GPT_IMAGE_MODEL" \
  --base-url "$GPT_IMAGE_BASE_URL" \
  --manifest "docs/examples/sample-output-package/manifest.json" \
  --result-manifest "outputs/xinghe-illustration-packs/2026-07-08-codex-workspace-system/manifest.results.json"
```

## 发布前人工审核

- 封面标题是否逐字正确。
- 中文标签是否有错字、乱码、随机英文。
- 是否出现联系方式、二维码、密钥、endpoint、真实 UI。
- 人物是否接近基准图。
- 架构/全景图是否结构优先，没有被人物遮挡。
- 信息图是否过密，是否需要拆成知识卡片组。

## 采用建议

- 小红书封面只选一张，不把多个候选拼成一张。
- 全景图适合放在文章正文开头或方法论总结段。
- 知识卡片可作为正文内嵌图或后续社媒拆条素材。
