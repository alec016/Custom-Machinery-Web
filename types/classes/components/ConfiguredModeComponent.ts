import { ComponentMode, Config } from 'types'
import ConfiguredComponent from './ConfiguredComponent'
import CustomMachineryLocation from '../CustomMachineryLocation'

abstract class ConfiguredModeComponent extends ConfiguredComponent {
  private mode: ComponentMode

  constructor (type: CustomMachineryLocation) {
    super(type)
    this.mode = ComponentMode.INPUT
    this.validateErrors()
  }

  public getMode () {
    return this.mode
  }

  public setMode (mode: ComponentMode) {
    this.mode = mode
    this.validateErrors()
    return this
  }

  public validateErrors (): void {
    super.validateErrors()
  }

  public toJson () {
    return {
      ...super.toJson(),
      mode: this.getMode()
    }
  }
}

export default ConfiguredModeComponent
