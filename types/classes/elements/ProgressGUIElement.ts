import { ElementType, ProgressDirection } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  emptyTexture?: string,
  filledTexture?: string,
  direction?: ProgressDirection
}

class ProgressGUIElement extends GUIElement<Json> {
  private emptyTexture: string
  private filledTexture: string
  private direction: ProgressDirection

  constructor () {
    super(ElementType.PROGRESS)
    this.emptyTexture = ''
    this.filledTexture = ''
    this.direction = ProgressDirection.RIGHT
    this.validateErrors()
  }

  public getDirection () {
    return this.direction
  }

  public setDirection (direction: ProgressDirection) {
    this.direction = direction
    this.validateErrors()
    return this
  }

  public getEmptyTexture () {
    return this.emptyTexture
  }

  public getFilledTexture () {
    return this.filledTexture
  }

  public setEmptyTexture (texture: string) {
    this.emptyTexture = texture
    this.validateErrors()
    return this
  }

  public setFilledTexture (texture: string) {
    this.filledTexture = texture
    this.validateErrors()
    return this
  }

  protected validateErrors (): void {
    super.validateErrors()
    if (this.emptyTexture && this.emptyTexture.trim() !== '') this.errors.emptyTexture = false
    else this.errors.emptyTexture = true
    if (this.filledTexture && this.filledTexture.trim() !== '') this.errors.filledTexture = false
    else this.errors.filledTexture = true
  }

  public toJson () {
    if (!super.toJson()) return undefined
    let json: Json = super.toJson()!

    if (!this.errors.emptyTexture) {
      json = {
        ...json,
        emptyTexture: this.getEmptyTexture()
      }
    }

    if (!this.errors.filledTexture) {
      json = {
        ...json,
        filledTexture: this.getFilledTexture()
      }
    }

    if (!this.errors.direction && this.getDirection() !== ProgressDirection.RIGHT) {
      json = {
        ...json,
        direction: this.getDirection()
      }
    }

    return json
  }
}

export default ProgressGUIElement
