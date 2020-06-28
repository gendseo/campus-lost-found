// client/pages/user-push/index.js
Page({

  onChangeStatus: function (e) {
    wx.showToast({
      title: '努力加载中...',
      icon: 'loading',
      duration: 3600000,
      mask: true,
    })
    let _this = this
    let status = e.detail.activeKey
    if (status === '') {
      _this.setData({
        list: _this.data.all,
        showNone: _this.data.all.length === 0,
      })
      wx.hideToast()
      return
    } else {
      status = parseInt(status, 10)
    }
    let l = _this.data.all.filter(function (ele) {
      return ele.status === status
    })
    _this.setData({
      list: l,
      showNone: l.length === 0,
    })
    wx.hideToast()
  },

  /**
   * 页面的初始数据
   */
  data: {
    showNone: false,
    all: [],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '努力加载中...',
      icon: 'loading',
      duration: 3600000,
      mask: true,
    })
    let _this = this
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: '/list/user'
      },
      success: function (res) {
        _this.setData({
          all: res.result.data,
          list: res.result.data,
          showNone: res.result.data.length === 0,
        })
        wx.hideToast()
      }
    })
  }

})