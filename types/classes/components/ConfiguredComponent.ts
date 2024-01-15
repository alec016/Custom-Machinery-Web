import { Config, ComponentType, ComponentMode } from 'types'
import Component from './Component'
import CustomMachineryLocation from '../CustomMachineryLocation'

abstract class ConfiguredComponent extends Component {
  private config: Config

  constructor (type: CustomMachineryLocation) {
    super(type)
    this.config = {
      default: ComponentMode.BOTH
    }
    this.validateErrors()
  }

  public getConfig () {
    return this.config
  }

  public setDefaultConfig (config: ComponentMode) {
    this.config.default = config
    this.validateErrors()
    return this
  }

  public setRightConfig (config: ComponentMode) {
    this.config.right = config
    this.validateErrors()
    return this
  }

  public setLeftConfig (config: ComponentMode) {
    this.config.left = config
    this.validateErrors()
    return this
  }

  public setTopConfig (config: ComponentMode) {
    this.config.top = config
    this.validateErrors()
    return this
  }

  public setDownConfig (config: ComponentMode) {
    this.config.down = config
    this.validateErrors()
    return this
  }

  public setFrontConfig (config: ComponentMode) {
    this.config.front = config
    this.validateErrors()
    return this
  }

  public setBackConfig (config: ComponentMode) {
    this.config.back = config
    this.validateErrors()
    return this
  }

  public setInputConfig (config: boolean) {
    this.config.input = config
    this.validateErrors()
    return this
  }

  public setOutputConfig (config: boolean) {
    this.config.output = config
    this.validateErrors()
    return this
  }

  public setEnabledConfig (config: boolean) {
    this.config.enabled = config
    this.validateErrors()
    return this
  }

  public validateErrors (): void {
    super.validateErrors()
  }

  public toJson () {
    return {
      ...super.toJson(),
      config: this.getConfig()
    }
  }
}

export default ConfiguredComponent
