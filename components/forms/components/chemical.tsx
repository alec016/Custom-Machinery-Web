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
  ChemicalComponent as Chemical,
  ComponentMode,
  Component,
  Machine,
  CustomMachineryLocation
} from 'types'

type ChemicalComponentParams = {
  index: number
  components: Component[]
  setComponents: Dispatch<SetStateAction<Component[]>>
  setValues: Dispatch<SetStateAction<Machine>>
}

export function ChemicalComponent ({ index, components, setComponents, setValues }: ChemicalComponentParams) {
  const x = (components[index] as Chemical)?.getFilter()
  const [filter, setFilter] = useState<string[]>(x ?? [])
  return (
    <div className='px-8 py-3'>
      Chemical Component
      <div className='pt-3 grid grid-cols-5 gap-3 justify-center items-center border border-default-100 border-solid p-2 rounded-md'>
        {/* Type */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              className='h-full'
              variant='flat'
            >
              Type: {
                (components[index] as Chemical).getType().getPath()
              }
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Single selection actions'
            variant='flat'
            closeOnSelect
            selectionMode='single'
            selectedKeys={(components[index] as Chemical).getType().getPath()}
            onSelectionChange={(value) => {
              setComponents(prev => {
                prev[index] = (prev[index] as Chemical).setType(new CustomMachineryLocation(Array.from(value)[0] as string))
                return prev
              })
              setValues(prev => ({
                ...prev,
                components
              }))
            }}
          >
            <DropdownItem key='gas'>GAS</DropdownItem>
            <DropdownItem key='infusion'>INFUSION</DropdownItem>
            <DropdownItem key='pigment'>PIGMENT</DropdownItem>
            <DropdownItem key='slurry'>SLURRY</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Component Id */}
        <Input
          isRequired
          isClearable
          type='text'
          label='Id'
          name={`components.${index}.id`}
          variant='flat'
          radius='md'
          description='The id that you will use for recipes or linking elements.'
          defaultValue={(components[index] as Chemical).getId() ?? ''}
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Chemical).setId(value)
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
          isRequired
          isClearable
          type='number'
          label={`${components[index].getType().getPath()[0].toUpperCase()}${components[index].getType().getPath().slice(1)} Capacity`}
          name={`components.${index}.capacity`}
          min='1'
          variant='flat'
          radius='md'
          description='The capacity of the chemical tank'
          defaultValue={
            `${(components[index] as Chemical).getCapacity() ?? ''}` === ''
              ? '10000'
              : `${(components[index] as Chemical).getCapacity()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Chemical).setCapacity(parseFloat(value))
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
          description='Chemical max input'
          defaultValue={
            `${(components[index] as Chemical).getMaxInput() ?? ''}` === ''
              ? `${(components[index] as Chemical).getCapacity()}`
              : `${(components[index] as Chemical).getMaxInput()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Chemical).setMaxInput(parseFloat(value))
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
          description='Chemical max output'
          defaultValue={
            `${(components[index] as Chemical).getMaxOutput() ?? ''}` === ''
              ? `${(components[index] as Chemical).getCapacity()}`
              : `${(components[index] as Chemical).getMaxOutput()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Chemical).setMaxOutput(parseFloat(value))
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
          defaultSelected={(components[index] as Chemical).getWhitelist() ?? false}
          color='success'
          onValueChange={(selected) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Chemical).setWhitelist(selected)
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
                (components[index] as Chemical).getMode()
              }
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Single selection actions'
            variant='flat'
            closeOnSelect
            selectionMode='single'
            selectedKeys={(components[index] as Chemical).getMode()}
            onSelectionChange={(mode) => {
              setComponents(prev => {
                prev[index] = (prev[index] as Chemical).setMode(Array.from(mode)[0] as ComponentMode)
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
                      prev[index] = (prev[index] as Chemical).setFilter(filter)
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
                      prev[index] = (prev[index] as Chemical).setFilter(filter)
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
                  prev[index] = (prev[index] as Chemical).setFilter(filter)
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
                prev[index] = (prev[index] as Chemical).setFilter(filter)
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
                defaultSelected={(components[index] as Chemical).getConfig()?.input ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Chemical).setInputConfig(selected)
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
                defaultSelected={(components[index] as Chemical).getConfig()?.output ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Chemical).setOutputConfig(selected)
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
                defaultSelected={(components[index] as Chemical).getConfig()?.enabled ?? false}
                color='success'
                onValueChange={(selected) => {
                  setComponents(prev => {
                    prev[index] = (prev[index] as Chemical).setEnabledConfig(selected)
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
                      (components[index] as Chemical).getConfig()?.default
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Chemical).getConfig()?.default}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Chemical).setDefaultConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Chemical).getConfig()?.right
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Chemical).getConfig()?.right}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Chemical).setRightConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Chemical).getConfig()?.left
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Chemical).getConfig()?.left}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Chemical).setLeftConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Chemical).getConfig()?.top
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Chemical).getConfig()?.top}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Chemical).setTopConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Chemical).getConfig()?.down
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Chemical).getConfig()?.down}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Chemical).setDownConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Chemical).getConfig()?.front
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Chemical).getConfig()?.front}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Chemical).setFrontConfig(Array.from(mode)[0] as ComponentMode)
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
                      (components[index] as Chemical).getConfig()?.back
                    }
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Single selection actions'
                  variant='flat'
                  closeOnSelect
                  selectionMode='single'
                  selectedKeys={(components[index] as Chemical).getConfig()?.back}
                  onSelectionChange={(mode) => {
                    setComponents(prev => {
                      prev[index] = (prev[index] as Chemical).setBackConfig(Array.from(mode)[0] as ComponentMode)
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
