import React from 'react'
import { Platform } from 'react-native'

// 🔥 DO NOT import ui-lib at top level
let NativePicker: any = null

if (Platform.OS !== 'web') {
  NativePicker = require('react-native-ui-lib/src/components/picker').default
}

const SelectField = ({ placeholder, value, onChange }: SelectFieldProps) => {
  // 🌐 WEB — NO ui-lib
  if (Platform.OS === 'web') {
    return (
      <select
        value={value ?? ''}
        onChange={(e) => onChange?.(Number(e.target.value))}
        style={{
          padding: 12,
          borderRadius: 8,
          border: '1px solid #ccc',
          width: '100%',
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        <option value={1}>Selected Value</option>
        <option value={2}>Another Value</option>
      </select>
    )
  }

  // 📱 NATIVE — ui-lib Picker ONLY
  return (
    <NativePicker
      preset="outline"
      placeholder={placeholder}
      value={value}
      onChange={(val: any) => onChange?.(val as number)}
      items={[
        { label: 'Selected Value', value: 1 },
        { label: 'Another Value', value: 2 },
      ]}
    />
  )
}

export default SelectField
