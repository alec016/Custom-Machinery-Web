import ConfiguredModeComponent from './ConfiguredModeComponent'
import { ComponentType } from 'types'
import CustomMachineryLocation from '../CustomMachineryLocation'

class ChemicalComponent extends ConfiguredModeComponent {
  private id: string
  private capacity: number
  private maxInput: number
  private maxOutput: number
  private filter: string[]
  private whitelist: boolean

  constructor (type: keyof typeof ComponentType.CHEMICAL) {
    super(ComponentType.CHEMICAL[type])
    this.id = ''
    this.capacity = this.maxInput = this.maxOutput = 1000
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
    return this.maxInput
  }

  public setMaxInput (transfer: number) {
    if (transfer > this.capacity) transfer = this.capacity
    this.maxInput = transfer
    this.validateErrors()
    return this
  }

  public getMaxOutput () {
    return this.maxOutput
  }

  public setMaxOutput (transfer: number) {
    if (transfer > this.capacity) transfer = this.capacity
    this.maxOutput = transfer
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

  public setType (type: CustomMachineryLocation) {
    this.type = type
    this.validateErrors()
    return this
  }

  public validateErrors (): void {
    super.validateErrors()
    if (this.id && this.id.trim() !== '') this.errors.id = false
    else {
      this.errors.id = true
      if (!this.id) this.errorMessages.id = 'Id Property is required'
      else if (this.id.trim() === '') this.errorMessages.id = 'Id Property must not be empty'
    }
    if (this.capacity > 0 && this.capacity <= Number.MAX_SAFE_INTEGER) this.errors.capacity = false
    else {
      this.errors.capacity = true
      if (this.capacity <= 0) this.errorMessages.capacity = 'Capacity must be greater than 0'
      else if (this.capacity > Number.MAX_SAFE_INTEGER) this.errorMessages.capacity = 'Capacity must be lower than ' + Number.MAX_SAFE_INTEGER
    }
    if (this.maxInput > 0 && this.maxInput <= this.capacity) this.errors.maxInput = false
    else {
      this.errors.maxInput = true
      if (this.maxInput <= 0) this.errorMessages.maxInput = 'MaxInput must be greater than 0'
      else if (this.maxInput > this.capacity) this.errorMessages.maxInput = 'MaxInput can not be greater than the capacity'
    }
    if (this.maxOutput > 0 && this.maxOutput <= this.capacity) this.errors.maxOutput = false
    else {
      this.errors.maxOutput = true
      if (this.maxOutput <= 0) this.errorMessages.maxOutput = 'MaxOutput must be greater than 0'
      else if (this.maxOutput > this.capacity) this.errorMessages.maxOutput = 'MaxOutput can not be greater than the capacity'
    }
    switch (this.type.getPath()) {
      case ComponentType.CHEMICAL.GAS.getPath():
        this.errors.type = false
        break
      case ComponentType.CHEMICAL.INFUSION.getPath():
        this.errors.type = false
        break
      case ComponentType.CHEMICAL.PIGMENT.getPath():
        this.errors.type = false
        break
      case ComponentType.CHEMICAL.SLURRY.getPath():
        this.errors.type = false
        break
      default:
        this.errors.type = true
        this.errorMessages.type = 'Type is not supported by this component'
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

export default ChemicalComponent
