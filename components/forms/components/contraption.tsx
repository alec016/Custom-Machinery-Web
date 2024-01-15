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
  ContraptionComponent as Contraption,
  ComponentMode,
  Component,
  Machine
} from 'types'

type ContraptionComponentParams = {
  index: number
  components: Component[]
  setComponents: Dispatch<SetStateAction<Component[]>>
  setValues: Dispatch<SetStateAction<Machine>>
}

export function ContraptionComponent ({ index, components, setComponents, setValues }: ContraptionComponentParams) {
  return (
    <div className='px-8 py-3'>
      Contraption Component
      <div className='pt-3 grid grid-cols-5 gap-3 justify-center items-center border border-default-100 border-solid p-2 rounded-md'>
        {/* Stress impact */}
        <Input
          className='col-span-2'
          isClearable
          type='number'
          label='Stress impact'
          name={`components.${index}.stress_impact`}
          min='0'
          step='0.01'
          variant='flat'
          radius='md'
          description='Kinetic Stress Impact of the machine. Ex: rotation 64 rpm * 2 (stress impact) = 128 SU. Default: 0 stress impact'
          defaultValue={
            `${(components[index] as Contraption).getStressImpact() ?? ''}` === ''
              ? '0'
              : `${(components[index] as Contraption).getStressImpact()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Contraption).setStressImpact(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
          errorMessage={components[index].getErrors().stress_impact && components[index].getErrorMessages().stress_impact}
          color={components[index].getErrors().stress_impact ? 'danger' : 'default'}
          isInvalid={components[index].getErrors().stress_impact}
        />
        {/* Config */}
        <div className='col-span-5 box-border'>
          Config
          <div className='p-3 grid grid-cols-4 gap-3 box-border'>
            <div className='grid grid-cols-3 gap-3'>
              {/* Config input */}
              <Switch
                defaultSelected={(components[index] as Contraption).getConfig()?.input ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Contraption).setInputConfig(selected)
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
                defaultSelected={(components[index] as Contraption).getConfig()?.output ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Contraption).setOutputConfig(selected)
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
                defaultSelected={(components[index] as Contraption).getConfig()?.enabled ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Contraption).setEnabledConfig(selected)
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
                      (components[index] as Contraption).getConfig()?.default
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Contraption).getConfig()?.default}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Contraption).setDefaultConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Contraption).getConfig()?.right
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Contraption).getConfig()?.right}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Contraption).setRightConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Contraption).getConfig()?.left
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Contraption).getConfig()?.left}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Contraption).setLeftConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Contraption).getConfig()?.top
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Contraption).getConfig()?.top}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Contraption).setTopConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Contraption).getConfig()?.down
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Contraption).getConfig()?.down}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Contraption).setDownConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Contraption).getConfig()?.front
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Contraption).getConfig()?.front}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Contraption).setFrontConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Contraption).getConfig()?.back
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Contraption).getConfig()?.back}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Contraption).setBackConfig(Array.from(mode)[0] as ComponentMode)
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
