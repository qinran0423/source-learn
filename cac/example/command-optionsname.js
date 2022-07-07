const cli = require("cac")()

cli
  .command("dev", "Start dev server")
  .option("--clear-screen", "Clear screen")
  .action((options) => {
    console.log(options.clearScreen)
  })

cli.help()

cli.parse()
