const app = getApp()

Page({

  onClickFound: function () {
    if (app.globalData.isLogin) {
      // 跳转到物品发布页
      wx.navigateTo({
        url: "/pages/push-form/index" + "?" + "type=" + "招领"
      })
    } else {
      // 跳转到登录页
      wx.navigateTo({
        url: "/pages/login/index"
      })
    }
  },

  onClickLost: function () {
    if (app.globalData.isLogin) {
      // 跳转到物品发布页
      wx.navigateTo({
        url: "/pages/push-form/index" + "?" + "type=" + "失物"
      })
    } else {
      // 跳转到登录页
      wx.navigateTo({
        url: "/pages/login/index"
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this
    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected: 1
      })
    }
  }

})