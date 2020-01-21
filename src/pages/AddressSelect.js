import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '../store/actions'
import { getStorage, setStorage } from '../util/storage'
import formatSearch from '../util/formatSearch'
import EmptyTip from '../components/empty-tip'

function MyAddress(props) {
  let { history, addressList, getAddress, userInfo, location } = props

  useEffect(() => {
    getAddress(userInfo.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleGoBack() {
    let redirect = formatSearch(location.search)

    redirect ? history.replace(redirect) : history.goBack()
  }

  function selectAddress(e) {
    let index = e.currentTarget.getAttribute('data-index')
    let currentAddress = addressList[index]

    let address = getStorage('address') || {}
    address[userInfo.id] = currentAddress
    setStorage('address', address)
    handleGoBack()
  }

  return (
    <div className="myaddress_container">
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>选择地址</h1>
      </header>
      {!addressList.length ? (
        <EmptyTip />
      ) : (
        <section className="address_group">
          {addressList.map((item, i) => {
            return (
              <div
                className="address_item"
                key={i}
                data-index={i}
                onClick={selectAddress}
              >
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
                  <input type="radio" name="select" id="select" />
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
          search: `?redirect=${location.pathname + location.search}`
        })}
      >
        <span className="iconfont icon-jia"></span>
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

export default connect(
  state => ({ addressList: state.user.address, userInfo: state.user.userInfo }),
  mapDispatchToProps
)(MyAddress)
