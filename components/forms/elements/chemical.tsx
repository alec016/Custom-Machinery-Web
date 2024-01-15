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
  ChemicalGUIElement,
  GUIElement,
  Machine
} from 'types'

type ChemicalElementParams = {
  index: number
  elements: GUIElement[]
  setElements: Dispatch<SetStateAction<GUIElement[]>>
  setValues: Dispatch<SetStateAction<Machine>>,
  namespace?: string,
  session: Session | null
}

export function ChemicalElement ({
  index,
  elements,
  setElements,
  setValues,
  session,
  namespace
}: ChemicalElementParams) {
  return (
    <>Chemical Element</>
  )
}
