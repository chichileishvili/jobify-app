const FormRow = ({ type, name, defaultValue, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {' '}
        {labelText || name}
      </label>
      <input
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
