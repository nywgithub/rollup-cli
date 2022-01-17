import React, { useState, useEffect } from 'react'
import '../css/common.scss'
// import 'rc-rate/assets/index.css';
// import "@future/pagination/dist/style.css"
import ReactDOM from 'react-dom'
import Pager from '../components/Pager'
import Table from './components/Table'
import TabsControl from '../components/TabsControl'
interface listPageProps {}

const ListPage: React.FC<listPageProps> = (props) => {
  const [pager, setPager] = useState({ pageNo: 1, pageTotal: 10 })
  const [currentTab, setCurrentTab] = useState('Awaiting Review')
  const pageChange = function (e: number) {
    setPager({ ...pager, pageNo: e })
  }

  const demo = [
    {
      prodName: '1',
      comName: 2,
      imgSrc: '',
      rate: 3,
      operation: 'Write a Review',
    },
    {
      prodName: '2',
      comName: 2,
      imgSrc: '',
      rate: 4,
      operation: 'Write a Review',
    },
    {
      prodName: '3',
      comName: 2,
      imgSrc: '',
      rate: 5,
      operation: 'Write a Review',
    },
  ]
  const demo2 = [
    {
      prodName: '1',
      comName: 2,
      imgSrc: '',
      rate: 3,
      operation: 'Check My Review',
    },
    {
      prodName: '2',
      comName: 2,
      imgSrc: '',
      rate: 4,
      operation: 'deleted',
    },
    {
      prodName: '3',
      comName: 2,
      imgSrc: '',
      rate: 5,
      operation: 'Check My Review',
    },
  ]
  const tabList = ['Awaiting Review', 'Reviewed']
  const tabClick = (val: string) => {
    setCurrentTab(val)
  }
  // useEffect()

  return (
    <div>
      <TabsControl
        tabList={tabList}
        tabClick={(e: string) => {
          tabClick(e)
        }}
      />
      {currentTab === 'Awaiting Review' ? (
        <>
          <Table head />
          <Table data={demo} />
        </>
      ) : (
        <>
          <Table head rate />
          <Table rate data={demo2} />
        </>
      )}

      {/* 分页 */}
      <Pager
        simple={false}
        total={pager.pageTotal}
        current={pager.pageNo}
        onChangePage={(e: number) => {
          pageChange(e)
        }}
      />
    </div>
  )
}

ReactDOM.render(<ListPage />, document.getElementById('app'))
