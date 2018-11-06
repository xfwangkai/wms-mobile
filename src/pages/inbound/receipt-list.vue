<template>
  <div>
    <common-header :showinput="true" :showback="false"></common-header>
    <div class="page-content">
      <mu-list textline="two-line">
        <div v-for="item in receiptList" :key="item.id">
          <mu-list-item avatar :ripple="false" button @click="todetail({name:'receiptdetail', query:{receipt: item}})">
            <mu-list-item-content>
              <mu-list-item-title>{{item.receiptKey}}</mu-list-item-title>
              <mu-list-item-sub-title>{{item.supplierName}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
        </div>
      </mu-list>
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
