import { ComponentType, ItemComponentVariant } from 'types'
import ConfiguredModeComponent from './ConfiguredModeComponent'
import CustomMachineryLocation from '../CustomMachineryLocation'

class ItemComponent extends ConfiguredModeComponent {
  private id: string
  private capacity: number
  private variant: CustomMachineryLocation | null
  private filter: string []
  private whitelist: boolean

  constructor () {
    super(ComponentType.ITEM)
    this.id = ''
    this.capacity = 64
    this.variant = null
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

  public getVariant () {
    return this.variant
  }

  public setVariant (variant: CustomMachineryLocation) {
    this.variant = variant
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
      else if (this.id.trim() === '') this.errorMessages.id = 'Id property can not be empty'
    }
    if (this.capacity > 0 && this.capacity <= 64) this.errors.capacity = false
    else {
      this.errors.capacity = true
      if (this.capacity <= 0) this.errorMessages.capacity = 'Capacity must be greater than 0'
      else if (this.capacity > 64) this.errorMessages.capacity = 'Capacity can not be greater than a stack(64 items)'
    }
    if (this.variant !== null && this.variant) {
      switch (this.variant.getPath()) {
        case ItemComponentVariant.DEFAULT.getPath():
          this.errors.variant = false
          break
        case ItemComponentVariant.ENERGY.getPath():
          this.errors.variant = false
          break
        case ItemComponentVariant.FLUID.getPath():
          this.errors.variant = false
          break
        case ItemComponentVariant.FUEL.getPath():
          this.errors.variant = false
          break
        case ItemComponentVariant.RESULT.getPath():
          this.errors.variant = false
          break
        case ItemComponentVariant.UPGRADE.getPath():
          this.errors.variant = false
          break
        default:
          this.errors.variant = true
          this.errorMessages.variant = 'Variant not valid for this component'
      }
    } else {
      this.errors.variant = true
      if (!this.variant || this.variant === null) this.errorMessages.variant = 'Variant can not be null'
    }
  }

  public toJson () {
    return {
      ...super.toJson(),
      id: this.getId(),
      capacity: this.getCapacity(),
      variant: this.getVariant()?.getString(),
      filter: this.getFilter(),
      whitelist: this.getWhitelist()
    }
  }
}

export default ItemComponent
