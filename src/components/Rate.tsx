import React from 'react'
import classNames from 'classnames'
import RcRate from 'rc-rate'
export interface RateProps {
  character?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  count?: number
  value?: number
  defaultValue?: number
  allowHalf?: boolean
  disabled?: boolean
  tooltips?: Array<string>
  onChange?: (value: number) => void
  onHoverChange?: (value: number) => void
}
const Rate: React.FC<RateProps> = (props) => {

  return (
    <span className="product-star-lv">
      <RcRate
        {...props}
        // character = {<i className="ob-icon icon-star-f stared"></i>}
      />
    </span>
  )
}
Rate.defaultProps = {
  count: 5,
//   character: <i className="ob-icon icon-star-f stared"></i>
}
export default Rate
