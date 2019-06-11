<template>
  <mu-paper :z-depth="1" class="loadmore-wrap">
    <mu-appbar>
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      发货
      <mu-button icon slot="right" @click="refresh()">
        <mu-icon value="refresh"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-container ref="container" class="loadmore-content">
      <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" loading-text="正在加载中">
        <mu-list textline="two-line">
          <template v-for="item in shipmentList">
            <mu-list-item avatar :ripple="false" button @click="todetail({name:'pickingtask', query:{shipment: item}})">
              <mu-list-item-content>
                <mu-list-item-title>{{item.orderkey}}</mu-list-item-title>
                <mu-list-item-sub-title>{{item.c_company}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider />
          </template>
        </mu-list>
      </mu-load-more>
    </mu-container>
  </mu-paper>
</template>

<script>
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import {fetchShipmentListData} from '@/api/shipment'

  export default {
    data: function () {
      return {
        num: 0,
        shipmentList: [],
        pageSize: 10,
        pageNO: 1,
        refreshing: false,
        loading: false,
      }
    },
    mounted() {
      this.load()
    },
    methods: {
      todetail(path) {
        this.$router.togo(path)
      },
      refresh () {
        this.refreshing = true
        this.$refs.container.scrollTop = 0
        fetchShipmentListData({pageNO: this.pageNO, pageSize: this.pageSize}).then(res => {
          if(res.data.errFlag === 0){
            this.shipmentList = res.data.retData
            this.refreshing = false
          }else{
            Toast.error(res.data.errMsg)
          }

        })
      },
      load () {
        this.loading = true
        fetchShipmentListData({pageNO: this.pageNO, pageSize: this.pageSize}).then(res => {
          if(res.data.errFlag === 0){
            let arr1 = this.shipmentList
            let arr2 = res.data.retData
            arr1.push(...arr2)
            this.shipmentList = Array.from(new Set(arr1))
            this.pageNO ++
            this.loading = false

          }else{
            Toast.error(res.data.errMsg)
          }

        })
      }
    },
    components: {
    },
    computed: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .linear-progress {
    margin: 16px 0;
  }
</style>
