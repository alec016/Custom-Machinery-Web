import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  id: string,
  texture?: string,
  ghost?: string | {
    items: string,
    color?: [number, number, number, number],
    always_render?: boolean
  }
}

class SlotGUIElement extends GUIElement<Json> {
  private id: string
  private texture: string
  private ghost: string | {
    items: string,
    color?: [number, number, number, number],
    always_render?: boolean
  }

  constructor () {
    super(ElementType.SLOT)
    this.id = ''
    this.texture = ''
    this.ghost = ''
    this.validateErrors()
  }

  public getId () {
    return this.id
  }

  public setId (id: string) {
    this.id = id
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

  public getGhost () {
    return this.ghost
  }

  public setGhost (ghost: string | { items: string, color?: [number, number, number, number], always_render?: boolean }) {
    this.ghost = ghost
    this.validateErrors()
    return this
  }

  protected validateErrors (): void {
    super.validateErrors()
    if (this.texture && this.texture.trim() !== '') this.errors.texture = false
    if (typeof this.ghost === 'string') {
      if (this.ghost.trim() !== '') this.errors.ghost = false
    } else {
      if (this.ghost && this.ghost.items.trim() !== '') this.errors.ghost = false
    }
  }

  public toJson () {
    if (this.errors.id) return undefined
    if (!super.toJson()) return undefined
    let json: Json = {
      ...super.toJson()!,
      id: this.getId()
    }

    if (!this.errors.texture) {
      json = {
        ...json,
        texture: this.getTexture()
      }
    }

    if (!this.errors.ghost) {
      json = {
        ...json,
        ghost: this.getGhost()
      }
    }

    return json
  }
}

export default SlotGUIElement
