import * as React from "react";

export default class Pager extends React.Component {
  static defaultProps = {
    total: 20,
    current: 1,
    simple: false,
    onChangePage: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      search_val: "",
    };
  }
  handleChange(e) {
    this.setState({ search_val: e.target.value });
  }
  concatItems() {
    let items = [];
    const { total, current } = this.props;
    if (total < current) return [];
    if (total < 10) {
      for (let i = 1; i <= total; i++) {
        items.push(i);
      }
      return items;
    } else {
      items.push(1);
      if (current <= 1 + 5) {
        items = items.concat([2, 3, 4, 5, 6, "...", total]);
        return items;
      }
      if (current >= total - 5) {
        items.push("...");
        for (let i = total - 5; i <= total; i++) {
          items.push(i);
        }
        return items;
      }
      items.push("...");
      for (let i = current - 1; i < current + 3; i++) {
        items.push(i);
      }
      items.push("...");
      items.push(total);
      return items;
    }
  }

  getItemDom(item, i) {
    const { total, current, onChangePage } = this.props;
    if (item == current) {
      return (
        <strong className="current" key={item}>
          {item}
        </strong>
      );
    }
    if (item == "...") {
      return (
        <strong className="omit" key={item + i}>
          <i className="micon">&#xe060;</i>
        </strong>
      );
    }
    return (
      <a
        className=""
        onClick={(e) => {
          onChangePage(item);
        }}
        key={item}
      >
        {item}
      </a>
    );
  }
  prevPgae() {
    const { total, current, onChangePage } = this.props;
    let _page = current - 1;
    if (_page >= 1) {
      onChangePage(_page);
    }
  }
  nextPage() {
    const { total, current, onChangePage } = this.props;
    let _page = current + 1;
    if (_page <= total) {
      onChangePage(_page);
    }
  }
  goPage() {
    const { search_val } = this.state;
    const { total, current, onChangePage } = this.props;
    let _page = parseInt(search_val);
    if (isNaN(_page)) return false;
    if (_page < 1) {
      _page = 1;
    }
    if (_page > total) {
      _page = total;
    }
    onChangePage(_page);
  }
  render() {
    let items = [];
    const { total, current, simple } = this.props;
    const { search_val } = this.state;
    items = this.concatItems();

    const prevPageLabel = !simple ? "上一页" : "";
    const nextPageLabel = !simple ? "下一页" : "";
    const mainCls = !simple ? "page-main" : "";

    const prevVDOM =
      current == 1 ? (
        <a className="prev" title="上一页" disabled>
          <i className="micon">&#xe009;</i>
        </a>
      ) : (
        <a
          className="prev"
          title="上一页"
          onClick={(e) => {
            this.prevPgae();
          }}
        >
          <i className="micon">&#xe009;</i>
          {prevPageLabel}
        </a>
      );

    const nextVDOM =
      current == total ? (
        <a className="next" title="下一页" disabled>
          <i className="micon">&#xe008;</i>
        </a>
      ) : (
        <a
          className={`next ${mainCls}`}
          title="下一页"
          onClick={(e) => {
            this.nextPage();
          }}
        >
          {nextPageLabel}
          <i className="micon">&#xe008;</i>
        </a>
      );

    return (
      <div className="pager-wrap-content">
        <div className="pager">
          <div className="page-num">
            {prevVDOM}
            {items.map((item, i) => this.getItemDom(item, i))}
            {nextVDOM}
          </div>
        </div>
        {!simple && total >= 10 ? (
          <div className="quick-page obelisk-form">
            <span className="quick-text">到第</span>
            <input
              value={search_val}
              onChange={this.handleChange.bind(this)}
              type="text"
              className="input-text span-2 quick-input"
            />
            <span className="quick-text">页</span>
            <div
              className="btn btn-small quick-button"
              onClick={() => {
                this.goPage();
              }}
            >
              确定
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
