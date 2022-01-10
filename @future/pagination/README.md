# Future Nest

A starter project that makes creating a Future component extremely easy.

### Requirements

- Node, v10.0.0+

### Usage

```bash
git clone ssh://git@git.vemic.com:10022/MIC/future/nest.git YOURFOLDERNAME
cd YOURFOLDERNAME

# Run npm install and write your library name when asked. That's all!
npm install
```

**修改名称!** 推荐使用 `YOURFOLDERNAME`
- 修改 `package.json` 文件的 `name` 字段, 推荐使用 `@futrue/nest` 这种命名格式
- 修改 `package.json` 文件的 `libraryName` 字段, 推荐使用 `nest` 这种命名格式(多单词可使用`-`分隔)

修改后就可以愉快的编码了

### NPM scripts

 - `npm start`: Run dev mode
 - `npm run build`: Generate bundles and typings, create docs


### TODO

- [x] 调整声明文件位置
- [x] 调整 build 出来的资源文件位置
- [x] 提取 rollup 参数
- [x] 增加 dev 模式
- [x] 测试 1.x 和 2.x 并存问题
- [ ] future 增加 preact 运行时
- [x] 测试模块导入，及二次开发
- [ ] 抽取公共配置参数
- [x] 测试数组展开
- [x] 测试生命周期