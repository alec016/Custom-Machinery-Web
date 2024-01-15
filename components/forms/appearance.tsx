/* eslint-disable camelcase */
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Switch
} from '@nextui-org/react'
import { Dispatch, SetStateAction } from 'react'
import { Light, Machine, MiningLevel, ToolType } from 'types'

type AppearanceFormParams = {
  setValues: Dispatch<SetStateAction<Machine>>,
  validationState: any,
  values: Machine
}

export function AppearanceForm ({ setValues, validationState, values }: AppearanceFormParams) {
  return (
    <div className='p-3 grid grid-cols-8 gap-3 justify-center items-center'>
      {/* MACHINE APPEARANCE BLOCK */}
      <Input
        className='col-span-2'
        isRequired
        isClearable
        type='text'
        label='Block'
        name='appearance.block'
        variant='flat'
        radius='md'
        description='The block appearance.'
        onValueChange={(value) => {
          setValues(prev => ({ ...prev, appearance: { ...prev.appearance, block: value } }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.block
            ? validationState.appearance.block
            : undefined
        }
        color={validationState.appearance && validationState.appearance.block ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.block ? 'invalid' : 'valid'}
      />
      {/* MACHINE LIGHT */}
      <Input
        className='col-span-2'
        isClearable
        type='number'
        min='0'
        max='15'
        label='Light'
        name='appearance.light'
        variant='flat'
        radius='md'
        description='The block light emit.'
        onValueChange={(value) => {
          setValues(prev => ({ ...prev, appearance: { ...prev.appearance, light: parseInt(value) as Light } }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.light
            ? validationState.appearance.light
            : undefined
        }
        color={validationState.appearance && validationState.appearance.light ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.light ? 'invalid' : 'valid'}
      />
      {/* MACHINE BLOCK ITEM */}
      <Input
        className='col-span-2'
        isClearable
        type='text'
        label='Item'
        name='appearance.item'
        variant='flat'
        radius='md'
        description='The block item.'
        onValueChange={(value) => {
          setValues(prev => ({ ...prev, appearance: { ...prev.appearance, item: value } }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.item
            ? validationState.appearance.item
            : undefined
        }
        color={validationState.appearance && validationState.appearance.item ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.item ? 'invalid' : 'valid'}
      />
      {/* AMBIENT SOUND */}
      <Input
        className='col-span-2'
        isClearable
        type='text'
        label='Ambient Sound'
        name='appearance.ambient_sound'
        variant='flat'
        radius='md'
        description='The block ambient sound.'
        onValueChange={(value) => {
          setValues(prev => ({ ...prev, appearance: { ...prev.appearance, ambient_sound: value } }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.ambient_sound
            ? validationState.appearance.ambient_sound
            : undefined
        }
        color={validationState.appearance && validationState.appearance.ambient_sound ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.ambient_sound ? 'invalid' : 'valid'}
      />
      <div className='grid grid-cols-4 gap-3 col-span-8'>
        {/* APPEARANCE IDLE */}
        <div className='flex flex-col gap-3'>
          {/* APPEARANCE IDLE BLOCK */}
          <Input
            isClearable
            type='text'
            label='Idle Block'
            name='appearance.idle.block'
            variant='flat'
            radius='md'
            description='The idle block appearance.'
            onValueChange={(value) => {
              if ((!value || value.trim() === '') && values.appearance.idle && values.appearance.idle.block) {
                if (values.appearance.idle?.light) return
                delete values.appearance.idle
                delete validationState.appearance?.idle
                return
              }
              setValues(prev => ({
                ...prev,
                appearance: {
                  ...prev.appearance,
                  idle: {
                    ...prev.appearance.idle,
                    block: value
                  }
                }
              }))
            }}
            errorMessage={
              validationState.appearance && validationState.appearance.idle && validationState.appearance.idle.block
                ? validationState.appearance.idle.block
                : undefined
            }
            color={validationState.appearance && validationState.appearance.idle && validationState.appearance.idle.block ? 'danger' : 'default'}
            validationState={validationState.appearance && validationState.appearance.idle && validationState.appearance.idle.block ? 'invalid' : 'valid'}
          />
          {/* APPEARANCE IDLE LIGHT */}
          <Input
            isClearable
            type='number'
            min='0'
            max='15'
            label='Idle Light Block'
            name='appearance.idle.light'
            variant='flat'
            radius='md'
            description='The idle light emit.'
            onValueChange={(value) => {
              if ((!value || value.trim() === '') && values.appearance.idle && values.appearance.idle.light) {
                delete values.appearance.idle?.light
                delete validationState.appearance?.idle?.light
                if (values.appearance.idle.block && values.appearance.idle.block.trim() === '' && validationState.appearance?.idle?.block) {
                  delete values.appearance.idle
                  delete validationState.appearance.idle
                }
                return
              }
              setValues(prev => ({
                ...prev,
                appearance: {
                  ...prev.appearance,
                  idle: {
                    block: prev.appearance.idle?.block ?? '',
                    light: parseInt(value) as Light
                  }
                }
              }))
            }}
            errorMessage={
              validationState.appearance && validationState.appearance.idle && validationState.appearance.idle.light
                ? validationState.appearance.idle.light
                : undefined
            }
            color={validationState.appearance && validationState.appearance.idle && validationState.appearance.idle.light ? 'danger' : 'default'}
            validationState={validationState.appearance && validationState.appearance.idle && validationState.appearance.idle.light ? 'invalid' : 'valid'}
          />
        </div>
        {/* APPEARANCE RUNNING */}
        <div className='flex flex-col gap-3'>
          {/* APPEARANCE RUNNING BLOCK */}
          <Input
            isClearable
            type='text'
            label='Running Block'
            name='appearance.running.block'
            variant='flat'
            radius='md'
            description='The running block appearance.'
            onValueChange={(value) => {
              if ((!value || value.trim() === '') && values.appearance.running && values.appearance.running.block) {
                if (values.appearance.running?.light) return
                delete values.appearance.running
                delete validationState.appearance?.running
                return
              }
              setValues(prev => ({
                ...prev,
                appearance: {
                  ...prev.appearance,
                  running: {
                    ...prev.appearance.running,
                    block: value
                  }
                }
              }))
            }}
            errorMessage={
              validationState.appearance && validationState.appearance.running && validationState.appearance.running.block
                ? validationState.appearance.running.block
                : undefined
            }
            color={validationState.appearance && validationState.appearance.running && validationState.appearance.running.block ? 'danger' : 'default'}
            validationState={validationState.appearance && validationState.appearance.running && validationState.appearance.running.block ? 'invalid' : 'valid'}
          />
          {/* APPEARANCE RUNNING LIGHT */}
          <Input
            isClearable
            type='number'
            min='0'
            max='15'
            label='Running Light Block'
            name='appearance.running.light'
            variant='flat'
            radius='md'
            description='The running light emit.'
            onValueChange={(value) => {
              if ((!value || value.trim() === '') && values.appearance.running && values.appearance.running.light) {
                delete values.appearance.running?.light
                delete validationState.appearance?.running?.light
                if (values.appearance.running.block && values.appearance.running.block.trim() === '' && validationState.appearance?.running?.block) {
                  delete values.appearance.running
                  delete validationState.appearance.running
                }
                return
              }
              setValues(prev => ({
                ...prev,
                appearance: {
                  ...prev.appearance,
                  running: {
                    block: prev.appearance.running?.block ?? '',
                    light: parseInt(value) as Light
                  }
                }
              }))
            }}
            errorMessage={
              validationState.appearance && validationState.appearance.running && validationState.appearance.running.light
                ? validationState.appearance.running.light
                : undefined
            }
            color={validationState.appearance && validationState.appearance.running && validationState.appearance.running.light ? 'danger' : 'default'}
            validationState={validationState.appearance && validationState.appearance.running && validationState.appearance.running.light ? 'invalid' : 'valid'}
          />
        </div>
        {/* APPEARANCE ERRORED */}
        <div className='flex flex-col gap-3'>
          {/* APPEARANCE ERRORED BLOCK */}
          <Input
            isClearable
            type='text'
            label='Errored Block'
            name='appearance.errored.block'
            variant='flat'
            radius='md'
            description='The errored block appearance.'
            onValueChange={(value) => {
              if ((!value || value.trim() === '') && values.appearance.errored && values.appearance.errored.block) {
                if (values.appearance.errored?.light) return
                delete values.appearance.errored
                delete validationState.appearance?.errored
                return
              }
              setValues(prev => ({
                ...prev,
                appearance: {
                  ...prev.appearance,
                  errored: {
                    ...prev.appearance.errored,
                    block: value
                  }
                }
              }))
            }}
            errorMessage={
              validationState.appearance && validationState.appearance.errored && validationState.appearance.errored.block
                ? validationState.appearance.errored.block
                : undefined
            }
            color={validationState.appearance && validationState.appearance.errored && validationState.appearance.errored.block ? 'danger' : 'default'}
            validationState={validationState.appearance && validationState.appearance.errored && validationState.appearance.errored.block ? 'invalid' : 'valid'}
          />
          {/* APPEARANCE ERRORED LIGHT */}
          <Input
            isClearable
            type='number'
            min='0'
            max='15'
            label='Errored Light Block'
            name='appearance.errored.light'
            variant='flat'
            radius='md'
            description='The errored light emit.'
            onValueChange={(value) => {
              if ((!value || value.trim() === '') && values.appearance.errored && values.appearance.errored.light) {
                delete values.appearance.errored?.light
                delete validationState.appearance?.errored?.light
                if (values.appearance.errored.block && values.appearance.errored.block.trim() === '' && validationState.appearance?.errored?.block) {
                  delete values.appearance.errored
                  delete validationState.appearance.errored
                }
                return
              }
              setValues(prev => ({
                ...prev,
                appearance: {
                  ...prev.appearance,
                  errored: {
                    block: prev.appearance.errored?.block ?? '',
                    light: parseInt(value) as Light
                  }
                }
              }))
            }}
            errorMessage={
              validationState.appearance && validationState.appearance.errored && validationState.appearance.errored.light
                ? validationState.appearance.errored.light
                : undefined
            }
            color={validationState.appearance && validationState.appearance.errored && validationState.appearance.errored.light ? 'danger' : 'default'}
            validationState={validationState.appearance && validationState.appearance.errored && validationState.appearance.errored.light ? 'invalid' : 'valid'}
          />
        </div>
        {/* APPEARANCE PAUSED */}
        <div className='flex flex-col gap-3'>
          {/* APPEARANCE PAUSED BLOCK */}
          <Input
            isClearable
            type='text'
            label='Paused Block'
            name='appearance.paused.block'
            variant='flat'
            radius='md'
            description='The paused block appearance.'
            onValueChange={(value) => {
              if ((!value || value.trim() === '') && values.appearance.paused && values.appearance.paused.block) {
                if (values.appearance.paused?.light) return
                delete values.appearance.paused
                delete validationState.appearance?.paused
                return
              }
              setValues(prev => ({
                ...prev,
                appearance: {
                  ...prev.appearance,
                  paused: {
                    ...prev.appearance.paused,
                    block: value
                  }
                }
              }))
            }}
            errorMessage={
              validationState.appearance && validationState.appearance.paused && validationState.appearance.paused.block
                ? validationState.appearance.paused.block
                : undefined
            }
            color={validationState.appearance && validationState.appearance.paused && validationState.appearance.paused.block ? 'danger' : 'default'}
            validationState={validationState.appearance && validationState.appearance.paused && validationState.appearance.paused.block ? 'invalid' : 'valid'}
          />
          {/* APPEARANCE PAUSED LIGHT */}
          <Input
            isClearable
            type='number'
            min='0'
            max='15'
            label='Paused Light Block'
            name='appearance.paused.light'
            variant='flat'
            radius='md'
            description='The paused light emit.'
            onValueChange={(value) => {
              if ((!value || value.trim() === '') && values.appearance.paused && values.appearance.paused.light) {
                delete values.appearance.paused?.light
                delete validationState.appearance?.paused?.light
                if (values.appearance.paused.block && values.appearance.paused.block.trim() === '' && validationState.appearance?.paused?.block) {
                  delete values.appearance.paused
                  delete validationState.appearance.paused
                }
                return
              }
              setValues(prev => ({
                ...prev,
                appearance: {
                  ...prev.appearance,
                  paused: {
                    block: prev.appearance.paused?.block ?? '',
                    light: parseInt(value) as Light
                  }
                }
              }))
            }}
            errorMessage={
              validationState.appearance && validationState.appearance.paused && validationState.appearance.paused.light
                ? validationState.appearance.paused.light
                : undefined
            }
            color={validationState.appearance && validationState.appearance.paused && validationState.appearance.paused.light ? 'danger' : 'default'}
            validationState={validationState.appearance && validationState.appearance.paused && validationState.appearance.paused.light ? 'invalid' : 'valid'}
          />
        </div>
      </div>
      {/* HARDNESS */}
      <Input
        className='col-span-2'
        isClearable
        type='number'
        min='1'
        label='Hardness'
        name='appearance.hardness'
        variant='flat'
        radius='md'
        description='The block hardness.'
        onValueChange={(value) => {
          setValues(prev => ({ ...prev, appearance: { ...prev.appearance, hardness: parseFloat(value) } }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.hardness
            ? validationState.appearance.hardness
            : undefined
        }
        color={validationState.appearance && validationState.appearance.hardness ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.hardness ? 'invalid' : 'valid'}
      />
      {/* REQUIRES TOOL */}
      <Switch
        defaultSelected={false}
        isSelected={values.appearance.requires_tool ?? false}
        color='success'
        onValueChange={(selected) => {
          setValues(prev => ({
            ...prev,
            appearance: {
              ...prev.appearance,
              requires_tool: selected
            }
          }))
        }}
      >
        Requires Tool
      </Switch>
      {/* MACHINE SHAPE */}
      <div className='col-span-5 grid grid-cols-6 gap-3'>
        {/* MIN X */}
        <Input
          isClearable
          type='number'
          min='0'
          max='1'
          label='MinX Shape'
          step={0.001}
          name='appearance.shape[0]'
          variant='flat'
          radius='md'
          description='MinX shape value.'
          onValueChange={(value) => {
            const shape: [number, number, number, number, number, number] =
              [0.0, 0.0, 0.0, 1.0, 1.0, 1.0]
            shape[0] = parseFloat(value)
            shape[1] = values.appearance.shape?.[1] ?? 0.0
            shape[2] = values.appearance.shape?.[2] ?? 0.0
            shape[3] = values.appearance.shape?.[3] ?? 1.0
            shape[4] = values.appearance.shape?.[4] ?? 1.0
            shape[5] = values.appearance.shape?.[5] ?? 1.0
            setValues(prev => ({
              ...prev,
              appearance: {
                ...prev.appearance,
                shape
              }
            }))
          }}
          errorMessage={
            validationState.appearance && validationState.appearance.shape
              ? validationState.appearance.shape[0]
              : undefined
          }
          color={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[0] ? 'danger' : 'default'}
          validationState={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[0] ? 'invalid' : 'valid'}
        />
        {/* MIN Y */}
        <Input
          isClearable
          type='number'
          min='0'
          max='1'
          label='MinY Shape'
          step={0.001}
          name='appearance.shape[1]'
          variant='flat'
          radius='md'
          description='MinY shape value.'
          onValueChange={(value) => {
            const shape: [number, number, number, number, number, number] =
              [0.0, 0.0, 0.0, 1.0, 1.0, 1.0]
            shape[0] = values.appearance.shape?.[0] ?? 0.0
            shape[1] = parseFloat(value)
            shape[2] = values.appearance.shape?.[2] ?? 0.0
            shape[3] = values.appearance.shape?.[3] ?? 1.0
            shape[4] = values.appearance.shape?.[4] ?? 1.0
            shape[5] = values.appearance.shape?.[5] ?? 1.0
            setValues(prev => ({
              ...prev,
              appearance: {
                ...prev.appearance,
                shape
              }
            }))
          }}
          errorMessage={
            validationState.appearance && validationState.appearance.shape
              ? validationState.appearance.shape[1]
              : undefined
          }
          color={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[1] ? 'danger' : 'default'}
          validationState={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[1] ? 'invalid' : 'valid'}
        />
        {/* MIN Z */}
        <Input
          isClearable
          type='number'
          min='0'
          max='1'
          label='MinZ Shape'
          step={0.001}
          name='appearance.shape[2]'
          variant='flat'
          radius='md'
          description='MinZ shape value.'
          onValueChange={(value) => {
            const shape: [number, number, number, number, number, number] =
              [0.0, 0.0, 0.0, 1.0, 1.0, 1.0]
            shape[0] = values.appearance.shape?.[0] ?? 0.0
            shape[1] = values.appearance.shape?.[1] ?? 0.0
            shape[2] = parseFloat(value)
            shape[3] = values.appearance.shape?.[3] ?? 1.0
            shape[4] = values.appearance.shape?.[4] ?? 1.0
            shape[5] = values.appearance.shape?.[5] ?? 1.0
            setValues(prev => ({
              ...prev,
              appearance: {
                ...prev.appearance,
                shape
              }
            }))
          }}
          errorMessage={
            validationState.appearance && validationState.appearance.shape
              ? validationState.appearance.shape[2]
              : undefined
          }
          color={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[2] ? 'danger' : 'default'}
          validationState={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[2] ? 'invalid' : 'valid'}
        />
        {/* MAX X */}
        <Input
          isClearable
          type='number'
          min='0'
          max='1'
          label='MaxX Shape'
          step={0.001}
          name='appearance.shape[3]'
          variant='flat'
          radius='md'
          description='MaxX shape value.'
          onValueChange={(value) => {
            const shape: [number, number, number, number, number, number] =
              [0.0, 0.0, 0.0, 1.0, 1.0, 1.0]
            shape[0] = values.appearance.shape?.[0] ?? 0.0
            shape[1] = values.appearance.shape?.[1] ?? 0.0
            shape[2] = values.appearance.shape?.[2] ?? 0.0
            shape[3] = parseFloat(value)
            shape[4] = values.appearance.shape?.[4] ?? 1.0
            shape[5] = values.appearance.shape?.[5] ?? 1.0
            setValues(prev => ({
              ...prev,
              appearance: {
                ...prev.appearance,
                shape
              }
            }))
          }}
          errorMessage={
            validationState.appearance && validationState.appearance.shape
              ? validationState.appearance.shape[3]
              : undefined
          }
          color={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[3] ? 'danger' : 'default'}
          validationState={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[3] ? 'invalid' : 'valid'}
        />
        {/* MAX Y */}
        <Input
          isClearable
          type='number'
          min='0'
          max='1'
          label='MaxY Shape'
          step={0.001}
          name='appearance.shape[4]'
          variant='flat'
          radius='md'
          description='MaxY shape value.'
          onValueChange={(value) => {
            const shape: [number, number, number, number, number, number] =
              [0.0, 0.0, 0.0, 1.0, 1.0, 1.0]
            shape[0] = values.appearance.shape?.[0] ?? 0.0
            shape[1] = values.appearance.shape?.[1] ?? 0.0
            shape[2] = values.appearance.shape?.[2] ?? 0.0
            shape[3] = values.appearance.shape?.[3] ?? 1.0
            shape[4] = parseFloat(value)
            shape[5] = values.appearance.shape?.[5] ?? 1.0
            setValues(prev => ({
              ...prev,
              appearance: {
                ...prev.appearance,
                shape
              }
            }))
          }}
          errorMessage={
            validationState.appearance && validationState.appearance.shape
              ? validationState.appearance.shape[4]
              : undefined
          }
          color={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[4] ? 'danger' : 'default'}
          validationState={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[4] ? 'invalid' : 'valid'}
        />
        {/* MAX Z */}
        <Input
          isClearable
          type='number'
          min='0'
          max='1'
          label='MaxZ Shape'
          step={0.001}
          name='appearance.shape[5]'
          variant='flat'
          radius='md'
          description='MaxZ shape value.'
          onValueChange={(value) => {
            const shape: [number, number, number, number, number, number] =
              [0.0, 0.0, 0.0, 1.0, 1.0, 1.0]
            shape[0] = values.appearance.shape?.[0] ?? 0.0
            shape[1] = values.appearance.shape?.[1] ?? 0.0
            shape[2] = values.appearance.shape?.[2] ?? 0.0
            shape[3] = values.appearance.shape?.[3] ?? 1.0
            shape[4] = values.appearance.shape?.[4] ?? 1.0
            shape[5] = parseFloat(value)
            setValues(prev => ({
              ...prev,
              appearance: {
                ...prev.appearance,
                shape
              }
            }))
          }}
          errorMessage={
            validationState.appearance && validationState.appearance.shape
              ? validationState.appearance.shape[5]
              : undefined
          }
          color={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[5] ? 'danger' : 'default'}
          validationState={validationState.appearance && validationState.appearance.shape && validationState.appearance.shape[5] ? 'invalid' : 'valid'}
        />
      </div>
      {/* RESISTANCE */}
      <Input
        className='col-span-2'
        isClearable
        type='number'
        min='1'
        label='Resistance'
        name='appearance.resistance'
        variant='flat'
        radius='md'
        description='The block resistance.'
        onValueChange={(value) => {
          setValues(prev => ({ ...prev, appearance: { ...prev.appearance, resistance: parseFloat(value) } }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.resistance
            ? validationState.appearance.resistance
            : undefined
        }
        color={validationState.appearance && validationState.appearance.resistance ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.resistance ? 'invalid' : 'valid'}
      />
      {/* VOLUME */}
      <Input
        className='col-span-2'
        isClearable
        type='number'
        min='0'
        max='1'
        step='0.1'
        label='Interaction sound volume'
        name='appearance.interaction_sound.volume'
        variant='flat'
        radius='md'
        description='The block interaction sound volume.'
        onValueChange={(value) => {
          setValues(prev => ({
            ...prev,
            appearance: {
              ...prev.appearance,
              interaction_sound: {
                ...prev.appearance.interaction_sound,
                volume: parseFloat(value)
              }
            }
          }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.volume
            ? validationState.appearance.interaction_sound.volume
            : undefined
        }
        color={validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.volume ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.volume ? 'invalid' : 'valid'}
      />
      {/* TOOL TYPE / TYPES */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            className='col-span-3 h-full'
            variant='flat'
          >
            Tool Type/s: {
              values.appearance.tool_type && values.appearance.tool_type instanceof Array && values.appearance.tool_type?.join(', ')
            }
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Single selection actions'
          variant='flat'
          closeOnSelect={false}
          selectionMode='multiple'
          selectedKeys={values.appearance.tool_type}
          onSelectionChange={(toolTypes) => {
            const tool_type = toolTypes instanceof Set
              ? Array.from(toolTypes) as ToolType[]
              : undefined
            setValues(prev => ({
              ...prev,
              appearance: {
                ...prev.appearance,
                tool_type
              }
            }))
          }}
        >
          <DropdownItem key={ToolType.PICKAXE}>PICKAXE</DropdownItem>
          <DropdownItem key={ToolType.SHOVEL}>SHOVEL</DropdownItem>
          <DropdownItem key={ToolType.AXE}>AXE</DropdownItem>
          <DropdownItem key={ToolType.HOE}>HOE</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* MINING LEVEL */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            className='h-full'
            variant='flat'
          >
            Mining Level: {
              values.appearance.mining_level
            }
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Single selection actions'
          variant='flat'
          closeOnSelect
          selectionMode='single'
          selectedKeys={values.appearance.mining_level}
          onSelectionChange={(miningLevel) => {
            const mining_level = miningLevel instanceof Set
              ? Array.from(miningLevel) as MiningLevel[]
              : undefined
            setValues(prev => ({
              ...prev,
              appearance: {
                ...prev.appearance,
                mining_level: mining_level![0]
              }
            }))
          }}
        >
          <DropdownItem key={MiningLevel.STONE}>STONE</DropdownItem>
          <DropdownItem key={MiningLevel.IRON}>IRON</DropdownItem>
          <DropdownItem key={MiningLevel.DIAMOND}>DIAMOND</DropdownItem>
          <DropdownItem key={MiningLevel.NETHERITE}>NETHERITE</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* PITCH */}
      <Input
        className='col-span-2'
        isClearable
        type='number'
        min='0'
        max='1'
        step='0.1'
        label='Interaction sound pitch'
        name='appearance.interaction_sound.pitch'
        variant='flat'
        radius='md'
        description='The block interaction sound pitch.'
        onValueChange={(value) => {
          setValues(prev => ({
            ...prev,
            appearance: {
              ...prev.appearance,
              interaction_sound: {
                ...prev.appearance.interaction_sound,
                pitch: parseFloat(value)
              }
            }
          }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.pitch
            ? validationState.appearance.interaction_sound.pitch
            : undefined
        }
        color={validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.pitch ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.pitch ? 'invalid' : 'valid'}
      />
      {/* PLACE */}
      <Input
        className='col-span-2'
        isClearable
        type='text'
        label='Place sound'
        name='appearance.interaction_sound.place'
        variant='flat'
        radius='md'
        description='The block place sound.'
        onValueChange={(value) => {
          setValues(prev => ({
            ...prev,
            appearance: {
              ...prev.appearance,
              interaction_sound: {
                ...prev.appearance.interaction_sound,
                place: value
              }
            }
          }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.place
            ? validationState.appearance.interaction_sound.place
            : undefined
        }
        color={validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.place ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.place ? 'invalid' : 'valid'}
      />
      {/* BREAK */}
      <Input
        className='col-span-2'
        isClearable
        type='text'
        label='Break sound'
        name='appearance.interaction_sound.break'
        variant='flat'
        radius='md'
        description='The block break sound.'
        onValueChange={(value) => {
          setValues(prev => ({
            ...prev,
            appearance: {
              ...prev.appearance,
              interaction_sound: {
                ...prev.appearance.interaction_sound,
                break: value
              }
            }
          }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.break
            ? validationState.appearance.interaction_sound.break
            : undefined
        }
        color={validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.break ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.break ? 'invalid' : 'valid'}
      />
      {/* STEP */}
      <Input
        className='col-span-2'
        isClearable
        type='text'
        label='Step sound'
        name='appearance.interaction_sound.step'
        variant='flat'
        radius='md'
        description='The block step sound.'
        onValueChange={(value) => {
          setValues(prev => ({
            ...prev,
            appearance: {
              ...prev.appearance,
              interaction_sound: {
                ...prev.appearance.interaction_sound,
                step: value
              }
            }
          }))
        }}
        errorMessage={
          validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.step
            ? validationState.appearance.interaction_sound.step
            : undefined
        }
        color={validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.step ? 'danger' : 'default'}
        validationState={validationState.appearance && validationState.appearance.interaction_sound && validationState.appearance.interaction_sound.step ? 'invalid' : 'valid'}
      />
    </div>
  )
}
