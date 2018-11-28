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


var throttle = function throttle(func, limit) {
  var inThrottle = void 0;
  return function () {
    var args = arguments;
    var context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        return inThrottle = false;
      }, limit);
    }
  };
};

function getBrowserScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

var IsScrollingHoC = function IsScrollingHoC(TheComponent) {
  return function (_React$Component) {
    _inherits(IsScrollingComponent, _React$Component);

    function IsScrollingComponent(props) {
      _classCallCheck(this, IsScrollingComponent);

      var _this = _possibleConstructorReturn(this, (IsScrollingComponent.__proto__ || Object.getPrototypeOf(IsScrollingComponent)).call(this, props));

      _this.setScrollOn = function () {
        var _this$state = _this.state,
            isScrolling = _this$state.isScrolling,
            lastScrollTop = _this$state.lastScrollTop;


        if (!isScrolling) {
          _this.setState({
            isScrolling: true,
            lastScrollTop: getBrowserScrollTop()
          });
        }

        if (lastScrollTop) {
          _this.detectDirection(lastScrollTop, getBrowserScrollTop());
          _this.setState({ lastScrollTop: null });
        }
        _this.setScrollOff();
      };

      _this.setScrollOff = throttle(function () {
        if (_this.state.isScrolling) {
          _this.setState({ isScrolling: false, direction: null, lastScrollTop: null });
        }
      }, 10);

      _this.state = {
        isScrolling: false,
        lastScrollTop: null,
        direction: null
      };

      if (typeof window !== "undefined") {
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
          scrollTop: getBrowserScrollTop(),
          isScrolling: this.state.isScrolling,
          isScrollingDown: this.state.direction === 'down',
          isScrollingUp: this.state.direction === 'up'
        }));
      }
    }]);

    return IsScrollingComponent;
  }(_react2.default.Component);
};

exports.default = IsScrollingHoC;