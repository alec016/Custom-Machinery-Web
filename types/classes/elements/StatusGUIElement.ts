import { ElementType } from 'types'
import GUIElement, { Element } from './GUIElement'

type Json = Element.Json & {
  idleTexture?: string,
  runningTexture?: string,
  erroredTexture?: string
}

class StatusGUIElement extends GUIElement<Json> {
  private idleTexture: string
  private runningTexture: string
  private erroredTexture: string

  constructor () {
    super(ElementType.STATUS)
    this.idleTexture = ''
    this.runningTexture = ''
    this.erroredTexture = ''
    this.validateErrors()
  }

  public getIdleTexture () {
    return this.idleTexture
  }

  public setIdleTexture (texture: string) {
    this.idleTexture = texture
    this.validateErrors()
    return this
  }

  public getRunningTexture () {
    return this.runningTexture
  }

  public setRunningTexture (texture: string) {
    this.runningTexture = texture
    this.validateErrors()
    return this
  }

  public getErroredTexture () {
    return this.erroredTexture
  }

  public setErroredTexture (texture: string) {
    this.erroredTexture = texture
    this.validateErrors()
    return this
  }

  protected validateErrors (): void {
    super.validateErrors()
    if (this.idleTexture && this.idleTexture.trim() !== '') this.errors.idleTexture = false
    else this.errors.idleTexture = true
    if (this.runningTexture && this.runningTexture.trim() !== '') this.errors.runningTexture = false
    else this.errors.runningTexture = true
    if (this.erroredTexture && this.erroredTexture.trim() !== '') this.errors.erroredTexture = false
    else this.errors.erroredTexture = true
  }

  public toJson () {
    if (!super.toJson()) return undefined
    let json: Json = super.toJson()!

    if (!this.errors.idleTexture) {
      json = {
        ...json,
        idleTexture: this.getIdleTexture()
      }
    }

    if (!this.errors.runningTexture) {
      json = {
        ...json,
        runningTexture: this.getRunningTexture()
      }
    }

    if (!this.errors.erroredTexture) {
      json = {
        ...json,
        erroredTexture: this.getErroredTexture()
      }
    }

    return json
  }
}

export default StatusGUIElement
