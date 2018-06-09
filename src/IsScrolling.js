/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

function getBrowserScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

const IsScrollingHoC = TheComponent =>
  class IsScrollingComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isScrolling: false,
        lastScrollTop: null,
        direction: null,
      };
    }

    DOMElement = window;

    setScrollOn = () => {
      const { isScrolling, lastScrollTop } = this.state;

      if (!isScrolling) {
        this.setState({
          isScrolling: true,
          lastScrollTop: getBrowserScrollTop(),
        });
      }

      if (lastScrollTop) {
        this.detectDirection(lastScrollTop, getBrowserScrollTop());
        this.setState({ lastScrollTop: null });
      }
       this.setScrollOff();
    };

    detectDirection(lastScrollTop, nextScrollTop) {
      if (lastScrollTop < nextScrollTop) {
        this.setState({ direction: 'down' });
        return;
      }
      this.setState({ direction: 'up' });
    }

    componentDidMount() {
      if (this.DOMElement) {
        this.DOMElement.addEventListener('scroll', this.setScrollOn, true);
      }
    }

    componentWillUnmount() {
      if (this.DOMElement) {
        this.DOMElement.removeEventListener('scroll', this.setScrollOn, true);
      }
    }

    setScrollOff = throttle(() => {
      if (this.state.isScrolling) {
        this.setState({ isScrolling: false, direction: null, lastScrollTop: null });
      }
    }, 10);

    render() {
      return (
        <TheComponent
          {...this.props}
          scrollTop={getBrowserScrollTop()}
          isScrolling={this.state.isScrolling}
          isScrollingDown={this.state.direction === 'down'}
          isScrollingUp={this.state.direction === 'up'}
        />
      );
    }
  };

export default IsScrollingHoC;
