const app = getApp()

Page({

  /**
   * 物品名称输入框值改变时触发
   */
  onChangeTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  /**
   * 物品描述输入框值改变时触发
   */
  onChangeDescription: function (e) {
    this.setData({
      description: e.detail.value
    })
  },

  /**
   * 物品类型值改变时触发
   */
  onChangeSort: function () {
    let _this = this
    wx.lin.showActionSheet({
      itemList: this.data.sortList,
      success: function (e) {
        _this.setData({
          sort: e.item.name
        })
      },
      fail: function (e) {},
    })
  },

  /**
   * 物品图片添加时触发
   */
  onChangeImagePicker: function (e) {
    wx.showToast({
      title: '图片上传中~',
      icon: 'loading',
      duration: 3600000,
      mask: true,
    })
    let _this = this
    let timeStamp = e.timeStamp // 添加的时间戳
    let current = e.detail.current[0] // 当前添加的项
    wx.cloud.uploadFile({
      cloudPath: "images/" + app.globalData.openid + "_" + timeStamp,
      filePath: current.url,
      success: function (res) {
        _this.data.image.push(res.fileID)
        _this.setData({
          image: _this.data.image
        })
        wx.hideToast()
      },
      fail: function () {
        wx.hideToast()
        wx.lin.showMessage({
          type: 'error',
          content: '上传图片时发生错误！'
        })
      }
    })
  },

  onRemoveImagePicker: function (e) {
    let _this = this
    let index = e.detail.index
    _this.data.image.splice(index, 1)
    _this.setData({
      image: _this.data.image,
    })
  },

  onChangeCampus: function (e) {
    let _this = this
    _this.setData({
      campus: e.detail.currentKey,
    })
  },

  onChangeLocal: function (e) {
    let _this = this
    _this.setData({
      local: e.detail.value
    })
  },

  onChangeUser: function (e) {
    let _this = this
    _this.setData({
      user: e.detail.value
    })
  },

  onChangeAuth: function (e) {
    let _this = this
    wx.lin.showActionSheet({
      itemList: _this.data.authList,
      success: function (e) {
        _this.setData({
          auth: e.item.name
        })
      },
      fail: function () {},
    })
  },

  onChangeContact: function (e) {
    let _this = this
    _this.setData({
      contact: e.detail.value
    })
  },

  onSubmit: function () {
    wx.showToast({
      title: '提交表单中...',
      icon: 'loading',
      duration: 3600000,
      mask: true,
    })
    let _this = this
    if (!_this.checkInvalidKey()) {
      wx.hideToast()
      return
    }
    // 字段空值校验通过
    // 调用云函数提交表单
    wx.cloud.callFunction({
      name: "router",
      data: {
        $url: "/list/add",
        type: _this.data.type,
        title: _this.data.title,
        description: _this.data.description,
        sort: _this.data.sort,
        image: _this.data.image,
        campus: _this.data.campus,
        local: _this.data.local,
        user: _this.data.user,
        auth: _this.data.auth,
        contact: _this.data.contact,
      },
      success: function (res) {
        if (res.result._id) {
          _this.setData({
            showOK: true,
          })
          wx.hideToast()
        }
      }
    })

  },

  checkInvalidKey: function () {
    let _this = this
    if (_this.data.title === '' || _this.data.title.length === 0) {
      wx.lin.showMessage({
        content: '请填写物品名称！',
        type: 'error',
      })
      return false
    }
    if ((_this.data.description === '' || _this.data.description.length === 0) && (_this.data.image.length === 0)) {
      wx.lin.showMessage({
        content: '物品详情与物品图片至少填写一项！',
        type: 'error',
      })
      return false
    }
    if (_this.data.sort === '' || _this.data.sort.length === 0) {
      wx.lin.showMessage({
        content: '请选择物品类型！',
        type: 'error',
      })
      return false
    }
    if (_this.data.local === '' || _this.data.local.length === 0) {
      wx.lin.showMessage({
        content: '请填写拾放地点！',
        type: 'error',
      })
      return false
    }
    if (_this.data.auth === '' || _this.data.auth.length === 0) {
      wx.lin.showMessage({
        content: '请选择联系方式！',
        type: 'error',
      })
      return false
    }
    if (_this.data.contact === '' || _this.data.contact.length === 0) {
      wx.lin.showMessage({
        content: '请填写联系方式！',
        type: 'error',
      })
      return false
    }
    if (_this.data.user === '' || _this.data.user.length === 0) {
      if (_this.data.type === '招领') {
        _this.setData({
          user: '好心人'
        })
      } else {
        _this.setData({
          user: '可怜人'
        })
      }
      return true
    }
    return true
  },

  /**
   * 页面的初始数据
   */
  data: {
    showOK: false,
    sortList: [],
    authList: [{
        name: '手机',
        icon: '',
      },
      {
        name: 'QQ',
        icon: '',
      },
      {
        name: '微信',
        icon: '',
      }
    ],
    imageTemp: [],
    type: '',
    name: '',
    description: '',
    sort: '',
    image: [],
    campus: '杨林校区',
    local: '',
    user: '',
    auth: '',
    contact: '',
    time: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.setData({
      type: options.type,
      sortList: app.globalData.sortList,
    })
  }

})