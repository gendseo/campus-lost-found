const app = getApp()

Page({

  // 点击不同类型的选项卡后触发
  onChangeStatus: function (e) {
    wx.showToast({
      title: '努力加载中...',
      icon: 'loading',
      duration: 3600000,
      mask: true,
    })
    let _this = this
    let sort = e.detail.activeKey
    // 请求云函数router的list接口
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: '/list'
      },
      success: function (res) {
        // 请求成功，开始解析数据
        if (sort === '') {
          // 选择的是全部选项卡
          _this.setData({
            list: res.result.data,
            activeKey: e.detail.activeKey,
            showNone: res.result.data.length === 0,
          })
          wx.hideToast()
          return
        }
        // 选择的是某类别选项卡
        // 过滤失物招领信息类型为点击的选项卡的类型
        let l = res.result.data.filter(function (ele) {
          return ele.sort === sort
        })
        _this.setData({
          list: l,
          activeKey: e.detail.activeKey,
          showNone: l.length === 0,
        })
        wx.hideToast()
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    showNone: false,
    activeKey: '',
    sortList: [],
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
    _this.setData({
      sortList: app.globalData.sortList,
    })
    wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: '/list'
      },
      success: function (res) {
        _this.setData({
          list: res.result.data,
          showNone: res.result.data.length === 0,
        })
        wx.hideToast()
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this
    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected: 0
      })
    }
  }

})