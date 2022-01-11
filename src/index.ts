import {callReactionFormDialog, callReactionFormTouch} from './views/reactionDialog'
import {isMobilePlatform} from './util/platFrom'
//导出处理表单弹窗的方法
export const ReactionForm = async()=>{
    callReactionFormTouch()
    // isMobilePlatform ? callReactionFormTouch() : callReactionFormDialog()
}