import { Option } from "./Option"

export class Command {
  public options: Option[]
  constructor() {
    this.options = []
  }

  option(name: string, description: string, config?) {
    const option = new Option(name, description, config)
    this.options.push(option)
  }
}
