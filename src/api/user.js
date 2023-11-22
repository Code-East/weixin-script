import request from '@/utils/request'

export function login(data) {
  return request({
    url: `/login`,
    method: 'post',
    data
  })
}

// 获取用户
export function getUserList(data) {
  return request({
    url: `/user`,
    method: 'get',
    params:data
  })
}

// 获取用户
export function setUserMoney(data) {
  return request({
    url: `/user/${data.id}`,
    method: 'put',
    data
  })
}


