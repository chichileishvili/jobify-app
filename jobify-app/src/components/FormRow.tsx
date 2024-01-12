import React from 'react'

export interface FormRowProps {
  type: string
  name: string
  defaultValue?: string
  labelText?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormRow = ({ type, name, defaultValue, labelText, onChange }: FormRowProps) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {' '}
        {labelText || name}
      </label>
      <input
        onChange={onChange}
        type={type}
        defaultValue={defaultValue || ''}
        required
        name={name}
        className='form-input'
      />
    </div>
  )
}

export default FormRow
