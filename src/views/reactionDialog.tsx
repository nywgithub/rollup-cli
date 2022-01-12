import React, {useState, useEffect, useRef} from 'react'

import ReactDOM from 'react-dom'
import ToolTip from '../components/ToolTip'
import { callDialog } from '../dialog'
import Rate from '../components/Rate'
import FingerRate from '../components/FingerRate'
import { Item } from './components/Table'
import { TextArea } from '@future/input/dist/react'

const reviewFactors = [
  'Responsiveness',
  'Customer Service',
  'Items As Described',
  'Delivery Time',
]

export interface reactionDialogProps {
  item?: Item
  isEdit?: boolean
}

const ReactionDialog: React.FC<reactionDialogProps> = (props) => {
  const { item, isEdit } = props
  const [reaction,setReaction] = useState('')
  const [textValue, setTextValue] = useState('')
  useEffect(()=>{
    setReaction('asd')
  })
  const [errorMessage,sendErrorMessage] =  useState('')
  //双向绑定input值
  const inputChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setTextValue(e.target.value)
  }
  const tooltipContent = (
    <>
      <span>
        We want your voice to be heard! Share your thoughts with other buyers by
        submitting a customer review. Your personal info will be kept strictly.
        Do not submit any feedback that is irrelevant to the business or
        violates personal privacy. Otherwise, it won’t be shown.
      </span>
      <a target="_blank" href="">
        Click here
      </a>
      <span>, you can see more information.</span>
    </>
  )
  const fingerRateClick = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>,
    key: number | undefined,
  ) => {
    // 获取点赞情况
    console.log(e, key)
    console.log(item)
  }
  const starRateChange = (val: number) => {
    //获取星星数量
    console.log(val)
  }
  return (
    <>
      <ToolTip content={tooltipContent}>
        <div>How to write?</div>
      </ToolTip>
      {/* 产品信息 */}
      <div>产品信息</div>
      {/* 星星打分 */}
      {isEdit! ? (
        <Rate
          allowClear
          onChange={(val) => {
            starRateChange(val)
          }}
        ></Rate>
      ) : (
        <Rate disabled value={item!.rate}></Rate>
      )}
      {/* 拇指打分 */}
      {reviewFactors.map((item, index) => {
        return (
          <div key={index}>
            <span>{item}</span>
            {isEdit! ? (
              <FingerRate
                character={<div>★</div>}
                onClick={(e, val, key) => {
                  fingerRateClick(e, key)
                }}
              />
            ) : (
              <FingerRate character={<div>★</div>} disabled />
            )}
          </div>
        ) 
      })}
      {/* 具体评价 */}
      {isEdit! ?(
        <>
          <TextArea placeholder="Share your experience about this supplier." value={textValue}  maxLength={500} onBlur={(e)=>{console.log(e,textValue)}} onChange={(e)=>{inputChange(e)}}/>
          <div className="feedback-block"><div className="error">{errorMessage}</div></div>
        </>
      ):(
        <p>{reaction}</p>
      )}
    </>
  )
}
ReactionDialog.defaultProps = {
  isEdit: false,
}
//导出pc表单弹窗（附带reactdom）的方法
export const callReactionFormDialog = (props: reactionDialogProps) => {
  return callDialog(<ReactionDialog {...props} />, {
    classList: ['reaction-form-dialog'],
    title: false,
    close() {
      console.log('close')
    },
    ok() {
      console.log('ok')
    },
    okVal: 'ok',
    cancelVal: 'cancel',
  })
}

//导出触屏表单
export const callReactionFormTouch = (props: reactionDialogProps) => {
  ReactDOM.render(<ReactionDialog {...props} />, document.getElementById('app'))
}

export default ReactionDialog
