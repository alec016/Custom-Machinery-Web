export const MachineInputErrors = {
  namespace: 'Namespace is required',
  name: 'Machine name is required',
  appearance: {
    block: 'Machine appearance block is required',
    hardness: 'Machine hardness must be grater than 1 and lower than 1000',
    resistance: 'Machine resistance must be grater than 1 and lower than 1000',
    light: 'Machine emit light must be between 0 and 15',
    idle: {
      block: 'Machine idle block appearance is required',
      light: 'Machine idle appearance emit light must be between 0 and 15'
    },
    running: {
      block: 'Machine running block appearance is required',
      light: 'Machine running appearance emit light must be between 0 and 15'
    },
    errored: {
      block: 'Machine errored block appearance is required',
      light: 'Machine errored appearance emit light must be between 0 and 15'
    },
    paused: {
      block: 'Machine paused block appearance is required',
      light: 'Machine paused appearance emit light must be between 0 and 15'
    },
    shape: {
      0: 'Machine MinX must be between 0.0 and 1.0',
      1: 'Machine MinY must be between 0.0 and 1.0',
      2: 'Machine MinZ must be between 0.0 and 1.0',
      3: 'Machine MaxX must be between 0.0 and 1.0',
      4: 'Machine MaxY must be between 0.0 and 1.0',
      5: 'Machine MaxZ must be between 0.0 and 1.0'
    }
  }
}
