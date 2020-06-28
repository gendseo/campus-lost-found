const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    showStatus: {
      type: Boolean,
      value: false
    },
    isAudit: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    onClickItem: function (e) {
      if (app.globalData.isLogin) {
        // 跳转到详细页
        if (this.data.isAudit) {
          wx.navigateTo({
            url: "/pages/detail/index" + "?" + "_id=" + e.currentTarget.dataset.id + "&" + "audit=" + true
          })
        } else {
          wx.navigateTo({
            url: "/pages/detail/index" + "?" + "_id=" + e.currentTarget.dataset.id + "&" + "audit=" + false
          })
        }
      } else {
        // 跳转到登录页
        wx.navigateTo({
          url: "/pages/login/index"
        })
      }
    }

  }
})