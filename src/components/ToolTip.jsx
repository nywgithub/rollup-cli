import React from "react";
import PropTypes from "prop-types";

const arrowHeight = 8;

const eventMap = {
    'hover': ['onMouseEnter', 'onMouseLeave'],
    'click': 'onClick'
};
//获取元素的纵坐标（相对于窗口）
const getTop = (e) => {
    var offset = e.offsetTop;
    if (e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;

}


//获取元素的横坐标（相对于窗口）
const getLeft = (e) => {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) offset += getLeft(e.offsetParent);
    return offset;
}

export default class ToolTip extends React.Component {
    static propTypes = {
        /**
         *  小三角位置，可选：上|下|左|右
         * */
        placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
        /**
         *  触发行为，可选：hover|点击
         * */
        trigger: PropTypes.oneOf(['hover', 'click']),
        /**
         *  是否显示关闭按钮
         * */
        closeButton: PropTypes.bool,
        /**
         *  最外层包裹className
         * */
        wrapClassName: PropTypes.string,
        /**
         *  气泡层中的内容
         * */
        content: PropTypes.node,
        /**
         *  触发事件元素
         * */
        children: PropTypes.node,
        /**
         *  tooltip定位向左偏移（默认箭头与触发元素左侧对齐）
         * */
        offsetLeft: PropTypes.number
    };

    static defaultProps = {
        placement: 'top',
        trigger: 'hover',
        closeButton: false,
        offsetLeft: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    toggleVisible = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        const triggerObj = e.currentTarget;
        document.body.appendChild(this.tooltip);
        this.position(triggerObj);
        this.setState((prevState) => {
            return {
                visible: !prevState.visible
            }
        })
    };

    position = (triggerObj) => {
        const offsetTop = getTop(triggerObj);
        const offsetLeft = getLeft(triggerObj);
        const height = triggerObj.offsetHeight;

        this.tooltip.style.display = 'block';
        this.tooltip.style.left = '-10000px';
        this.tooltip.style.top = '-10000px';
        const arrowObjLeft = this.arrowRef.offsetLeft;
        this.tooltip.style.display = 'none';

        this.tooltip.style.left = offsetLeft - arrowObjLeft + this.props.offsetLeft - 41 + 'px';
        this.tooltip.style.top = offsetTop + height + arrowHeight - 13 + 'px';

    };

    handleClose = () => {
        this.setState({
            visible: false
        })
    };


    wrapHandle = (e) => {
        e.nativeEvent.stopImmediatePropagation();
    };

    componentDidMount() {
        if (this.props.trigger === 'click') {
            document.addEventListener('click', () => {
                this.setState({
                    visible: false
                })
            })
        }
    }

    render() {
        const triggerProps = this.props.trigger === 'hover' ? {
            onMouseEnter: this.toggleVisible,
            onMouseLeave: this.toggleVisible
        } : {
            [eventMap[this.props.trigger]]: this.toggleVisible
        };
        return (
            <React.Fragment>
                {
                    React.cloneElement(this.props.children, {
                        ...triggerProps,
                        ['data-tooltip-visible']: this.state.visible
                    })
                }
                <div onClick={this.wrapHandle} className={`tip arrow-${this.props.placement} ${this.props.wrapClassName}`} style={{ display: this.state.visible ? 'block' : 'none' }} ref={(tooltip) => { this.tooltip = tooltip }}>
                    {
                        this.props.closeButton && (
                            <span className="all-packet-close" onClick={this.handleClose}><i className="ob-icon icon-delete"></i></span>
                        )
                    }
                    <div className="tip-con">
                        <div className="tip-para">{this.props.content}</div>
                    </div>
                    <span className="arrow arrow-out" ref={(arrow) => this.arrowRef = arrow}>
                        <span className="arrow arrow-in"></span>
                    </span>
                </div>
            </React.Fragment>

        );
    }
}
