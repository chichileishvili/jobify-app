import React from 'react'

export interface FormRowSelectProps {
  name: string
  list: string[]
  labelText?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const FormRowSelect = ({
  name,
  list,
  labelText,
  defaultValue = '',
  onChange,
}: FormRowSelectProps) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className='form-select'
        onChange={onChange}
        defaultValue={defaultValue}>
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}{' '}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormRowSelect
