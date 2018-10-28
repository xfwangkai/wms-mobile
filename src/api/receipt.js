/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from '@/apiconfig/index'
// 登录接口
export function loginUserNo(params) {
  return fetch(`${baseUrl}/root/login/checkMemberLogin`, params)
}

export const receiptList = (status = '0') => {
  let retData = [
    {receiptKey: 'ASN001', supplierName: '供应商01', openQty: 20, arrivaldateExpect: '2018-01-01'},
    {receiptKey: 'ASN002', supplierName: '供应商02', openQty: 20, arrivaldateExpect: '2018-02-01'},
    {receiptKey: 'ASN003', supplierName: '供应商03', openQty: 20, arrivaldateExpect: '2018-03-01'},
    {receiptKey: 'ASN004', supplierName: '供应商04', openQty: 20, arrivaldateExpect: '2018-04-01'},
    {receiptKey: 'ASN005', supplierName: '供应商05', openQty: 20, arrivaldateExpect: '2018-05-01'}
  ]
  return retData
}
