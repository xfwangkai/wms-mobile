<template>
  <div>
    <div class="left-icon">
      <span @click="closeScan" class="icon-back"></span>
    </div>
    <div class="scan">
      <div id="bcid">
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
let scan = null

export default {
  data() {
    return {
      qrresult: ''
    }
  },
  mounted() {
    this.startRecognize()
  },
  beforeRouteLeave(to, from, next) {
    to.query.qrresult = this.qrresult
    next()
  },
  methods: {
    // 创建扫描控件
    startRecognize() {
      let that = this
      if (!window.plus) return
      scan = new plus.barcode.Barcode('bcid')
      scan.onmarked = onmarked

      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = 'QR'
            break
          case plus.barcode.EAN13:
            type = 'EAN13'
            break
          case plus.barcode.EAN8:
            type = 'EAN8'
            break
          default:
            type = '其它' + type
            break
        }
        result = result.replace(/\n/g, '')
        that.qrresult = result
        that.closeScan()
      }
    },
    // 开始扫描
    startScan() {
      if (!window.plus) return
      scan.start()
    },
    // 关闭扫描
    cancelScan() {
      if (!window.plus) return
      scan.cancel()
    },
    // 关闭条码识别控件
    closeScan() {
      if (!window.plus) return
      scan.close()
      this.$router.goBack()
    }
  }
}
</script>
<style lang="less" scoped>
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .scan {
    height: 100%;
    #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:3rem;
      text-align: center;
      color: #fff;
    }
  }
  .left-icon{
    float: left;
    position: relative;
    flex: 1;
    .icon-back{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .left(25);
      .top(25);
      background-image: url("../assets/imgs/w-back.svg");
      background-size: cover;
    }
  }

</style>
