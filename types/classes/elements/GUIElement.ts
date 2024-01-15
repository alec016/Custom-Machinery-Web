import { CustomMachineryLocation } from 'types'
export namespace Element {
  export type Json = {
    type: string
    x: number
    y: number
    width?: number
    height?: number
    priority?: number
  }
}

class GUIElement<T extends Element.Json = Element.Json> {
  protected type: CustomMachineryLocation
  private x: number
  private y: number
  private width: number
  private height: number
  private priority: number
  protected errors: {
    [x: string]: boolean
  } = {}

  protected errorMessages: {
    [x: string]: string
  } = {}

  constructor (type: CustomMachineryLocation) {
    this.type = type
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.priority = 0
    this.validateErrors()
  }

  public getX () {
    return this.x
  }

  public getY () {
    return this.y
  }

  public getWidth () {
    return this.width
  }

  public getHeight () {
    return this.height
  }

  public getPriority () {
    return this.priority
  }

  public getElementType () {
    return this.type
  }

  public setX (x: number) {
    this.x = x
    this.validateErrors()
    return this
  }

  public setY (y: number) {
    this.y = y
    this.validateErrors()
    return this
  }

  public setWidth (width: number) {
    this.width = width
    this.validateErrors()
    return this
  }

  public setHeight (height: number) {
    this.height = height
    this.validateErrors()
    return this
  }

  public setPriority (priority: number) {
    this.priority = priority
    this.validateErrors()
    return this
  }

  protected validateErrors (): void {
    if (this.x >= 0) this.errors.x = false
    else {
      this.errors.x = true
      this.errorMessages.x = 'X property must be greater or equals to 0'
    }
    if (this.y >= 0) this.errors.y = false
    else {
      this.errors.y = true
      this.errorMessages.y = 'Y property must be greater or equals to 0'
    }
    if (this.width > 0) this.errors.width = false
    else {
      this.errors.width = true
      this.errorMessages.width = 'Width property must be greater than 0'
    }
    if (this.height > 0) this.errors.height = false
    else {
      this.errors.height = true
      this.errorMessages.height = 'Height property must be greater than 0'
    }
  }

  public getErrors () {
    return this.errors
  }

  public getErrorMessages () {
    return this.errorMessages
  }

  public toJson (): T | undefined {
    if (this.errors.x || this.errors.y || this.errors.width || this.errors.height) return undefined
    let json: Element.Json = {
      type: this.getElementType().getString(),
      x: this.getX(),
      y: this.getY(),
      width: this.getWidth(),
      height: this.getHeight()
    }

    if (this.getPriority() !== 0) {
      json = {
        ...json,
        priority: this.getPriority()
      }
    }

    return json as T
  }

  public toJsonString () {
    return JSON.stringify(this.toJson())
  }
}

export default GUIElement
