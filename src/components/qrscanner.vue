<template>
  <div>
    <div class="header-box">
      <div class="left-icon">
        <span @click="closeScan" class="icon-back"></span>
      </div>
    </div>
    <div class="page-content">
      <div id="bcid">
        <div style="height:40%"></div>
        <p class="tip">...载入中...</p>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
let scan = null

export default {
  data() {
    return {
    }
  },
  mounted() {
    this.startRecognize()
  },
  beforeRouteLeave(to, from, next) {
    this.closeScan()
    next()
  },
  methods: {
    // 创建扫描控件
    startRecognize() {
      let that = this
      if (!window.plus) return
      scan = new plus.barcode.Barcode('bcid')
      scan.start()
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
        that.$emit("getQR", result)
        that.closeScan()
      }
      scan.onerror = function(error) {
        console.log(error)
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
      if (!window.plus){
        this.$emit('closeScan')
        return
      }
      scan.close()
      this.$emit('closeScan')
    }
  }
}
</script>
<style lang="less" scoped>

  #bcid {
    width: 100%;
    position: absolute;
    top: 25px;
    bottom: 40px;
    text-align: center;
  }

  @import "~styles/index.less";
  @import "~styles/variable.less";
  .header-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .h(100);
    .lh(100);
    background-color: @base-color;
    color: @base-header-color;
    .fs(@base-header-size);
    display: flex;
    .left-icon{
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
  }
</style>
