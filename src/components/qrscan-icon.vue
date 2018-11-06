<template>
  <div>
    <span class="icon-qrscan" @click="toScanner"></span>
  </div>
</template>

<script>

export default {
  name: 'qrscan-icon',
  data() {
    return {
    }
  },
  methods: {
    toScanner() {
      this.$router.togo('/qrscanner')
    }
  }
}
</script>

<style scoped>

</style>
