import React from 'react';

function renderField ({input, label, type, meta: { touched, error }}) {
    
    return (
  <div>
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} placeholder={label} type={type} />
      {touched &&
        error && <div className="error">{error}</div>}
    </div>
  </div>
)}


export default renderField;