'use client'
import { DeleteOutlined } from '@mui/icons-material'

import {
  Input,
  Button,
  Switch
} from '@nextui-org/react'

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import {
  ButtonGUIElement,
  GUIElement,
  Machine
} from 'types'

type ButtonElementParams = {
  index: number
  elements: GUIElement[]
  setElements: Dispatch<SetStateAction<GUIElement[]>>
  setValues: Dispatch<SetStateAction<Machine>>,
  namespace?: string,
  session: Session | null
}

export function ButtonElement ({
  index,
  elements,
  setElements,
  setValues,
  session,
  namespace
}: ButtonElementParams) {
  const supabase = createClientComponentClient()
  const [updating, setUpdating] = useState(false)
  const x = (elements[index] as ButtonGUIElement)?.getTooltips()
  const [tooltips, setTooltips] = useState(x ?? [])

  const user = session?.user
  async function updateImage ({
    img,
    path
  }: {
    img: File
    path: 'texture' | 'texture_hovered' | 'texture_toggle'
  }) {
    try {
      const { data, error } = await supabase.storage.from('textures').upload(`${user?.id}/elements/button/${path}/${img.name}`, img, { upsert: true })

      if (error) {
        throw error
      }

      switch (path) {
        case 'texture':
          setElements(prev => {
            prev[index] = (prev[index] as ButtonGUIElement).setTexture(`${namespace ?? 'minecraft'}:${data.path}`)
            return prev
          })
          break
        case 'texture_hovered':
          setElements(prev => {
            prev[index] = (prev[index] as ButtonGUIElement).setTextureHovered(`${namespace ?? 'minecraft'}:${data.path}`)
            return prev
          })
          break
        case 'texture_toggle':
          setElements(prev => {
            prev[index] = (prev[index] as ButtonGUIElement).setTextureToggle(`${namespace ?? 'minecraft'}:${data.path}`)
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
      Button Element
      <div className='pt-3 grid grid-cols-5 gap-3 justify-center items-center border border-default-100 border-solid p-2 rounded-md'>
        {/* Id */}
        <Input
          isRequired
          isClearable
          label='Component id'
          description='Component id to link the GUI element'
          name={`elements.${index}.id`}
          variant='flat'
          radius='md'
          defaultValue={`${(elements[index] as ButtonGUIElement).getId()}`}
          onValueChange={(value) => {
            setElements(prev => {
              prev[index] = (prev[index] as ButtonGUIElement).setId(value)
              return prev
            })
            setValues(prev => ({
              ...prev,
              gui: elements
            }))
          }}
          errorMessage={elements[index].getErrors().id && elements[index].getErrorMessages().id}
          color={elements[index].getErrors().id ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().id as boolean}
        />
        {/* X Position */}
        <Input
          isRequired
          isClearable
          type='number'
          label='X Position'
          name={`elements.${index}.x`}
          variant='flat'
          radius='md'
          defaultValue={`${(elements[index] as ButtonGUIElement).getX()}`}
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
          isInvalid={elements[index].getErrors().x as boolean}
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
          defaultValue={`${(elements[index] as ButtonGUIElement).getY()}`}
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
          isInvalid={elements[index].getErrors().y as boolean}
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
          defaultValue={`${(elements[index] as ButtonGUIElement).getWidth()}`}
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
          isInvalid={elements[index].getErrors().width as boolean}
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
          defaultValue={`${(elements[index] as ButtonGUIElement).getHeight()}`}
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
          isInvalid={elements[index].getErrors().height as boolean}
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
          defaultValue={`${(elements[index] as ButtonGUIElement).getPriority()}`}
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
          isInvalid={elements[index].getErrors().priority as boolean}
        />
        {/* TEXT */}
        <Input
          isClearable
          label='Text'
          name={`elements.${index}.text`}
          min='0'
          variant='flat'
          radius='md'
          defaultValue={`${(elements[index] as ButtonGUIElement).getText().text}`}
          onValueChange={(value) => {
            setElements(prev => {
              prev[index] = (prev[index] as ButtonGUIElement).setText({
                ...(prev[index] as ButtonGUIElement).getText(),
                text: value
              })
              return prev
            })
            setValues(prev => ({
              ...prev,
              gui: elements
            }))
          }}
          errorMessage={elements[index].getErrors().text && elements[index].getErrorMessages().text}
          color={elements[index].getErrors().text ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().text as boolean}
        />
        {/* ITEM */}
        <Input
          isClearable
          label='Item'
          name={`elements.${index}.item`}
          min='0'
          variant='flat'
          radius='md'
          defaultValue={`${(elements[index] as ButtonGUIElement).getItem().id}`}
          onValueChange={(value) => {
            setElements(prev => {
              prev[index] = (prev[index] as ButtonGUIElement).setItem({
                ...(prev[index] as ButtonGUIElement).getItem(),
                id: value
              })
              return prev
            })
            setValues(prev => ({
              ...prev,
              gui: elements
            }))
          }}
          errorMessage={elements[index].getErrors().item && elements[index].getErrorMessages().item}
          color={elements[index].getErrors().item ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().item as boolean}
        />
        {/* Toggle */}
        <Switch
          defaultSelected={(elements[index] as ButtonGUIElement).getToggle() ?? false}
          color='success'
          onValueChange={(selected) => {
            setElements(prev => {
              prev[index] = (prev[index] as ButtonGUIElement).setToggle(selected)
              return prev
            })
            setValues(prev => ({
              ...prev,
              gui: elements
            }))
          }}
        >
          Toggle
        </Switch>
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
          onChange={async event => {
            if (!event.target.files || event.target.files.length === 0) {
              throw new Error('You must select an image to upload.')
            }
            setUpdating(true)
            const file = event.target.files[0]
            await updateImage({ img: file, path: 'texture' })
          }}
          errorMessage={elements[index].getErrors().texture && elements[index].getErrorMessages().texture}
          color={elements[index].getErrors().texture ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().texture as boolean}
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
          isInvalid={elements[index].getErrors().texture_hovered as boolean}
        />
        {/* TEXTURE TOGGLE */}
        <Input
          isClearable
          type='file'
          label='Texture Toggle'
          name={`elements.${index}.texture_toggle`}
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
            updateImage({ img: file, path: 'texture_toggle' })
          }}
          errorMessage={elements[index].getErrors().texture_toggle && elements[index].getErrorMessages().texture_toggle}
          color={elements[index].getErrors().texture_toggle ? 'danger' : 'default'}
          isInvalid={elements[index].getErrors().texture_toggle as boolean}
        />
        {/* Tooltips */}
        <div className='grid grid-cols-4 gap-3 col-span-5 box-border justify-center items-center'>
          {
            tooltips?.map((f, i) => (
              <div key={i} className='grid grid-cols-4 gap-3 box-border justify-center items-center'>
                <Input
                  className='col-span-3'
                  isClearable
                  type='text'
                  label='Button Tooltip'
                  name={`components.${index}.tooltips.${i}`}
                  variant='flat'
                  radius='md'
                  defaultValue={f.text}
                  onValueChange={(value) => {
                    setTooltips(prev => {
                      prev[i] = {
                        ...prev[i],
                        text: value
                      }
                      return prev
                    })
                    setElements(prev => {
                      prev[index] = (prev[index] as ButtonGUIElement).setTooltips(tooltips)
                      return prev
                    })
                    setValues(prev => ({
                      ...prev,
                      gui: elements
                    }))
                  }}
                  errorMessage={elements[index].getErrors().tooltips && elements[index].getErrorMessages().tooltips[i]}
                  color={elements[index].getErrors().tooltips && (elements[index].getErrors().tooltips as boolean[])[i] ? 'danger' : 'default'}
                  isInvalid={elements[index].getErrors().tooltips && (elements[index].getErrors().tooltips as boolean[])[i]}
                />
                <Button
                  className='h-full'
                  onClick={() => {
                    delete tooltips[i]
                    setTooltips(prev => {
                      const comp = prev.filter(f => f !== null || f !== undefined)
                      return comp
                    })
                    setElements(prev => {
                      prev[index] = (prev[index] as ButtonGUIElement).setTooltips(tooltips)
                      return prev
                    })
                    setValues(prev => ({
                      ...prev,
                      gui: elements
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
              if (tooltips.length === 0) {
                setTooltips([{ text: '' }])
                setElements(prev => {
                  prev[index] = (prev[index] as ButtonGUIElement).setTooltips(tooltips)
                  return prev
                })
                setValues(prev => ({
                  ...prev,
                  gui: elements
                }))
                return
              }
              setTooltips(prev => ([...prev, { text: '' }]))
              setElements(prev => {
                prev[index] = (prev[index] as ButtonGUIElement).setTooltips(tooltips)
                return prev
              })
              setValues(prev => ({
                ...prev,
                gui: elements
              }))
            }}
          >
            Add Tooltip
          </Button>
        </div>
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
