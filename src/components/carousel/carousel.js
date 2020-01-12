import React, { useRef, useEffect, useState, cloneElement } from "react";
import "./carousel.less";

function Carousel(props) {
  let [offset, setOffset] = useState(0);
  let listRef = useRef(null);
  let [isTransition, setIsTransition] = useState(false);

  function clickListener(e) {
    // 动画未结束不可再次点击
    if (isTransition) return;
    let newOffset = offset + 100;
    setOffset(newOffset);
    setIsTransition(true);
  }

  function mapElement() {
    const result = props.children.map((item, index) => {
      let iProps = item.props;
      let children = iProps.children;
      return (
        <item.type key={index} onClick={clickListener} {...item.props} className="car_item">
          <children.type className="item_content" {...children.props}>
            {children.props.children}
          </children.type>
        </item.type>
      );
    });

    const firstEle = cloneElement(result[0], { key: "clone1" });
    result.push(firstEle);
    return result;
  }

  useEffect(() => {
    const listEle = listRef.current;
    function handleEnd() {
      if (offset === 300) {
        listEle.style.transition = "transform 0s";
        setOffset(0);
      } 
      setIsTransition(false);
      listEle.removeEventListener("transitionend", handleEnd);
    }
    listEle.addEventListener("transitionend", handleEnd);
    return () => {
      if(offset === 300) {
        let timer = setTimeout(() => {
          listEle.style.transition = "transform 1s";
          clearTimeout(timer);
        })
      }
     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <div className="carousel_container">
      <div
        ref={listRef}
        className="slick_list"
        style={{ transform: `translate3D(-${offset + "vw"}, 0px, 0px)` }}
      >
        {mapElement()}
      </div>
    </div>
  );
}

export default Carousel;
