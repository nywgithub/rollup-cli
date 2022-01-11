import React from 'react'

interface TabsControlProps {
  tabList: string[]
  tabClick: (item: string) => void
}
export default class TabsControl extends React.Component<TabsControlProps> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
  }

  check_tittle_index(index: number) {
    return index === this.state.currentIndex
      ? 'Tab_tittle active'
      : 'Tab_tittle'
  }

  render(): React.ReactNode {
    const { tabList, tabClick } = this.props
    return (
      <>
        {/*动态生成Tab导航*/}
        <div className="Tab_tittle_wrap">
          {tabList.map((item: string, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  this.setState({ currentIndex: index })
                  tabClick(item)
                }}
                className={this.check_tittle_index(index)}
              >
                {item}
              </div>
            )
          })}
        </div>
      </>
    )
  }
}
