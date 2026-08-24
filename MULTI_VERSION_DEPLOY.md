# 多版本文档部署流程（ROSOrin-vite）

> 适用于同一个 GitHub 仓库支持多个文档版本的场景。
> 每个版本独立构建，共享同一个 `main` 分支，通过宝塔 Nginx 反向代理统一对外提供服务。

---

## 架构说明

```
GitHub 仓库：ROSOrin-vite（单一仓库）
    │
    ├── content/                    ← 三个版本的源文件
    │   ├── jetson-orin-nano-version/
    │   │   ├── docs/               ← Jetson Orin Nano 版本的 Markdown
    │   │   └── _static/            ← Jetson Orin Nano 版本的静态资源
    │   ├── jetson-nano-version/
    │   │   ├── docs/               ← Jetson Nano 版本的 Markdown
    │   │   └── _static/            ← Jetson Nano 版本的静态资源
    │   └── raspberry-pi-version/
    │       ├── docs/               ← Raspberry Pi 版本的 Markdown
    │       └── _static/            ← Raspberry Pi 版本的静态资源
    │
    ├── projects/                   ← 构建产物（同时包含三个版本）
    │   └── ROSOrin/
    │       └── en/
    │           ├── jetson-orin-nano-version/   ← 第一个版本
    │           │   ├── assets/
    │           │   ├── docs/
    │           │   └── index.html
    │           ├── jetson-nano-version/        ← 第二个版本
    │           │   ├── assets/
    │           │   ├── docs/
    │           │   └── index.html
    │           └── raspberry-pi-version/       ← 第三个版本
    │               ├── assets/
    │               ├── docs/
    │               └── index.html
    │
    └── docs/                        ← VitePress 工作目录
    │   └── .vitepress/
    │       └── config.mts          ← 构建时通过环境变量动态配置
    │
    └── scripts/
        └── build_version.mjs       ← 多版本构建脚本

访问地址：
- Jetson Orin Nano 版本：https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-orin-nano-version/
- Jetson Nano 版本：https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/
- Raspberry Pi 版本：https://wiki.hiwonder.com/projects/ROSOrin/en/raspberry-pi-version/
```

---

## 占位符说明

| 占位符 | 含义 | 示例值 |
|--------|------|--------|
| `<项目名>` | URL 路由中的项目标识 | `ROSOrin` |
| `<仓库名>` | GitHub 仓库名称 | `ROSOrin-vite` |
| `<版本1>` | 第一个版本标识 | `jetson-orin-nano-version` |
| `<版本2>` | 第二个版本标识 | `jetson-nano-version` |
| `<版本3>` | 第三个版本标识 | `raspberry-pi-version` |

---

## 第一步：准备文档内容

### 1.1 放置 Markdown 文件

将各版本的 Markdown 文件放入对应目录：

```bash
# Jetson Orin Nano 版本
content/jetson-orin-nano-version/docs/*.md

# Jetson Nano 版本
content/jetson-nano-version/docs/*.md

# Raspberry Pi 版本
content/raspberry-pi-version/docs/*.md
```

### 1.2 放置静态资源

将各版本的图片等资源放入对应目录：

```bash
# Jetson Orin Nano 版本
content/jetson-orin-nano-version/_static/**/*

# Jetson Nano 版本
content/jetson-nano-version/_static/**/*

# Raspberry Pi 版本
content/raspberry-pi-version/_static/**/*
```

> ⚠️ 文件命名保持原样（如 `2.xxx.md`、`media/xxx.jpg`），构建时会自动处理路径。

---

## 第二步：本地构建验证

在仓库根目录执行：

```bash
# 安装依赖（首次需要）
npm ci

# 构建所有版本
npm run build:all

# 或单独构建某个版本
npm run build:jetson-orin-nano
npm run build:jetson-nano
npm run build:raspberry-pi
```

构建完成后，检查产物结构：

```
projects/ROSOrin/en/
├── jetson-orin-nano-version/
│   ├── assets/
│   ├── docs/
│   └── index.html
├── jetson-nano-version/
│   ├── assets/
│   ├── docs/
│   └── index.html
└── raspberry-pi-version/
    ├── assets/
    ├── docs/
    └── index.html
```

### 关键检查

打开 `projects/ROSOrin/en/<版本>/index.html`，确认 CSS 路径正确：

```
/projects/ROSOrin/en/<版本>/assets/xxx.css
```

### 本地预览

```bash
# 启动开发服务器
npm run dev

# 访问（base 路径对应构建时的版本）
# http://localhost:4173/projects/ROSOrin/en/jetson-orin-nano-version/
# http://localhost:4173/projects/ROSOrin/en/jetson-nano-version/
# http://localhost:4173/projects/ROSOrin/en/raspberry-pi-version/
```

---

## 第三步：提交并推送到 GitHub

```bash
# 添加所有文件（projects/、docs/、scripts/ 等）
git add -A

# 提交
git commit -m "update: 更新 ROSOrin 三版本文档"

# 推送到 main 分支
git push origin main
```

