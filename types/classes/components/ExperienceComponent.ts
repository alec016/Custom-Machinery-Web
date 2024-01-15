import { ComponentMode, ComponentType } from 'types'
import Component from './Component'

class ExperienceComponent extends Component {
  private capacity: number
  private retrieveFromSlots: boolean
  private retrieveSlotsId: string[]

  constructor () {
    super(ComponentType.EXPERIENCE)
    this.capacity = 10000
    this.retrieveFromSlots = true
    this.retrieveSlotsId = []
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

  public getRetrieveFromSlots () {
    return this.retrieveFromSlots
  }

  public setRetrieveFromSlots (retrieveFromSlots: boolean) {
    this.retrieveFromSlots = retrieveFromSlots
    this.validateErrors()
    return this
  }

  public getRetrieveSlotsId () {
    return this.retrieveSlotsId
  }

  public addRetrieveSlotId (id: string) {
    this.retrieveSlotsId.push(id)
    this.validateErrors()
    return this
  }

  public setRetrieveSlotsId (slots: string[]) {
    slots = slots.filter(slot => slot !== null && slot !== undefined && slot !== '')
    this.retrieveSlotsId = slots
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
  }

  public toJson () {
    return {
      ...super.toJson(),
      capacity: this.getCapacity(),
      retrieveSlotsId: this.getRetrieveSlotsId(),
      retrieveFromSlots: this.getRetrieveFromSlots()
    }
  }
}

export default ExperienceComponent
