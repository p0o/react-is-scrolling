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

function getBrowserScrollTop(nameOfClass) {
  if (nameOfClass) {
    if (document.getElementsByClassName(nameOfClass)[0]) {
      return document.getElementsByClassName(nameOfClass)[0].scrollTop;
    }
  }
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
      let isScrolledToTop = getBrowserScrollTop(this.props.nameOfClass) <= 20;
      let isCloseToTop = getBrowserScrollTop(this.props.nameOfClass) <= 200;
      this.state = {
        isScrolling: false,
        lastScrollTop: null,
        direction: null,
        isScrolledToBottom: false,
        isScrolledToTop,
        isCloseToTop
      };

      if (typeof window !== 'undefined') {
        this.DOMElement = window;
      }
    }

    userScrolledToBottom = nameOfClass => {
      if (nameOfClass) {
        if (document.getElementsByClassName(nameOfClass)[0]) {
          return (
            getBrowserScrollTop(nameOfClass) +
              document.getElementsByClassName(nameOfClass)[0].clientHeight >=
            document.getElementsByClassName(nameOfClass)[0].scrollHeight - 20
          );
        }
      }
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
          lastScrollTop: getBrowserScrollTop(this.props.nameOfClass)
        });
      }
      // If the user scrolled to the bottom of the current element
      if (this.userScrolledToBottom(this.props.nameOfClass)) {
        this.setState({ isScrolledToBottom: true });
      } else {
        this.setState({ isScrolledToBottom: false });
      }

      if (getBrowserScrollTop(this.props.nameOfClass) <= 200) {
        this.setState({ isCloseToTop: true });
      } else {
        this.setState({ isCloseToTop: false });
      }

      if (getBrowserScrollTop(this.props.nameOfClass) <= 20) {
        this.setState({ isScrolledToTop: true });
      } else {
        this.setState({ isScrolledToTop: false });
      }

      if (lastScrollTop) {
        this.detectDirection(
          lastScrollTop,
          getBrowserScrollTop(this.props.nameOfClass)
        );
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
          isCloseToTop={this.state.isCloseToTop}
        />
      );
    }
  };

export default IsScrollingHoC;
