import React, { createRef } from 'react';
import ReactDOM from 'react-dom';

function _extends$1() {
    _extends$1 = Object.assign || function (target) {
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

    return _extends$1.apply(this, arguments);
}

function Compose(Component) {
    return /*#__PURE__*/function () {
        function _class(el, props) {
            this.el = el;
            this.props = props;
            this.render();
        }

        var _proto = _class.prototype;

        _proto.render = function render() {
            ReactDOM.render(React.createElement(Component, this.props), this.el);
        };

        _proto.setProps = function setProps(props) {
            this.props = _extends$1({}, this.props, props);
            this.render();
        };

        _proto.destroy = function destroy() {
            ReactDOM.unmountComponentAtNode(this.el);
        };

        return _class;
    }();
}

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

var appendHtmlChildren = function appendHtmlChildren(target, children) {
  return /*#__PURE__*/React.cloneElement(target, typeof children === "string" ? {
    dangerouslySetInnerHTML: {
      __html: children
    }
  } : {
    children: children
  });
};

var Picker = /*#__PURE__*/function (_React$Component) {
  _inherits(Picker, _React$Component);

  var _super = _createSuper(Picker);

  function Picker(props) {
    var _this;

    _classCallCheck(this, Picker);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (e) {
      var wrapper = _this.pickerRef.current;

      if (_this.isDropdownVisible() && wrapper && !wrapper.contains(e.target)) {
        _this.props.onBlur && _this.props.onBlur(e);
        _this.state.open && _this.handleOpenChange(false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputClick", function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      var disabled = _this.props.disabled;

      if (!disabled) {
        _this.handleOpenChange(!_this.state.open);

        _this.props.onClick && _this.props.onClick(e.nativeEvent);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "closeDropdown", function () {
      _this.handleOpenChange(false);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClear", function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      _this.props.onClear && _this.props.onClear();
    });

    _this.state = {};
    _this.pickerRef = /*#__PURE__*/createRef();
    return _this;
  }

  _createClass(Picker, [{
    key: "handleOpenChange",
    value: function handleOpenChange(open) {
      this.props.dropdownVisible === undefined && this.setState({
        open: open
      });
    }
  }, {
    key: "isDropdownVisible",
    value: function isDropdownVisible() {
      var dropdownVisible = this.props.dropdownVisible;
      return dropdownVisible !== undefined ? dropdownVisible : this.state.open;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          value = _this$props.value,
          namespace = _this$props.namespace,
          placeholder = _this$props.placeholder,
          name = _this$props.name,
          title = _this$props.title,
          disabled = _this$props.disabled,
          error = _this$props.error,
          prefix = _this$props.prefix,
          suffix = _this$props.suffix,
          _this$props$arrow = _this$props.arrow,
          arrow = _this$props$arrow === void 0 ? true : _this$props$arrow,
          clear = _this$props.clear;
      var suffixElement = suffix || /*#__PURE__*/React.createElement(React.Fragment, null, arrow && /*#__PURE__*/React.createElement("i", {
        className: "ft-icon icon-down ".concat(namespace, "-arrow")
      }), clear && /*#__PURE__*/React.createElement("i", {
        className: "ft-icon icon-error ".concat(namespace, "-clear"),
        onClick: this.handleClear
      }));
      var pickerClassNames = classNames("".concat(namespace), this.isDropdownVisible() && "open", disabled && "disabled", error && "error", className);
      return /*#__PURE__*/React.createElement("div", _extends({
        className: pickerClassNames
      }, name ? {
        "data-name": name
      } : {}, {
        ref: this.pickerRef
      }), /*#__PURE__*/React.createElement("div", {
        className: classNames("".concat(namespace, "-input"), clear && value && "".concat(namespace, "-with-clear"), !value && placeholder && "is-placeholder"),
        title: title,
        onClick: this.handleInputClick
      }, prefix && /*#__PURE__*/React.createElement("div", {
        className: "".concat(namespace, "-prefix")
      }, prefix), appendHtmlChildren( /*#__PURE__*/React.createElement("div", {
        className: "".concat(namespace, "-input-inner")
      }), value || /*#__PURE__*/React.createElement(React.Fragment, null, placeholder)), suffixElement && /*#__PURE__*/React.createElement("div", {
        className: classNames("".concat(namespace, "-suffix"), !suffix && (arrow || clear) && "".concat(namespace, "-tools"))
      }, suffixElement)), /*#__PURE__*/React.createElement("div", {
        className: "".concat(namespace, "-dropdown")
      }, children && ( /*#__PURE__*/React.isValidElement(children) && typeof children.type !== 'string' && children.type !== React.Fragment ? /*#__PURE__*/React.cloneElement(children, {
        closeDropdown: this.closeDropdown
      }) : children)));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var dropdownVisible = this.props.dropdownVisible;

      if (prevProps.dropdownVisible !== dropdownVisible) {
        if (dropdownVisible) {
          window.document.addEventListener("click", this.handleClickOutside, true);
        } else {
          window.document.removeEventListener("click", this.handleClickOutside, true);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }]);

  return Picker;
}(React.Component);

_defineProperty(Picker, "defaultProps", {
  namespace: "ft-picker"
});

var index = Compose(Picker);

export default index;
