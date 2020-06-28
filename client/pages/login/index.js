const app = getApp()

Page({

  getUserInfo: async () => {
    wx.showToast({
      title: '努力加载中...',
      icon: 'loading',
      duration: 3600000,
      mask: true,
    })
    let setting = await wx.getSetting({
      withSubscriptions: true
    })
    if (setting.authSetting["scope.userInfo"]) {
      let userInfo = await wx.getUserInfo({
        lang: "zh_CN"
      })
      let auth = await wx.cloud.callFunction({
        name: "router",
        data: {
          $url: "/auth"
        }
      })
      app.globalData.avatarUrl = userInfo.userInfo.avatarUrl
      app.globalData.nickName = userInfo.userInfo.nickName
      app.globalData.openid = auth.result.openid
      app.globalData.isSuper = auth.result.super
      app.globalData.isLogin = true
    }
    wx.hideToast()
    wx.navigateBack()
  }

})