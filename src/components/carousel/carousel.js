import React, { Component } from "react";
import Swipe from 'react-swipe';
import './carousel.less';

class Carousel extends Component {
  static defaultProps = {
    speed: 500,
    auto: 3000
  };

  render() {
    const { auto, speed, children} = this.props;
    return (
      <Swipe swipeOptions={{
        auto,
        speed
      }}>
        {
          children
        }
      </Swipe>
    );
  }
}

export default Carousel;
