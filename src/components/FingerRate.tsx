import React, { useState } from 'react'

export interface FingerRateProps {
  character?:
    | React.ReactNode
    | ((props: FingerRateProps) => React.ReactNode)
    | string
  className?: string
  style?: React.CSSProperties
  defaultValue?: number
  count?: number
  disabled?: boolean
  onClick?: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    value?: boolean,
    key?: number,
  ) => void
}

const FingerRate: React.FC<FingerRateProps> = (props) => {
  const { character, className, count, disabled, onClick, defaultValue } = props
  const [value, setValue] = useState(false)
  const [currentKey, setCurrentKey] = useState(defaultValue)
  const characters: Array<React.ReactNode> = []
  const calcClassName = function (key): string {
    if (key === currentKey) {
      return 'selected'
    } else {
      return ''
    }
  }
  const clickEvent = (e, key) => {
    e.preventDefault()
    setValue(!value)
    setCurrentKey(key)
    onClick && onClick(e, value, key)
  }
  const characterItem = (key) => {
    return (
      <span
        key={key}
        onClick={(e) => {
          disabled ? null : clickEvent(e, key)
        }}
        className={calcClassName(key)}
      >
        {character}
      </span>
    )
  }
  for (let index = 0; index < count!; index += 1) {
    characters.push(characterItem(index))
  }
  return <div className={`product-finger-lv, ${className}`}>{characters}</div>
}
FingerRate.defaultProps = {
  count: 2,
  disabled: false,
  character: <i className="ob-icon icon-thumb-up"></i>,
  className: 'fingerRate',
}
export default FingerRate
