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
  props: ['fieldId'],
  methods: {
    toScanner() {
      this.$router.togo({name: 'qrscanner', query: {fieldId: this.fieldId}})
    }
  }
}
</script>

<style scoped>

</style>
