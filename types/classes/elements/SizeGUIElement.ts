import { ElementType } from 'types'
import GUIElement from './GUIElement'

class SizeGUIElement extends GUIElement {
  constructor () {
    super(ElementType.SIZE)
    this.validateErrors()
  }

  public setX (x: number) {
    return this
  }

  public setY (x: number) {
    return this
  }

  public setPriority (priority: number) {
    return this
  }

  public toJson () {
    return {
      type: this.getElementType().getString(),
      width: this.getWidth(),
      height: this.getHeight(),
      x: -1,
      y: -1
    }
  }
}

export default SizeGUIElement
