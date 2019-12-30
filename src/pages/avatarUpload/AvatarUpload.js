import React, { useRef, useEffect, useState } from "react";
import "./avatarUpload.less";
import Toast from "../../components/toast";
import { uploadAvatar } from "../../api";
import { connect } from "react-redux";
import { setStorage, getStorage } from '.././../util/storage';

function AvatarUpload(props) {
  let { userInfo, history } = props;
  let file = useRef(null);
  let preImg = useRef(null);

  let [isSelected, setSelect] = useState(false);

  useEffect(() => {
    const ava = file.current;
    ava.addEventListener("change", () => {
      const fl = ava.files[0];
      const img = preImg.current;
      if (fl) {
        let url = window.URL.createObjectURL(fl);
        img.src = url;
        img.onload = function() {
          // 释放一个之前通过调用 URL.createObjectURL创建的 URL 对象
          window.URL.revokeObjectURL(url);
        };
        setSelect(true);
      } else {
        setSelect(false);
      }
    });
  }, []);

  function handleClick() {
    file.current.click();
  }

  function goBack() {
    history.goBack();
  }

  async function confirmUpload() {
    const fl = file.current.files[0];
    if (!fl) {
      Toast.error("请选择文件...");
    } else {
      let data = new FormData();
      data.append("avatar", fl);

      const res = await uploadAvatar({
        id: userInfo.id,
        data
      });

      if (res.data.errorCode === 0) {
        let id = userInfo.id;
        Toast.success('修改成功...');
        let avatars = getStorage('avatar') || {};
        avatars[id] = res.data.avatar;
        setStorage('avatar', avatars);
        history.push('/user/info');
      }
    }
  }

  return (
    <div className="upload">
      <section className="head_bar">
        <span onClick={goBack}>返回</span>
        <span onClick={confirmUpload}>确认</span>
      </section>
      <div className="up">
        <button type="button" className="btn" onClick={handleClick}>
          {!isSelected ? <span>选择图片</span> : <span>重新选择</span>}
          <img
            ref={preImg}
            src=""
            alt=""
            style={{ display: isSelected ? "inline-block" : "none", width: '100%', height: '100%', borderRadius: '100%' }}
          />
        </button>
        <input
          type="file"
          ref={file}
          name="avatar"
          id="avatar"
          accept=".jpg, .jpeg, .png"
        />
      </div>
    </div>
  );
}

export default connect(state => ({ userInfo: state.user.userInfo }))(
  AvatarUpload
);
