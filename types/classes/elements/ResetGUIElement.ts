import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  texture?: string
}

class ResetGUIElement extends GUIElement<Json> {
  private texture: string

  constructor () {
    super(ElementType.RESET)
    this.texture = ''
    this.validateErrors()
  }

  public getTexture () {
    return this.texture
  }

  public setTexture (texture: string) {
    this.texture = texture
    this.validateErrors()
    return this
  }

  protected validateErrors (): void {
    super.validateErrors()
    if (this.texture && this.texture.trim() !== '') this.errors.texture = false
    else this.errors.texture = true
  }

  public toJson () {
    if (!super.toJson()) return undefined
    let json: Json = super.toJson()!

    if (!this.errors.texture) {
      json = {
        ...json,
        texture: this.getTexture()
      }
    }

    return json
  }
}

export default ResetGUIElement
