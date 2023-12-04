const FormRow = ({ type, name, defaultValue, labelText, onChange }) => {
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
