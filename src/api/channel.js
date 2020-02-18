// 导入axios模块
import request from '@/utils/request.js'

// 频道各种api创建
import store from '@/store' // 导入vuex模块，以便知道当前用户是否登录系统

// 本地持久化存储频道设置的key(游客 和 登录用户 分别设置)
const CHANNEL_KEY_TRAVEL = 'hm-channel-travel' // 游客key
const CHANNEL_KET_VIP = 'hm-channel-vip' // 登录用户Key
// 获得用户频道数据
export function apiChannelList () {
  // 通过Promise封装，通过resolve返回输出具体信息，
  // 因为所有api接口的返回结果都是Promise对象
  return new Promise(async (resolve) => {
    // 判断用户是否登录，并执行不同的key
    const key = store.state.user.token ? CHANNEL_KET_VIP : CHANNEL_KEY_TRAVEL
    // 获取本地频道数据
    const localChannels = localStorage.getItem(key)
    if (localChannels) {
      // 输出频道数据给外部
      resolve({ channels: JSON.parse(localChannels) })
    } else {
      const result = await request({
        url: '/app/v1_0/user/channels',
        method: 'get'
      })
      // 本地存储频道数据
      localStorage.setItem(key, JSON.stringify(result.channels))
      // 输出频道数据给外部
      resolve(result)
    }
  })
}
/**
 * 获取用户频道列表数据
 */
// export function apiChannelList() {
//   return request({
//     url: '/app/v1_0/user/channels',
//     method: 'get'
//   })
// }
/**
 * 获取所有频道数据
 */
export function apiChannelAll () {
  return request({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}
