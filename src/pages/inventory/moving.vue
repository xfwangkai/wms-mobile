<template>
  <div>
    <div v-if="isScan">
      <qrscanner @getQR="getQR" @closeScan="isScan=false"></qrscanner>
    </div>
    <div v-else>
      <common-header :title="tittle" :showmore="true"></common-header>
      <div class="page-content">
        <mu-container>
            <mu-stepper :active-step="vactiveStep" orientation="vertical">
              <mu-step>
                <mu-step-label>
                  原库位 {{fromloc}}
                </mu-step-label>
                <mu-step-content>
                  <mu-row gutter>
                    <mu-col><span class="icon-qrscan" @click="toScanner('fromloc')"></span></mu-col>
                    <mu-col><mu-text-field v-model="fromloc" placeholder="请输入移出库位"></mu-text-field></mu-col>
                  </mu-row>
                  <mu-row gutter>
                    <mu-col offset="3"><mu-button @click="getFromlocData()" color="primary">下一步</mu-button></mu-col>
                  </mu-row>
                </mu-step-content>
              </mu-step>

              <mu-step>
                <mu-step-label>
                货 品   {{sku}} {{invData.descr}}
                </mu-step-label>
                <mu-step-content>
                  <mu-row gutter>
                    <mu-col><span class="icon-qrscan" @click="toScanner('sku')"></span></mu-col>
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
                  至库位 {{toloc}}
                </mu-step-label>
                <mu-step-content>
                  <mu-row gutter>
                    <mu-col><span class="icon-qrscan" @click="toScanner('toloc')"></span></mu-col>
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
                  数 量  {{qty}}
                </mu-step-label>
                <mu-step-content>
                  <mu-text-field type="number" placeholder="请输入数量" v-model="qty"></mu-text-field>
                  <mu-button class="demo-step-button" @click="doMoving" color="primary">完成</mu-button>
                  <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
                </mu-step-content>
              </mu-step>

            </mu-stepper>
        </mu-container>
      </div>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import Qrscanner from '@/components/qrscanner'

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
      fieldId: '',
      isScan: false
    }
  },
  components: {
    commonHeader,
    Qrscanner
  },
  created() {
    this.getParams()
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
    toScanner(result){
      this.fieldId = result
      this.isScan = true
    },
    getQR(result){
      console.log(result)
      if(this.fieldId === 'fromloc') {
        this.fromloc = result
      }else if(this.fieldId === 'sku') {
        this.sku = result
      }else if(this.fieldId === 'toloc') {
        this.toloc = result
      }
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
