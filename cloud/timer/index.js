// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  // -1: 审核失败
  //  0: 待审核
  //  1: 审核通过

  console.log(new Date().toLocaleString(), '开始清理周期较长的失物招领信息...')

  // 选择list列表中失物招领信息状态为审核通过的项
  let pre_list = await db.collection('list').where({
    status: 1,
  }).get()

  // 依次过滤获取到的list列表项
  let old_list = pre_list.data.filter(item => {
    // (new Date().getTime() - new Date(item.time).getTime()) 从发布到现在的毫秒数
    // (24*3600*1000) 一天的毫秒数
    return (new Date().getTime() - new Date(item.time).getTime())/(24*3600*1000) >= 5
  })

  let old_ids = old_list.map(item => {
    return item._id
  })

  // console.log(old_ids)

  await old_ids.forEach(id => {
    // 选择 list 集合
    db.collection('list').doc(id).update({
      // 将失物招领信息状态变为待审核
      data: {
        status: 0
      }
    })
    console.log('id 为', id, '的失物招领信息状态被变为待审核了！')
  })

  console.log(new Date().toLocaleString(), '：清理完成，本次运行定时器清理了', old_ids.length, '条失物招领信息！')
}