import CustomMachineryLocation from '../CustomMachineryLocation'

abstract class Component {
  protected type: CustomMachineryLocation
  protected errors: { [x: string]: boolean }

  protected errorMessages: { [x: string]: string } = {}

  constructor (type: CustomMachineryLocation) {
    this.type = type
    this.errors = {}
    this.validateErrors()
  }

  public getType () {
    return this.type
  }

  public getErrors () {
    return this.errors
  }

  public getErrorMessages () {
    return this.errorMessages
  }

  public toJson () {
    return {
      type: this.getType().getString()
    }
  }

  public toJsonString () {
    return JSON.stringify(this.toJson())
  }

  public validateErrors (): void {

  }
}

export default Component
