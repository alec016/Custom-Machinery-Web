import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  emptyTexture?: string,
  filledTexture?: string
}

class FuelGUIElement extends GUIElement {
  private emptyTexture: string
  private filledTexture: string

  constructor () {
    super(ElementType.FUEL)
    this.emptyTexture = ''
    this.filledTexture = ''
    this.validateErrors()
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

    return json
    /* return {
      type: this.getElementType().getString(),
      x: this.getX(),
      y: this.getY(),
      emptyTexture: this.getEmptyTexture(),
      filledTexture: this.getFilledTexture(),
      width: this.getWidth(),
      height: this.getHeight(),
      priority: this.getPriority()
    } */
  }
}

export default FuelGUIElement
