import request from '@/utils/request'

export function addScriptApi(data) {
  return request({
    url: `/script`,
    method: 'post',
    data
  })
}

export function updateScriptApi(data) {
  return request({
    url: `/script/${data.id}`,
    method: 'put',
    data
  })
}

export function getScriptApi(data) {
    return request({
      url: `/script`,
      params:data
    })
}

export function delScriptApi(id) {
  return request({
    url: `/script/${id}`,
    method:'delete'
  })
}
  