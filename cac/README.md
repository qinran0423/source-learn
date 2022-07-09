## 问题
### 分析一下目录

- 什么类型的文件放到什么文件夹内
  - example: 项目的事例代码
  - src: 项目源码 以及测试文件
  - script: 脚本文件
  - dist: 打包后的文件
  - 以及根目录下放一些相关的配置文件
- 一般都会有几个文件夹

  `script`、 `src`、 `example`、`test`、`dist`、`config`

### .editorconfig  是干嘛的

  `editorconfig`是用于跨不同的编辑器和IDE为多个开发人员维护一致的编码风格的配置文件。`editorconfig`项目由定义编码样式的文件格式和一组文本编辑器插件组成，编辑器插件通过读取文件并以已定义的样式格式化指定文件。`editorconfig`文件具有友好的阅读性，且能与版本控制系统配合良好的特点。
### .gitattributes 是干嘛的

当执行`git`动作时候，`.gitattributes`文件允许你指定由`git`使用的文件和路径的属性，例如：`git commit`等
每当有文件保存或者创建的时候，`git`会根据指定的属性来自动的保存
### 持续集成是如何实现的

- circle.yml 是如何配置的 

### 分析一下单元测试环境是如何搭建的

- ts-jest 是解决什么问题的

  可以使用ts去编写单元测试
    - 如果没有 ts-jest 的话 你会搭建基于 ts 的 jest 的环境嘛？
        - 写个  demo？ 
- 分析一下 jest.config.js  这几个字段都有什么用？

  - testEnvironment: 测试环境
  - transform: 利用正则表达式转换语言
  - testRegex: 侦查测试文件
  - testPathIgnorePatterns: 忽略的文件
  - moduleFileExtensions: 只对此类拓展名有效

### 分析一下 package.json 里面的字段都是干嘛的

- 发布一个库需要用到哪些字段

  - name: 用于告知应用程序或软件包的名称
  - version: 表明了当前的版本
  - description: 应用程序/软件包的简短描述
  - repository: 指定了此程序包仓库所在的位置
  - main: 设置了应用程序的入口点
  - module: ESM 规范的入口文件
  - types: 主声明文件
  - exports: 为不同的环境和 JavaScript 风格公开您的包模块
  - files: 安装软件包作为依赖项时要包含的条目 
  - scripts: 定义了一组可以运行的 node 脚本
  - author: 列出软件包的作者名称
  - license: 指定软件包的许可证
  - devDependencies: 设置了作为开发依赖安装的 npm 软件包的列表
  - engines: 设置了此软件包/应用程序在哪个版本的 Node.js 上运行
  - config: 用于添加命令行的环境变量
  - lint-staged: git暂存文件上运行linters
  - husky: 可以让我们向项目中方便添加git hooks

### 写一个库的 README 需要哪几个部分？ 

- 结构是什么样子的？

  - 标题(Title)
  - 介绍(Introduction)
  - 技术栈(Technologies)
  - 启动(Launch or Setup)
- 有哪些可以快速生成 readme 的库

  `tree`、 `mddir`
    - 可以记录下来，下次一起分析是如何做到的

### 构建是如何做的？

- 分析 rollup.config.js 

  Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码

### 分析一下 tsconfig 里面的配置项

### 画一下这个库的程序流程图

- 画流程图可以参考这篇文章 [https://zhuanlan.zhihu.com/p/364507517](https://zhuanlan.zhihu.com/p/364507517)
- 画好了图之后可以更清晰明了的看到程序设计的全貌
- 划分好类的职责
    - CAC
    - Command
    - Option
- 可以画一下 UML图

### 尝试通过单元测试调试库

```js
function snapshotOutput({
  title,
  file,
  args,
}: {
  title: string{
  file: string}
  args?: string[]
}) {
  test(title, async () => {
    const { stdout } = await execa('node', [example(file), ...(args || [])])
    expect(stdout).toMatchSnapshot(title)
  })
}

snapshotOutput({
  title: 'basic-usage',
  file: 'basic-usage.js',
  args: ['foo', 'bar', '--type', 'ok', 'command'],
})

```
基于这个测试用例 -- [我的思考](https://github.com/qinran0423/source-learn/blob/main/cac/MyThink.md)


### 这个库应该如何使用？ 

- 基于这个库的文档写一篇小教程
- 让别人基于你的教程就可以使用这个库

### 如何理解 option

- 概念
- 在程序里面是如何实现的

添加全局选项

### 如何理解 command 

- 概念
- 在程序里面是如何实现的

创建命令实例。该选项还接受第三个参数config作为附加命令config：
config.allowUnknownOptions: 布尔值允许此命令中存在未知选项。
config.ignoreOptionDefaultValue: 在解析的选项中不使用选项的默认值，只在帮助消息中显示它们


### 如何理解 action 

- 概念
- 在程序里面是如何实现的

当命令与用户输入匹配时，使用回调函数作为命令操作。

### 如何实现连续调用的api

![](https://images-1252602850.cos.ap-beijing.myqcloud.com/20220627173013.png)

每次调用api的最后都会return this 则可以实现连续调用

### Brackets 应该如何使用

- 方括号和尖括号有什么不同

  - command: []表示可选， <>表示必传
  - option: [] 传true, <> 传string / number 


### Brackets  是如何实现的

### Negated Options 是如何实现的？ 

### 分析一下下面这段代码的执行流程

![](https://images-1252602850.cos.ap-beijing.myqcloud.com/20220627174013.png)

### 还可以从功能上分解需求点

- 全局的  command 是如何实现的
- sub command 是如何实现的
- 每个 command 的 option 是如何实现的
- help 和 version 是如何实现的 

### 程序等于数据结构＋算法

- 哪一部分是收集数据的
    - 对应初始化的逻辑
- 哪一部分是算法