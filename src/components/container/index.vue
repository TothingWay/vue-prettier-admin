<template>
  <scroll :full="full" :card="card" :scrollbar="scrollbar">
    <slot/>
  </scroll>
</template>

<script>
export default {
  name: 'container',
  props: {
    full: {
      type: Boolean,
      default: true
    },
    card: {
      type: Boolean,
      default: true
    },
    scrollbar: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ .scroll-content {
  border: 25px solid #f5f7fa;
}
</style>
