import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'

import {
  Dispatch,
  SetStateAction
} from 'react'

import {
  ConfigGUIElement,
  GUIElement
} from 'types'

type ConfigModalProps = {
  setElements: Dispatch<SetStateAction<GUIElement[]>>
  isOpen: boolean
  onOpenChange: () => void
}

export function ConfigModal ({ isOpen, setElements, onOpenChange }: ConfigModalProps) {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Config Element
            </ModalHeader>
            <ModalBody>
              <p>
                If you continue only one config element will work.
              </p>
              <p>
                Are you sure your want to continue adding an other config element?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                variant='light'
                onClick={onClose}
              >
                Dont Add
              </Button>
              <Button
                color='warning'
                variant='light'
                onClick={() => {
                  setElements(prev => [...prev, new ConfigGUIElement()])
                  onClose()
                }}
              >
                Add config element
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
