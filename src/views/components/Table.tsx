import React from 'react'
import Rate from '../../components/Rate'
import { callReactionFormDialog, reactionDialogProps } from '../reactionDialog'
export type Item = {
  prodName: string
  comName: number
  imgSrc: string
  rate: number
  operation: string
}

interface TableProps {
  rate?: boolean
  head?: boolean
  data?: Item[]
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: Item,
  ) => void
}
const Table: React.FC<TableProps> = (props) => {
  const { rate, head, data, onClick } = props
  const clickEvent = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: Item,
  ) => {
    e.preventDefault()
    var prop:reactionDialogProps= {
      item:item,
      isEdit:item.operation === 'Write a Review'
    }
    callReactionFormDialog({ ...prop })
    onClick && onClick(e, item)
  }
  return (
    <table
      className={
        head
          ? 'table table-base inquiry-list-table inquiry-list-table-header'
          : 'table table-base table-hover inquiry-list-table'
      }
    >
      <colgroup>
        <col width="200" />
        <col width="200" />
        <col width="200" />
      </colgroup>
      <tbody>
        {head! ? (
          <tr>
            <td>Inquiries / Orders</td>
            {rate! && <td>Rating</td>}
            <td>Operation</td>
          </tr>
        ) : (
          data!.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={item.imgSrc} />
                  <div>{item.prodName}</div>
                  <div>{item.comName}</div>
                </td>
                {rate! && (
                  <td>
                    {/* 星星打分 */}
                    <Rate disabled value={item.rate}></Rate>
                  </td>
                )}
                <td>
                  <a
                    href="javascript:void(0)"
                    onClick={(e) => {
                      clickEvent(e, item)
                    }}
                  >
                    {item.operation}
                  </a>
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}
Table.defaultProps = {
  head: false,
  rate: false,
}
export default Table
