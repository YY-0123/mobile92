import request from '@/utils/request'

/**
 * 获得联想建议数据
 * @param {联想的关键字} q
 */
export function apiSuggestionList ({ q }) {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: {
      q
    }
  })
}
