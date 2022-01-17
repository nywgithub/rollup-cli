import React, { ReactElement, useState,useImperativeHandle } from 'react'

export interface FormValidateProps {
  children: ReactElement
  validate?: {
    min?: number
    max?: number
    minError?: string
    maxError?: string
  }
}

const FormValidate: React.FC<FormValidateProps> = (props, ref) => {
  const { children, validate } = props
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')
  const [show, setShow] = useState<boolean>(false)
  const [length, setLength] = useState<number>(0)
  // const formRef = useRef()
  useImperativeHandle(ref, () => ({
      validateFn
  }));
  const validateFn = () => {
    if(!validate) return true
    if (length < validate.min!) {
      setShow(true)
      setErrorMessage(validate.minError!)
      return false
    } else if(length > validate.max!){
      setShow(true)
      setErrorMessage(validate.maxError!)
      return false
    } else {
      setShow(false)
      return true
    }
  }
  return (
    <div>
      {React.cloneElement(children, {
        onBlur(e: any) {
          setLength(e.target.value.length)
          validateFn()
        },
      })}
      <div className="feedback-block">
        {show! && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  )
}
 
export default React.forwardRef(FormValidate)
