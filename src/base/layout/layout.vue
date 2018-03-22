<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <!-- <app-main></app-main> -->
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar/sidebar'
export default {
  name: 'layout',
  components: {
    Sidebar
    // AppMain
  },
  computed: {
    sidebar () {
      return this.$store.state.sidebar
    }
  }
}
</script>
<style lang='scss' scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
