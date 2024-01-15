import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  texture?: string,
  highlight?: boolean
}

class HeatGUIElement extends GUIElement<Json> {
  private texture: string
  private highlight: boolean

  constructor () {
    super(ElementType.HEAT)
    this.texture = ''
    this.highlight = true
    this.validateErrors()
  }

  public getTexture () {
    return this.texture
  }

  public getHighlight () {
    return this.highlight
  }

  public setTexture (texture: string) {
    this.texture = texture
    this.validateErrors()
    return this
  }

  public setHighlight (highlight: boolean) {
    this.highlight = highlight
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

    if (!this.getHighlight()) {
      json = {
        ...json,
        highlight: this.getHighlight()
      }
    }

    if (!this.errors.texture) {
      json = {
        ...json,
        texture: this.getTexture()
      }
    }

    return json
    /* return {
      type: this.getElementType().getString(),
      x: this.getX(),
      y: this.getY(),
      texture: this.getTexture(),
      width: this.getWidth(),
      height: this.getHeight(),
      priority: this.getPriority(),
      highlight: this.getHighlight()
    } */
  }
}

export default HeatGUIElement
