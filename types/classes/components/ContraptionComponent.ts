import { ComponentType } from 'types'
import ConfiguredComponent from './ConfiguredComponent'

class ContraptionComponent extends ConfiguredComponent {
  private stress_impact: number
  constructor () {
    super(ComponentType.CONTRAPTION)
    this.stress_impact = 0
    this.validateErrors()
  }

  public getStressImpact () {
    return this.stress_impact
  }

  public setStressImpact (stress: number) {
    this.stress_impact = stress
    this.validateErrors()
    return this
  }

  public validateErrors () {
    super.validateErrors()
    if (this.stress_impact >= 0) this.errors.stress_impact = false
    else {
      this.errors.stress_impact = true
      if (this.stress_impact < 0) this.errorMessages.stress_impact = 'Stress Impact must be greater or equals to 0'
    }
  }

  public toJson () {
    return {
      ...super.toJson(),
      stress_impact: this.getStressImpact()
    }
  }
}

export default ContraptionComponent
