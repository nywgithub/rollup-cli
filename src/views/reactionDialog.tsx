import React, {useState, useEffect, useRef} from 'react'

import ReactDOM from 'react-dom'
import ToolTip from '../components/ToolTip'
import { callDialog, DialogInjectProps } from '../dialog'
import Rate from '../components/Rate'
import FingerRate from '../components/FingerRate'
import { Item } from './components/Table'
import FormValidate from '../components/FormValidate'
import { TextArea } from '@future/input/dist/react'
import { Button } from "@future/button/dist/react";
import Vupload from '../components/Vupload'

const reviewFactors = [
  'Responsiveness',
  'Customer Service',
  'Items As Described',
  'Delivery Time',
]

export interface reactionDialogProps extends DialogInjectProps{
  item?: Item //订单信息
  isEdit?: boolean //是否编辑
}

const ReactionDialog: React.FC<reactionDialogProps> = (props) => {
  const { item, isEdit, confirmDialog, cancelDialog} = props
  const [reaction,setReaction] = useState('')
  const [textValue, setTextValue] = useState('')

  //表单校验实例
  const formRef = useRef()

  useEffect(()=>{
    setReaction('asd')
  })

  
  //双向绑定textarea输入值
  const inputChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setTextValue(e.target.value)
    // formRef.current.validateFn()
  }

  //评价文本域校验
  const validate = {
    min:10,
    minError:'At least 10 characters are required. It will help usserve you better.'
  }

  //tooltip内容
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

  //点👍👎事件
  const fingerRateClick = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>,
    key: number | undefined,
  ) => {
    // 获取点赞情况
    console.log(e, key)
  }

  //⭐评分触发事件
  const starRateChange = (val: number) => {
    //获取星星数量
    console.log(val)
  }

  //表单按钮四种不同情况 -- start
  const cancel = () =>{
    //关闭弹窗并传递参数
    cancelDialog!(item)
  }
  const submit = () =>{
    //发出post请求

    //关闭弹窗并传递参数
    confirmDialog!(item)
  }
  const del = () =>{
    callDialog(<span>123</span>,{
      classList: ['reaction-form-dialog'],
      title: false,
      close() {
        console.log('close')
      },
      ok() {
        //发delete请求

        //请求成功回调关闭弹窗并传递参数
        //TODO：无法关闭当前弹窗
        // cancelDialog!(item)
      },
      cancel(){},
      okVal: 'Delete',
      cancelVal: 'Cancel'
    })
  }
  const edit = () =>{
    //TODO:子组件改变props

  }
  //表单按钮四种不同情况 -- end

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
          <FormValidate validate={validate} ref={formRef}>
            <TextArea placeholder="Share your experience about this supplier." value={textValue}  maxLength={500} onBlur={(e)=>{console.log(e,textValue)}} onChange={(e)=>{inputChange(e)}}/>
          </FormValidate>
          <Vupload />
          <Button onClick={cancel}>Cancel</Button>
          <Button type="primary" onClick={submit}>Submit</Button>
        </>
      ):(
        <>
          <p>{reaction}</p>
          <div className="img-area">

          </div>
          <Button type="primary" onClick={del}>Delete</Button>
          <Button type="primary" onClick={edit}>Edit</Button>
        </>
      )}
    </>
  )
}
ReactionDialog.defaultProps = {
  isEdit: false,
}
//导出pc表单弹窗（附带reactdom）的方法，prop为表单组件prop（当前订单的信息）
export const callReactionFormDialog = (props: reactionDialogProps) => {
  return callDialog(<ReactionDialog {...props} />, {
    classList: ['reaction-form-dialog'],
    title: false,
    close() {
      console.log('close')
    },
    /* ok() {
      if(props.isEdit){
        console.log(props.item)
      }else{

      }
    },
    cancel(){
      if(props.isEdit){
        console.log(props.item)
      }else{
        
      }
    },
    okVal: props.isEdit ? 'Submit' : 'Edit',
    cancelVal: props.isEdit ? 'Cancel' : 'Delete'  */
  })
}

//导出触屏表单
export const callReactionFormTouch = (props: reactionDialogProps) => {
  ReactDOM.render(<ReactionDialog {...props} />, document.getElementById('app'))
}

export default ReactionDialog
