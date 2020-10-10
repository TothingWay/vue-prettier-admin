<template>
<div :class="{'has-logo':showLogo}">
  <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
  <a-menu theme="dark" :mode="isCollapse ? 'vertical' : 'inline'" v-model:selectedKeys="activeMenu">
    <SidebarMenu v-for="route in constantRoutes" :key="route.path" :item="route" :base-path="route.path" />
  </a-menu>
  <!-- </el-scrollbar> -->
</div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Logo from './Logo.vue'
import { constantRoutes } from '/@/router'
// import variables from '/@/styles/variables.scss'
import SidebarMenu from './SidebarMenu.vue'
export default {
  name: 'Sidebar',
  components: {
    SidebarMenu
    // Logo
  },
  data() {
    return {
      constantRoutes,
      activeMenu: []
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    /* activeMenu: {
      get() {
        const route = this.$route
        const {
          meta,
          path
        } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return [meta.activeMenu]
        }
        return [path]
      },
      set(val) {
        return val
      }
    }, */
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    /* variables() {
      return variables
    }, */
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
