import { ElementType, TextAlignment } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  text: string,
  alignment?: TextAlignment,
  color?: number,
  jei?: boolean
}

class TextGUIElement extends GUIElement<Json> {
  private text: string
  private alignment: TextAlignment
  private color: number
  private jei: boolean

  constructor () {
    super(ElementType.TEXT)
    this.text = ''
    this.alignment = TextAlignment.LEFT
    this.color = 0xFFF
    this.jei = false
    this.validateErrors()
  }

  public getText () {
    return this.text
  }

  public getAlignment () {
    return this.alignment
  }

  public getColor () {
    return this.color
  }

  public setColor (color: number) {
    this.color = color
    this.validateErrors()
    return this
  }

  public setAlignment (alignment: TextAlignment) {
    this.alignment = alignment
    this.validateErrors()
    return this
  }

  public setText (text: string) {
    this.text = text
    this.validateErrors()
    return this
  }

  public getJei () {
    return this.jei
  }

  public setJei (jei: boolean) {
    this.jei = jei
    this.validateErrors()
    return this
  }

  protected validateErrors (): void {
    super.validateErrors()
    if (this.text && this.text.trim() !== '') this.errors.text = false
    else this.errors.text = true
    if (this.color > 0) this.errors.color = false
    else this.errors.color = true
  }

  public toJson () {
    if (this.errors.text) return undefined
    if (!super.toJson()) return undefined
    let json: Json = {
      ...super.toJson()!,
      text: this.getText()
    }

    if (!this.errors.alignment && this.getAlignment() !== TextAlignment.LEFT) {
      json = {
        ...json,
        alignment: this.getAlignment()
      }
    }

    if (!this.errors.color) {
      json = {
        ...json,
        color: this.getColor()
      }
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

export default TextGUIElement
