import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IsScrolling from '../src/IsScrolling.js';


const parentDivStyle = {
  height: '2000px'
};

const overlayStyle = {
  position: 'fixed',
  background: 'LightSkyBlue',
  bottom: '50px',
};


@IsScrolling
class Page extends Component {

  render() {
    const { isScrolling, isScrollingDown, isScrollingUp } = this.props;

    return (
      <div style={parentDivStyle}>

        <h1 style={{ ...overlayStyle, right: '50px' }}>
          {
            !isScrolling && 'Scroll Here!'
          }

          {
            isScrollingDown && 'You are scrolling DOWN!'
          }

          {
            isScrollingUp && 'You are scrolling UP!'
          }
        </h1>

        { !isScrolling &&
          <h1 style={{ ...overlayStyle, left: '50px' }}>
            This will hide on scrolling!
          </h1>
        }

      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
