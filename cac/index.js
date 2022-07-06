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