'use client'
import { Button } from '@nextui-org/react'
import { Session } from '@supabase/auth-helpers-nextjs'
import { Dispatch, SetStateAction } from 'react'
import { Machine } from 'types'

type PreviewParams = {
  values: Machine
  setIsOpenedPreview: Dispatch<SetStateAction<boolean>>
  session: Session | null
}

export function Preview ({ setIsOpenedPreview, values, session }: PreviewParams) {
  return (
    <div className='w-[95%] h-[95%] bg-black rounded-xl relative overflow-y-scroll p-8'>
      <Button
        className='absolute right-10 top-7'
        onClick={() => {
          setIsOpenedPreview(false)
        }}
      >
        Close Preview
      </Button>
      <pre>
        {
          JSON.stringify({
            ...values,
            components: values.components?.map(component => component.toJson()).filter(value => value !== null && value !== undefined),
            gui: values.gui?.map(element => element.toJson()).filter(value => value !== null && value !== undefined),
            jei: values.gui?.map(element => element.toJson()).filter(value => value !== null && value !== undefined),
            processor: {
              cooldown: values.processor?.cooldown !== 20 ? values.processor?.cooldown : undefined,
              type: values.processor?.type.getString()
            }
          }, null, 2)
        }
      </pre>
    </div>
  )
}
