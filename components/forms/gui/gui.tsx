'use client'
import {
  Button,
  useDisclosure
} from '@nextui-org/react'

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import {
  ButtonGUIElement,
  ChemicalGUIElement,
  ConfigGUIElement,
  DumpGUIElement,
  EnergyGUIElement,
  FluidGUIElement,
  FuelGUIElement,
  GUIElement,
  HeatGUIElement,
  Machine,
  PlayerInventoryGUIElement,
  ProgressGUIElement,
  ResetGUIElement,
  SizeGUIElement,
  SlotGUIElement,
  StatusGUIElement,
  TextGUIElement,
  TextureGUIElement,
  ExperienceGUIElement
} from 'types'

import {
  Preview,
  ProgressModal,
  ConfigModal,
  ResetModal,
  StatusModal,
  ButtonElement,
  ChemicalElement,
  ConfigElement,
  DumpElement,
  EnergyElement,
  FluidElement,
  FuelElement,
  HeatElement,
  PlayerInventoryElement,
  ProgressElement,
  ResetElement,
  SizeElement,
  SlotElement,
  StatusElement,
  TextElement,
  TextureElement,
  ExperienceElement
} from 'components'

import { Session } from '@supabase/auth-helpers-nextjs'

type GUIFormParams = {
  values: Machine,
  namespace?: string
  setValues: Dispatch<SetStateAction<Machine>>
  setIsOpenedGUI: Dispatch<SetStateAction<boolean>>,
  session: Session | null
}

