const cloud = require('wx-server-sdk') // 引入云开发sdk
const TcbRouter = require('tcb-router') //引入TcbRouter

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database() // 获取数据库实例
const _ = db.command // 数据库操作符

exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  const wxContext = cloud.getWXContext() //获取请求云函数的上下文

  /**
   * 用户登录
   * 返回openid，appid，unionid，env，super
   */
  app.router('/auth', async (ctx, next) => {
    let s = await db.collection('super').where({
      openid: _.eq(wxContext.OPENID)
    }).get()
    ctx.body = {
      openid: wxContext.OPENID, // 用户id
      appid: wxContext.APPID, // 小程序id
      unionid: wxContext.UNIONID, // 多个小程序的用户唯一id
      env: wxContext.ENV, // 调用环境
      super: s.data.length === 1, // 用户权限
    }
    await next()
  })

  /**
   * 一般是首页请求
   * 获取审核通过的物品列表
   */
  app.router('/list', async (ctx, next) => {
    let s = await db.collection('list').where({
      status: _.eq(1)
    }).get()
    ctx.body = {
      data: s.data
    }
    await next()
  })

  /**
   * 一般是用户发布页请求
   * 获取用户发布的物品列表
   */
  app.router('/list/user', async (ctx, next) => {
    let s = await db.collection('list').where({
      openid: _.eq(wxContext.OPENID)
    }).get()
    ctx.body = {
      data: s.data
    }
    await next()
  })

  /**
   * 一般是用户审核页请求
   * 获取需要审核的物品列表
   */
  app.router('/list/audit', async (ctx, next) => {
    let s = await db.collection('list').where({
      status: _.eq(0)
    }).get()
    ctx.body = {
      data: s.data
    }
    await next()
  })

  /**
   * 一般是审核操作请求
   * 改变物品审核状态
   */
  app.router('/item/audit', async (ctx, next) => {
    await db.collection('list').doc(event._id).update({
      data: {
        status: event.status
      }
    })
    await next()
  })

  /**
   * 根据请求的_id获取物品详情
   */
  app.router('/list/detail', async (ctx, next) => {
    let data
    try {
      let s = await db.collection('list').doc(event._id).get()
      data = s.data
    } catch (error) {
      data = null
    }
    ctx.body = {
      data: data
    }
    await next()
  })

  /**
   * 添加一个物品
   */
  app.router('/list/add', async (ctx, next) => {
    let s = await db.collection('list').add({
      data: {
        type: event.type,
        title: event.title,
        description: event.description,
        sort: event.sort,
        image: event.image,
        campus: event.campus,
        local: event.local,
        user: event.user,
        auth: event.auth,
        contact: event.contact,
        status: 0,
        openid: wxContext.OPENID,
        time: new Date(),
      }
    })
    ctx.body = s
    await next()
  })

  return app.serve()
}