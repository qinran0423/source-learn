## 我的思考

```js
  const cli = require('cac')();


  cli.option('--type <type>', 'Choose a project type', {
    default: 'none'
  })


  const parsed = cli.parse()

  console.log({ parsed })

  // { 
  //   parsed: {
  //     args: [], 
  //     options: { 
  //       '--': [], 
  //       type: 'none' 
  //     } 
  //   } 
  // }
```

第一行可以看出  cac 是一个函数 看到打印结果 猜测cac是解析命令参数的

#### 源码中
```js
<!-- src/index.ts -->
import CAC from './CAC'
import Command from './Command'

/**
 * @param name The program name to display in help and version message
 */
const cac = (name = '') => new CAC(name)

export default cac
export { cac, CAC, Command }

```
cac 是CAC的一个实例 name作为参数   
#### 为什么要这么干？ 先带着疑问
```js
const cac = (name = '') => new CAC(name)

// 为什么不
const cac = new CAC(name = '')
```
src/CAC.ts
```js

class CAC extends EventEmitter {
  this.globalCommand = new GlobalCommand(this)

  ···
  option(rawName: string, description: string, config?: OptionConfig) {
    this.globalCommand.option(rawName, description, config)
    return this
  }

}

```
为什么要继承EventEmitter? 继续看

src/Command.ts
```js
class Command {

  constructor(
    public rawName: string,
    public description: string,
    public config: CommandConfig = {},
    public cli: CAC
  ) {
    this.options = []
    this.aliasNames = []
    this.name = removeBrackets(rawName)
    this.args = findAllBrackets(rawName)
    this.examples = []
  }


  option(rawName: string, description: string, config?: OptionConfig) {
    const option = new Option(rawName, description, config)
    this.options.push(option)
    return this
  }

}




class GlobalCommand extends Command {
  constructor(cli: CAC) {
    super('@@global@@', '', {}, cli)
  }
}


```

src/Option.ts

```js
export default class Option {
  /** Option name */
  name: string
  /** Option name and aliases */
  names: string[]
  isBoolean?: boolean
  // `required` will be a boolean for options with brackets
  required?: boolean
  config: OptionConfig
  negated: boolean

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


```


