'use client'

import { Button } from '@nextui-org/react'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import {
  Machine,
  GUIElement,
  ChemicalComponent as Chemical
} from 'types'

type JEIFormParams = {
  values: Machine
  setValues: Dispatch<SetStateAction<Machine>>
  setIsOpenedJEI: Dispatch<SetStateAction<boolean>>,
  version: '1.16' | '1.18' | '1.19'
}

export function JEIForm ({ values, setValues, setIsOpenedJEI, version }: JEIFormParams) {
  const [elements, setElements] = useState<GUIElement[]>(values.jei ?? [])

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0 })
  }, [])

  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-default-100/95 w-full h-full max-h-full z-20 box-border flex items-center justify-center'>
      <div className='w-[95%] h-[95%] bg-black rounded-xl relative overflow-y-scroll'>
        JEI MODAL
        <div className='grid grid-cols-4 w-[90%] px-8 pt-8 pb-3 gap-3'>
          {/*  */}
        </div>
        <div>
          {/* */}
        </div>
        <Button
          className='absolute right-10 top-7'
          onClick={() => {
            setValues(prev => ({
              ...prev,
              jei: elements
            }))
            setIsOpenedJEI(false)
          }}
        >
          Save and Close
        </Button>
      </div>
    </div>
  )
}
