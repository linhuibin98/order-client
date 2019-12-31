import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./loading.less";

class Loading extends Component {

  render() {
    return (
      <div className='icon_wrapper'>
        <i className="iconfont icon-loading loading"></i>
        <p>加载中...</p>
      </div>
    );
  }
}

function createLoading() {
  const div = window.document.createElement("div");
  div.style.cssText = "display: none; position: absolute; left: 0; top: 0; z-index: 999; width: 100%; min-height: 100%; background: rgba(0, 0, 0, .1);";
  window.document.body.appendChild(div);

  const ref = React.createRef();
  ReactDOM.render(<Loading ref={ref} />, div);

  const _eventPreventDefault = function (e) {
    e.preventDefault();
  };

  return {
    show() {
      this.disablePageScroll();
      div.style.display = 'block';
      window.document.body.appendChild(div);
    },
    close() {
      const timer = setTimeout(() => {
        this.allowPageScroll();
        div.style.display = 'none';
        clearTimeout(timer);
      }, 500)
    },
    // loading时禁止用户滑屏
    disablePageScroll() {
      document.querySelector("html").style.overflow = "hidden";
      document.addEventListener("touchmove", _eventPreventDefault, false);
    },
    allowPageScroll: function () {
      document.querySelector("html").style.overflow = "auto";
      document.removeEventListener("touchmove", _eventPreventDefault, false);
    }
  }
}

export default createLoading();
