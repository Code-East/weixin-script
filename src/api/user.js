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

// 增加用户
export function addUser(data) {
  return request({
    url: `/user`,
    method: 'post',
    data
  })
}

// 修改密码
export function setPassword(id,password) {
  return request({
    url: `/user/password/${id}`,
    method: 'put',
    params:{
      password
    }
  })
}

// 修改密码
export function delUserApi(id) {
  return request({
    url: `/user/${id}`,
    method: 'delete'
  })
}



