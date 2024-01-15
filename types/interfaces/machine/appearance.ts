import { ToolType, MiningLevel, Numbers, InteractionSound, Block, Light } from 'types'

export interface Appearance {
  block: string // x
  hardness?: number // x
  resistance?: number // x
  tool_type?: ToolType[] | ToolType // x
  mining_level?: MiningLevel // x
  requires_tool?: boolean // x
  item?: string // x
  ambient_sound?: string // x
  light?: Light // x
  interaction_sound?: InteractionSound // x
  idle?: Block // x
  running?: Block // x
  errored?: Block // x
  paused?: Block // x
  shape?: [number, number, number, number, number, number] // x
}