> ⚠️ 确保 `.gitignore` 包含 `node_modules/` 和 `docs/.vitepress/dist/`。

---

## 第四步：配置 GitHub Pages

1. 打开 GitHub 仓库 → **Settings** → **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / `root`
4. **不要绑定自定义域名**（Custom domain 留空）

等待几分钟，验证 GitHub Pages 直连：

```
https://hiwonder-docs.github.io/ROSOrin-vite/projects/ROSOrin/en/jetson-orin-nano-version/
https://hiwonder-docs.github.io/ROSOrin-vite/projects/ROSOrin/en/jetson-nano-version/
https://hiwonder-docs.github.io/ROSOrin-vite/projects/ROSOrin/en/raspberry-pi-version/
```

---

## 第五步：配置宝塔 Nginx 反向代理

登录宝塔面板 → `wiki.hiwonder.com` 站点 → **设置** → **配置文件**，在 `server {}` 块内追加：

```nginx
# ROSOrin - Jetson Orin Nano 版本
location ^~ /projects/ROSOrin/en/jetson-orin-nano-version/ {
    proxy_pass https://hiwonder-docs.github.io/ROSOrin-vite/projects/ROSOrin/en/jetson-orin-nano-version/;
    proxy_set_header Host hiwonder-docs.github.io;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_server_name on;
}

# ROSOrin - Jetson Nano 版本
location ^~ /projects/ROSOrin/en/jetson-nano-version/ {
    proxy_pass https://hiwonder-docs.github.io/ROSOrin-vite/projects/ROSOrin/en/jetson-nano-version/;
    proxy_set_header Host hiwonder-docs.github.io;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_server_name on;
}

# ROSOrin - Raspberry Pi 版本
location ^~ /projects/ROSOrin/en/raspberry-pi-version/ {
    proxy_pass https://hiwonder-docs.github.io/ROSOrin-vite/projects/ROSOrin/en/raspberry-pi-version/;
    proxy_set_header Host hiwonder-docs.github.io;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_server_name on;
}
```

**保存并重载 Nginx**。

> ⚠️ `proxy_pass` 后面不要加反引号，直接写 URL，以分号 `;` 结尾。

---

## 第六步：验证访问

```
https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-orin-nano-version/
https://wiki.hiwonder.com/projects/ROSOrin/en/jetson-nano-version/
https://wiki.hiwonder.com/projects/ROSOrin/en/raspberry-pi-version/
```

- 页面能正常打开，样式正常 → 部署成功
- 导航栏版本切换器可在三个版本间跳转
- 图片显示正常

---

## 构建脚本说明

### `package.json` 命令

```json
{
  "scripts": {
    "dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:stage-main": "node scripts/stage_main_site.mjs",
    "build:jetson-orin-nano": "node scripts/build_version.mjs jetson-orin-nano-version",
    "build:jetson-nano": "node scripts/build_version.mjs jetson-nano-version",
    "build:raspberry-pi": "node scripts/build_version.mjs raspberry-pi-version",
    "build:all": "npm run build:jetson-orin-nano && npm run build:jetson-nano && npm run build:raspberry-pi"
  }
}
```

### `build_version.mjs` 工作流程

1. 从 `content/<版本>/docs/` 复制 Markdown 到 `docs/docs/`
2. 从 `content/<版本>/_static/` 复制静态资源到 `docs/_static/`
3. 设置环境变量 `DOCS_BASE` 和 `DOCS_VERSION`
4. 执行 `vitepress build`
5. 将构建产物整理到 `projects/ROSOrin/en/<版本>/`

### `config.mts` 关键配置

```typescript
// base 路径
const docsBase = normalizeBase(
  process.env.DOCS_BASE || '/projects/ROSOrin/en/jetson-orin-nano-version/'
)

// 当前版本
const currentVersion = process.env.DOCS_VERSION || 'jetson-orin-nano-version'

// 版本切换器导航
nav: [
  {
    text: 'Version',
    items: [
      { text: 'Jetson Orin Nano Version', link: '/projects/ROSOrin/en/jetson-orin-nano-version/' },
      { text: 'Jetson Nano Version', link: '/projects/ROSOrin/en/jetson-nano-version/' },
      { text: 'Raspberry Pi Version', link: '/projects/ROSOrin/en/raspberry-pi-version/' }
    ]
  },
  { text: 'Home', link: 'https://www.hiwonder.net/', target: '_self' }
]
```

---

## 快速检查清单

- [ ] `content/<版本>/docs/` 下的 Markdown 已准备好
- [ ] `content/<版本>/_static/` 下的静态资源已准备好
- [ ] `npm run build:all` 构建成功
- [ ] `projects/ROSOrin/en/` 下同时包含三个版本目录
- [ ] 每个版本的 `index.html` CSS 路径正确（`/projects/ROSOrin/en/<版本>/assets/`）
- [ ] GitHub 仓库已推送
- [ ] GitHub Pages 配置为 `main` / `root`
- [ ] GitHub Pages 直连可访问
- [ ] Nginx 已添加三条 `location` 规则
- [ ] Nginx 已重载
- [ ] 三个版本的 `wiki.hiwonder.com` 地址都可正常访问

