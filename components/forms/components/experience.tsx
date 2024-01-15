'use client'
import { DeleteOutlined } from '@mui/icons-material'

import {
  Input,
  Button,
  Switch
} from '@nextui-org/react'

import { Dispatch, SetStateAction, useState } from 'react'

import {
  ExperienceComponent as Experience,
  Component,
  Machine
} from 'types'

type ExperienceComponentParams = {
  index: number
  components: Component[]
  setComponents: Dispatch<SetStateAction<Component[]>>
  setValues: Dispatch<SetStateAction<Machine>>
}

export function ExperienceComponent ({ index, components, setComponents, setValues }: ExperienceComponentParams) {
  const x = (components[index] as Experience)?.getRetrieveSlotsId()
  const [filter, setFilter] = useState<string[]>(x ?? [])
  return (
    <div className='px-8 py-3'>
      Experience Component
      <div className='pt-3 grid grid-cols-5 gap-3 justify-center items-center border border-default-100 border-solid p-2 rounded-md'>
        {/* Component Capacity */}
        <Input
          isClearable
          type='number'
          label='Experience Capacity'
          name={`components.${index}.capacity`}
          min='1'
          variant='flat'
          radius='md'
          description='The capacity of the energy tank'
          defaultValue={
            `${(components[index] as Experience).getCapacity() ?? ''}` === ''
              ? '100000'
              : `${(components[index] as Experience).getCapacity()}`
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Experience).setCapacity(parseFloat(value))
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
        {/* Component Retrieve From Slots */}
        <Switch
          defaultSelected={(components[index] as Experience).getRetrieveFromSlots() ?? false}
          color='success'
          onValueChange={(selected) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Experience).setRetrieveFromSlots(selected)
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
        >
          Retrieve From Slots
        </Switch>
        {/* Slot Ids */}
        <div className='grid grid-cols-4 gap-3 col-span-5 box-border justify-center items-center'>
          {
            filter?.map((f, i) => (
              <div key={i} className='grid grid-cols-4 gap-3 box-border justify-center items-center'>
                <Input
                  className='col-span-3'
                  isClearable
                  type='text'
                  label='Slot id'
                  name={`components.${index}.slotIds.${i}`}
                  variant='flat'
                  radius='md'
                  defaultValue={f}
                  onValueChange={(value) => {
                    setFilter(prev => {
                      prev[i] = value
                      return prev
                    })
                    setComponents(prev => {
                      prev[index] = (prev[index] as Experience).setRetrieveSlotsId(filter)
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
                      prev[index] = (prev[index] as Experience).setRetrieveSlotsId(filter)
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
                  prev[index] = (prev[index] as Experience).setRetrieveSlotsId(filter)
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
                prev[index] = (prev[index] as Experience).setRetrieveSlotsId(filter)
                return prev
              })
              setValues(prev => ({
                ...prev,
                components
              }))
            }}
          >
            Add Slot Id
          </Button>
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
