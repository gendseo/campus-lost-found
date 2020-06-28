Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showStatus: {
      type: Boolean,
      value: false,
    },
    status: Number,
    type: String,
    title: String,
    description: String,
    image: {
      type: Array,
      value: [],
    },
    campus: String,
    local: String,
    time: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {}
})