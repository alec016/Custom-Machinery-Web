import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  texture: string
  jei?: boolean
}

class TextureGUIElement extends GUIElement<Json> {
  private jei: boolean
  private texture: string
  constructor () {
    super(ElementType.TEXTURE)
    this.texture = ''
    this.jei = false
    this.validateErrors()
  }

  public getJei () {
    return this.jei
  }

  public setJei (jei: boolean) {
    this.jei = jei
    this.validateErrors()
    return this
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
    if (this.errors.texture) return undefined
    if (!super.toJson()) return undefined
    let json: Json = {
      ...super.toJson()!,
      texture: this.getTexture()
    }

    if (this.getJei()) {
      json = {
        ...json,
        jei: this.getJei()
      }
    }

    return json
  }
}

export default TextureGUIElement
