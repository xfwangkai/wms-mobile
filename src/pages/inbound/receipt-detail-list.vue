<template>
  <div>
    <common-header :tittle="tittle" :showmore="true"></common-header>
    <div class="page-content">
      <h1>{{ receipt }}</h1>
      <section class="card">
        <a href="http://sao315.com/w/api/saoyisao">扫描(Scan)</a>
        <mt-field placeholder="请输入SKU" v-show="showSkuInput" @keyup.enter.native="getSku()" v-model="sku"></mt-field>
        <span v-show="!showSkuInput">{{ sku }}-苹果手机001</span>
      </section>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
export default {
  data () {
    return {
      tittle: '详情',
      receipt: {},
      showSkuInput: true,
      sku: ''
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
      this.showSkuInput = !this.showSkuInput
    },
    getQRString() {
      var reg = new RegExp("\\b"+ name +"=([^&]*)")
      var r = location.href.match(reg)
      if (r!=null) return unescape(r[1])
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams',
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";

  .card {
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    float: left;
    margin-right: 10px;
  }
</style>
