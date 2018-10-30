<template>
  <div>
    <common-header :tittle="tittle" :showmore="true"></common-header>
    <div class="page-content">
      <mu-container>
        <div class="">
          <mu-stepper :active-step="vactiveStep" orientation="vertical">
            <mu-step>
              <mu-step-label>
                输入/扫描SKU
              </mu-step-label>
              <mu-step-content>
                <mu-text-field v-model="sku" placeholder="请输入SKU"></mu-text-field>
                <mu-button class="demo-step-button" @click="getSku()" color="primary">下一步</mu-button>
              </mu-step-content>
            </mu-step>

            <mu-step>
              <mu-step-label>
                输入收货数量
              </mu-step-label>
              <mu-step-content>
                <mu-row gutter>
                  <mu-col span="8">商品名称:{{skuData.descr}}</mu-col>
                  <mu-col span="4">商品条码:{{skuData.sku}}</mu-col>
                </mu-row>
                <mu-row gutter>
                  <mu-col span="2">数量：</mu-col>
                  <mu-col span="8"><mu-linear-progress size="15" mode="determinate" :value="(skuData.qtyReceived/skuData.qtyExpected)*100"></mu-linear-progress></mu-col>
                  <mu-col span="2">{{skuData.qtyReceived}} / {{skuData.qtyExpected}}</mu-col>
                </mu-row>
                <mu-row gutter>
                  <mu-col span="12"><mu-text-field type="number" placeholder="请输入数量" v-model="qty"></mu-text-field></mu-col>
                </mu-row>
                <mu-button class="demo-step-button" @click="receiving" color="primary">完成</mu-button>
                <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
              </mu-step-content>
            </mu-step>

          </mu-stepper>
        </div>
      </mu-container>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import {getSku} from '../../api/receipt'

export default {
  data () {
    return {
      tittle: '收货',
      receipt: {},
      sku: '',
      skuData: {},
      vactiveStep: 0,
      qty: ''
    }
  },
  components: {
    commonHeader
  },
  created() {
    this.getParams()
  },
  computed: {
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      var routerParams = this.$route.params.receipt
      // 将数据放在当前组件的数据内
      this.receipt = routerParams
    },
    getSku() {
      let skuObj = getSku(this.receipt.receiptKey, this.sku)
      if (skuObj.errFlag !== 0) {
        alert('sssss')
        Toast.error(skuObj.errMsg);
        return
      }
      this.skuData = skuObj
      this.skuData.sku = this.sku
      this.sku = ''
      this.vactiveStep++;
    },
    receiving(){
      if(this.qty + this.skuData.qtyReceived > this.skuData.qtyExpected){
        Toast.error('不允许超量收货');
        return
      }
      this.skuData.thisQtyReceived = this.qty

    },
    vhandlePrev() {
      this.vactiveStep--;
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
  .linear-progress {
    margin: 16px 0;
  }
</style>
