import React from 'react'

function Alert(props) {

  const capitilize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (

    props.alert &&
    <div className={`alert alert-${props.alert.type} alert-dismissible fade show mb-0 center`} role="alert">
      <strong>{capitilize(props.alert.type)}</strong>: {props.alert.msg}
    </div>
  )
}
export default Alert