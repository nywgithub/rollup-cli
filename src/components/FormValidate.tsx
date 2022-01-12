import React, { ReactElement } from 'react'

export interface FormValidateProps {
  errorMessage?: string
  show?: boolean
  children: ReactElement
}

const FormValidate: React.FC<FormValidateProps> = (props) => {
  const { errorMessage, show, children } = props
  return (
    <>
      {React.cloneElement(children, {})}
      <div className="feedback-block">
        {show! && <div className="error">{errorMessage}</div>}
      </div>
    </>
  )
}

FormValidate.defaultProps = {
  show: false,
}

export default FormValidate
