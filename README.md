# seen-font-end 前端项目

## 技术栈

Vue 3 + TypeScript + Vite

## 开发IDE推荐配置

推荐使用 VSCode 搭配以下插件，需禁用旧版 Vetur：

1. Volar
2. TypeScript Vue Plugin (Volar)

### 提升TS编译速度：Volar 接管模式

1. 打开命令面板执行 `Extensions: Show Built-in Extensions`
2. 找到 `TypeScript and JavaScript Language Features`，右键选择「禁用 (工作区)」
3. 执行 `Developer: Reload Window` 重启编辑器

## TS 类型支持说明

TS 默认无法识别 `.vue` 文件类型，项目使用 `vue-tsc` 替代原生 `tsc` 做类型校验；编辑器依赖 Volar 插件识别Vue组件类型。

## 项目脚本说明

### 环境初始化

```sh
npm install
```

### 本地热更新开发

```sh
npm run dev
```

### 生产打包（类型校验+压缩）

```sh
npm run build
```

### 单元测试 Vitest

```sh
npm run test:unit
```

### E2E 测试

1. 开发环境快速测试

```sh
npm run test:e2e:dev
```

2. 基于生产构建全量测试（CI发布前推荐）

```sh
npm run build
npm run test:e2e
```

### 代码格式化与校验 ESLint

```sh
npm run lint
```

## 配置文档

自定义Vite配置参考官方文档：[Vite Configuration Reference](https://vitejs.dev/config/)

## 版本与发布规范

1. 版本号统一由本地 `.env.secret.txt` 读取 `SEEN_VERSION` 环境变量；
2. 完整环境加载、版本管理、Git提交、NPM发布操作流程见 HELP.md；
3. Node 固定版本：24.16.0，使用IDE内置Node环境。