<template>
  <div>
    <common-header :showinput="true" :showback="false"></common-header>
    <div class="page-content">
      <mu-container ref="container" class="loadmore-content">
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
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
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
import {fetchReceiptListData} from '@/api/receipt'

export default {
  data: function () {
    return {
      num: 0,
      receiptList: [],
      pageSize: 20,
      pageNO: 1,
      refreshing: false,
      loading: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    todetail(path) {
      this.$router.togo(path)
    },
    init() {
      fetchReceiptListData({pageNO: this.pageNO, pageSize: this.pageSize}).then(res => {
        //this.receiptList = res.data
        this.pageSize ++
      })
    },
    refresh () {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      alert('sssssssss')
      setTimeout(() => {
        this.refreshing = false;
      }, 2000)
    },
    load () {
      this.loading = true;
      fetchReceiptListData({pageNO: this.pageNO, pageSize: this.pageSize}).then(res => {
        this.loading = false;
        //this.receiptList = res.data
        console.log(res.data)
        this.pageSize ++
      })
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
