<template>
  <div>
    <mu-appbar>
      <mu-button icon slot="left" @click="back()">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      收货({{receipt.receiptkey}})
    </mu-appbar>
    <div v-if="isScan">
      <qrscanner @getQR="getQR" @closeScan="isScan=false"></qrscanner>
    </div>
    <div v-else>
      <div class="page-content">
        <mu-container>
          <div>
            <mu-stepper :active-step="vactiveStep" orientation="vertical">
              <mu-step>
                <mu-step-label>
                  输入/扫描SKU
                </mu-step-label>
                <mu-step-content>
                  <mu-row gutter>
                    <mu-col><span class="icon-qrscan" @click="toScanner('sku')"></span></mu-col>
                    <mu-col><mu-text-field v-model="sku" placeholder="请输入SKU"></mu-text-field></mu-col>
                  </mu-row>
                  <mu-row gutter>
                    <mu-col offset="3"><mu-button @click="getSku()" color="primary">下一步</mu-button></mu-col>
                  </mu-row>
                </mu-step-content>
              </mu-step>
              <mu-step>
                <mu-step-label>
                  输入收货数量
                </mu-step-label>
                <mu-step-content>
                  <mu-row gutter>
                    <mu-col span="6">{{skuData.sku}}</mu-col>
                    <mu-col span="6">{{skuData.descr}}</mu-col>
                  </mu-row>
                  <mu-row gutter>
                    <mu-col span="2">数量：</mu-col>
                    <mu-col span="8"><mu-linear-progress size="15" mode="determinate" :value="(skuData.qtyreceived/skuData.qtyexpected)*100"></mu-linear-progress></mu-col>
                    <mu-col span="2">{{skuData.qtyreceived}} / {{skuData.qtyexpected}}</mu-col>
                  </mu-row>
                  <mu-row gutter>
                    <mu-col span="12"><mu-text-field type="number" placeholder="请输入数量" v-model="qty"></mu-text-field></mu-col>
                  </mu-row>
                  <mu-button class="step-button" @click="receiving" color="primary">完成</mu-button>
                  <mu-button flat class="step-button" @click="vhandlePrev">上一步</mu-button>
                </mu-step-content>
              </mu-step>
            </mu-stepper>
          </div>
        </mu-container>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {fetchReceiptDetail, doReceive} from '../../api/receipt'
import Qrscanner from '../../components/qrscanner'
import Toast from 'muse-ui-toast'

Vue.use(Toast)

export default {
  data () {
    return {
      tittle: '收货',
      receipt: {},
      sku: '',
      skuData: {},
      vactiveStep: 0,
      qty: '',
      isScan: false
    }
  },
  mounted() {
    if (this.$route.query.qrResult) {
      let qrResult = this.$route.query.qrResult
      if (qrResult.fieldId === this.skuQR) {
        this.sku = qrResult.qrString
        this.getSku()
      }
    }
  },
  components: {
    Qrscanner
  },
  created() {
    this.getParams()
  },
  computed: {
  },
  methods: {
    toScanner(result){
      this.fieldId = result
      this.isScan = true
    },
    getQR(result){
      if(this.fieldId === 'sku') {
        this.sku = result
        this.getSku()
      }
    },
    getParams () {
      // 取到路由带过来的参数
      this.receipt = this.$route.query.receipt
    },
    getSku() {
      fetchReceiptDetail({receiptkey: this.receipt.receiptkey, sku: this.sku, storerkey: this.receipt.storerkey}).then(res => {
        if(res.data.errFlag === 0){
          console.log(res.data.retData)
          this.skuData = res.data.retData
          if (this.skuData.errFlag !== 0) {
            Toast.error(this.skuData.errMsg)
            this.speak(this.skuData.errMsg)
            this.sku = ''
            return
          }
          this.skuData.mode = 'M'
          this.skuData.userid = 'kaiw'
          this.sku = ''
          this.vactiveStep++
        }else{
          Toast.error(res.data.errMsg)
        }
      })
    },
    receiving() {
      if (!Number(this.qty)) {
        Toast.error('请输入数字')
        return
      }
      if(Number(this.qty)<=0){
        Toast.error('请输入真实有效数量')
        return
      }
      this.skuData.currentqtyreceived=Number(this.qty)
      doReceive(this.skuData).then(res => {
        console.log(res)
        if(res.data.errFlag!==0){
          Toast.error('收货错误:'+res.data.errMsg)
          return
        }
        //this.skuData.qtyreceived = Number(this.qty)
        this.sku = ''
        this.qty = ''
        this.vhandlePrev()
      })
    },
    vhandlePrev() {
      this.vactiveStep--
    },
    back() {
      this.$router.goBack()
    },
    speak(contents){
      var speaktext=contents//传入的值是需要播报的内容
      switch(plus.os.name){
        case "iOS":
          var AVSpeechSynthesizer=plus.ios.importClass("AVSpeechSynthesizer")
          var AVSpeechUtterance=plus.ios.importClass("AVSpeechUtterance")
          var AVSpeechSynthesisVoice=plus.ios.import("AVSpeechSynthesisVoice")
          var sppech = new AVSpeechSynthesizer()
          var voice = AVSpeechSynthesisVoice.voiceWithLanguage("zh-CN")
          var utterance =  AVSpeechUtterance.speechUtteranceWithString(speaktext)
          //utterance.setRate(0.4f)
          utterance.setVoice(voice)
          sppech.speakUtterance(utterance)
          plus.ios.deleteObject(voice)
          plus.ios.deleteObject(utterance)
          plus.ios.deleteObject(sppech)
          break
        case "Android":
          var main=plus.android.runtimeMainActivity()
          var SpeechUtility=plus.android.importClass("com.iflytek.cloud.SpeechUtility")
          SpeechUtility.createUtility(main,"appid=5a20bab9")
          var SynthesizerPlayer=plus.android.importClass("com.iflytek.cloud.SpeechSynthesizer")
          var play=SynthesizerPlayer.createSynthesizer(main,null)
          play.startSpeaking(speaktext,null)
          break
      }
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
