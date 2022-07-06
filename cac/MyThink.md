## 我的思考

```
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
```
const cac = (name = '') => new CAC(name)

```