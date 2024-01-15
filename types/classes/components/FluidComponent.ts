import { ComponentType } from 'types'
import ConfiguredModeComponent from './ConfiguredModeComponent'

class FluidComponent extends ConfiguredModeComponent {
  private capacity: number
  private id: string
  private max_input: number
  private max_output: number
  private filter: string[]
  private whitelist: boolean

  constructor () {
    super(ComponentType.FLUID)
    this.id = ''
    this.capacity = this.max_input = this.max_output = 10000
    this.filter = []
    this.whitelist = false
    this.validateErrors()
  }

  public getId () {
    return this.id
  }

  public setId (id: string) {
    this.id = id
    this.validateErrors()
    return this
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

  public getFilter () {
    return this.filter
  }

  public addFilter (filter: string) {
    this.filter.push(filter)
    this.validateErrors()
    return this
  }

  public setFilter (filter: string[]) {
    this.filter = filter
    this.validateErrors()
    return this
  }

  public getWhitelist () {
    return this.whitelist
  }

  public setWhitelist (whitelist: boolean) {
    this.whitelist = whitelist
    this.validateErrors()
    return this
  }

  public validateErrors () {
    super.validateErrors()
    if (this.id && this.id.trim() !== '') this.errors.id = false
    else {
      this.errors.id = true
      if (!this.id) this.errorMessages.id = 'Id property is required'
      else if (this.id.trim()) this.errorMessages.id = 'Id property can not be empty'
    }
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
      id: this.getId(),
      capacity: this.getCapacity(),
      max_input: this.getMaxInput(),
      max_output: this.getMaxOutput(),
      filter: this.getFilter().length > 1 ? this.getFilter() : this.getFilter().join(','),
      whitelist: this.getWhitelist()
    }
  }
}

export default FluidComponent
