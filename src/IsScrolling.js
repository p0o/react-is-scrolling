/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

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

    };

    detectDirection(lastScrollTop, nextScrollTop) {
      if (lastScrollTop < nextScrollTop) {
        this.setState({ direction: 'down' });
        return;
      }
      this.setState({ direction: 'top' });
    }

    componentDidMount() {
      if (this.DOMElement) {
        this.DOMElement.addEventListener('scroll', this.setScrollOn, true);
        this.myInterval = setInterval(this.setScrollOff, 1200);
      }
    }

    componentWillUnmount() {
      if (this.DOMElement) {
        this.DOMElement.removeEventListener('scroll', this.setScrollOn, true);
        clearInterval(this.myInterval);
      }
    }

    setScrollOff = () => {
      if (this.state.isScrolling) {
        this.setState({ isScrolling: false });
      }
    };

    render() {
      return (
        <TheComponent
          {...this.props}
          isScrolling={this.state.isScrolling}
        />
      );
    }
  };

export default IsScrollingHoC;
