import { Tooltip, Appearance, Processor, GUIElement, Component } from 'types'

export interface Machine {
  name: string // x
  appearance: Appearance // x
  tooltips?: Tooltip[] | string // x
  processor?: Processor // x
  components?: Component[] // x
  gui?: GUIElement[]
  jei?: GUIElement[]
  catalysts?: string[]
}
