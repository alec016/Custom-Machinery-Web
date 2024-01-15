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
  Component,
  ExperienceComponent
} from 'types'

type ExperienceModalProps = {
  setComponents: Dispatch<SetStateAction<Component[]>>
  isOpen: boolean
  onOpenChange: () => void
}

export function ExperienceModal ({ isOpen, setComponents, onOpenChange }: ExperienceModalProps) {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Experience Component
            </ModalHeader>
            <ModalBody>
              <p>
                If you continue only one experience component will work.
              </p>
              <p>
                Are you sure your want to continue adding an other experience component?
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
                  setComponents(prev => [...prev, new ExperienceComponent()])
                  onClose()
                }}
              >
                Add experience component
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
