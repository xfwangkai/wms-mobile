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

export function fetchReceiptListData(params) {
  return fetch(`/getReceiptList`, params)
}

export function fetchReceiptDetail(params) {
  return fetch('/getReceiptInfo', params)
}

export function doReceive(params) {
  return fetch('/doReceive', params)
}
