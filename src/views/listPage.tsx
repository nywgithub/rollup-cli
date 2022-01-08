import React, { useState } from 'react'
import '../css/common.scss'
// import 'rc-rate/assets/index.css';
// import "@future/pagination/dist/style.css"
import ReactDOM from 'react-dom'
import Rate from '../components/Rate'
import FingerRate from '../components/FingerRate'
import ToolTip from '../components/ToolTip'
import Pager from '../components/Pager'

interface listPageProps {}

const ListPage: React.FC<listPageProps> = (props) => {
  const [pager, setPager] = useState({ pageNo: 1, pageTotal: 10 })
  const pageChange = function (e) {
    setPager({ ...pager, pageNo: e })
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
  const fingerRateClick = (e, val, key) => {
    // 获取点赞情况
    console.log(e, val, key)
  }
  const starRateChange = (val) => {
    //获取星星数量
    console.log(val)
  }
  return (
    <div>
      ListPage
      <ToolTip content={tooltipContent}>
        <div>How to write?</div>
      </ToolTip>
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
          fingerRateClick(e, val, key)
        }}
      />
      {/* 分页 */}
      <Pager
        simple={false}
        total={pager.pageTotal}
        current={pager.pageNo}
        onChangePage={(e) => {
          pageChange(e)
        }}
      />
    </div>
  )
}

ReactDOM.render(<ListPage />, document.getElementById('app'))
