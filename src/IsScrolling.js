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
    timeout = setTimeout(lastCall , 100);
  }
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
          lastScrollTop: this.DOMElement.document.body.scrollTop,
        });
      }

      if (lastScrollTop) {
        this.detectDirection(lastScrollTop, this.DOMElement.document.body.scrollTop);
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
        this.setState({ isScrolling: false });
      }
    });

    render() {
      return (
        <TheComponent
          {...this.props}
          isScrolling={this.state.isScrolling}
          isScrollingDown={this.state.direction === 'down'}
          isScrollingUp={this.state.direction === 'up'}
        />
      );
    }
  };

export default IsScrollingHoC;
