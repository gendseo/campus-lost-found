const app = getApp()

Page({

  /**
   * 复制联系方式
   */
  onClickContact: function () {
    let _this = this
    wx.setClipboardData({
      data: _this.data.item.contact
    })
  },

  /**
   * 审核操作
   */
  onClickAudit: function (e) {
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
        $url: '/item/audit',
        _id: _this.data.item._id,
        status: e.currentTarget.dataset.status
      },
      complete: function () {
        app.globalData.auditList = app.globalData.auditList.filter(({
          _id
        }) => _id !== _this.data.item._id)
        wx.hideToast()
        wx.navigateBack()
      }
    })
  },

  /**
   * 图片预览
   */
  onClickPreviewImage: function (e) {
    let _this = this
    wx.previewImage({
      urls: _this.data.item.image,
      current: _this.data.item.image[e.currentTarget.dataset.index],
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    audit: false,
    showNone: false,
    isShow:false,
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showToast({
      title: '努力加载中...',
      icon: 'loading',
      duration: 3600000,
      mask: true,
    })

    let _this = this

    // 初始化传入的参数
    options.audit === 'true' ? _this.setData({
      audit: true
    }) : _this.setData({
      audit: false
    })

    let a = await new Promise((resolve, reject) => wx.cloud.callFunction({
      name: 'router',
      data: {
        $url: '/list/detail',
        _id: options._id,
      },
      success: res => resolve(res),
      fail: err => reject(err),
    }))

    if (a.result.data) {
      _this.setData({
        item: a.result.data,
        isShow: true,
      })
    } else {
      _this.setData({
        showNone: true,
        isShow:false,
      })
    }

    wx.hideToast()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log(this.data.item)
    let _this = this
    let title = '校园失物招领' + '-' + _this.data.item.type + '！' + _this.data.item.title
    let path = '/pages/detail/index' + '?' + '_id=' + _this.data.item._id
    return {
      title: title,
      path: path
    }
  },

})