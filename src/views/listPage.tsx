import * as React from 'react'
import '../css/common.scss'
// import 'rc-rate/assets/index.css';
// import "@future/pagination/dist/style.css"
import ReactDOM from 'react-dom'
import Rate from '../components/Rate'
import Pager from '../components/Pager'


interface listPageProps {}

const ListPage: React.FC<listPageProps> = (props) => {
  return (
    <div>
      ListPage
      {/* 星星打分 */}
      <Rate allowHalf></Rate>
      {/* 分页 */}
      <Pager simple={false} total={10} current={1} />
    </div>
  )
}

ReactDOM.render(<ListPage />, document.getElementById('app'))
