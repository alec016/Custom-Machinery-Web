'use client'
import { DeleteOutlined } from '@mui/icons-material'

import {
  Input,
  Button
} from '@nextui-org/react'

import { Dispatch, SetStateAction } from 'react'

import {
  EnergyComponent as Energy,
  Component,
  Machine
} from 'types'

type EnergyComponentParams = {
  index: number
  components: Component[]
  setComponents: Dispatch<SetStateAction<Component[]>>
  setValues: Dispatch<SetStateAction<Machine>>
}

export function EnergyComponent ({ index, components, setComponents, setValues }: EnergyComponentParams) {
  return (
    <div className='px-8 py-3'>
      Energy Component
      <div className='pt-3 grid grid-cols-5 gap-3 justify-center items-center border border-default-100 border-solid p-2 rounded-md'>
        {/* Component Capacity */}
        <Input
          isClearable
          type='number'
          label='Energy Capacity'
          name={`components.${index}.capacity`}
          min='1'
          variant='flat'
          radius='md'
          description='The capacity of the energy tank'
          defaultValue={
            `${(components[index] as Energy).getCapacity() ?? ''}` === ''
              ? '100000'
              : `${(components[index] as Energy).getCapacity()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Energy).setCapacity(parseFloat(value))
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
          description='Energy max input'
          defaultValue={
            `${(components[index] as Energy).getMaxInput() ?? ''}` === ''
              ? `${(components[index] as Energy).getCapacity()}`
              : `${(components[index] as Energy).getMaxInput()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Energy).setMaxInput(parseFloat(value))
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
          description='Energy max output'
          defaultValue={
            `${(components[index] as Energy).getMaxOutput() ?? ''}` === ''
              ? `${(components[index] as Energy).getCapacity()}`
              : `${(components[index] as Energy).getMaxOutput()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Energy).setMaxOutput(parseFloat(value))
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
