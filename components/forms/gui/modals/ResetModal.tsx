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
  GUIElement, ResetGUIElement
} from 'types'

type ResetModalProps = {
  setElements: Dispatch<SetStateAction<GUIElement[]>>
  isOpen: boolean
  onOpenChange: () => void
}

export function ResetModal ({ isOpen, setElements, onOpenChange }: ResetModalProps) {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Reset Element
            </ModalHeader>
            <ModalBody>
              <p>
                If you continue only one reset element will work.
              </p>
              <p>
                Are you sure your want to continue adding an other reset element?
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
                  setElements(prev => [...prev, new ResetGUIElement()])
                  onClose()
                }}
              >
                Add reset element
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
