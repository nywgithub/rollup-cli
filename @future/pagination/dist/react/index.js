import React from 'react';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var classnames = {exports: {}};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function (module) {
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
}(classnames));

var classNames = classnames.exports;

var BranchViewFactory = function BranchViewFactory(truly) {
  return function (props) {
    return truly ? React.createElement(React.Fragment, null, props.children) : null;
  };
};

var Pagination = /*#__PURE__*/function (_React$Component) {
  _inherits(Pagination, _React$Component);

  var _super = _createSuper(Pagination);

  function Pagination(props) {
    var _this;

    _classCallCheck(this, Pagination);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handlePageChange", function (newPageNo) {
      var _this$props = _this.props,
          pageNo = _this$props.pageNo,
          onChange = _this$props.onChange;
      var pagesCount = _this.state.pagesCount;
      var newPage = newPageNo;
      /* istanbul ignore if */

      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (newPage > pagesCount) {
          newPage = pagesCount;
        }
      }

      if (newPage !== pageNo) {
        onChange && onChange(newPage);
      }
    });

    var isSimple = props.isSimple;
    _this.state = {
      centerPages: [],
      pagesCount: _this.getPagesCount()
    };
    _this.NormalView = BranchViewFactory(!isSimple);
    _this.SimpleView = BranchViewFactory(!!isSimple);
    return _this;
  }

  _createClass(Pagination, [{
    key: "getPagesCount",
    value: function getPagesCount() {
      var _this$props2 = this.props,
          pageSize = _this$props2.pageSize,
          total = _this$props2.total;
      return Math.ceil(total / pageSize);
    }
  }, {
    key: "updateShowMore",
    value: function updateShowMore() {
      var _this2 = this;

      var pagerItemsCount = Pagination.DEFAULT_PAGER_COUNT;
      var pageNo = this.props.pageNo;
      var pagesCount = this.state.pagesCount;
      var showPrevMore = false;
      var showNextMore = false;

      if (pagesCount > pagerItemsCount) {
        if (pageNo > pagerItemsCount - 3) {
          showPrevMore = true;
        }

        if (pageNo < pagesCount - 3) {
          showNextMore = true;
        }
      }

      this.setState({
        showPrevMore: showPrevMore,
        showNextMore: showNextMore
      }, function () {
        _this2.setState({
          centerPages: _this2.getCenterPages()
        });
      });
    }
  }, {
    key: "getCenterPages",
    value: function getCenterPages() {
      var pagerCount = Pagination.DEFAULT_PAGER_COUNT;
      var pageNo = this.props.pageNo;
      var _this$state = this.state,
          showPrevMore = _this$state.showPrevMore,
          showNextMore = _this$state.showNextMore,
          pagesCount = _this$state.pagesCount;
      var array = [];

      if (showPrevMore && !showNextMore) {
        var startPage = pagesCount - (pagerCount - 2);

        for (var i = startPage; i < pagesCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (var _i = 2; _i < pagerCount; _i++) {
          array.push(_i);
        }
      } else if (showPrevMore && showNextMore) {
        var offset = Math.floor(pagerCount / 2) - 1;

        for (var _i2 = pageNo - offset; _i2 <= pageNo + offset; _i2++) {
          array.push(_i2);
        }
      } else {
        for (var _i3 = 2; _i3 < pagesCount; _i3++) {
          array.push(_i3);
        }
      }

      return array;
    }
  }, {
    key: "urlFactory",
    value: function urlFactory(pageNo) {
      var formatURL = this.props.formatURL;
      var url = Pagination.NONE_URL;

      if (formatURL) {
        url = formatURL(pageNo);
      }

      return url;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          _this$props3$classNam = _this$props3.className,
          className = _this$props3$classNam === void 0 ? "" : _this$props3$classNam,
          pageNo = _this$props3.pageNo,
          target = _this$props3.target,
          showPrev = _this$props3.showPrev,
          showNext = _this$props3.showNext;
      var _this$state2 = this.state,
          showPrevMore = _this$state2.showPrevMore,
          showNextMore = _this$state2.showNextMore,
          pagesCount = _this$state2.pagesCount,
          centerPages = _this$state2.centerPages;
      var NormalView = this.NormalView,
          SimpleView = this.SimpleView;
      var isFirstPage = pageNo === 1;
      var isLastPage = pageNo === pagesCount;
      var prev = /*#__PURE__*/React.createElement(Page, {
        className: classNames(isFirstPage && "is-disabled"),
        isAnchor: !isFirstPage,
        pageNumber: pageNo - 1,
        href: this.urlFactory(pageNo - 1),
        target: target,
        onChange: this.handlePageChange
      }, /*#__PURE__*/React.createElement("i", {
        className: "ft-icon icon-left"
      }));
      var next = /*#__PURE__*/React.createElement(Page, {
        className: classNames(isLastPage && "is-disabled"),
        isAnchor: !isLastPage,
        pageNumber: pageNo + 1,
        href: this.urlFactory(pageNo + 1),
        target: target,
        onChange: this.handlePageChange
      }, /*#__PURE__*/React.createElement("i", {
        className: "ft-icon icon-right"
      }));
      var more = /*#__PURE__*/React.createElement("span", {
        className: "ft-pagination-item is-more"
      }, /*#__PURE__*/React.createElement("i", {
        className: "ft-icon icon-more"
      }));
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NormalView, null, /*#__PURE__*/React.createElement("div", {
        className: classNames("ft-pagination", className)
      }, showPrev && prev, pagesCount > 0 && [1, showPrevMore && more].concat(_toConsumableArray(centerPages), [showNextMore && more, pagesCount > 1 && pagesCount]).filter(Boolean).map(function (numberOrElement, i) {
        return typeof numberOrElement === "number" ? /*#__PURE__*/React.createElement(Page, {
          className: classNames(pageNo === numberOrElement && "is-active"),
          isAnchor: pageNo !== numberOrElement,
          pageNumber: numberOrElement,
          href: _this3.urlFactory(numberOrElement),
          target: target,
          onChange: _this3.handlePageChange,
          key: numberOrElement
        }) : /*#__PURE__*/React.cloneElement(numberOrElement, {
          key: "more" + i
        });
      }), showNext && next)), /*#__PURE__*/React.createElement(SimpleView, null, /*#__PURE__*/React.createElement("div", {
        className: classNames("ft-pagination is-simple", className)
      }, prev, next)));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateShowMore();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this4 = this;

      var _this$props4 = this.props,
          pageNo = _this$props4.pageNo,
          total = _this$props4.total,
          pageSize = _this$props4.pageSize;

      if (prevProps.pageNo !== pageNo) {
        this.updateShowMore();
      }

      if (prevProps.total !== total || prevProps.pageSize !== pageSize) {
        this.setState({
          pagesCount: this.getPagesCount()
        }, function () {
          _this4.updateShowMore();
        });
      }
    }
  }]);

  return Pagination;
}(React.Component);

_defineProperty(Pagination, "NONE_URL", "javascript: void(0);");

_defineProperty(Pagination, "DEFAULT_PAGER_COUNT", 7);

_defineProperty(Pagination, "defaultProps", {
  showPrev: true,
  showNext: true
});

var Page = function Page(props) {
  var pageNumber = props.pageNumber,
      isAnchor = props.isAnchor,
      onChange = props.onChange,
      href = props.href,
      className = props.className,
      target = props.target,
      children = props.children;
  var Tag = isAnchor ? "a" : "span";
  var anchorHTMLAttributes = {
    href: href,
    target: target,
    onClick: function onClick(e) {
      e.stopPropagation();
      isAnchor && onChange && onChange(pageNumber);
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: classNames("ft-pagination-item", className)
  }, isAnchor ? anchorHTMLAttributes : {}), children || pageNumber);
};

export default Pagination;
