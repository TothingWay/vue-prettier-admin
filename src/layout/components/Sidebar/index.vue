<template>
<div :class="{'has-logo':showLogo}">
  <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
  <a-menu theme="dark" :mode="isCollapse ? 'vertical' : 'inline'" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
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
      selectedKeys: [],
      openKeys: []
    }
  },
  watch: {
    $route: {
      handler(route) {
        const keys = route.matched.map(item => {
          return item.path
        })

        this.selectedKeys = this.openKeys = keys
      },
      immediate: true
    },
    'sidebar.opened': {
      handler(val) {
        if (val) {
          const keys = this.$route.matched.map(item => {
            return item.path
          })
          this.openKeys = keys
        } else {
          this.openKeys = []
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
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
