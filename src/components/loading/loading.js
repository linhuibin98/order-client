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

  return {
    show() {
      div.style.display = 'block';
    },
    close() {
      const timer = setTimeout(() => {
        div.style.display = 'none';
        clearTimeout(timer);
      }, 500)
    }
  }
}

export default createLoading();
