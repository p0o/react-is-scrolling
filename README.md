## Getting started
This package is providing you a Higher Order Component with a declarative API so you can detect if your users are scrolling in the browser or not. Apart from that you can also detect the direction of their scrolling like below.

`npm i react-is-scrolling --save`

```
import React, { Component } from 'react';
import IsScrolling from 'react-is-scrolling';

@IsScrolling
export default class YourComponent extends Component {
  render() {
    const { isScrolling, isScrollingDown, isScrollingUp } = this.props;
    
    return (
      <div>
        { isScrolling &&
          <p>You are scrolling</p>
        }
        
        { isScrollingDown &&
          <p>You are scrolling down</p>
        }
        
        { isScrollingUp &&
          <p>You are scrolling up</p>
        }
      </div>
    );
  }
}
```

Notice that this package is not using an imperative event based system like other packages so it is much more aligned with React's declarative nature. Also it abstracts away all the heavy lifting of debouncing browser's `scroll` event and is intended to support different browsers.

If you are not using ES7 decorator functions like `@IsScrolling` or you want to have this package on a stateless/function component, you can simply use it this way:


```
import React, { Component } from 'react';
import IsScrolling from 'react-is-scrolling';

function YourComponent({isScrolling, isScrollingDown, isScrollingUp}) {
  return (
    <div>
      { isScrolling &&
        <p>You are scrolling</p>
      }

      { isScrollingDown &&
        <p>You are scrolling down</p>
      }

      { isScrollingUp &&
        <p>You are scrolling up</p>
      }
    </div>
  );
}

export default IsScrolling(YourComponent);
```
