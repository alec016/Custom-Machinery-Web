'use client'
import { DeleteOutlined } from '@mui/icons-material'

import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@nextui-org/react'

import { Dispatch, SetStateAction } from 'react'

import {
  RedstoneComponent as Redstone,
  Component,
  Machine,
  Redstone as RedstoneNumber,
  CustomMachineryLocation
} from 'types'

type RedstoneComponentParams = {
  index: number
  components: Component[]
  setComponents: Dispatch<SetStateAction<Component[]>>
  setValues: Dispatch<SetStateAction<Machine>>
}

export function RedstoneComponent ({ index, components, setComponents, setValues }: RedstoneComponentParams) {
  return (
    <div className='px-8 py-3'>
      Redstone Component
      <div className='pt-3 grid grid-cols-5 gap-3 justify-center items-center border border-default-100 border-solid p-2 rounded-md'>
        {/* Power to pause */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant='flat'
            >
              Power to pause (16 = never paused): {
                (components[index] as Redstone).getPowerToPause()
              }
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Single selection actions'
            variant='flat'
            closeOnSelect
            selectionMode='single'
            selectedKeys={((components[index] as Redstone).getPowerToPause() as number)?.toString()}
            onSelectionChange={(mode) => {
              setComponents(prev => {
                prev[index] = (prev[index] as Redstone).setPowerToPause(Array.from(mode)[0] as RedstoneNumber | 16)
                return prev
              })
              setValues(prev => ({
                ...prev,
                components
              }))
            }}
          >
            <DropdownItem key='0'>0</DropdownItem>
            <DropdownItem key='1'>1</DropdownItem>
            <DropdownItem key='2'>2</DropdownItem>
            <DropdownItem key='3'>3</DropdownItem>
            <DropdownItem key='4'>4</DropdownItem>
            <DropdownItem key='5'>5</DropdownItem>
            <DropdownItem key='6'>6</DropdownItem>
            <DropdownItem key='7'>7</DropdownItem>
            <DropdownItem key='8'>8</DropdownItem>
            <DropdownItem key='9'>9</DropdownItem>
            <DropdownItem key='10'>10</DropdownItem>
            <DropdownItem key='11'>11</DropdownItem>
            <DropdownItem key='12'>12</DropdownItem>
            <DropdownItem key='13'>13</DropdownItem>
            <DropdownItem key='14'>14</DropdownItem>
            <DropdownItem key='15'>15</DropdownItem>
            <DropdownItem key='16'>16</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Idle power output */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant='flat'
            >
              Idle power output: {
                (components[index] as Redstone).getIdlePowerOutput()
              }
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Single selection actions'
            variant='flat'
            closeOnSelect
            selectionMode='single'
            selectedKeys={((components[index] as Redstone).getIdlePowerOutput() as number)?.toString()}
            onSelectionChange={(mode) => {
              setComponents(prev => {
                prev[index] = (prev[index] as Redstone).setIdlePowerOutput(Array.from(mode)[0] as RedstoneNumber)
                return prev
              })
              setValues(prev => ({
                ...prev,
                components
              }))
            }}
          >
            <DropdownItem key='0'>0</DropdownItem>
            <DropdownItem key='1'>1</DropdownItem>
            <DropdownItem key='2'>2</DropdownItem>
            <DropdownItem key='3'>3</DropdownItem>
            <DropdownItem key='4'>4</DropdownItem>
            <DropdownItem key='5'>5</DropdownItem>
            <DropdownItem key='6'>6</DropdownItem>
            <DropdownItem key='7'>7</DropdownItem>
            <DropdownItem key='8'>8</DropdownItem>
            <DropdownItem key='9'>9</DropdownItem>
            <DropdownItem key='10'>10</DropdownItem>
            <DropdownItem key='11'>11</DropdownItem>
            <DropdownItem key='12'>12</DropdownItem>
            <DropdownItem key='13'>13</DropdownItem>
            <DropdownItem key='14'>14</DropdownItem>
            <DropdownItem key='15'>15</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Error power output */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant='flat'
            >
              Error power output: {
                (components[index] as Redstone).getErroredPowerOutput()
              }
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Single selection actions'
            variant='flat'
            closeOnSelect
            selectionMode='single'
            selectedKeys={(components[index] as Redstone).getErroredPowerOutput() + ''}
            onSelectionChange={(mode) => {
              setComponents(prev => {
                prev[index] = (prev[index] as Redstone).setErroredPowerOutput(Array.from(mode)[0] as RedstoneNumber)
                return prev
              })
              setValues(prev => ({
                ...prev,
                components
              }))
            }}
          >
            <DropdownItem key='0'>0</DropdownItem>
            <DropdownItem key='1'>1</DropdownItem>
            <DropdownItem key='2'>2</DropdownItem>
            <DropdownItem key='3'>3</DropdownItem>
            <DropdownItem key='4'>4</DropdownItem>
            <DropdownItem key='5'>5</DropdownItem>
            <DropdownItem key='6'>6</DropdownItem>
            <DropdownItem key='7'>7</DropdownItem>
            <DropdownItem key='8'>8</DropdownItem>
            <DropdownItem key='9'>9</DropdownItem>
            <DropdownItem key='10'>10</DropdownItem>
            <DropdownItem key='11'>11</DropdownItem>
            <DropdownItem key='12'>12</DropdownItem>
            <DropdownItem key='13'>13</DropdownItem>
            <DropdownItem key='14'>14</DropdownItem>
            <DropdownItem key='15'>15</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Comparator input type */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant='flat'
            >
              Comparator input type: {
                (components[index] as Redstone).getComparatorInputType()?.getPath()
              }
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Single selection actions'
            variant='flat'
            closeOnSelect
            selectionMode='single'
            selectedKeys={(components[index] as Redstone).getComparatorInputType()?.getPath()}
            onSelectionChange={(mode) => {
              setComponents(prev => {
                prev[index] = (prev[index] as Redstone).setComparatorInputType(new CustomMachineryLocation(mode as string))
                return prev
              })
              setValues(prev => ({
                ...prev,
                components
              }))
            }}
          >
            <DropdownItem key='item'>ITEM</DropdownItem>
            <DropdownItem key='fuild'>FLUID</DropdownItem>
            <DropdownItem key='energy'>ENERGY</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Comparator input id */}
        <Input
          isClearable
          label='Comparator Input ID'
          name={`components.${index}.comparatorinputid`}
          variant='flat'
          radius='md'
          description='Comparator input component id'
          defaultValue={
            (components[index] as Redstone).getComparatorInputId() ?? ''
          }
          onValueChange={(value) => {
            setComponents(prev => {
              prev[index] = (prev[index] as Redstone).setComparatorInputId(value)
              return prev
            })
            setValues(prev => ({
              ...prev,
              components
            }))
          }}
          errorMessage={components[index].getErrors().comparatorInputId && components[index].getErrorMessages().comparatorInputId}
          color={components[index].getErrors().comparatorInputId ? 'danger' : 'default'}
          isInvalid={components[index].getErrors().comparatorInputId}
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