export function GUIForm ({ values, setValues, setIsOpenedGUI, session, namespace }: GUIFormParams) {
  const [elements, setElements] = useState<GUIElement[]>(values.gui ?? [])
  const [isOpenedPreview, setIsOpenedPreview] = useState(false)

  const {
    isOpen: isProgressOpen,
    onOpen: onProgressOpen,
    onOpenChange: onProgressOpenChange
  } = useDisclosure()
  const {
    isOpen: isConfigOpen,
    onOpen: onConfigOpen,
    onOpenChange: onConfigOpenChange
  } = useDisclosure()
  const {
    isOpen: isResetOpen,
    onOpen: onResetOpen,
    onOpenChange: onResetOpenChange
  } = useDisclosure()
  const {
    isOpen: isStatusOpen,
    onOpen: onStatusOpen,
    onOpenChange: onStatusOpenChange
  } = useDisclosure()

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0 })
  }, [])

  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-default-100/95 w-full h-full max-h-full z-20 box-border flex items-center justify-center'>
      {
        !isOpenedPreview && (
          <div className='w-[95%] h-[95%] bg-black rounded-xl relative overflow-y-scroll p-8'>
            GUI MODAL
            {/* ADD BUTTONS */}
            <div className='grid grid-cols-4 w-[90%] p-3 gap-3'>
              <Button
                onClick={() => {
                  if (elements.length === 0) {
                    setElements(prev => [...prev, new ConfigGUIElement()])
                    return
                  }
                  if (elements.find(element => element instanceof ConfigGUIElement)) {
                    onConfigOpen()
                    return
                  }
                  setElements(prev => [...prev, new ConfigGUIElement()])
                }}
              >
                Add Config Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new ButtonGUIElement()])
                }}
              >
                Add Button Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new ChemicalGUIElement('GAS')])
                }}
              >
                Add Chemical Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new DumpGUIElement()])
                }}
              >
                Add Dump Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new EnergyGUIElement()])
                }}
              >
                Add Energy Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new FluidGUIElement()])
                }}
              >
                Add Fluid Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new FuelGUIElement()])
                }}
              >
                Add Fuel Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new HeatGUIElement()])
                }}
              >
                Add Heat Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new PlayerInventoryGUIElement()])
                }}
              >
                Add Player Inventory Element
              </Button>
              <Button
                onClick={() => {
                  if (elements.length === 0) {
                    setElements(prev => [...prev, new ProgressGUIElement()])
                    return
                  }
                  if (elements.find(element => element instanceof ProgressGUIElement)) {
                    onProgressOpen()
                    return
                  }
                  setElements(prev => [...prev, new ProgressGUIElement()])
                }}
              >
                Add Progress Element
              </Button>
              <Button
                onClick={() => {
                  if (elements.length === 0) {
                    setElements(prev => [...prev, new ResetGUIElement()])
                    return
                  }
                  if (elements.find(element => element instanceof ResetGUIElement)) {
                    onResetOpen()
                    return
                  }

                  setElements(prev => [...prev, new ResetGUIElement()])
                }}
              >
                Add Reset Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new SizeGUIElement()])
                }}
              >
                Add Size Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new SlotGUIElement()])
                }}
              >
                Add Slot Element
              </Button>
              <Button
                onClick={() => {
                  if (elements.length === 0) {
                    setElements(prev => [...prev, new StatusGUIElement()])
                    return
                  }
                  if (elements.find(element => element instanceof StatusGUIElement)) {
                    onStatusOpen()
                    return
                  }
                  setElements(prev => [...prev, new StatusGUIElement()])
                }}
              >
                Add Status Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new TextGUIElement()])
                }}
              >
                Add Text Element
              </Button>
              <Button
                onClick={() => {
                  setElements(prev => [...prev, new TextureGUIElement()])
                }}
              >
                Add Texture Element
              </Button>
              <Button
                onClick={() => {
                  if (elements.length === 0) {
                    setElements(prev => [...prev, new ExperienceGUIElement()])
                    return
                  }
                  setElements(prev => [...prev, new ExperienceGUIElement()])
                }}
              >
                Add Experience Element
              </Button>
            </div>
            {/* ELEMENTS RENDERED */}
            <div>
              {
                elements.length > 0 && elements.map((element, index) => {
                  switch (element.getElementType().getString()) {
                    case 'custommachinery:config':
                      return <ConfigElement elements={elements} key={index} index={index} setValues={setValues} setElements={setElements} session={session} namespace={namespace} />
                    case 'custommachinery:button':
                      return <ButtonElement elements={elements} key={index} index={index} setValues={setValues} setElements={setElements} session={session} namespace={namespace} />
                    case 'custommachinery:gas':
                    case 'custommachinery:infusion':
                    case 'custommachinery:pigment':
                    case 'custommachinery:slurry':
                      return <ChemicalElement elements={elements} key={index} index={index} setValues={setValues} setElements={setElements} session={session} namespace={namespace} />
                    case 'custommachinery:dump':
                      return <DumpElement />
                    case 'custommachinery:energy':
                      return <EnergyElement />
                    case 'custommachinery:fluid':
                      return <FluidElement />
                    case 'custommachinery:fuel':
                      return <FuelElement />
                    case 'custommachinery:heat':
                      return <HeatElement />
                    case 'custommachinery:player_inventory':
                      return <PlayerInventoryElement />
                    case 'custommachinery:progress':
                      return <ProgressElement />
                    case 'custommachinery:reset':
                      return <ResetElement />
                    case 'custommachinery:size':
                      return <SizeElement />
                    case 'custommachinery:slot':
                      return <SlotElement />
                    case 'custommachinery:status':
                      return <StatusElement />
                    case 'custommachinery:text':
                      return <TextElement />
                    case 'custommachinery:texture':
                      return <TextureElement />
                    case 'custommachinery:experience':
                      return <ExperienceElement elements={elements} key={index} index={index} setValues={setValues} setElements={setElements} session={session} namespace={namespace} />
                    default:
                      return <></>
                  }
                })
              }
            </div>
            {/* SAVE AND PREVIEW BUTTONS */}
            <div className='absolute right-10 top-7 flex flex-col-reverse gap-3'>
              <Button
                onClick={() => {
                  setValues(prev => ({
                    ...prev,
                    gui: elements
                  }))
                  setIsOpenedPreview(true)
                }}
              >
                Preview
              </Button>
              <Button
                onClick={() => {
                  setValues(prev => ({
                    ...prev,
                    gui: elements
                  }))
                  setIsOpenedGUI(false)
                }}
              >
                Save and Close
              </Button>
            </div>
          </div>
        )
      }
      {isOpenedPreview && <Preview setIsOpenedPreview={setIsOpenedPreview} values={values} session={session} />}
      <ProgressModal isOpen={isProgressOpen} onOpenChange={onProgressOpenChange} setElements={setElements} />
      <ConfigModal isOpen={isConfigOpen} onOpenChange={onConfigOpenChange} setElements={setElements} />
      <ResetModal isOpen={isResetOpen} onOpenChange={onResetOpenChange} setElements={setElements} />
      <StatusModal isOpen={isStatusOpen} onOpenChange={onStatusOpenChange} setElements={setElements} />
    </div>
  )
}
