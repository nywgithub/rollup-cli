## @future/core 
> `@future/core` 是所有future ui组件库的核心类库，在开发future组件时，你必须将`@future/core`做为依赖项进行开发，且必须遵守其制定的开发方式。

### @future/core用法
> 页面引入基础样式和JS库
```html
<link rel="stylesheet" href="http://unpkg.ued.vemic.com/@future/core/dist/style/future.css">


<script type="text/javascript" src="http://unpkg.ued.vemic.com/@future/core/dist/future.js"></script>
```

### GitLab
```bash
git clone git@git.vemic.com:future/future-core.git
```

### 功能划分
future主要分为以下功能：
+ `Component`
+ `util`
+ `i18n`
+ `global`

### 代码框架
```text
.

└── core                //  所有组件的基类
    ├── Component       //
└── util
    ├── common          //   组件用到的工具集
    └── className       //
└── i18n
    └── lang            // 多语言配置，目前只存储中文、英文。可在组件外部拓展
└── global              //  全局变量
    └── ...         //
└── style              //
    └── ...         //   

```

### 基础样式说明
[传送门](/docs/style.md)

### future组件开发
...

### npm发布流程说明

***注意事项***
+ 请检查`package.json`中`name`命名方式，我们建议以`@future\xxx`方式命名
+ 请检查`package.json`中`repository` 字段，必须在发布前保证与git库关联

***常用命令***


```bash
//将代理设置成公司私库
npm set registry http://npm.focustech.vemic.com  
```

```bash
//在私库上新增用户、密码（建议用域账号注册）
npm adduser --registry http://npm.focustech.vemic.com 
```

```bash
npm login
//登录npm
```

```bash
//将<floder>目录发布到npm库中，<floder>省略则表示当前目录
npm publish <floder>
```
```bash
//下架已发布的包
npm unpublish [<@scope>/]<pkg> --force
```

```bash
//当前包添加新的贡献者（贡献者有权限上传包）
npm owner add <user> [<@scope>/]<pkg>
//删除贡献者
npm owner rm <user> [<@scope>/]<pkg>
//列出现有贡献者
npm owner ls [<@scope>/]<pkg>
```