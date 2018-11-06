import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 需要左方向动画的路由用this.$router.to('****')
Router.prototype.togo = function (path) {
  this.isleft = true
  this.isright = false
  this.push(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true
  this.isleft = false
  this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true
  this.isleft = false
  this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.togoback = function () {
  this.isright = true
  this.isleft = false
}
// 点击浏览器前进按钮执行
Router.prototype.togoin = function () {
  this.isright = false
  this.isleft = true
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/pages/index'], resolve),
      redirect: '/receipt',
      children: [
        {
          path: '/receipt',
          name: 'receipt',
          component: (resolve) => require(['@/pages/inbound/receipt-list'], resolve)
        },

        {
          path: '/moving',
          name: 'moving',
          component: (resolve) => require(['@/pages/inventory/moving'], resolve)
        },
        {
          path: '/shipment',
          name: 'shipmentlist',
          component: (resolve) => require(['@/pages/outbound/shipment-list'], resolve)
        },
        {
          path: '/shipment/pickingtask',
          name: 'pickingtask',
          component: (resolve) => require(['@/pages/outbound/picking-task-list'], resolve)
        },
        {
          path: '/adjustment',
          name: 'adjustment',
          component: (resolve) => require(['@/pages/inventory/adjustment'], resolve)
        }
      ]
    },
    {
      path: '/receipt/receiptdetail',
      name: 'receiptdetail',
      component: (resolve) => require(['@/pages/inbound/receipt-detail-list'], resolve)
    },
    {
      path: '/qrscanner',
      name: 'qrscanner',
      component: (resolve) => require(['@/components/qrscanner'], resolve)
    }
  ]
})
