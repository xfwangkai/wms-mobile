/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch} from '@/apiconfig/index'

export function validateFromLoc(params) {
  return fetch(`/validateFromLoc`, params)
}

export function validateToLoc(params) {
  return fetch(`/validateToLoc`, params)
}

export function validateSku(params) {
  return fetch(`/validateSku`, params)
}

export function getInvData(params) {
  return fetch(`/getInv`, params)
}

export function doMoving(params) {
  return fetch(`/doMoving`, params)
}

export function adjust(params) {
  return fetch(`/adjust`, params)
}
