'use client'
import { Button, useDisclosure } from '@nextui-org/react'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'

import {
  Machine,
  Component,
  ItemComponent as Item,
  FluidComponent as Fluid,
  EnergyComponent as Energy,
  RedstoneComponent as Redstone,
  ChemicalComponent as Chemical,
  ContraptionComponent as Contraption,
  HeatComponent as Heat,
  ExperienceComponent as Experience,
  versions
} from 'types'

import {
  ItemComponent,
  FluidComponent,
  EnergyComponent,
  RedstoneComponent,
  ChemicalComponent,
  ContraptionComponent,
  HeatComponent,
  ExperienceComponent
} from './components/'
import { ExperienceModal } from '.'

type ComponentsFormParams = {
  values: Machine
  setValues: Dispatch<SetStateAction<Machine>>
  setIsOpenedComponents: Dispatch<SetStateAction<boolean>>,
  version: '1.16' | '1.18' | '1.19'
}

export function ComponentsForm ({ values, setValues, setIsOpenedComponents, version }: ComponentsFormParams) {
  const [components, setComponents] = useState<Component[]>(values.components ?? [])

  const {
    isOpen,
    onOpen,
    onOpenChange
  } = useDisclosure()

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0 })
  }, [])

  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-default-100/95 w-full h-full max-h-full z-20 box-border flex items-center justify-center'>
      <div className='w-[95%] h-[95%] bg-black rounded-xl relative overflow-y-scroll'>
        <div className='grid grid-cols-4 w-[90%] px-8 pt-8 pb-3 gap-3'>
          {
            versions[version].components.filter(component => component === 'Item').length > 0 && (
              <Button
                onClick={() => {
                  setComponents(prev => [...prev, new Item()])
                }}
              >
                Add Item Component
              </Button>
            )
          }
          {
            versions[version].components.filter(component => component === 'Fluid').length > 0 && (
              <Button
                className=''
                onClick={() => {
                  setComponents(prev => [...prev, new Fluid()])
                }}
              >
                Add Fluid Component
              </Button>
            )
          }
          {
            versions[version].components.filter(component => component === 'Energy').length > 0 && (
              <Button
                className=''
                onClick={() => {
                  setComponents(prev => [...prev, new Energy()])
                }}
              >
                Add Energy Component
              </Button>
            )
          }
          {
            versions[version].components.filter(component => component === 'Redstone').length > 0 && (
              <Button
                className=''
                onClick={() => {
                  setComponents(prev => [...prev, new Redstone()])
                }}
              >
                Add Redstone Component
              </Button>
            )
          }
          {
            versions[version].components.filter(component => component === 'Chemical').length > 0 && (
              <Button
                className=''
                onClick={() => {
                  setComponents(prev => [...prev, new Chemical('GAS')])
                }}
              >
                Add Chemical Component
              </Button>
            )
          }
          {
            versions[version].components.filter(component => component === 'Contraption').length > 0 && (
              <Button
                className=''
                onClick={() => {
                  setComponents(prev => [...prev, new Contraption()])
                }}
              >
                Add Contraption Component
              </Button>
            )
          }
          {
            versions[version].components.filter(component => component === 'Heat').length > 0 && (
              <Button
                className=''
                onClick={() => {
                  setComponents(prev => [...prev, new Heat()])
                }}
              >
                Add Heat Component
              </Button>
            )
          }
          {
            versions[version].components.filter(component => component === 'Experience').length > 0 && (
              <Button
                className=''
                onClick={() => {
                  if (components.length > 0 && components.find(element => element instanceof Experience)) {
                    onOpen()
                    return
                  }
                  setComponents(prev => [...prev, new Experience()])
                }}
              >
                Add Experience Component
              </Button>
            )
          }
        </div>
        <div>
          {
            components.length > 0 && components.map((component, index) => {
              switch (component.getType().getString()) {
                case 'custommachinery:item':
                  return <ItemComponent key={index} index={index} components={components} setComponents={setComponents} setValues={setValues} />
                case 'custommachinery:fluid':
                  return <FluidComponent key={index} index={index} components={components} setComponents={setComponents} setValues={setValues} />
                case 'custommachinery:energy':
                  return <EnergyComponent key={index} index={index} components={components} setComponents={setComponents} setValues={setValues} />
                case 'custommachinery:redstone':
                  return <RedstoneComponent key={index} index={index} components={components} setComponents={setComponents} setValues={setValues} />
                case 'custommachinery:gas':
                case 'custommachinery:infusion':
                case 'custommachinery:pigment':
                case 'custommachinery:slurry':
                  return <ChemicalComponent key={index} index={index} components={components} setComponents={setComponents} setValues={setValues} />
                case 'custommachinery:contraption':
                  return <ContraptionComponent key={index} index={index} components={components} setComponents={setComponents} setValues={setValues} />
                case 'custommachinery:heat':
                  return <HeatComponent key={index} index={index} components={components} setComponents={setComponents} setValues={setValues} />
                case 'custommachinery:experience':
                  return <ExperienceComponent key={index} index={index} components={components} setComponents={setComponents} setValues={setValues} />
                default:
                  return <></>
              }
            })
          }
        </div>
        <Button
          className='absolute right-10 top-7'
          onClick={() => {
            setValues(prev => ({
              ...prev,
              components
            }))
            setIsOpenedComponents(false)
          }}
        >
          Save and Close
        </Button>
        <ExperienceModal isOpen={isOpen} onOpenChange={onOpenChange} setComponents={setComponents} />
      </div>
    </div>
  )
}
