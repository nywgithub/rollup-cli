import * as React from 'react'

import ReactDOM from 'react-dom'
import { Form, FormItem } from '@future/form/dist/react'
import { Input } from '@future/input/dist/react'
import { Button } from '@future/button/dist/react'
import ToolTip from '../components/ToolTip'
import { callDialog } from '../dialog'
import Rate from '../components/Rate'
import FingerRate from '../components/FingerRate'
import {Item} from './components/Table'
interface reactionDialogProps {
  item?: Item
}

const ReactionDialog: React.FC<reactionDialogProps> = (props) => {
  const {item} = props
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
  const fingerRateClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,  key: number | undefined) => {
    // 获取点赞情况
    console.log(e, key)
    console.log(item)
  }
  const starRateChange = (val:number) => {
    //获取星星数量
    console.log(val)
  }
  return (
    <>
      <ToolTip content={tooltipContent}>
        <div>How to write?</div>
      </ToolTip>
      <Form>
        <FormItem label="姓名">
          <Input />
        </FormItem>
        <FormItem label="年龄">
          <Input />
        </FormItem>
        <FormItem label="">
          <Button
            type="primary"
            htmlType="submit"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            提交
          </Button>
        </FormItem>
      </Form>
      {/* 星星打分 */}
      <Rate
        allowClear
        onChange={(val) => {
          starRateChange(val)
        }}
      ></Rate>
      {/* 拇指打分 */}
      <FingerRate
        character={<div>1</div>}
        defaultValue={0}
        onClick={(e, val, key) => {
          fingerRateClick(e, key)
        }}
      />
    </>
  )
}

//导出pc表单弹窗（附带reactdom）的方法
export const callReactionFormDialog = (props:reactionDialogProps) => {
  return callDialog(<ReactionDialog {...props} />, {
    classList: ['reaction-form-dialog'],
    title: false,
    close() {
      console.log('close')
    },
    ok() {
      console.log('ok')
    },
  })
}

//导出触屏表单
export const callReactionFormTouch = ()=> {
  ReactDOM.render(<ReactionDialog />, document.getElementById('app'))
}

export default ReactionDialog
