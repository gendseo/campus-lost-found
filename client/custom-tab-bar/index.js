// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    tabbarList: [{
        pagePath: "/pages/index/index",
        iconPath: "/images/tabbar/swzl.svg",
        selectedIconPath: "/images/tabbar/swzl.svg",
        text: "失物招领"
      },
      {
        pagePath: "/pages/push-pop/index",
        iconPath: "/images/tabbar/push.svg",
        selectedIconPath: "/images/tabbar/push.svg",
        text: "发布",
        style: "circle"
      },
      {
        pagePath: "/pages/user/index",
        iconPath: "/images/tabbar/user.svg",
        selectedIconPath: "/images/tabbar/user.svg",
        text: "我的"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})