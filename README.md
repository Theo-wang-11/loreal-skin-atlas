# 肌肤图谱 · The Skin Atlas

L'Oréal Groupe 旗下 **12 个护肤品牌** 的介绍网页。首页是一张品牌图谱／索引，点进任意品牌，会看到它的代表性产品与最新 campaign —— **每间品牌都拥有完全独立的画风**，从字体、颜色到版式与动效，互不借用。

> 设计概念作品，非官方页面。品牌名称与商标归 L'Oréal Groupe 及各品牌所有；产品、价格与 campaign 文字均为创意示意。

---

## 打开方式

无需安装、无需构建，**直接双击 `index.html`** 即可。

- 需联网加载 Google Fonts（Cormorant Garamond、Bodoni Moda、Archivo、Noto Serif/Sans SC 等）。离线时会回退到系统字体，版式仍然成立。
- 支持 hash 深链：`index.html#/lancome`、`index.html#/kiehls` …… 可直接分享到某个品牌。
- 桌面与移动端均已适配。

## 收录品牌

| # | 品牌 | 定位 | 画风 |
|---|------|------|------|
| 01 | LANCÔME 兰蔻 | 法式奢华护肤 | 黑 + 玫瑰金，月光与玫瑰，慢节奏衬线 |
| 02 | HELENA RUBINSTEIN 赫莲娜 | 先锋奢华 | 黑金装饰艺术，放射线、菱形框 |
| 03 | KIEHL'S 科颜氏 | 纽约药房 | 牛皮纸、打字机、手写标签、胶带 |
| 04 | LA ROCHE-POSAY 理肤泉 | 皮肤学护理 | 临床白 + 医疗蓝，网格与十字 |
| 05 | VICHY 薇姿 | 火山温泉水 | 大面积正红 + 火山剪影，白底卡片 |
| 06 | CERAVE 适乐肤 | 神经酰胺科学 | 浅蓝、六边形、圆角软卡片 |
| 07 | SKINCEUTICALS 修丽可 | 医美级护理 | 实验室黑、橙色圆、等宽字与数据感 |
| 08 | AESOP 伊索 | 植物香氛 | 米色、Sorts Mill Goudy、植物线稿、文学式留白 |
| 09 | BIOTHERM 碧欧泉 | 生物科技 | 深海青绿、气泡、圆角玻璃面板 |
| 10 | YSL BEAUTY 圣罗兰美妆 | 高定美妆 | 黑金、Bodoni、双线画框、夜色 |
| 11 | L'ORÉAL PARIS 巴黎欧莱雅 | 大众精品 | Archivo Black 大字、红白斜切、海报感 |
| 12 | YUE SAI 羽西 | 东方草本 | 朱红、宣纸、印章、圆形留白 |

## 页面与交互

**首页**
- 全屏排版封面 + 12 个品牌字标跑马灯
- 品牌索引：左侧 sticky「舞台」实时预览品牌色、徽记、产品瓶身；右侧 12 行索引，悬停／键盘聚焦切换预览，点击进入
- 关于／版本说明页脚

**品牌页**
- 品牌 hero：专属艺术背景、字标、中文名、主张、品牌档案
- 宣言、3 件代表性产品（CSS/SVG 手绘瓶身）、最新 campaign
- 「下一间护肤屋」无缝跳转
- 顶部固定导航；`Esc` 返回索引；品牌切换有对应品牌色的幕布转场
- 浏览器前进／后退、深链、滚动位置恢复均可用

**无障碍／性能**
- 语义化标题层级、跳至索引链接、`aria-label`、可见焦点环
- `prefers-reduced-motion` 下关闭动画、跑马灯与幕布位移
- 无框架、无构建、零图片资源（全部为 CSS / 内联 SVG），全部代码约 170 KB（不含字体）

## 文件结构

```
loreal-skin-atlas/
├── index.html              # 页面骨架（首页）
├── assets/
│   ├── css/
│   │   ├── base.css        # reset、变量、首页、转场、响应式
│   │   └── brands.css      # 12 套品牌主题、10 种版式、艺术系统
│   └── js/
│       ├── data.js         # 品牌数据：定位、产品、campaign、色板
│       ├── art.js          # 手绘徽记 + 产品瓶身 SVG 生成器
│       └── app.js          # 索引渲染、舞台预览、hash 路由、幕布
├── preview/                # 预览图
├── tools/                  # 开发用截图 / 审查脚本（可删）
└── README.md
```

## 想改点什么

- **改文案／产品／campaign**：全部集中在 `assets/js/data.js`，一个品牌一个对象，改完刷新即可。
- **改某个品牌的颜色或字体**：在 `assets/css/brands.css` 顶部找到 `[data-brand="xxx"]`，调整 `--brand-bg / --brand-ink / --brand-accent / --brand-display` 等变量。
- **换版式**：品牌页由 `data-layout` 驱动，现有 `editorial / couture / apothecary / clinical / soft / lab / literary / aquatic / bold / oriental` 十种骨架。在 `app.js` 的 `LAYOUT` 映射里改一行即可换一种排版。
- **加品牌**：在 `data.js` 末尾追加对象（`id / no / en / cn / category / origin / year / colors / emblem / motif / tagline / intro / manifesto / facts / products / campaign`），并在 `brands.css` 增加一套主题变量。索引、跑马灯、上下页会自动更新。

## 预览

- `preview/atlas-hero.png` — 首页封面
- `preview/atlas-index.png` — 品牌索引 + 悬停预览
- `preview/brands-overview.png` — 六个品牌的画风对照
- `preview/brands/*.png` — 各品牌 hero

---

© 2024 · 设计概念演示。文字与图像均为示意，不构成官方发布。
