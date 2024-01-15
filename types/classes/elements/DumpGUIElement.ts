import { ElementType, MachineDumpComponent } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  texture?: string,
  component?: string[]
}

class DumpGUIElement extends GUIElement<Json> {
  private texture: string
  private component: (keyof typeof MachineDumpComponent)[]

  constructor () {
    super(ElementType.DUMP)
    this.texture = ''
    this.component = []
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

  public getComponent () {
    return this.component
  }

  public addComponent (component: keyof typeof MachineDumpComponent) {
    if (component == null) return
    this.component.push(component)
    this.validateErrors()
    return this
  }

  public setComponent (component: (keyof typeof MachineDumpComponent)[]) {
    if (component.length === 0) return
    this.component = component
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

    if (!this.errors.component && this.component.length > 0) {
      json = {
        ...json,
        component: this.getComponent().map(component => MachineDumpComponent[component].getString())
      }
    }

    return json
  }
}

export default DumpGUIElement
