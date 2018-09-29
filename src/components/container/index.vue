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
