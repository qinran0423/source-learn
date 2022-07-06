
class CAC {
  constructor() {}

  option(rawName: string, description: string ) {

  }

  parse(rawArr: string[]) {
      return {
        args: [], 
        options: {
          type: "foo",
          "--":[]
        }
      }
  }
}


export default CAC