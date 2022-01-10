import * as React from 'react'

import { Form, FormItem } from '@future/form/dist/react/index'
import { Input } from '@future/input/dist/react/index'
import { Button } from '@future/button/dist/react/index'
import { callDialog } from '../dialog'

interface reactionDialogProps {}

const ReactionDialog: React.FC<reactionDialogProps> = (props) => {
  return (
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
  )
}

//导出表单弹窗（附带reactdom）的方法
export const callReactionFormDialog = () => {
  callDialog(<ReactionDialog />, {
    classList: ['reaction-form-dialog'],
    title: false,
    close() {
      console.log('close')
    },
    ok(){
      console.log('ok')
    }
  })
}

export default ReactionDialog
