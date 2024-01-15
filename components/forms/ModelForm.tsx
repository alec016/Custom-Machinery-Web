'use client'
import { FormEvent, useState, useMemo } from 'react'
import { HexColor, Machine, MachineInputErrors, Tooltip, CustomMachineryLocation } from 'types'
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { AppearanceForm, ComponentsForm, GUIForm, JEIForm } from 'components'
import { DeleteOutlined } from '@mui/icons-material'
import { Session } from '@supabase/auth-helpers-nextjs'

function hexToInt<T extends string> (rrggbb: HexColor<T>) {
  const bbggrr = rrggbb.substring(4, 2) + rrggbb.substring(2, 2) + rrggbb.substring(0, 2)
  return parseInt(bbggrr, 16)
}

export function ModelForm ({ params: { version, type }, session }: { params: { version: '1.16' | '1.18' | '1.19', type?: 'json' | 'kubejs' | 'zenscript' }, session: Session |null }) {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isOpenedComponents, setIsOpenedComponents] = useState(false)
  const [isOpenedGUI, setIsOpenedGUI] = useState(false)
  const [isOpenedJEI, setIsOpenedJEI] = useState(false)
  const [values, setValues] = useState<Machine>({
    name: '',
    appearance: {
      block: '',
      light: 0
    },
    tooltips: [],
    components: [],
    gui: [],
    jei: [],
    catalysts: [],
    processor: {
      type: new CustomMachineryLocation('machine'),
      cooldown: 20
    }
  })
  const [tooltips, setTooltips] = useState<Tooltip[]>([])
  const [namespace, setNamespace] = useState<string>()

  const validationState = useMemo(() => {
    const errors: any = {}
    if (!namespace || namespace === '') {
      errors.namespace = MachineInputErrors.namespace
    } else {
      delete errors.namespace
    }
    if (!values.name || values.name === '') {
      errors.name = MachineInputErrors.name
    } else {
      delete errors.name
    }
    if (values.appearance && (!values.appearance.block || values.appearance.block === '')) {
      errors.appearance = {
        ...errors.appearance,
        block: MachineInputErrors.appearance.block
      }
    } else {
      delete errors.appearance?.block
    }
    if (values.appearance && values.appearance.idle && (
      !values.appearance.idle.block || values.appearance.idle.block === ''
    )) {
      errors.appearance = {
        ...errors.appearance,
        idle: {
          ...errors.appearance?.idle,
          block: MachineInputErrors.appearance.idle.block
        }
      }
    } else {
      delete errors.appearance?.idle?.block
    }
    if (values.appearance && values.appearance.idle && values.appearance.idle.light && (values.appearance.idle.light < 0 || values.appearance.idle.light > 15)) {
      errors.appearance = {
        ...errors.appearance,
        idle: {
          ...errors.appearance?.idle,
          light: MachineInputErrors.appearance.idle.light
        }
      }
    } else {
      delete errors.appearance?.idle?.light
    }
    return errors
  }, [values, namespace])

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (values.appearance.tool_type) {
      values.appearance.tool_type = values.appearance.tool_type instanceof Array
        ? values.appearance.tool_type.length === 1
          ? values.appearance.tool_type[0]
          : values.appearance.tool_type.length > 1
            ? values.appearance.tool_type
            : undefined
        : undefined
    }
    if (tooltips.length > 0) {
      if (tooltips.length === 1) {
        if (tooltips[0].color) {
          values.tooltips = tooltips
        } else {
          values.tooltips = tooltips[0].text
        }
      } else {
        values.tooltips = tooltips
      }
    }
    const v = {
      ...values,
      components: values.components?.map(component => component.toJson()),
      gui: values.gui?.map(element => element.toJson()),
      jei: values.jei?.map(element => element.toJson()),
      processor: {
        ...values.processor,
        type: values.processor?.type.getString()
      }
    }
    console.log({ values: v })
  }

  return (
    <>
      <form className='p-3' onSubmit={handleForm} autoComplete='off' method='POST'>
        <div className='grid grid-cols-4 justify-center items-center gap-3'>
          {/* Namespace */}
          <Input
            isRequired
            isClearable
            type='text'
            label='Namespace'
            description='Namespace'
            name='name'
            variant='flat'
            radius='md'
            onValueChange={setNamespace}
            errorMessage={
              validationState.namespace
                ? validationState.namespace
                : undefined
            }
            color={validationState.namespace ? 'danger' : 'default'}
            isInvalid={!!validationState.namespace}
          />
          {/* MACHINE NAME */}
          <Input
            isRequired
            isClearable
            type='text'
            label='Machine Name'
            name='name'
            variant='flat'
            radius='md'
            description='The name that the machine will have in-game.'
            onValueChange={(value) => {
              setValues(prev => ({ ...prev, name: value }))
            }}
            errorMessage={
              validationState.name
                ? validationState.name
                : undefined
            }
            color={validationState.name ? 'danger' : 'default'}
            isInvalid={!!validationState.name}
          />
          {/* PROCESSOR */}
          <div className='grid gap-3 justify-center items-center grid-cols-2 col-span-2'>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className='h-full '
                  variant='flat'
                >
                  Processor: {
                    values.processor?.type.getPath()
                  }
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label='Single selection actions'
                variant='flat'
                closeOnSelect={false}
                selectionMode='single'
                selectedKeys={values.processor?.type.getPath()}
                onSelectionChange={(value) => {
                  setValues(prev => ({
                    ...prev,
                    processor: {
                      ...prev.processor,
                      type: new CustomMachineryLocation(Array.from(value)[0] as string)
                    }
                  }))
                }}
              >
                <DropdownItem key='machine'>MACHINE</DropdownItem>
                <DropdownItem key='craft'>CRAFT</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input
              isClearable
              type='number'
              label='Recipe shearch cooldown'
              name='processor.cooldown'
              variant='flat'
              radius='md'
              min='1'
              description='The recipe chearch cooldown in ticks (20 ticks = 1 second).'
              onValueChange={(value) => {
                setValues(prev => ({
                  ...prev,
                  processor: {
                    type: prev.processor?.type ?? new CustomMachineryLocation('machine'),
                    cooldown: parseInt(value)
                  }
                }))
              }}
              defaultValue='20'
              errorMessage={
                validationState.tooltips && validationState.processor
                  ? validationState.processor.cooldown
                  : undefined
              }
              color={validationState.processor && validationState.processor.cooldown ? 'danger' : 'default'}
              isInvalid={validationState.processor && !!validationState.processor.cooldown}
            />
          </div>
        </div>
        {/* APPEARANCE */}
        <div>
          Appearance
          <AppearanceForm setValues={setValues} validationState={validationState} values={values} />
        </div>
        {/* TOOLTIPS */}
        <div className='w-full'>
          Tooltips
          <ul className='grid grid-cols-2 gap-3 w-full justify-center items-center p-3'>
            <div className='col-span-2'>
              <Button
                onClick={() => {
                  setTooltips(prev => [...prev, { text: '' }])
                  setValues(prev => ({
                    ...prev,
                    tooltips
                  }))
                }}
              >
                Add Tooltip
              </Button>
            </div>
            {
              tooltips.map((tooltip, index) => (
                <li key={index} className='grid grid-cols-5 justify-center items-center gap-3 w-full border border-default-100 border-solid p-2 rounded-md'>
                  <Input
                    className='col-span-2'
                    isClearable
                    type='text'
                    label='Tooltip Text'
                    name={`tooltips[${index}].text`}
                    variant='flat'
                    radius='md'
                    size='sm'
                    onValueChange={(value) => {
                      tooltips[index] = {
                        ...tooltips[index],
                        text: value
                      }
                      setValues(prev => ({
                        ...prev,
                        tooltips
                      }))
                    }}
                    errorMessage={
                      validationState.tooltips && validationState.tooltips[index]
                        ? validationState.tooltips[index].text
                        : undefined
                    }
                    defaultValue={tooltip.text}
                    color={validationState.tooltips && validationState.tooltips[index] && validationState.tooltips[index].text ? 'danger' : 'default'}
                    isInvalid={validationState.tooltips && validationState.tooltips[index] && !!validationState.tooltips[index].text}
                  />
                  <Input
                    className='col-span-2'
                    isClearable
                    type='text'
                    label='Tooltip Color. EX: (#123456)'
                    name={`tooltips[${index}].color`}
                    variant='flat'
                    radius='md'
                    size='sm'
                    onValueChange={(value) => {
                      tooltips[index] = {
                        ...tooltips[index],
                        color: value
                      }
                      setValues(prev => ({
                        ...prev,
                        tooltips
                      }))
                    }}
                    errorMessage={
                      validationState.tooltips && validationState.tooltips[index]
                        ? validationState.tooltips[index].color
                        : undefined
                    }
                    defaultValue={tooltip.color}
                    color={validationState.tooltips && validationState.tooltips[index] && validationState.tooltips[index].color ? 'danger' : 'default'}
                    isInvalid={validationState.tooltips && validationState.tooltips[index] && !!validationState.tooltips[index].color}
                  />
                  <Button
                    className='h-full'
                    onClick={() => {
                      setTooltips(prev => {
                        const x: Tooltip[] = []
                        prev.forEach((tooltip, index2) => {
                          if (index !== index2) x.push(tooltip)
                        })
                        return x
                      })
                      setValues(prev => ({
                        ...prev,
                        tooltips
                      }))
                    }}
                  >
                    <DeleteOutlined color='error' />
                  </Button>
                </li>
              ))
            }
          </ul>
        </div>
        {/* COMPONENTS */}
        <div className='w-full'>
          Components
          {
            isOpenedComponents &&
              <ComponentsForm
                setIsOpenedComponents={setIsOpenedComponents}
                values={values}
                setValues={setValues}
              />
          }
          <Button
            className='block mt-3 ml-3 mb-6'
            onClick={() => {
              setIsOpenedComponents(true)
            }}
          >
            Open Components Modal
          </Button>
        </div>
        {/* GUI */}
        <div className='w-full'>
          GUI
          {
            isOpenedGUI &&
              <GUIForm
                setIsOpenedGUI={setIsOpenedGUI}
                values={values}
                setValues={setValues}
                session={session}
                namespace={namespace}
              />
          }
          <Button
            className='block mt-3 ml-3 mb-6'
            onClick={() => {
              setIsOpenedGUI(true)
            }}
          >
            Open GUI Modal
          </Button>
        </div>
        {/* JEI */}
        <div className='w-full'>
          JEI
          {
            isOpenedJEI &&
              <JEIForm
                setIsOpenedJEI={setIsOpenedJEI}
                values={values}
                setValues={setValues}
              />
          }
          <Button
            className='block mt-3 ml-3 mb-6'
            onClick={() => {
              setIsOpenedJEI(true)
            }}
          >
            Open JEI Modal
          </Button>
        </div>
        <Button type='submit'>Generar</Button>
      </form>
    </>
  )
}
