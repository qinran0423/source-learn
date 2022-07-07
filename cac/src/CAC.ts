import mri from "mri"
import { Command } from "./Command"
import { OptionConfig } from "./Option"

class CAC {
  private globalCommand: Command

  constructor() {
    this.globalCommand = new Command()
  }

  option(rawName: string, description: string, config?: OptionConfig) {
    this.globalCommand.option(rawName, description, config)
  }

  parse(rawArr: string[]) {
    const mriResult = mri(rawArr)
    console.log(mriResult, this.globalCommand.options)

    const options = this.globalCommand.options.reduce((options, option) => {
      options[option.name] = mriResult[option.name] || option.config.default
      return options
    }, {})
    return {
      args: [],
      options: {
        ...options,
        "--": []
      }
    }
  }
}

export default CAC
