<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar}">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar/sidebar'
import Navbar from './navbar/navbar'
import AppMain from './appMain'

export default {
  name: 'layout',
  components: {
    Sidebar,
    Navbar,
    AppMain
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
.sidebar-container {
  background-color: $menuBg;
}
</style>
