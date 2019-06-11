/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch} from '@/apiconfig/index'
// 登录接口
export function loginUserNo(params) {
  return fetch(`${baseUrl}/root/login/checkMemberLogin`, params)
}

export function fetchShipmentListData(params) {
  return fetch(`/getShipmentList`, params)
}

export function fetchShipmentDetail(params) {
  return fetch('/getShipmentInfo', params)
}

