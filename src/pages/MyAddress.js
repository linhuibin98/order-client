import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '../store/actions'
import { reqDeleteAddress } from '../api'
import Toast from '../components/toast'
import Modal from '../components/modal'
import EmptyTip from '../components/empty-tip'

function MyAddress(props) {
  let { history, addressList, getAddress, userInfo } = props

  function handleGoBack() {
    history.goBack()
  }

  function deleteAddress(id) {
    Modal.confirm({
      contentText: '确认删除吗?',
      async onOk() {
        const result = await reqDeleteAddress(id)

        if (result.status === 200 && result.data.errorCode === 0) {
          getAddress(userInfo.id)
          return Toast.success(result.data.message)
        }
        Toast.error(result.data.message)
      }
    })
  }

  useEffect(() => {
    getAddress(userInfo.id)
  }, [getAddress, userInfo.id])

  return (
    <div className="myaddress_container">
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>我的地址</h1>
      </header>
      {!addressList.length ? (
        <EmptyTip />
      ) : (
        <section className="address_group">
          {addressList.map((item, i) => {
            return (
              <div className="address_item" key={i}>
                <div className="address_detail">
                  <div className="receiver_info">
                    <span className="name">{item.name}</span>
                    <span className="phone">{item.phone}</span>
                  </div>
                  <div className="address_info">
                    <span>{item.address}</span>
                    <span>{item.detail}</span>
                  </div>
                </div>
                <div className="operate">
                  <span
                    className="iconfont icon-xiugai"
                    onClick={() => {
                      history.push(`/user/address/add/${item['_id']}`)
                    }}
                  ></span>
                  <span
                    className="iconfont icon-cha"
                    onClick={() => {
                      deleteAddress(item['_id'])
                    }}
                  ></span>
                </div>
              </div>
            )
          })}
        </section>
      )}
      <Link
        className="footer"
        to={location => ({
          pathname: '/user/address/add',
          state: { from: location.pathname }
        })}
      >
        <span className="iconfont icon-jia"></span>
        <p>新增收货地址</p>
      </Link>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getAddress: id => {
      dispatch(actions.user.userGetAddress(id))
    }
  }
}

export default connect(
  state => ({ addressList: state.user.address, userInfo: state.user.userInfo }),
  mapDispatchToProps
)(MyAddress)
