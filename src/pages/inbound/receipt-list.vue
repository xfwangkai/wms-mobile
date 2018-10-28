<template>
  <div>
    <common-header :showinput="true" :showback="false"></common-header>
    <div class="page-content">
      <section>
        <div v-for="item in receiptList" :key="item.id" @click="todetail({name:'receiptdetaillist', params:{receipt: item}})">
          <mt-cell :title="item.receiptKey" is-link style="height: 80px"></mt-cell>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
import {receiptList} from '@/api/receipt'

export default {
  data: function () {
    return {
      num: 0,
      receiptList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail(path) {
      this.$router.togo(path)
    },
    init() {
      var vm = this
      vm.receiptList = receiptList()
    }
  },
  components: {
    commonHeader
  },
  computed: {
    ...mapGetters([
      'number'
    ]),
    ...mapState({
      number: state => state.home.number
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
</style>
