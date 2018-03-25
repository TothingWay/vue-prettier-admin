<template>
  <scroll class="scroll-wrapper" :data="data">
    <div class="main-wrapper" :class="{ isTransparent, isPadding }">
      <slot></slot>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'mainWrapper',
  props: {
    data: {
      type: Array,
      default: null
    },
    isTransparent: {
      type: Boolean,
      default: false
    },
    isPadding: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Scroll
  }
}
</script>
<style lang='scss' scoped>
.scroll-wrapper {
  min-height: 100%;
  padding: 25px;
  background-color: $mainContainerBg;
}
.main-wrapper {
  border-radius: 4px;
  background-color: #fff;
  min-height: 100%;
  @include clearfix;
  &.isTransparent {
    background-color: transparent
  }
  &.isPadding {
    padding: 20px;
  }
}
</style>
