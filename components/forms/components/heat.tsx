'use client'
import { DeleteOutlined } from '@mui/icons-material'

import {
  Input,
  Switch,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@nextui-org/react'

import { Dispatch, SetStateAction } from 'react'

import {
  HeatComponent as Heat,
  ComponentMode,
  Component,
  Machine
} from 'types'

type HeatComponentParams = {
  index: number
  components: Component[]
  setComponents: Dispatch<SetStateAction<Component[]>>
  setValues: Dispatch<SetStateAction<Machine>>
}

export function HeatComponent ({ index, components, setComponents, setValues }: HeatComponentParams) {
  return (
    <div className='px-8 py-3'>
      Heat Component
      <div className='pt-3 grid grid-cols-2 gap-3 justify-center items-center border border-default-100 border-solid p-2 rounded-md'>
        {/* Component Capacity */}
        <Input
          isClearable
          type='number'
          label='Heat Capacity'
          name={`components.${index}.capacity`}
          min='1'
          step='0.01'
          variant='flat'
          radius='md'
          description={
            <span>
              The capacity of the heat tank in Kelvin.
              273.15K = 0ºC | 274.15K = 1ºC
            </span>
          }
          defaultValue={
            `${(components[index] as Heat).getCapacity() ?? ''}` === ''
              ? '373'
              : `${(components[index] as Heat).getCapacity()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Heat).setCapacity(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
          startContent='K'
          errorMessage={components[index].getErrors().capacity && components[index].getErrorMessages().capacity}
          color={components[index].getErrors().capacity ? 'danger' : 'default'}
          isInvalid={components[index].getErrors().capacity}
        />
        {/* Base temp */}
        <Input
          isClearable
          type='number'
          label='Base Temperature'
          name={`components.${index}.base_temp`}
          min='1'
          step='0.01'
          variant='flat'
          radius='md'
          description={
            <span>
              The base temperature of the machine in Kelvin.
              273.15K = 0ºC | 274.15K = 1ºC
            </span>
          }
          defaultValue={
            `${(components[index] as Heat).getBaseTemp() ?? ''}` === ''
              ? '300'
              : `${(components[index] as Heat).getBaseTemp()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Heat).setBaseTemp(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
          startContent='K'
          errorMessage={components[index].getErrors().base_temp && components[index].getErrorMessages().base_temp}
          color={components[index].getErrors().base_temp ? 'danger' : 'default'}
          isInvalid={components[index].getErrors().base_temp}
        />
        {/* Conduction */}
        <Input
          isClearable
          type='number'
          label='Conduction Coefficient'
          name={`components.${index}.conduction`}
          min='0'
          step='0.01'
          variant='flat'
          radius='md'
          description='The Conduction coefficient'
          defaultValue={
            `${(components[index] as Heat).getConduction() ?? ''}` === ''
              ? '1'
              : `${(components[index] as Heat).getConduction()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Heat).setConduction(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
          errorMessage={components[index].getErrors().conduction && components[index].getErrorMessages().conduction}
          color={components[index].getErrors().conduction ? 'danger' : 'default'}
          isInvalid={components[index].getErrors().conduction}
        />
        {/* Insulation */}
        <Input
          isClearable
          type='number'
          label='Insulation Coefficient'
          name={`components.${index}.insulation`}
          min='0'
          step='0.01'
          variant='flat'
          radius='md'
          description='The Insulation coefficient'
          defaultValue={
            `${(components[index] as Heat).getInsulation() ?? ''}` === ''
              ? '0'
              : `${(components[index] as Heat).getInsulation()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Heat).setInsulation(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
          errorMessage={components[index].getErrors().insulation && components[index].getErrorMessages().insulation}
          color={components[index].getErrors().insulation ? 'danger' : 'default'}
          isInvalid={components[index].getErrors().insulation}
        />
        {/* Config */}
        <div className='col-span-5 box-border'>
          Config
          <div className='p-3 grid grid-cols-4 gap-3 box-border'>
            <div className='grid grid-cols-3 gap-3'>
              {/* Config input */}
              <Switch
                defaultSelected={(components[index] as Heat).getConfig()?.input ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Heat).setInputConfig(selected)
                    return prev
                  })
                  setValues(prev => ({
                    ...prev,
                    components
                  }))
                }}
              >
                Input
              </Switch>
              {/* Config output */}
              <Switch
                defaultSelected={(components[index] as Heat).getConfig()?.output ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Heat).setOutputConfig(selected)
                    return prev
                  })
                  setValues(prev => ({
                    ...prev,
                    components
                  }))
                }}
              >
                Output
              </Switch>
              {/* Config enabled */}
              <Switch
                defaultSelected={(components[index] as Heat).getConfig()?.enabled ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Heat).setEnabledConfig(selected)
                    return prev
                  })
                  setValues(prev => ({
                    ...prev,
                    components
                  }))
                }}
              >
                Enabled
              </Switch>
            </div>
            <div className='grid grid-cols-4 gap-3 justify-center items-center'>
              Default:
              {/* Config Deault */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className='col-span-3'
                    variant='flat'
                  >
                    {
                      (components[index] as Heat).getConfig()?.default
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Heat).getConfig()?.default}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Heat).setDefaultConfig(Array.from(mode)[0] as ComponentMode)
                      return prev
                    })
                    setValues(prev => ({
                      ...prev,
                      components
                    }))
                  }}
                >
                  <DropdownItem key={ComponentMode.INPUT}>INPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.OUTPUT}>OUTPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.BOTH}>BOTH</DropdownItem>
                  <DropdownItem key={ComponentMode.NONE}>NONE</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='grid grid-cols-4 gap-3 justify-center items-center'>
              Right:
              {/* Config Right */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className='col-span-3'
                    variant='flat'
                  >
                    {
                      (components[index] as Heat).getConfig()?.right
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Heat).getConfig()?.right}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Heat).setRightConfig(Array.from(mode)[0] as ComponentMode)
                      return prev
                    })
                    setValues(prev => ({
                      ...prev,
                      components
                    }))
                  }}
                >
                  <DropdownItem key={ComponentMode.INPUT}>INPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.OUTPUT}>OUTPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.BOTH}>BOTH</DropdownItem>
                  <DropdownItem key={ComponentMode.NONE}>NONE</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='grid grid-cols-4 gap-3 justify-center items-center'>
              Left:
              {/* Config Left */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className='col-span-3'
                    variant='flat'
                  >
                    {
                      (components[index] as Heat).getConfig()?.left
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Heat).getConfig()?.left}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Heat).setLeftConfig(Array.from(mode)[0] as ComponentMode)
                      return prev
                    })
                    setValues(prev => ({
                      ...prev,
                      components
                    }))
                  }}
                >
                  <DropdownItem key={ComponentMode.INPUT}>INPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.OUTPUT}>OUTPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.BOTH}>BOTH</DropdownItem>
                  <DropdownItem key={ComponentMode.NONE}>NONE</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='grid grid-cols-4 gap-3 justify-center items-center'>
              Top:
              {/* Config Top */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className='col-span-3'
                    variant='flat'
                  >
                    {
                      (components[index] as Heat).getConfig()?.top
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Heat).getConfig()?.top}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Heat).setTopConfig(Array.from(mode)[0] as ComponentMode)
                      return prev
                    })
                    setValues(prev => ({
                      ...prev,
                      components
                    }))
                  }}
                >
                  <DropdownItem key={ComponentMode.INPUT}>INPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.OUTPUT}>OUTPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.BOTH}>BOTH</DropdownItem>
                  <DropdownItem key={ComponentMode.NONE}>NONE</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='grid grid-cols-4 gap-3 justify-center items-center'>
              Down:
              {/* Config Down */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className='col-span-3'
                    variant='flat'
                  >
                    {
                      (components[index] as Heat).getConfig()?.down
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Heat).getConfig()?.down}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Heat).setDownConfig(Array.from(mode)[0] as ComponentMode)
                      return prev
                    })
                    setValues(prev => ({
                      ...prev,
                      components
                    }))
                  }}
                >
                  <DropdownItem key={ComponentMode.INPUT}>INPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.OUTPUT}>OUTPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.BOTH}>BOTH</DropdownItem>
                  <DropdownItem key={ComponentMode.NONE}>NONE</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='grid grid-cols-4 gap-3 justify-center items-center'>
              Front:
              {/* Config Front */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className='col-span-3'
                    variant='flat'
                  >
                    {
                      (components[index] as Heat).getConfig()?.front
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Heat).getConfig()?.front}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Heat).setFrontConfig(Array.from(mode)[0] as ComponentMode)
                      return prev
                    })
                    setValues(prev => ({
                      ...prev,
                      components
                    }))
                  }}
                >
                  <DropdownItem key={ComponentMode.INPUT}>INPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.OUTPUT}>OUTPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.BOTH}>BOTH</DropdownItem>
                  <DropdownItem key={ComponentMode.NONE}>NONE</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='grid grid-cols-4 gap-3 justify-center items-center'>
              Back:
              {/* Config Back */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className='col-span-3'
                    variant='flat'
                  >
                    {
                      (components[index] as Heat).getConfig()?.back
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Heat).getConfig()?.back}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Heat).setBackConfig(Array.from(mode)[0] as ComponentMode)
                      return prev
                    })
                    setValues(prev => ({
                      ...prev,
                      components
                    }))
                  }}
                >
                  <DropdownItem key={ComponentMode.INPUT}>INPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.OUTPUT}>OUTPUT</DropdownItem>
                  <DropdownItem key={ComponentMode.BOTH}>BOTH</DropdownItem>
                  <DropdownItem key={ComponentMode.NONE}>NONE</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* Delete Buton */}
        <Button
          className='w-1/4'
          onClick={() => {
            delete components[index]
            setComponents(prev => {
              const comp = prev.filter(component => component !== null || component !== undefined)
              return comp
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
        >
          <DeleteOutlined color='error' />
        </Button>
      </div>
    </div>
  )
}
