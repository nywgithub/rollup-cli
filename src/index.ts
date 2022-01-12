import {callReactionFormDialog, callReactionFormTouch,reactionDialogProps} from './views/reactionDialog'
import {isMobilePlatform} from './util/platFrom'
//导出处理表单弹窗的方法
export const ReactionForm = async(props:reactionDialogProps)=>{
    callReactionFormTouch(props)
    // isMobilePlatform ? callReactionFormTouch() : callReactionFormDialog()
}