---

## 常见问题

### Q1: 版本切换器跳转后链接不对

**原因**：`config.mts` 中 `nav` 配置的链接路径错误，或 `Layout.vue` 中版本列表不同步。

**检查**：
- 确认 `nav` 中的 `link` 是绝对路径（以 `/` 开头）
- 确保路径格式：`/projects/ROSOrin/en/<版本>/`
- 确认 `Layout.vue` 中 `ALL_VERSIONS` 数组包含所有版本标识

### Q2: 页面能打开但 CSS 丢失

**原因**：`DOCS_BASE` 环境变量未正确设置，或构建产物路径错误。

**检查**：
1. 打开 `projects/ROSOrin/en/<版本>/index.html`，检查 CSS 路径
2. 确认 `base` 配置为 `/projects/ROSOrin/en/<版本>/`
3. 重新执行 `npm run build:all`

### Q3: 版本切换器样式没生效

**原因**：修改 CSS 后没有重新构建。

**解决**：修改 `custom.css` 后必须重新执行 `npm run build:all`。

### Q4: 新增版本需要改哪些文件

只需修改以下 4 处：

1. **`package.json`**：在 `scripts` 中添加新版本的构建命令
2. **`config.mts`**：在 `nav` 中添加新版本链接
3. **`Layout.vue`**：在 `ALL_VERSIONS` 和 `VERSION_LABELS` 中添加新版本
4. **创建源文件目录**：`content/<新版本>/docs/` 和 `content/<新版本>/_static/`
5. **`build_version.mjs`**：在 `validVersions` 数组中添加新版本标识

### Q5: Nginx 配置报错

**常见原因**：
- `proxy_pass` URL 被反引号包裹
- 仓库名和项目名混淆（仓库：ROSOrin-vite，项目：ROSOrin）
- location 规则没有 `^~` 前缀

**正确示例**：
```nginx
location ^~ /projects/ROSOrin/en/jetson-orin-nano-version/ {
    proxy_pass https://hiwonder-docs.github.io/ROSOrin-vite/projects/ROSOrin/en/jetson-orin-nano-version/;
    proxy_set_header Host hiwonder-docs.github.io;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_server_name on;
}
```

### Q6: 构建时图片路径报错

**原因**：Markdown 中图片引用使用了 Windows 反斜杠 `\`，或图片文件确实缺失。

**处理**：
- `config.mts` 中已内置 `normalizeImagePathSlashes()` 插件自动修复反斜杠
- 已内置 `ignore-missing-images` 插件，缺失图片会使用透明占位符并输出警告，不会中断构建
- 构建日志中会打印 `[missing-image] Skipping missing image: ...`，可据此补全图片

---

## 项目文件结构

```
ROSOrin-vite/
├── content/                        ← 源文件（你放文档的地方）
│   ├── jetson-orin-nano-version/
│   │   ├── docs/
│   │   │   └── *.md
│   │   └── _static/
│   │       └── media/
│   ├── jetson-nano-version/
│   │   ├── docs/
│   │   │   └── *.md
│   │   └── _static/
│   │       └── media/
│   └── raspberry-pi-version/
│       ├── docs/
│       │   └── *.md
│       └── _static/
│           └── media/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts              ← VitePress 配置（自动读取环境变量）
│   │   ├── autoSidebar.mts
│   │   └── theme/
│   │       ├── Layout.vue          ← 版本切换器注入逻辑（三版本）
│   │       ├── custom.css          ← 版本切换器样式
│   │       └── ...
│   ├── docs/                       ← 构建时临时存放 Markdown
│   ├── _static/                    ← 构建时临时存放资源
│   ├── public/
│   └── index.md
├── scripts/
│   ├── build_version.mjs           ← 多版本构建脚本（核心）
│   ├── stage_main_site.mjs         ← 构建产物整理
│   └── convert_dist_images_to_webp.mjs
├── projects/                       ← 构建产物
│   └── ROSOrin/
│       └── en/
│           ├── jetson-orin-nano-version/
│           ├── jetson-nano-version/
│           └── raspberry-pi-version/
├── .nojekyll
├── .gitignore
├── index.html                      ← 版本选择页（三卡片）
├── package.json
├── package-lock.json
└── README.md
```

---

## 构建常用命令速查

| 命令 | 说明 |
|------|------|
| `npm ci` | 安装依赖（首次或重置时） |
| `npm run build:all` | 构建全部 3 个版本 |
| `npm run build:jetson-orin-nano` | 仅构建 Jetson Orin Nano 版本 |
| `npm run build:jetson-nano` | 仅构建 Jetson Nano 版本 |
| `npm run build:raspberry-pi` | 仅构建 Raspberry Pi 版本 |
| `npm run dev` | 启动开发服务器预览 |
