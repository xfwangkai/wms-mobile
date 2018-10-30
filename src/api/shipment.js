/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from '@/apiconfig/index'


export const shipmentList = (status = '0') => {
  let retData = [
    {orderKey: 'SO001', consigneeName: '门店01', openQty: 20, arrivaldateExpect: '2018-01-01'},
    {orderKey: 'SO002', consigneeName: '门店02', openQty: 20, arrivaldateExpect: '2018-02-01'},
    {orderKey: 'SO003', consigneeName: '门店03', openQty: 20, arrivaldateExpect: '2018-03-01'},
    {orderKey: 'SO004', consigneeName: '门店04', openQty: 20, arrivaldateExpect: '2018-04-01'},
    {orderKey: 'SO005', consigneeName: '门店05', openQty: 20, arrivaldateExpect: '2018-05-01'}
  ]
  return retData
}

export const taskList = (orderKey) => {
  let retData = [
    {loc: 'A01-01-01', sku: 'SKU001', descr: '测试商品001', qty: 14},
    {loc: 'A01-01-02', sku: 'SKU002', descr: '测试商品002', qty: 15},
    {loc: 'A01-01-03', sku: 'SKU003', descr: '测试商品003', qty: 16},
    {loc: 'A01-01-04', sku: 'SKU004', descr: '测试商品004', qty: 17},
    {loc: 'A01-01-05', sku: 'SKU005', descr: '测试商品005', qty: 18},
  ]
  return retData
}
