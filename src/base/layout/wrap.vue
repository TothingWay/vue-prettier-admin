<template>
  <scroll class="scroll-wrapper" :data="data">
    <div class="main-wrapper" :class="{ isTransparent }">
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
    }
  },
  components: {
    Scroll
  }
}
</script>
<style lang='scss' scoped>
.scroll-wrapper {
  height: calc(100% - 50px);
  background-color: $mainContainerBg;
}
.main-wrapper {
  border-radius: 4px;
  background-color: #fff;
  &.isTransparent {
    background-color: transparent
  }
}
</style>
