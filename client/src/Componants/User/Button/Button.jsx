import React from 'react'

function Button(props) {
  return (
      <button
          type="button"
          className={props.width ? 'loading-btn form-btn mt-2 font-medium rounded w-full' :'loading-btn form-btn mt-2 font-medium rounded'}
          onClick={props.onClick}
      >
          <span className="txt">
              {props.children}
          </span>
      </button>
  )
}

export default Button