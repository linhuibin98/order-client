import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../store/actions';
import { reqGetAddress } from '../api';
import Toast from '../components/toast';
import { func } from 'prop-types';

function MyAddress(props) {
  let { history, addressList, getAddress, userInfo } = props;

  function handleGoBack() {
    history.goBack();
  }

  function deleteAddress(id) {
    console.log(id);
  }

  useEffect(() => {
    (async () => {
      const result = await reqGetAddress(userInfo.id);

      if (result.status === 200 && result.data.errorCode === 0) {
        getAddress(result.data.address);
      } else {
        Toast.error(result.data.message);
      }
    })()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='myaddress_container'>
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>我的地址</h1>
      </header>
      <section className='address_group'>
        {
          addressList.map((item, i) => {
            return (
              <div className='address_item' key={i}>
                <div className='address_detail'>
                  <div className='receiver_info'>
                    <span className='name'>{item.name}</span>
                    <span className='phone'>{item.phone}</span>
                  </div>
                  <div className='address_info'>
                    <span>{item.address}</span>
                    <span>10栋</span>
                  </div>
                </div>
                <div className='operate'>
                  <span className='iconfont icon-xiugai' onClick={() => {history.push(`/user/address/add/${item['_id']}`)}}></span>
                  <span className='iconfont icon-cha' onClick={() => {deleteAddress(item['_id'])}}></span>
                </div>
              </div>
            )
          })
        }
      </section>
      <Link className='footer' to={location => ({ pathname: '/user/address/add', state: { from: location.pathname } })}>
        <span className='iconfont icon-jia'></span>
        <p>新增收货地址</p>
      </Link>
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAddress: id => {
      dispatch(actions.user.userGetAddress(id))
    }
  }
}

export default connect(state => ({ addressList: state.user.address, userInfo: state.user.userInfo }), mapDispatchToProps)(MyAddress);