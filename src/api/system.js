import request from '@/utils/request'

export function getSettingApi() {
  return request({
    url: '/setting',
  })
}

export function setSettingApi(data) {
    return request({
      url: `/setting/${data.id}`,
      method:"put",
      data
    })
  }