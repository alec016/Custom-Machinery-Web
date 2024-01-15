import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  id: string,
  texture?: string,
  texture_hovered?: string,
  texture_toggle?: string,
  tooltips?: (string | {
    text: string,
    style?: {
      bold?: boolean,
      italic?: boolean,
      underline?: boolean,
      strikethrough?: boolean,
      obfuscated?: boolean,
      color?: string,
      font?: string
    }
  })[],
  toggle?: boolean,
  text?: string | {
    text: string,
    style?: {
      bold?: boolean,
      italic?: boolean,
      underline?: boolean,
      strikethrough?: boolean,
      obfuscated?: boolean,
      color?: string,
      font?: string
    }
  }
  item?: string | {
    id: string,
    Count?: number,
    tag?: string
  }
}

class ButtonGUIElement extends GUIElement<Json> {
  private texture: string
  private texture_toggle: string
  private texture_hovered: string
  private toggle: boolean
  private id: string
  private text: string | {
    text: string,
    color?: string
  }

  private item: string | {
    id: string,
    Count: number,
    tag?: string
  }

  constructor () {
    super(ElementType.BUTTON)
    this.texture = ''
    this.texture_toggle = ''
    this.texture_hovered = ''
    this.toggle = false
    this.text = ''
    this.item = ''
    this.id = ''
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

  public getTextureToggle () {
    return this.texture_toggle
  }

  public setTextureToggle (texture: string) {
    this.texture_toggle = texture
    this.validateErrors()
    return this
  }

  public getTextureHovered () {
    return this.texture_hovered
  }

  public setTextureHovered (texture: string) {
    this.texture_hovered = texture
    this.validateErrors()
    return this
  }

  public getToggle () {
    return this.toggle
  }

  public setToggle (toggle: boolean) {
    this.toggle = toggle
    this.validateErrors()
    return this
  }

  public getText () {
    return this.text
  }

  public setText (text: string | { text: string, color?: string }) {
    this.text = text
    this.validateErrors()
    return this
  }

  public getItem () {
    return this.item
  }

  public setItem (item : string | { id: string, Count: number, tag?: string }) {
    this.item = item
    this.validateErrors()
    return this
  }

  protected validateErrors (): void {
    super.validateErrors()
    if (this.id && this.id.trim() !== '') this.errors.id = false
    else this.errors.id = true
    if (this.texture && this.texture.trim() !== '') this.errors.texture = false
    else this.errors.texture = true
    if (this.texture_toggle && this.texture_toggle.trim() !== '') this.errors.texture_toggle = false
    else this.errors.texture_toggle = true
    if (this.texture_hovered && this.texture_hovered.trim() !== '') this.errors.texture_hovered = false
    else this.errors.texture_hovered = true
    if (typeof this.text === 'string') {
      if (this.text.trim() !== '') this.errors.text = false
      else this.errors.text = true
    } else {
      if (this.text && this.text.text.trim() !== '') this.errors.text = false
      else this.errors.text = true
    }

    if (typeof this.item === 'string') {
      if (this.item.trim() !== '') this.errors.item = false
      else this.errors.item = true
    } else {
      if (this.item && this.item.id.trim() !== '') {
        if (this.item.Count > 0) this.errors.item = false
        else this.errors.item = true
      } else this.errors.item = true
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

    if (!this.errors.texture_toggle) {
      json = {
        ...json,
        texture_toggle: this.getTextureToggle()
      }
    }

    if (!this.errors.texture_hovered) {
      json = {
        ...json,
        texture_hovered: this.getTextureHovered()
      }
    }

    if (!this.errors.toggle) {
      if (this.getToggle()) {
        json = {
          ...json,
          toggle: this.getToggle()
        }
      }
    }

    if (!this.errors.text) {
      json = {
        ...json,
        text: this.getText()
      }
    }

    if (!this.errors.item) {
      json = {
        ...json,
        item: this.getItem()
      }
    }

    return json
  }
}

export default ButtonGUIElement
