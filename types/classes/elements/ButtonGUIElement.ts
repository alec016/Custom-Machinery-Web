import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Tooltip = {
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

type Json = Element.Json & {
  id: string,
  texture?: string,
  texture_hovered?: string,
  texture_toggle?: string,
  tooltips?: (string | Tooltip)[],
  toggle?: boolean,
  text?: string | Tooltip
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
  private text: Tooltip

  private item: {
    id: string,
    Count: number,
    tag?: string
  }

  private tooltips: Tooltip[] = []

  constructor () {
    super(ElementType.BUTTON)
    this.texture = ''
    this.texture_toggle = ''
    this.texture_hovered = ''
    this.toggle = false
    this.text = {
      text: '',
      style: {
        color: 'white',
        font: 'minecraft:default'
      }
    }
    this.item = {
      id: '',
      Count: 1
    }
    this.id = ''
    this.validateErrors()
  }

  public getTooltips () {
    return this.tooltips
  }

  public setTooltips (tooltips: Tooltip[]) {
    this.tooltips = tooltips
    this.validateErrors()
    return this
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

  public setText (text: Tooltip) {
    this.text = text
    this.validateErrors()
    return this
  }

  public getItem () {
    return this.item
  }

  public setItem (item : { id: string, Count: number, tag?: string }) {
    this.item = item
    this.validateErrors()
    return this
  }

  protected validateErrors (): void {
    super.validateErrors()

    if (this.id && this.id.trim() !== '') this.errors.id = false
    else {
      this.errors.id = true
      if (!this.id) this.errorMessages.id = 'Id property is required'
      else if (this.id.trim() === '') this.errorMessages.id = 'Id property can not be empty'
    }

    if (this.texture && this.texture.trim() !== '') this.errors.texture = false
    else {
      this.errors.texture = true
      if (!this.texture) this.errorMessages.texture = 'Texture is required'
      else if (this.texture.trim() === '') this.errorMessages.texture = 'Texture can not be empty'
    }

    if (this.texture_toggle && this.texture_toggle.trim() !== '') this.errors.texture_toggle = false
    else {
      this.errors.texture_toggle = true
      if (!this.texture_toggle) this.errorMessages.texture_toggle = 'Texture Toggle is required'
      else if (this.texture_toggle.trim() === '') this.errorMessages.texture_toggle = 'Texture Toggle can not be empty'
    }

    if (this.texture_hovered && this.texture_hovered.trim() !== '') this.errors.texture_hovered = false
    else {
      this.errors.texture_hovered = true
      if (!this.texture_hovered) this.errorMessages.texture_hovered = 'Texture Hovered is required'
      else if (this.texture_hovered.trim() === '') this.errorMessages.texture_hovered = 'Texture Hovered can not be empty'
    }

    this.errors.text = []
    this.errorMessages.text = []

    if (this.text && this.text.text.trim() !== '') {
      this.errors.text[0] = false
      if (!this.text.style?.color) {
        this.errors.text[1] = true
        this.errorMessages.text[1] = 'Color can not be null'
      } else {
        this.errors.text[1] = false
      }

      if (!this.text.style?.font) {
        this.errors.text[2] = true
        this.errorMessages.text[2] = 'Font can not be null'
      } else {
        this.errors.text[2] = false
      }
    } else {
      this.errors.text[0] = true
      if (!this.text || !this.text.text) {
        this.errorMessages.text[0] = 'Text is required'
      } else if (this.text.text.trim() === '') {
        this.errorMessages.text[0] = 'Text can not be empty'
      }
    }

    this.errors.item = []
    this.errorMessages.item = []

    if (this.item && this.item.id.trim() !== '') {
      if (this.item.Count > 0) {
        this.errors.item[0] = false
        this.errors.item[1] = false
      } else {
        this.errors.item[1] = true
        this.errorMessages.item[1] = 'Item count must be greater than 0'
      }
    } else {
      this.errors.item[0] = true
      if (!this.item || !this.item.id) this.errorMessages.item[0] = 'Item id is required'
      else if (this.item.id.trim() === '') this.errorMessages.item[0] = 'Item id can not be empty'
    }

    this.errors.tooltips = [] as boolean[]
    this.errorMessages.tooltips = [] as string[]
    this.tooltips && this.tooltips.forEach((tooltip, index) => {
      if (tooltip) {
        if (!tooltip.text) {
          (this.errors.tooltips as boolean[])[index] = true;
          (this.errorMessages.tooltips as string[])[index] = 'Tooltip text is required'
        } else if (tooltip.text.trim() === '') {
          (this.errors.tooltips as boolean[])[index] = true;
          (this.errorMessages.tooltips as string[])[index] = `Tooltip ${index + 1} can not be empty`
        } else {
          (this.errors.tooltips as boolean[])[index] = false
        }
      } else {
        (this.errors.tooltips as boolean[])[index] = true;
        (this.errorMessages.tooltips as string[])[index] = `Tooltip ${index + 1} is required`
      }
    })
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

    if (this.errors.text && !(this.errors.text as boolean[]).some(value => value)) {
      json = {
        ...json,
        text: this.getText()
      }
    }

    if (this.errors.item && !(this.errors.item as boolean[]).some(value => value)) {
      json = {
        ...json,
        item: this.getItem()
      }
    }

    if (this.errors.tooltips) {
      if (typeof this.errors.tooltips !== 'boolean') {
        const tooltipsIndex = this.errors.tooltips.map((value, index) => {
          if (!value) return index
          return -1
        })

        const tooltips: Tooltip[] = []

        tooltipsIndex.forEach(index => {
          if (index !== -1) {
            tooltips.push(this.tooltips[index])
          }
        })

        json = {
          ...json,
          tooltips
        }
      }
    }

    return json
  }
}

export default ButtonGUIElement
