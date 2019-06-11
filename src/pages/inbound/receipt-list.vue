<template>
  <mu-paper :z-depth="1" class="loadmore-wrap">
    <mu-appbar>
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <mu-button icon slot="right" @click="refresh()">
        <mu-icon value="refresh"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-container ref="container" class="loadmore-content">
      <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" loading-text="正在加载中">
        <mu-list textline="two-line">
          <template v-for="item in receiptList">
            <mu-list-item avatar :ripple="false" button @click="todetail({name:'receiptdetail', query:{receipt: item}})">
              <mu-list-item-content>
                <mu-list-item-title>{{item.receiptkey}}</mu-list-item-title>
                <mu-list-item-sub-title>{{item.notes}}</mu-list-item-sub-title>
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
import {fetchReceiptListData} from '@/api/receipt'


export default {
  data: function () {
    return {
      num: 0,
      receiptList: [],
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
      console.log(this.pageNO)
      fetchReceiptListData({pageNO: this.pageNO, pageSize: this.pageSize}).then(res => {
        if(res.data.errFlag === 0){
          this.receiptList = res.data.retData
          this.refreshing = false
        }else{
          Toast.error(res.data.errMsg)
        }

      })
    },
    load () {
      this.loading = true
      console.log(this.pageNO)
      fetchReceiptListData({pageNO: this.pageNO, pageSize: this.pageSize}).then(res => {
        if(res.data.errFlag === 0){
          let arr1 = this.receiptList
          let arr2 = res.data.retData
          arr1.push(...arr2)
          this.receiptList = Array.from(new Set(arr1))
          console.log(this.receiptList)
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
