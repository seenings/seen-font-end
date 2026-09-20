# seen-font-end 操作运维手册（Windows PowerShell）

## 一、环境前置配置

### 1. 加载 IDE 内置 Node 24 到环境变量

```shell
Get-Content D:\Users\CXH\data\secret\.env.secret.txt | ForEach-Object {$l=$_.Trim();if($l -and !$l.StartsWith("#")){$i=$l.IndexOf('=');$k=$l.Substring(0,$i).Trim();$v=$l.Substring($i+1).Trim();[Environment]::SetEnvironmentVariable($k,$v,"Process")}} ; 
; $env:PATH+=";"+$env:USERPROFILE+"\AppData\Roaming\JetBrains\IntelliJIdea2026.2\node\versions\24.18.1\" ;
# 校验npm版本
npm -v;
echo "SEEN_VERSION=$env:SEEN_VERSION";
```

### 2. 切换项目目录

```shell
cd ~\IdeaProjects\seenings\seen-font-end
```

## 二、日常开发版本迭代

### 1. 自动升级小版本号

```shell
npm version patch
```

## 三、Git 提交、打标签、推送流程

```shell
# 提交代码变更
git add . ; git commit -m "更新版本 #75";
# 拉取主线代码并变基，创建版本Tag
git pull origin main --rebase ; git tag -a v$env:SEEN_VERSION -m "发布版本$env:SEEN_VERSION";
# 推送标签与开发分支
git push origin v$env:SEEN_VERSION ; git push origin dev_chixh;
```

## 四、NPM 包发布流程

### 1. 登录 NPM 仓库

```shell
npm login
```

### 2. 发布当前包

```shell
npm publish
```