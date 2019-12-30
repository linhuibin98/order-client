import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../store/actions';

function MyAddress(props) {
  let { history, addressList, getAddress, userInfo } = props;
  
  function handleGoBack() {
    history.goBack();
  }

  useEffect(() => {
    getAddress(userInfo.id);
  }, [getAddress, userInfo.id]);

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
                  <span className='iconfont icon-xiugai'></span>
                  <span className='iconfont icon-cha'></span>
                </div>
              </div>
            )
          })
        }
      </section>
      <Link className='footer' to={location => ({pathname: '/user/address/add', state: {from: location.pathname}})}>
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