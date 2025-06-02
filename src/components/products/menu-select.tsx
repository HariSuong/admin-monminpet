// src/components/MenuSelect.tsx

'use client'

import { MenuSelectType } from '@/components/posts/menu-select'
import { Box, Chip, MenuItem, Select } from '@mui/material'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

interface MenuSelectProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  menus: MenuSelectType[]
}

export default function MenuSelect<
  TFieldValues extends FieldValues = FieldValues
>({ control, name, menus }: MenuSelectProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Select
            {...field}
            multiple
            fullWidth
            value={field.value || []}
            onChange={event => {
              const selectedIds = event.target.value as number[]
              field.onChange(selectedIds)
            }}
            renderValue={selected => {
              if ((selected as number[]).length === 0) {
                return <span>Chọn các chuyên mục</span>
              }

              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as number[]).map(id => {
                    const menu = menus.find(m => m.id === id)
                    return <Chip key={id} label={menu?.name || id} />
                  })}
                </Box>
              )
            }}>
            {menus.map(menu => (
              <MenuItem key={menu.id} value={menu.id}>
                {menu.name}
              </MenuItem>
            ))}
          </Select>
        )
      }}
    />
  )
}
