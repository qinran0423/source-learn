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

CircleCI 是一个持续集成/持续部署的服务
```js
# 需要设置构建环境，这取决于您的项目语言和依赖项
version: 2 //版本
jobs: // 工作
  build:
    docker: // 使用的环境
      - image: circleci/node:12
    branches:
      ignore: // 忽略掉不需要的分支
        - gh-pages # list of branches to ignore
        - /release\/.*/ # or ignore regexes
    steps: // 配置要在虚拟机上运行的命令，命令可以按步骤划分 执行步骤
      - checkout // 检出代码 将分支中的代码检出到
      - restore_cache: // 恢复缓存
          key: dependency-cache-{{ checksum "yarn.lock" }}
      - run: // 安装依赖
          name: install dependences
          command: yarn
      - save_cache: //保存依赖缓存
          key: dependency-cache-{{ checksum "yarn.lock" }}
          paths:
            - ./node_modules
      - run: // 运行测试
          name: test
          command: yarn test:cov
      - run: // 上传测试覆盖率
          name: upload coverage
          command: bash <(curl -s https://codecov.io/bash)
      - run: // 发布
          name: Release
          command: yarn semantic-release


```
### 分析一下单元测试环境是如何搭建的

- ts-jest 是解决什么问题的

  可以使用ts去编写单元测试
  
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
```
{
  "compilerOptions": {
    "target": "es2015", //指定ESM目标版本为ES6
    "declaration": true, // 生成声明文件，开启后会自动生成声明文件
    "declarationDir": "types", // 指定生成声明文件存放目录
    "esModuleInterop": true, // 支持在 CommonJs 模块下使用 import d from 'cjs'
    "pretty": true, // 给错误和消息设置样式，使用颜色和上下文
    "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "lib": ["es2015", "es2016.array.include"], // 编译过程中需要引入的库文件的列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导
    "stripInternal": true,
    "noImplicitAny": true, // 在表达式和声明上有隐含的any类型时报错
    "noImplicitReturns": true, // 不是函数的所有返回路径都有返回值时报错
    "noImplicitThis": true, //不允许this有隐式的any类型
    "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
    "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
    "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
    "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
    "strictFunctionTypes": true, // 不允许函数参数双向协变
    "strictPropertyInitialization": true, //  类的实例属性必须初始化
    "alwaysStrict": true, // 在代码中注入'use strict'
    "module": "commonjs", // 生成代码的模板标准
    "outDir": "lib" // 指定输出目录
  },
  "include": ["src", "declarations.d.ts"],  // 表示编译需要编译的文件或目录
  "exclude": ["src/deno.ts"]  // 指定编译器需要排除的文件或文件夹
}

```
### 画一下这个库的程序流程图

![image-20220710155217572](/Users/mick/Library/Application Support/typora-user-images/image-20220710155217572.png)

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

添加全局选项

实现

在new CAC时候 constructor时候初始化了 GlobalCommand，在执行option的时候

```js
option(rawName: string, description: string, config?: OptionConfig) {
    this.globalCommand.option(rawName, description, config)
    return this
  }
```

就是执行了globalCommand的option

```js
option(rawName: string, description: string, config?: OptionConfig) {
    const option = new Option(rawName, description, config)
    this.options.push(option)
    return this
  }
```

globalCommand中的option

Option类中则是对参数rawName进行解析

```js
export default class Option {
  
   constructor(
      public rawName: string,
      public description: string,
      config?: OptionConfig
    ) {
      this.config = Object.assign({}, config)

      // You may use cli.option('--env.* [value]', 'desc') to denote a dot-nested option
      rawName = rawName.replace(/\.\*/g, '')

      this.negated = false
      this.names = removeBrackets(rawName)
        .split(',')
        .map((v: string) => {
          let name = v.trim().replace(/^-{1,2}/, '')
          if (name.startsWith('no-')) {
            this.negated = true
            name = name.replace(/^no-/, '')
          }

          return camelcaseOptionName(name)
        })
        .sort((a, b) => (a.length > b.length ? 1 : -1)) // Sort names

      // Use the longest name (last one) as actual option name
      this.name = this.names[this.names.length - 1]

      if (this.negated && this.config.default == null) {
        this.config.default = true
      }

      if (rawName.includes('<')) {
        this.required = true
      } else if (rawName.includes('[')) {
        this.required = false
      } else {
        // No arg needed, it's boolean flag
        this.isBoolean = true
      }
    }
  }
}
```



### 如何理解 command 

创建命令实例。该选项还接受第三个参数config作为附加命令config：
config.allowUnknownOptions: 布尔值允许此命令中存在未知选项。
config.ignoreOptionDefaultValue: 在解析的选项中不使用选项的默认值，只在帮助消息中显示它们\

```js
command(rawName: string, description?: string, config?: CommandConfig) {
    const command = new Command(rawName, description || '', config, this)
    command.globalCommand = this.globalCommand
    this.commands.push(command)
    return command
  }
```

Command 的实现则是初始化一个command的类 将 将当前的全局 command 赋给此实例 然后收集command


### 如何理解 action 

当命令与用户输入匹配时，使用回调函数作为命令操作。

```js
 action(callback: (...args: any[]) => any) {
    this.commandAction = callback
    return this
  }
```

将回调函数复制给commandAction parse的时候调用

### 如何实现连续调用的api

![](https://images-1252602850.cos.ap-beijing.myqcloud.com/20220627173013.png)

每次调用api的最后都会return this 则可以实现连续调用

### Brackets 应该如何使用

- 方括号和尖括号有什么不同

  - command: []表示可选， <>表示必传
  - option: [] 传true, <> 传string / number 

### Brackets  是如何实现的

```js

export const removeBrackets = (v: string) => v.replace(/[<[].+/, '').trim()

export const findAllBrackets = (v: string) => {
  const ANGLED_BRACKET_RE_GLOBAL = /<([^>]+)>/g
  const SQUARE_BRACKET_RE_GLOBAL = /\[([^\]]+)\]/g

  const res = []

  const parse = (match: string[]) => {
    let variadic = false
    let value = match[1]
    if (value.startsWith('...')) {
      value = value.slice(3)
      variadic = true
    }
    return {
      required: match[0].startsWith('<'),
      value,
      variadic
    }
  }

  let angledMatch
  while ((angledMatch = ANGLED_BRACKET_RE_GLOBAL.exec(v))) {
    res.push(parse(angledMatch))
  }

  let squareMatch
  while ((squareMatch = SQUARE_BRACKET_RE_GLOBAL.exec(v))) {
    res.push(parse(squareMatch))
  }

  return res
}

```



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