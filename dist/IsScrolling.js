'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-undef */


function debounce(func) {
  var timeout = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;

    var lastCall = function lastCall() {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(lastCall, 100);
  };
}

function getBrowserScrollTop(nameOfClass) {
  if (nameOfClass) {
    if (document.getElementsByClassName(nameOfClass)[0]) {
      return document.getElementsByClassName(nameOfClass)[0].scrollTop;
    }
  }
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

var IsScrollingHoC = function IsScrollingHoC(TheComponent) {
  return function (_React$Component) {
    _inherits(IsScrollingComponent, _React$Component);

    function IsScrollingComponent(props) {
      _classCallCheck(this, IsScrollingComponent);

      var _this = _possibleConstructorReturn(this, (IsScrollingComponent.__proto__ || Object.getPrototypeOf(IsScrollingComponent)).call(this, props));

      _this.userScrolledToBottom = function (nameOfClass) {
        if (nameOfClass) {
          if (document.getElementsByClassName(nameOfClass)[0]) {
            return getBrowserScrollTop(nameOfClass) + document.getElementsByClassName(nameOfClass)[0].clientHeight >= document.getElementsByClassName(nameOfClass)[0].scrollHeight - 20;
          }
        }
        return getBrowserScrollTop() + window.innerHeight >= document.documentElement.scrollHeight - 20;
      };

      _this.setScrollOn = function () {
        var _this$state = _this.state,
            isScrolling = _this$state.isScrolling,
            lastScrollTop = _this$state.lastScrollTop;


        if (!isScrolling) {
          _this.setState({
            isScrolling: true,
            lastScrollTop: getBrowserScrollTop(_this.props.nameOfClass)
          });
        }
        // If the user scrolled to the bottom of the current element
        if (_this.userScrolledToBottom(_this.props.nameOfClass)) {
          _this.setState({ isScrolledToBottom: true });
        } else {
          _this.setState({ isScrolledToBottom: false });
        }

        if (getBrowserScrollTop(_this.props.nameOfClass) <= 200) {
          _this.setState({ isCloseToTop: true });
        } else {
          _this.setState({ isCloseToTop: false });
        }

        if (getBrowserScrollTop(_this.props.nameOfClass) <= 20) {
          _this.setState({ isScrolledToTop: true });
        } else {
          _this.setState({ isScrolledToTop: false });
        }

        if (lastScrollTop) {
          _this.detectDirection(lastScrollTop, getBrowserScrollTop(_this.props.nameOfClass));
          _this.setState({ lastScrollTop: null });
        }
        _this.setScrollOff();
      };

      _this.setScrollOff = debounce(function () {
        if (_this.state.isScrolling) {
          _this.setState({
            isScrolling: false,
            direction: null,
            lastScrollTop: null
          });
        }
      });

      var isScrolledToTop = getBrowserScrollTop(_this.props.nameOfClass) <= 20;
      var isCloseToTop = getBrowserScrollTop(_this.props.nameOfClass) <= 200;
      _this.state = {
        isScrolling: false,
        lastScrollTop: null,
        direction: null,
        isScrolledToBottom: false,
        isScrolledToTop: isScrolledToTop,
        isCloseToTop: isCloseToTop
      };

      if (typeof window !== 'undefined') {
        _this.DOMElement = window;
      }
      return _this;
    }

    _createClass(IsScrollingComponent, [{
      key: 'detectDirection',
      value: function detectDirection(lastScrollTop, nextScrollTop) {
        if (lastScrollTop < nextScrollTop) {
          this.setState({ direction: 'down' });
          return;
        }
        this.setState({ direction: 'up' });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.DOMElement) {
          this.DOMElement.addEventListener('scroll', this.setScrollOn, true);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.DOMElement) {
          this.DOMElement.removeEventListener('scroll', this.setScrollOn, true);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(TheComponent, _extends({}, this.props, {
          isScrolling: this.state.isScrolling,
          isScrollingDown: this.state.direction === 'down',
          isScrollingUp: this.state.direction === 'up',
          isScrolledToBottom: this.state.isScrolledToBottom,
          isScrolledToTop: this.state.isScrolledToTop,
          isCloseToTop: this.state.isCloseToTop
        }));
      }
    }]);

    return IsScrollingComponent;
  }(_react2.default.Component);
};

exports.default = IsScrollingHoC;