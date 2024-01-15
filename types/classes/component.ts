import CustomMachineryLocation from './CustomMachineryLocation'

export const ComponentType = {
  ITEM: new CustomMachineryLocation('item'),
  FLUID: new CustomMachineryLocation('fluid'),
  ENERGY: new CustomMachineryLocation('energy'),
  REDSTONE: new CustomMachineryLocation('redstone'),
  HEAT: new CustomMachineryLocation('heat'),
  CONTRAPTION: new CustomMachineryLocation('contraption'),
  EXPERIENCE: new CustomMachineryLocation('experience'),
  CHEMICAL: {
    GAS: new CustomMachineryLocation('gas'),
    INFUSION: new CustomMachineryLocation('infusion'),
    PIGMENT: new CustomMachineryLocation('pigment'),
    SLURRY: new CustomMachineryLocation('slurry')
  }
}
