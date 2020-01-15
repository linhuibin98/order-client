import React, { cloneElement, Component } from "react";
import "./my_carousel.less";

class Carousel extends Component {
  static defaultProps = {
    delay: 1
  };

  state = {
    currentIndex: 1
  };

  isInfinite = false;
  // 轮播图宽度
  viewWidth = window.innerWidth;

  toucheData = {};

  renderStyle = () => {
    const { currentIndex } = this.state;
    const { delay } = this.props;
    let offset = this.viewWidth * currentIndex * -1;

    return {
      transform: `translate3D(${offset}px, 0px, 0px)`,
      transition: `transform ${delay}s`
    };
  };

  toggleImg = () => {
    let { distance, isLeft } = this.toucheData;
    if (distance > 10) {
      let { currentIndex } = this.state;
      let changeIndex = isLeft ? currentIndex + 1 : currentIndex - 1;
      this.setState({
        currentIndex: changeIndex
      });
    }
  };

  touchHandle = () => {
    return {
      onTouchStart: e => {
        this.toucheData.startX = e.touches[0].pageX;
      },
      onTouchMove: e => {
        let endX = e.touches[0].clientX;
        let distance = Math.abs(endX - this.toucheData.startX) || 0;
        let isLeft = endX - this.toucheData.startX < 0;
        this.toucheData = {
          ...this.toucheData,
          endX,
          distance,
          isLeft
        };
      },
      onTouchEnd: e => {
        this.toggleImg();
      }
    };
  };

  mapElement = () => {
    const result = this.props.children.map((item, index) => {
      let iProps = item.props;
      let children = iProps.children;
      return (
        <item.type key={index} {...item.props} className="car_item">
          <children.type className="item_content" {...children.props}>
            {children.props.children}
          </children.type>
        </item.type>
      );
    });

    const firstEle = cloneElement(result[0], { key: "clone1" });
    const lastEle = cloneElement(result[result.length - 1], { key: "clone2" });
    result.unshift(lastEle);
    result.push(firstEle);
    return result;
  };

  componentDidMount() {}

  componentWillUpdate() {
    let { currentIndex } = this.state;
    if (this.isInfinite && (currentIndex === 4 || currentIndex === 0)) {
      this.refs.slickList.style.transition = "transform 0s";
    }
  }

  componentDidUpdate() {
    let { currentIndex } = this.state;

    if (this.isInfinite && (currentIndex === 3 || currentIndex === 1)) {
      setTimeout(() => {
        this.isInfinite = false;
        // this.refs.slickList.style.transition = `transform ${this.props.delay}s`;
      }, 0);
      return;
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        this.isInfinite = true;
        this.setState({
          currentIndex: 3
        });
      }, 0);
    } else if (currentIndex === 4) {
      setTimeout(() => {
        this.isInfinite = true;
        this.setState({
          currentIndex: 1
        });
      }, 0);
    }
  }

  render() {
    return (
      <div className="carousel_container">
        <div
          ref="slickList"
          className="slick_list"
          style={this.renderStyle()}
          {...this.touchHandle()}
        >
          {this.mapElement()}
        </div>
      </div>
    );
  }
}

export default Carousel;
