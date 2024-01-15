import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  texture?: string
}

class PlayerInventoryGUIElement extends GUIElement<Json> {
  private texture: string

  constructor () {
    super(ElementType.PLAYER_INVENTORY)
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
    /* return {
      type: this.getElementType().getString(),
      x: this.getX(),
      y: this.getY(),
      texture: this.getTexture(),
      width: this.getWidth(),
      height: this.getHeight(),
      priority: this.getPriority()
    } */
  }
}

export default PlayerInventoryGUIElement
