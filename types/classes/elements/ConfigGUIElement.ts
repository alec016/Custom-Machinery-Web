import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  texture?: string,
  texture_hovered?: string
}

class ConfigGUIElement extends GUIElement<Json> {
  private texture_hovered: string
  private texture: string

  constructor () {
    super(ElementType.CONFIG)
    this.texture = ''
    this.texture_hovered = ''
    this.validateErrors()
  }

  public getTexture () {
    return this.texture
  }

  public getTextureHovered () {
    return this.texture_hovered
  }

  public setTextureHovered (texture: string) {
    this.texture_hovered = texture
    this.validateErrors()
    return this
  }

  public setTexture (texture: string) {
    this.texture = texture
    this.validateErrors()
    return this
  }

  protected validateErrors () {
    super.validateErrors()
    if (this.texture && this.texture !== '') this.errors.texture = false
    else this.errors.texture = true
    if (this.texture_hovered && this.texture_hovered !== '') this.errors.texture_hovered = false
    else this.errors.texture_hovered = true
  }

  public toJson () {
    if (!super.toJson()) return undefined
    let json: Json = super.toJson()!

    if (!this.errors.texture) {
      let texture = this.getTexture()
      let [namespace, path] = texture.split(':')

      path = path.split('/').reverse()[0].split('.')[0]

      texture = `${namespace}:${path}`

      json = {
        ...json,
        texture
      }
    }

    if (!this.errors.texture_hovered) {
      let textureHovered = this.getTextureHovered()
      let [namespace, path] = textureHovered.split(':')

      path = path.split('/').reverse()[0].split('.')[0]

      textureHovered = `${namespace}:${path}`
      json = {
        ...json,
        texture_hovered: textureHovered
      }
    }

    return json
  }
}

export default ConfigGUIElement
