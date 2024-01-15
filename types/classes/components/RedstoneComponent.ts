import { Redstone, ComponentType, ComparatorInputType } from 'types'
import Component from './Component'
import CustomMachineryLocation from '../CustomMachineryLocation'

class RedstoneComponent extends Component {
  private powerToPause: Redstone | 16
  private idlePowerOutput: Redstone
  private erroredPowerOutput: Redstone
  private comparatorInputType: CustomMachineryLocation | null
  private comparatorInputId: string

  constructor () {
    super(ComponentType.REDSTONE)
    this.powerToPause = 0
    this.idlePowerOutput = 0
    this.erroredPowerOutput = 0
    this.comparatorInputType = null
    this.comparatorInputId = ''
    this.validateErrors()
  }

  public getPowerToPause () {
    return this.powerToPause
  }

  public setPowerToPause (power: Redstone | 16) {
    this.powerToPause = power
    this.validateErrors()
    return this
  }

  public getIdlePowerOutput () {
    return this.idlePowerOutput
  }

  public setIdlePowerOutput (power: Redstone) {
    this.idlePowerOutput = power
    this.validateErrors()
    return this
  }

  public getErroredPowerOutput () {
    return this.erroredPowerOutput
  }

  public setErroredPowerOutput (power: Redstone) {
    this.erroredPowerOutput = power
    this.validateErrors()
    return this
  }

  public getComparatorInputType () {
    return this.comparatorInputType
  }

  public setComparatorInputType (type: CustomMachineryLocation) {
    this.comparatorInputType = type
    this.validateErrors()
    return this
  }

  public getComparatorInputId () {
    return this.comparatorInputId
  }

  public setComparatorInputId (id: string) {
    this.comparatorInputId = id
    this.validateErrors()
    return this
  }

  public validateErrors () {
    super.validateErrors()
    if (this.powerToPause >= 0 && this.powerToPause <= 16) this.errors.powerToPause = false
    else {
      this.errors.powerToPause = true
      if (this.powerToPause < 0) this.errorMessages.powerToPause = 'Power to pause must be greater or equals to 0'
      else if (this.powerToPause > 16) this.errorMessages.powerToPause = 'Power to pause can not be greater than 16'
    }
    if (this.idlePowerOutput >= 0 && this.idlePowerOutput < 16) this.errors.idlePowerOutput = false
    else {
      this.errors.idlePowerOutput = true
      if (this.idlePowerOutput < 0) this.errorMessages.idlePowerOutput = 'Idle power output must be greater or equals to 0'
      else if (this.idlePowerOutput > 15) this.errorMessages.idlePowerOutput = 'Idle power output can not be greater than 15'
    }
    if (this.erroredPowerOutput >= 0 && this.erroredPowerOutput < 16) this.errors.erroredPowerOutput = false
    else {
      this.errors.erroredPowerOutput = true
      if (this.erroredPowerOutput < 0) this.errorMessages.erroredPowerOutput = 'Errored power output must be greater or equals to 0'
      else if (this.erroredPowerOutput > 15) this.errorMessages.erroredPowerOutput = 'Errored power output can not be greater than 15'
    }
    if (this.comparatorInputType && this.comparatorInputType !== null) {
      switch (this.comparatorInputType.getPath()) {
        case ComparatorInputType.ITEM.getPath():
        case ComparatorInputType.FLUID.getPath():
        case ComparatorInputType.ENERGY.getPath():
          this.errors.comparatorInputType = false
          break
        default:
          this.errors.comparatorInputType = true
          this.errorMessages.comparatorInputType = 'Comparator input type has an invalid component'
      }
    } else {
      this.errors.comparatorInputType = true
      if (!this.comparatorInputType) this.errorMessages.comparatorInputType = 'Comparator input type is required'
    }
    if (this.comparatorInputId && this.comparatorInputId.trim() !== '') this.errors.comparatorInputId = false
    else {
      this.errors.comparatorInputId = true
      if (!this.comparatorInputId) this.errorMessages.comparatorInputId = 'Comparator input id is required'
      else if (this.comparatorInputId.trim() === '') this.errorMessages.comparatorInputId = 'Comparator input id can not be empty'
    }
  }

  public toJson () {
    return {
      ...super.toJson(),
      powertopause: this.getPowerToPause(),
      idlepoweroutput: this.getIdlePowerOutput(),
      erroredpoweroutput: this.getErroredPowerOutput(),
      comparatorinputtype: this.getComparatorInputType()?.getString(),
      comparatorinputid: this.getComparatorInputId()
    }
  }
}

export default RedstoneComponent
