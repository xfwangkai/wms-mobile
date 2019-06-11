<template>
  <div>
    <mu-appbar>
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      移库
    </mu-appbar>
    <div v-if="isScan">
      <qrscanner @getQR="getQR" @closeScan="isScan=false"></qrscanner>
    </div>
    <div v-else>
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
                      <mu-button class="step-button" @click="getInvData" color="primary">下一步</mu-button>
                      <mu-button flat class="step-button" @click="vhandlePrev">上一步</mu-button>
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
                      <mu-button class="step-button" @click="validToloc" color="primary">下一步</mu-button>
                      <mu-button flat class="step-button" @click="vhandlePrev">上一步</mu-button>
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
                  <mu-button class="step-button" @click="doMoving" color="primary">完成</mu-button>
                  <mu-button flat class="step-button" @click="vhandlePrev">上一步</mu-button>
                </mu-step-content>
              </mu-step>
            </mu-stepper>
        </mu-container>
      </div>
    </div>
  </div>
</template>

<script>
import Qrscanner from '@/components/qrscanner'
import {validateFromLoc, validateToLoc, getInvData, doMoving} from '@/api/inventory'
import Vue from 'vue'
import Toast from 'muse-ui-toast'
Vue.use(Toast)


export default {
  data () {
    return {
      fromloc: '',
      sku: '',
      invData: {},
      vactiveStep: 0,
      toloc: '',
      qty: '',
      fieldId: '',
      isScan: false,
      storerkey: ''
    }
  },
  components: {
    Qrscanner
  },
  computed: {
  },
  methods: {
    tohome () {
      this.$router.goBack()
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
      validateFromLoc({loc: this.fromloc}).then(res => {
        console.log(res.data)
        if(res.data.errFlag === 0){
          this.storerkey = res.data.retData
          this.vactiveStep++
        }else{
          Toast.error(res.data.errMsg)
        }
      })
    },
    getInvData() {
      getInvData({loc: this.fromloc, sku: this.sku, storerkey: this.storerkey}).then(res => {
        if(res.data.errFlag === 0){
          this.invData = res.data.retData
          console.log(this.invData)
          this.vactiveStep++
        }else{
          Toast.error(res.data.errMsg)
        }
      })

    },
    validToloc() {
      validateToLoc({loc: this.toloc}).then(res => {
        if(res.data.errFlag === 0){
          this.vactiveStep++
        }else{
          Toast.error(res.data.errMsg)
        }
      })
    },
    doMoving() {
      doMoving({fromloc:this.fromloc, toloc:this.toloc, sku:this.sku, qty:Number(this.qty), storerkey:this.invData.storerkey, lot:this.invData.lot, id:this.invData.id}).then(res => {
        if(res.data.errFlag === 0){
          this.fromloc = ''
          this.sku = ''
          this.qty = ''
          this.toloc = ''
          this.storerkey = ''
          this.invData = {}
          this.vactiveStep = 0
        }else{
          Toast.error(res.data.errMsg)
        }
      })

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
  .linear-progress {
    margin: 16px 0;
  }
</style>
