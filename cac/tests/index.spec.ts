import {test, expect} from 'vitest';
import {cac} from '../src/index';

  
test("basic-usage", () => {
    const cli = cac()
    
    cli.option("--type <type>", "Choose a project type")

    const parsed = cli.parse(["", "", "--type", "foo"])
    expect(parsed).toEqual({
      args: [], 
      options: {
        type: "foo",
        "--":[]
      }
    })
})