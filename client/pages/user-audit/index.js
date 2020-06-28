const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNone: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showToast({
      title: '努力加载中...',
      icon: 'loading',
      duration: 3600000,
      mask: true,
    })
    let _this = this
    _this.setData({
      list: app.globalData.auditList,
      showNone: app.globalData.auditList.length === 0,
    })
    wx.hideToast()
  }

})