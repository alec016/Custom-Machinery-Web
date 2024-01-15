import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

export enum DisplayMode {
  LITERAL = 'literal',
  LEVEL = 'level',
  BOTH = 'both'
}

export enum Mode {
  INPUT_ONE = 'input_one',
  INPUT_TEN = 'input_ten',
  INPUT_ALL = 'input_all',
  OUTPUT_ONE = 'output_one',
  OUTPUT_TEN = 'output_ten',
  OUTPUT_ALL = 'output_all',
  DISPLAY = 'display'
}

type Json = Element.Json & {
  texture?: string,
  texture_hovered?: string,
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
  display?: DisplayMode,
  mode?: Mode
}

class ExperienceGUIElement extends GUIElement<Json> {
  private texture: string = ''
  private texture_hovered: string = ''
  private display: DisplayMode = DisplayMode.LEVEL
  private mode: Mode = Mode.OUTPUT_ALL

  constructor () {
    super(ElementType.EXPERIENCE)
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

  public getTextureHovered () {
    return this.texture_hovered
  }

  public setTextureHovered (texture: string) {
    this.texture_hovered = texture
    this.validateErrors()
    return this
  }

  public getDisplay () {
    return this.display
  }

  public setDisplay (display: DisplayMode) {
    this.display = display
    this.validateErrors()
    return this
  }

  public getMode () {
    return this.mode
  }

  public setMode (mode: Mode) {
    this.mode = mode
    this.validateErrors()
    return this
  }

  protected validateErrors () {
    super.validateErrors()
    if (this.texture && this.texture.trim() !== '') this.errors.texture = false
    else this.errors.texture = true
    if (this.texture_hovered && this.texture_hovered.trim() !== '') this.errors.texture_hovered = false
    else this.errors.texture_hovered = true
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

    if (!this.errors.texture_hovered) {
      json = {
        ...json,
        texture_hovered: this.getTextureHovered()
      }
    }

    if (!this.errors.display) {
      if (this.getDisplay() !== DisplayMode.LEVEL) {
        json = {
          ...json,
          display: this.getDisplay()
        }
      }
    }

    if (!this.errors.mode) {
      if (this.getMode() !== Mode.OUTPUT_ALL) {
        json = {
          ...json,
          mode: this.getMode()
        }
      }
    }
    return json
  }
}

export default ExperienceGUIElement
