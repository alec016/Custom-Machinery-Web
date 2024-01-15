import CustomMachineryLocation from './CustomMachineryLocation'

export const ElementType = {
  CONFIG: new CustomMachineryLocation('config'),
  TEXT: new CustomMachineryLocation('text'),
  BUTTON: new CustomMachineryLocation('button'),
  DUMP: new CustomMachineryLocation('dump'),
  ENERGY: new CustomMachineryLocation('energy'),
  FLUID: new CustomMachineryLocation('fluid'),
  FUEL: new CustomMachineryLocation('fuel'),
  HEAT: new CustomMachineryLocation('heat'),
  PLAYER_INVENTORY: new CustomMachineryLocation('player_inventory'),
  PROGRESS: new CustomMachineryLocation('progress'),
  RESET: new CustomMachineryLocation('reset'),
  SIZE: new CustomMachineryLocation('size'),
  SLOT: new CustomMachineryLocation('slot'),
  STATUS: new CustomMachineryLocation('status'),
  TEXTURE: new CustomMachineryLocation('texture'),
  EXPERIENCE: new CustomMachineryLocation('experience'),
  CHEMICAL: {
    GAS: new CustomMachineryLocation('gas'),
    INFUSION: new CustomMachineryLocation('infusion'),
    PIGMENT: new CustomMachineryLocation('pigment'),
    SLURRY: new CustomMachineryLocation('slurry')
  }
}
