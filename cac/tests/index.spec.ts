import { test, expect } from "vitest"
import { cac } from "../src/index"

test("basic-usage", () => {
  const cli = cac()

  cli.option("--type <type>", "Choose a project type")

  const parsed = cli.parse(["", "", "--type", "foo"])
  expect(parsed).toEqual({
    args: [],
    options: {
      type: "foo",
      "--": []
    }
  })
})

test("type value should be equal to node", () => {
  const cli = cac()

  cli.option("--type <type>", "Choose a project type", {
    default: "node"
  })

  const parsed = cli.parse(["", ""])
  expect(parsed).toEqual({
    args: [],
    options: {
      type: "node",
      "--": []
    }
  })
})

test.only("square Brackets in option name", () => {

  const cli = cac()

  cli.option("--name [name]", "Provide your name")

  const parsed = cli.parse(["", "", "--name"])
  expect(parsed).toEqual({
    args: [],
    options: {
      name: true,
      "--": []
    }
  })
})
