import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IsScrolling from '../src/IsScrolling.js';

const smallDivStyle = {
  background: 'LightSteelBlue',
  width: '25%',
  height: '300px',
  overflow: 'scroll',
  margin: '10px 12.5%',
  float: 'left',
};

const parentDivStyle = {
  height: '2000px'
};

const overlayStyle = {
  position: 'fixed',
  background: 'LightSkyBlue',
};

const fillContent = (text = 'Scroll Here!') => {
  const content = [];
  for (let i = 0; i < 100; i++) {
    content.push(<p key={i} >{ text }</p>);
  }
  return content;
};

const SmallDivStatelessComponent = ({ isScrolling }) =>
  <div style={smallDivStyle}>
    { fillContent() }
  </div>


class Page extends Component {

  render() {
    return (
      <div style={parentDivStyle}>
        <SmallDivStatelessComponent />
        <h1 style={overlayStyle}>Scroll Here!</h1>
        <h1 style={{ ...overlayStyle, bottom: '50px' }}>
          This will hide on scrolling!
        </h1>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
