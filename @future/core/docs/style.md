### css框架示意图
```
sass/ 
| 
|– base/ 
|   |– _functions.scss   # 函数
|   |– _mixins.scss      # minxin
|   |– _reset.scss       # Reset/normalize 
|   |– _text.scss        # 字体初始化
|   |– _utils.scss       # 工具class
|   |– _variables.scss   # 全局变量丢这里
|   ...                  # Etc… 
| 
|– fonts/ 
|   |– _micon.scss       # 图形字体
|   |– _roboto.scss      # 文字字体
|   ...                  # Etc… 
|
|– lib/ 
|   |– _buttons.scss     # 按钮 
|   ...                  # Etc… 
| 
`– future.scss             # 主文件
```

### base
>全局变量全部都在variables文件中
### fonts
>字体定义sass丢这里，字体文件放在/assets/fonts下
### lib
>所有静态组件资源丢这里