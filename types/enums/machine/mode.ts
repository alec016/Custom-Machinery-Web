import CustomMachineryLocation from '../../classes/CustomMachineryLocation'

export enum ComponentMode {
  INPUT = 'input',
  OUTPUT = 'output',
  BOTH = 'both',
  NONE = 'none'
}

export const ItemComponentVariant = {
  UPGRADE: new CustomMachineryLocation('upgrade'),
  DEFAULT: new CustomMachineryLocation('default'),
  FUEL: new CustomMachineryLocation('fuel'),
  FLUID: new CustomMachineryLocation('fluid'),
  ENERGY: new CustomMachineryLocation('energy'),
  RESULT: new CustomMachineryLocation('result')
}
