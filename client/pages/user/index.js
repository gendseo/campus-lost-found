const app = getApp()

Page({

  onClickLogin: function () {
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/login/index"
      })
    }
  },

  onClickMyPush: function () {
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/login/index"
      })
      return
    }
    wx.navigateTo({
      url: "/pages/user-push/index"
    })
  },

  onClickAudit: function () {
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/login/index"
      })
      return
    }
    wx.navigateTo({
      url: "/pages/user-audit/index"
    })
  },

  onClickFeedback: function () {
    wx.showToast({
      title: "暂无法反馈!",
      icon: "none",
      mask: true,
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    isSuper: false,
    isLogin: false,
    auditLen: 0,
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

    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected: 2
      })
    }

    if (app.globalData.isLogin) {
      _this.setData({
        isLogin: app.globalData.isLogin,
        isSuper: app.globalData.isSuper,
      })
    }

    // 判断用户是否是管理员角色
    if (app.globalData.isSuper) {
      // 请求需要审核的失物招领信息列表
      wx.cloud.callFunction({
        name: "router",
        data: {
          $url: "/list/audit"
        },
        success: function (res) {
          app.globalData.auditList = res.result.data
          _this.setData({
            auditLen: res.result.data.length,
          })
        }
      })
    }
  
    wx.hideToast()
  }

})