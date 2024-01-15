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
  GUIElement, ProgressGUIElement
} from 'types'

type ProgressModalProps = {
  setElements: Dispatch<SetStateAction<GUIElement[]>>
  isOpen: boolean
  onOpenChange: () => void
}

export function ProgressModal ({ setElements, isOpen, onOpenChange }: ProgressModalProps) {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Progress Element
            </ModalHeader>
            <ModalBody>
              <p>
                If you continue only one progress element will work.
              </p>
              <p>
                Are you sure your want to continue adding an other progress element?
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
                  setElements(prev => [...prev, new ProgressGUIElement()])
                  onClose()
                }}
              >
                Add progress element
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
