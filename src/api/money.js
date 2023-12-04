import request from "@/utils/request";

export function addMoneyApi(data) {
  return request({
    url: `/moneyType`,
    method: "post",
    data,
  });
}

export function getMoneyType(data) {
  return request({
    url: `/moneyType`,
    params:data
  });
}

export function delMoneyType(id) {
    return request({
      url: `/moneyType/${id}`,
      method:'delete'
    });
  }
  
