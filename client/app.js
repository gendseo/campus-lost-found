//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    // 声明 this
    let _this = this
    // 定义全局变量
    _this.globalData = {}
    // 定义物品类型
    _this.globalData.sortList = [{
        name: '证件',
      },
      {
        name: '卡包',
      },
      {
        name: '文件',
      },
      {
        name: '伞',
      },
      {
        name: '数码产品',
      },
      {
        name: '其他',
      },
    ]
    // 获取用户设置
    wx.getSetting({
      withSubscriptions: true,
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权
          // 获取用户基本信息
          wx.getUserInfo({
            lang: "zh_CN",
            success: function () {
              _this.globalData.isLogin = true
            }
          })
          // 获取用户加密信息
          wx.cloud.callFunction({
            name: "router",
            data: {
              "$url": "/auth"
            },
            success: function (res) {
              if (res.result.openid) {
                _this.globalData.openid = res.result.openid
                _this.globalData.isSuper = res.result.super
              }
            }
          })
        }
      }
    })
  }
})