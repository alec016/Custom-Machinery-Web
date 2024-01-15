'use client'
import { DeleteOutlined } from '@mui/icons-material'

import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import {
  ExperienceGUIElement,
  GUIElement,
  Machine,
  DisplayMode,
  Mode
} from 'types'

type ExperienceElementParams = {
  index: number
  elements: GUIElement[]
  setElements: Dispatch<SetStateAction<GUIElement[]>>
  setValues: Dispatch<SetStateAction<Machine>>,
  namespace?: string,
  session: Session | null
}

export function ExperienceElement ({
  index,
  elements,
  setElements,
  setValues,
  session,
  namespace
}: ExperienceElementParams) {
  const supabase = createClientComponentClient()
  const [updating, setUpdating] = useState(false)

  const user = session?.user
  async function updateImage ({
    img,
    path
  }: {
    img: File
    path: 'texture' | 'texture_hovered'
  }) {
    try {
      const { data, error } = await supabase.storage.from('textures').upload(`${user?.id}/experience/${path}/${img.name}`, img, { upsert: true })

      if (error) {
        throw error
      }

      switch (path) {
        case 'texture':
          setElements(prev => {
            prev[index] = (prev[index] as ExperienceGUIElement).setTexture(`${namespace ?? 'minecraft'}:${data.path}`)
            return prev
          })
          break
        case 'texture_hovered':
          setElements(prev => {
            prev[index] = (prev[index] as ExperienceGUIElement).setTextureHovered(`${namespace ?? 'minecraft'}:${data.path}`)
            return prev
          })
      }

      setValues(prev => ({
        ...prev,
        gui: elements
      }))

      alert('image updated!')
    } catch (error) {
      console.error(error)
      alert('Error updating the data!')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className='py-3'>
      Experience Element
      <div className='pt-3 grid grid-cols-5 gap-3 justify-center items-center border border-default-100 border-solid p-2 rounded-md'>
        {/* X Position */}
        <Input
          isRequired
          isClearable
          type='number'
          label='X Position'
          name={`elements.${index}.x`}
          variant='flat'
          radius='md'
          defaultValue={`${(elements[index] as ExperienceGUIElement).getX()}`}
          onValueChange={(value) => {
            setElements(prev => {
              prev[index] = prev[index].setX(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              gui: elements
            }))
          }}
          errorMessage={elements[index].getErrors().x && elements[index].getErrorMessages().x}
          color={elements[index].getErrors().x ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().x}
        />
        {/* Y Position */}
        <Input
          isRequired
          isClearable
          type='number'
          label='Y Position'
          name={`elements.${index}.y`}
          variant='flat'
          radius='md'
          defaultValue={`${(elements[index] as ExperienceGUIElement).getY()}`}
          onValueChange={(value) => {
            setElements(prev => {
              prev[index] = prev[index].setY(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              gui: elements
            }))
          }}
          errorMessage={elements[index].getErrors().y && elements[index].getErrorMessages().y}
          color={elements[index].getErrors().y ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().y}
        />
        {/* WIDTH */}
        <Input
          isClearable
          type='number'
          label='Width'
          name={`elements.${index}.width`}
          min='0'
          variant='flat'
          radius='md'
          defaultValue={`${(elements[index] as ExperienceGUIElement).getWidth()}`}
          onValueChange={(value) => {
            setElements(prev => {
              prev[index] = prev[index].setWidth(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              gui: elements
            }))
          }}
          errorMessage={elements[index].getErrors().width && elements[index].getErrorMessages().width}
          color={elements[index].getErrors().width ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().width}
        />
        {/* HEIGHT */}
        <Input
          isClearable
          type='number'
          label='Height'
          name={`elements.${index}.height`}
          min='0'
          variant='flat'
          radius='md'
          defaultValue={`${(elements[index] as ExperienceGUIElement).getHeight()}`}
          onValueChange={(value) => {
            setElements(prev => {
              prev[index] = prev[index].setHeight(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              gui: elements
            }))
          }}
          errorMessage={elements[index].getErrors().height && elements[index].getErrorMessages().height}
          color={elements[index].getErrors().height ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().height}
        />
        {/* PRIORITY */}
        <Input
          isClearable
          type='number'
          label='Priority'
          name={`elements.${index}.priority`}
          min='0'
          variant='flat'
          radius='md'
          defaultValue={`${(elements[index] as ExperienceGUIElement).getPriority()}`}
          onValueChange={(value) => {
            setElements(prev => {
              prev[index] = prev[index].setPriority(parseFloat(value))
              return prev
            })
            setValues(prev => ({
              ...prev,
              gui: elements
            }))
          }}
          errorMessage={elements[index].getErrors().priority && elements[index].getErrorMessages().priority}
          color={elements[index].getErrors().priority ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().priority}
        />
        {/* TEXTURE */}
        <Input
          isClearable
          type='file'
          label='Texture'
          name={`elements.${index}.texture`}
          accept='image/*'
          variant='flat'
          radius='md'
          disabled={updating}
          onChange={event => {
            if (!event.target.files || event.target.files.length === 0) {
              throw new Error('You must select an image to upload.')
            }
            setUpdating(true)
            const file = event.target.files[0]
            updateImage({ img: file, path: 'texture' })
          }}
          errorMessage={elements[index].getErrors().texture && elements[index].getErrorMessages().texture}
          color={elements[index].getErrors().texture ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().texture}
        />
        {/* TEXTURE HOVERED */}
        <Input
          isClearable
          type='file'
          label='Texture Hovered'
          name={`elements.${index}.texture_hovered`}
          accept='image/*'
          variant='flat'
          radius='md'
          disabled={updating}
          onChange={event => {
            if (!event.target.files || event.target.files.length === 0) {
              throw new Error('You must select an image to upload.')
            }
            setUpdating(true)
            const file = event.target.files[0]
            updateImage({ img: file, path: 'texture_hovered' })
          }}
          errorMessage={elements[index].getErrors().texture_hovered && elements[index].getErrorMessages().texture_hovered}
          color={elements[index].getErrors().texture_hovered ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().texture_hovered}
        />
        {/* Display Mode */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              className='h-full'
              variant='flat'
            >
              Display Mode: {
                (elements[index] as ExperienceGUIElement).getDisplay()
              }
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Single selection actions'
            variant='flat'
            closeOnSelect
            selectionMode='single'
            selectedKeys={(elements[index] as ExperienceGUIElement).getDisplay()}
            onSelectionChange={(value) => {
              setElements(prev => {
                prev[index] = (prev[index] as ExperienceGUIElement).setDisplay(Array.from(value)[0] as DisplayMode)
                return prev
              })
              setValues(prev => ({
                ...prev,
                gui: elements
              }))
            }}
          >
            <DropdownItem key={DisplayMode.LITERAL}>LITERAL</DropdownItem>
            <DropdownItem key={DisplayMode.LEVEL}>LEVEL</DropdownItem>
            <DropdownItem key={DisplayMode.BOTH}>BOTH</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Mode */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              className='h-full'
              variant='flat'
            >
              Mode: {
                (elements[index] as ExperienceGUIElement).getMode()
              }
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Single selection actions'
            variant='flat'
            closeOnSelect
            selectionMode='single'
            selectedKeys={(elements[index] as ExperienceGUIElement).getMode()}
            onSelectionChange={(value) => {
              setElements(prev => {
                prev[index] = (prev[index] as ExperienceGUIElement).setMode(Array.from(value)[0] as Mode)
                return prev
              })
              setValues(prev => ({
                ...prev,
                gui: elements
              }))
            }}
          >
            <DropdownItem key={Mode.INPUT_ONE}>INPUT ONE</DropdownItem>
            <DropdownItem key={Mode.INPUT_TEN}>INPUT TEN</DropdownItem>
            <DropdownItem key={Mode.INPUT_ALL}>INPUT ALL</DropdownItem>
            <DropdownItem key={Mode.OUTPUT_ONE}>OUTPUT ONE</DropdownItem>
            <DropdownItem key={Mode.OUTPUT_ONE}>OUTPUT TEN</DropdownItem>
            <DropdownItem key={Mode.OUTPUT_ONE}>OUTPUT ALL</DropdownItem>
            <DropdownItem key={Mode.DISPLAY}>DISPLAY</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Delete Buton */}
        <Button
          className='w-1/4'
          onClick={() => {
            delete elements[index]
            setElements(prev => prev.filter(element => element !== null || element !== undefined))
            setValues(prev => ({
              ...prev,
              gui: elements
            }))
          }}
        >
          <DeleteOutlined color='error' />
        </Button>
      </div>
    </div>
  )
}
