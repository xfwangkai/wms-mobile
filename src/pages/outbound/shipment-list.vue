<template>
  <div>
    <common-header :showinput="true" :showback="false"></common-header>
    <div class="page-content">
      <mu-list textline="two-line">
        <div v-for="item in shipmentList" :key="item.id">
          <mu-list-item avatar :ripple="false" button @click="todetail({name:'pickingTaskList', params:{shipment: item}})">
            <mu-list-item-content>
              <mu-list-item-title>{{item.orderKey}}</mu-list-item-title>
              <mu-list-item-sub-title>{{item.consigneeName}}</mu-list-item-sub-title>
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
  import {shipmentList} from '@/api/shipment'

  export default {
    data: function () {
      return {
        num: 0,
        shipmentList: []
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
        vm.shipmentList = shipmentList()
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
