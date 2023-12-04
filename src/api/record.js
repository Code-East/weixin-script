import request from "@/utils/request";

export function getRechargeApi(data) {
  return request({
    url: `/rechargeInfo`,
    params:data
  });
}

export function getConsumptionApi(data) {
    return request({
      url: `/consumptionInformation`,
      params:data
    });
  }