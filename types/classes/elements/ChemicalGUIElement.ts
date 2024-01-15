import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  id: string,
  priority?: number,
  texture?: string,
  highlight?: boolean
}

class ChemicalGUIElement extends GUIElement<Json> {
  private id: string = ''
  private texture: string
  private highlight: boolean

  constructor (type: keyof typeof ElementType.CHEMICAL) {
    super(ElementType.CHEMICAL[type])
    this.texture = ''
    this.highlight = true
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

  public setType (type: keyof typeof ElementType.CHEMICAL) {
    this.type = ElementType.CHEMICAL[type]
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

  public getHighlight () {
    return this.highlight
  }

  public setHighlight (highlight: boolean) {
    this.highlight = highlight
    this.validateErrors()
    return this
  }

  protected validateErrors (): void {
    super.validateErrors()
    if (this.id && this.id.trim() !== '') this.errors.id = false
    else this.errors.id = true
    if (this.texture && this.texture.trim() !== '') this.errors.texture = false
    else this.errors.texture = true
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

    if (!this.errors.highlight) {
      if (!this.getHighlight()) {
        json = {
          ...json,
          highlight: this.getHighlight()
        }
      }
    }

    return json
  }
}

export default ChemicalGUIElement
