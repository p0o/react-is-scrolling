/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

function debounce(func) {
  let timeout;
  return function(...args) {
    const context = this;

    const lastCall = () => {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(lastCall, 100);
  };
}

function getBrowserScrollTop() {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

const IsScrollingHoC = TheComponent =>
  class IsScrollingComponent extends React.Component {
    constructor(props) {
      super(props);
      let isScrolledToTop = getBrowserScrollTop() <= 20;
      this.state = {
        isScrolling: false,
        lastScrollTop: null,
        direction: null,
        isScrolledToBottom: false,
        isScrolledToTop
      };

      if (typeof window !== 'undefined') {
        this.DOMElement = window;
      }
    }

    userScrolledToBottom = () => {
      return (
        getBrowserScrollTop() + window.innerHeight >=
        document.documentElement.scrollHeight - 20
      );
    };

    setScrollOn = () => {
      const { isScrolling, lastScrollTop } = this.state;

      if (!isScrolling) {
        this.setState({
          isScrolling: true,
          lastScrollTop: getBrowserScrollTop()
        });
      }

      // If the user scrolled to the bottom of the current element
      if (this.userScrolledToBottom()) {
        this.setState({ isScrolledToBottom: true });
      } else {
        this.setState({ isScrolledToBottom: false });
      }

      if (getBrowserScrollTop() <= 20) {
        console.log('isScrolledToTop', true);
        this.setState({ isScrolledToTop: true });
      } else {
        console.log('isScrolledToTop', false);
        this.setState({ isScrolledToTop: false });
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

    setScrollOff = debounce(() => {
      if (this.state.isScrolling) {
        this.setState({
          isScrolling: false,
          direction: null,
          lastScrollTop: null
        });
      }
    });

    render() {
      return (
        <TheComponent
          {...this.props}
          isScrolling={this.state.isScrolling}
          isScrollingDown={this.state.direction === 'down'}
          isScrollingUp={this.state.direction === 'up'}
          isScrolledToBottom={this.state.isScrolledToBottom}
          isScrolledToTop={this.state.isScrolledToTop}
        />
      );
    }
  };

export default IsScrollingHoC;
