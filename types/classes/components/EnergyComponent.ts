import { ComponentType } from 'types'
import ConfiguredModeComponent from './ConfiguredModeComponent'

class EnergyComponent extends ConfiguredModeComponent {
  private capacity: number
  private max_input: number
  private max_output: number

  constructor () {
    super(ComponentType.ENERGY)
    this.capacity = this.max_input = this.max_output = 10000
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

  public getMaxInput () {
    return this.max_input
  }

  public setMaxInput (maxInput: number) {
    if (maxInput > this.capacity) this.max_input = this.capacity
    else this.max_input = maxInput
    this.validateErrors()
    return this
  }

  public getMaxOutput () {
    return this.max_output
  }

  public setMaxOutput (maxOutput: number) {
    if (maxOutput > this.capacity) this.max_output = this.capacity
    else this.max_output = maxOutput
    this.validateErrors()
    return this
  }

  public validateErrors () {
    super.validateErrors()
    if (this.capacity > 0 && this.capacity <= Number.MAX_SAFE_INTEGER) this.errors.capacity = false
    else {
      this.errors.capacity = true
      if (this.capacity <= 0) this.errorMessages.capacity = 'Capacity must be greater than 0'
      else if (this.capacity > Number.MAX_SAFE_INTEGER) this.errorMessages.capacity = 'Capacity must be lower than ' + Number.MAX_SAFE_INTEGER
    }
    if (this.max_input > 0 && this.max_input <= this.capacity) this.errors.max_input = false
    else {
      this.errors.max_input = true
      if (this.max_input <= 0) this.errorMessages.max_input = 'MaxInput must be greater than 0'
      else if (this.max_input > this.capacity) this.errorMessages.max_input = 'MaxInput can not be greater than the capacity'
    }
    if (this.max_output > 0 && this.max_output <= this.capacity) this.errors.max_output = false
    else {
      this.errors.max_output = true
      if (this.max_output <= 0) this.errorMessages.max_output = 'MaxOutput must be greater than 0'
      else if (this.max_output > this.capacity) this.errorMessages.max_output = 'MaxOutput can not be greater than the capacity'
    }
  }

  public toJson () {
    return {
      ...super.toJson(),
      capacity: this.getCapacity(),
      max_input: this.getMaxInput(),
      max_output: this.getMaxOutput()
    }
  }
}

export default EnergyComponent
