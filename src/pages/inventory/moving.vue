<template>
  <div>
    <common-header :title="tittle" :showmore="true"></common-header>
    <div class="page-content">
      <mu-container>
        <div class="">
          <mu-stepper :active-step="vactiveStep" orientation="vertical">
            <mu-step>
              <mu-step-label>
                输入/扫描库位
              </mu-step-label>
              <mu-step-content>
                <mu-row gutter>
                  <mu-col><QrscanIcon :field-id="fromlocQR"></QrscanIcon></mu-col>
                  <mu-col><mu-text-field v-model="fromloc" placeholder="请输入移出库位"></mu-text-field></mu-col>
                </mu-row>
                <mu-row gutter>
                  <mu-col offset="3"><mu-button @click="getFromlocData()" color="primary">下一步</mu-button></mu-col>
                </mu-row>
              </mu-step-content>
            </mu-step>

            <mu-step>
              <mu-step-label>
                输入/扫描SKU
              </mu-step-label>
              <mu-step-content>
                <p>原库位:{{fromloc}}</p>
                <mu-row gutter>
                  <mu-col><QrscanIcon :field-id="skuQR"></QrscanIcon></mu-col>
                  <mu-col><mu-text-field v-model="sku" placeholder="请输入SKU"></mu-text-field></mu-col>
                </mu-row>
                <mu-row gutter>
                  <mu-col offset="3">
                    <mu-button class="demo-step-button" @click="getInvData" color="primary">下一步</mu-button>
                    <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
                  </mu-col>
                </mu-row>
              </mu-step-content>
            </mu-step>

            <mu-step>
              <mu-step-label>
                输入目标库位
              </mu-step-label>
              <mu-step-content>
                <p>
                  原库位:{{fromloc}}
                  货品名称:{{invData.descr}}
                  库存数量:{{invData.invQty}}
                </p>
                <mu-row gutter>
                  <mu-col><QrscanIcon :field-id="tolocQR"></QrscanIcon></mu-col>
                  <mu-col><mu-text-field v-model="toloc" placeholder="请输入目标库位"></mu-text-field></mu-col>
                </mu-row>
                <mu-row gutter>
                  <mu-col offset="3">
                    <mu-button class="demo-step-button" @click="validToloc" color="primary">下一步</mu-button>
                    <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
                  </mu-col>
                </mu-row>
              </mu-step-content>
            </mu-step>

            <mu-step>
              <mu-step-label>
                输入数量
              </mu-step-label>
              <mu-step-content>
                <p>
                  原库位:{{fromloc}}
                  货品名称:{{invData.descr}}
                  库存数量:{{invData.qty}}
                  目标库位:{{toloc}}
                </p>
                <mu-text-field type="number" placeholder="请输入数量" v-model="qty"></mu-text-field>
                <mu-button class="demo-step-button" @click="doMoving" color="primary">完成</mu-button>
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
import QrscanIcon from '../../components/qrscan-icon'

export default {
  data () {
    return {
      tittle: '移库',
      fromloc: '',
      sku: '',
      invData: {},
      vactiveStep: 0,
      toloc: '',
      qty: '',
      skuQR: 'skuQR',
      fromlocQR: 'fromlocQR',
      tolocQR: 'tolocQR'
    }
  },
  components: {
    commonHeader,
    QrscanIcon
  },
  created() {
    this.getParams()
  },
  mounted() {
    if (this.$route.query.qrResult) {
      let qrResult = this.$route.query.qrResult
      if (qrResult.fieldId === this.skuQR) {
        this.sku = qrResult.qrString
      } else if (qrResult.fieldId === this.fromlocQR) {
        this.fromloc = qrResult.qrString
      } else if (qrResult.fieldId === this.tolocQR) {
        this.toloc = qrResult.qrString
      }
    }
  },
  computed: {
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
    getFromlocData() {
      this.vactiveStep++
    },
    getInvData() {
      this.invData = {
        fromloc: this.fromloc,
        toloc: this.toloc,
        sku: this.sku,
        invQty: Math.random(),
        descr: '测试SKU0001'
      }
      this.vactiveStep++
    },
    validToloc() {
      this.vactiveStep++
    },
    doMoving() {
      this.vactiveStep++
    },
    vhandlePrev() {
      this.vactiveStep--
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

</style>
