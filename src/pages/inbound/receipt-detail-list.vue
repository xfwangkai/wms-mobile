<template>
  <div>
    <common-header :tittle="tittle" :showmore="true"></common-header>
    <div class="page-content">
      <section>
        <mt-field placeholder="请输入SKU" v-show="showSkuInput" @keyup.enter.native="getSku()" v-model="sku"></mt-field>
        <div v-show="!showSkuInput">
          <mt-cell :title="skuData.descr" :value="skuData.sku"></mt-cell>
          <mt-progress :value="60" :bar-height="25"></mt-progress>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import {getSku} from '../../api/receipt'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      tittle: '详情',
      receipt: {},
      showSkuInput: true,
      sku: '',
      skuData: {}
    }
  },
  components: {
    commonHeader
  },
  created() {
    this.getParams()
  },
  methods: {
    tohome () {
      this.$router.goBack()
    },
    getParams () {
      // 取到路由带过来的参数
      var routerParams = this.$route.params.receipt
      // 将数据放在当前组件的数据内
      this.receipt = routerParams
    },
    getSku() {
      let skuObj = getSku(this.receipt.receiptKey, this.sku)
      if (skuObj.errFlag !== 0) {
        Toast({
          message: skuObj.errMsg,
          iconClass: 'icon icon-failed'
        })
        return
      }
      this.skuData = skuObj
      this.showSkuInput = !this.showSkuInput
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";

</style>
