const cli = require("cac")()

cli.option("--type [type]", "Choose a project type", {
  default: "node"
})

cli.option("--name <name>", "Provide your name")

cli.command("lint [...files]", "Lint files").action((files, options) => {
  console.log("aaaaaaaaaaaa", files, options)
})

cli.command("[...files]", "Run files").action((files, options) => {
  console.log("run", files, options)
})

// Display help message when `-h` or `--help` appears
cli.help()
// Display version number when `-v` or `--version` appears
cli.version("0.0.0")

cli.parse()
