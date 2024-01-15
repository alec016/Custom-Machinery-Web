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
  GUIElement, StatusGUIElement
} from 'types'

type StatusModalProps = {
  setElements: Dispatch<SetStateAction<GUIElement[]>>
  isOpen: boolean
  onOpenChange: () => void
}

export function StatusModal ({ isOpen, setElements, onOpenChange }: StatusModalProps) {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Status Element
            </ModalHeader>
            <ModalBody>
              <p>
                If you continue only one status element will work.
              </p>
              <p>
                Are you sure your want to continue adding an other status element?
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
                  setElements(prev => [...prev, new StatusGUIElement()])
                  onClose()
                }}
              >
                Add status element
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
