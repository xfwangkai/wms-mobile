<template>
  <mu-container>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <mu-bottom-nav class="nav-footer">
      <mu-bottom-nav-item title="收货" icon="restore" to="/receipt"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="移库" icon="favorite" to="/moving"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="发货" icon="location_on" to="/shipment"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="调整" icon="location_on" to="/adjustment"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        {
          'path': '/receipt',
          'name': '收货'
        },
        {
          'path': '/moving',
          'name': '移库'
        },
        {
          'path': '/shipment',
          'name': '发货'
        },
        {
          'path': '/adjustment',
          'name': '调整'
        }
      ]
    }
  },
  computed: {
    activeRoute () {
      return this.$route.path
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.nav-footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    .h(90);
    display: block;
}
</style>
