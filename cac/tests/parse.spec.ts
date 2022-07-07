import { expect, test} from 'vitest';
import { cac } from '../src';



test('happy path', () => {
  const cli = cac()
  cli.option("--type <type>", "Choose a project type")
  const rawArr1 = ["--type", "foo", "bar"]

  const parsed = cli.parse(rawArr1)

  expect(parsed).toEqual({
    args: ["bar"], 
    options: {
      type: "foo"
    }
  })
})