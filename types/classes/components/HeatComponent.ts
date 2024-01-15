import { ComponentType } from 'types'
import ConfiguredComponent from './ConfiguredComponent'

class HeatComponent extends ConfiguredComponent {
  private capacity: number
  private base_temp: number
  private conduction: number
  private insulation: number

  constructor () {
    super(ComponentType.HEAT)
    this.capacity = 373
    this.base_temp = 300
    this.conduction = 1
    this.insulation = 0
    this.validateErrors()
  }

  public getCapacity () {
    return this.capacity
  }

  public setCapacity (capacity: number) {
    this.capacity = capacity
    this.validateErrors()
    return this
  }

  public getBaseTemp () {
    return this.base_temp
  }

  public setBaseTemp (temp: number) {
    this.base_temp = temp
    this.validateErrors()
    return this
  }

  public getConduction () {
    return this.conduction
  }

  public setConduction (conduction: number) {
    this.conduction = conduction
    this.validateErrors()
    return this
  }

  public getInsulation () {
    return this.insulation
  }

  public setInsulation (insulation: number) {
    this.insulation = insulation
    this.validateErrors()
    return this
  }

  public validateErrors () {
    super.validateErrors()
    if (this.capacity > 0 && this.capacity <= Number.POSITIVE_INFINITY) this.errors.capacity = false
    else {
      this.errors.capacity = true
      if (this.capacity <= 0) this.errorMessages.capacity = 'Capacity must be greater than 0'
      else if (this.capacity > Number.MAX_SAFE_INTEGER) this.errorMessages.capacity = 'Capacity must be lower than ' + Number.MAX_SAFE_INTEGER
    }
    if (this.base_temp > 0 && this.base_temp <= this.capacity) this.errors.base_temp = false
    else {
      this.errors.base_temp = true
      if (this.base_temp <= 0) this.errorMessages.base_temp = 'Base Temperature must be greater than 0'
      else if (this.base_temp > this.capacity) this.errorMessages.base_temp = 'Base Temperature can not be greater than the capacity'
    }
    if (this.conduction > 0 && this.conduction <= Number.POSITIVE_INFINITY) this.errors.conduction = false
    else {
      this.errors.conduction = true
      if (this.conduction <= 0) this.errorMessages.conduction = 'Conduction must be greater than 0'
      else if (this.conduction > Number.POSITIVE_INFINITY) this.errorMessages.conduction = 'Conduction can not be greater than ' + Number.POSITIVE_INFINITY
    }
  }

  public toJson () {
    return {
      ...super.toJson(),
      capacity: this.getCapacity(),
      base_temp: this.getBaseTemp(),
      conduction: this.getConduction(),
      insulation: this.getInsulation()
    }
  }
}

export default HeatComponent
