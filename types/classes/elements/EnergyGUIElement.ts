import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  emptyTexture?: string,
  filledTexture?: string,
  highlight?: boolean
}

class EnergyGUIElement extends GUIElement<Json> {
  private emptyTexture: string
  private filledTexture: string
  private highlight: boolean

  constructor () {
    super(ElementType.ENERGY)
    this.emptyTexture = ''
    this.filledTexture = ''
    this.highlight = true
    this.validateErrors()
  }

  public getEmptyTexture () {
    return this.emptyTexture
  }

  public getFilledTexture () {
    return this.filledTexture
  }

  public getHighlight () {
    return this.highlight
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

  public setHighlight (highlight: boolean) {
    this.highlight = highlight
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

    if (!this.getHighlight()) {
      json = {
        ...json,
        highlight: this.getHighlight()
      }
    }

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
  }
}

export default EnergyGUIElement
