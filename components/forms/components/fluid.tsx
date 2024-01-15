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

import { Dispatch, SetStateAction, useState } from 'react'

import {
  FluidComponent as Fluid,
  ComponentMode,
  Component,
  Machine
} from 'types'

type FluidComponentParams = {
  index: number
  components: Component[]
  setComponents: Dispatch<SetStateAction<Component[]>>
  setValues: Dispatch<SetStateAction<Machine>>
}

export function FluidComponent ({ index, components, setComponents, setValues }: FluidComponentParams) {
  const x = (components[index] as Fluid)?.getFilter()
  const [filter, setFilter] = useState<string[]>(x ?? [])
  return (
    <div className='px-8 py-3'>
      Fluid Component
      <div className='pt-3 grid grid-cols-5 gap-3 justify-center items-center border border-default-100 border-solid p-2 rounded-md'>
        {/* Component Id */}
        <Input
          isClearable
          type='text'
          label='Id'
          name={`components.${index}.id`}
          variant='flat'
          radius='md'
          description='The id that you will use for recipes or linking elements.'
          defaultValue={(components[index] as Fluid).getId() ?? ''}
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Fluid).setId(value)
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
          errorMessage={components[index].getErrors().id && components[index].getErrorMessages().id}
          color={components[index].getErrors().id ? 'danger' : 'default'}
          isInvalid={components[index].getErrors().id}
        />
        {/* Component Capacity */}
        <Input
          isClearable
          type='number'
          label='Fluid Capacity'
          name={`components.${index}.capacity`}
          min='1'
          variant='flat'
          radius='md'
          description='The capacity of the fluid tank in mB'
          defaultValue={
            `${(components[index] as Fluid).getCapacity() ?? ''}` === ''
              ? '10000'
              : `${(components[index] as Fluid).getCapacity()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Fluid).setCapacity(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
          errorMessage={components[index].getErrors().capacity && components[index].getErrorMessages().capacity}
          color={components[index].getErrors().capacity ? 'danger' : 'default'}
          isInvalid={components[index].getErrors().capacity}
        />
        {/* Component max input */}
        <Input
          isClearable
          type='number'
          label='Max Input'
          name={`components.${index}.max_input`}
          min='1'
          variant='flat'
          radius='md'
          description='Fluid max input in mB'
          defaultValue={
            `${(components[index] as Fluid).getMaxInput() ?? ''}` === ''
              ? `${(components[index] as Fluid).getCapacity()}`
              : `${(components[index] as Fluid).getMaxInput()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Fluid).setMaxInput(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
          errorMessage={components[index].getErrors().max_input && components[index].getErrorMessages().max_input}
          color={components[index].getErrors().max_input ? 'danger' : 'default'}
          isInvalid={components[index].getErrors().max_input}
        />
        {/* Component max output */}
        <Input
          isClearable
          type='number'
          label='Max Output'
          name={`components.${index}.max_output`}
          min='1'
          variant='flat'
          radius='md'
          description='Fluid max output in mB'
          defaultValue={
            `${(components[index] as Fluid).getMaxOutput() ?? ''}` === ''
              ? `${(components[index] as Fluid).getCapacity()}`
              : `${(components[index] as Fluid).getMaxOutput()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Fluid).setMaxOutput(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
          errorMessage={components[index].getErrors().max_output && components[index].getErrorMessages().max_output}
          color={components[index].getErrors().max_output ? 'danger' : 'default'}
          isInvalid={components[index].getErrors().max_output}
        />
        {/* Component Whitelist Mode */}
        <Switch
          defaultSelected={(components[index] as Fluid).getWhitelist() ?? false}
          color='success'
          onValueChange={(selected) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Fluid).setWhitelist(selected)
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
        >
          Filter in Whitelist mode
        </Switch>
        {/* Component Mode */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              className='h-full'
              variant='flat'
            >
              Mode: {
                (components[index] as Fluid).getMode()
              }
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Single selection actions'
            variant='flat'
            closeOnSelect
            selectionMode='single'
            selectedKeys={(components[index] as Fluid).getMode()}
            onSelectionChange={(mode) => {
              setComponents(prev => {
                prev[index] = (prev[index] as Fluid).setMode(Array.from(mode)[0] as ComponentMode)
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
        {/* Filter */}
        <div className='grid grid-cols-4 gap-3 col-span-5 box-border justify-center items-center'>
          {
            filter?.map((f, i) => (
              <div key={i} className='grid grid-cols-4 gap-3 box-border justify-center items-center'>
                <Input
                  className='col-span-3'
                  isClearable
                  type='text'
                  label='Item Filter'
                  name={`components.${index}.filter.${i}`}
                  variant='flat'
                  radius='md'
                  defaultValue={f}
                  onValueChange={(value) => {
                    setFilter(prev => {
                      prev[i] = value
                      return prev
                    })
                    setComponents(prev => {
                      prev[index] = (prev[index] as Fluid).setFilter(filter)
                      return prev
                    })
                    setValues(prev => ({
                      ...prev,
                      components
                    }))
                  }}
                />
                <Button
                  className='h-full'
                  onClick={() => {
                    delete filter[i]
                    setFilter(prev => {
                      const comp = prev.filter(f => f !== null || f !== undefined)
                      return comp
                    })
                    setComponents(prev => {
                      prev[index] = (prev[index] as Fluid).setFilter(filter)
                      return prev
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
            ))
          }
          <Button
            className='w-1/4'
            onClick={() => {
              if (filter.length === 0) {
                setFilter([''])
                setComponents(prev => {
                  prev[index] = (prev[index] as Fluid).setFilter(filter)
                  return prev
                })
                setValues(prev => ({
                  ...prev,
                  components
                }))
                return
              }
              setFilter(prev => ([...prev, '']))
              setComponents(prev => {
                prev[index] = (prev[index] as Fluid).setFilter(filter)
                return prev
              })
              setValues(prev => ({
                ...prev,
                components
              }))
            }}
          >
            Add filter
          </Button>
        </div>
        {/* Config */}
        <div className='col-span-5 box-border'>
          Config
          <div className='p-3 grid grid-cols-4 gap-3 box-border'>
            <div className='grid grid-cols-3 gap-3'>
              {/* Config input */}
              <Switch
                defaultSelected={(components[index] as Fluid).getConfig()?.input ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Fluid).setInputConfig(selected)
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
                defaultSelected={(components[index] as Fluid).getConfig()?.output ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Fluid).setOutputConfig(selected)
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
                defaultSelected={(components[index] as Fluid).getConfig()?.enabled ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Fluid).setEnabledConfig(selected)
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
                      (components[index] as Fluid).getConfig()?.default
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Fluid).getConfig()?.default}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Fluid).setDefaultConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Fluid).getConfig()?.right
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Fluid).getConfig()?.right}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Fluid).setRightConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Fluid).getConfig()?.left
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Fluid).getConfig()?.left}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Fluid).setLeftConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Fluid).getConfig()?.top
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Fluid).getConfig()?.top}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Fluid).setTopConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Fluid).getConfig()?.down
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Fluid).getConfig()?.down}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Fluid).setDownConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Fluid).getConfig()?.front
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Fluid).getConfig()?.front}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Fluid).setFrontConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Fluid).getConfig()?.back
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Fluid).getConfig()?.back}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Fluid).setBackConfig(Array.from(mode)[0] as ComponentMode)
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
