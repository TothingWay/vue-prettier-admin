<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <Scroll wrap-class="scrollbar-wrapper">
      <a-menu
        class="sidebar-menu"
        theme="dark"
        :mode="isCollapse ? 'vertical' : 'inline'"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
      >
        <SidebarMenu
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </a-menu>
    </Scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo.vue'
// import variables from '@/styles/variables.scss'
import SidebarMenu from './SidebarMenu.vue'
import Scroll from '@/components/Scroll'
export default {
  name: 'Sidebar',
  components: {
    SidebarMenu,
    Scroll,
    Logo
  },
  data() {
    return {
      selectedKeys: [],
      openKeys: []
    }
  },
  watch: {
    $route: {
      handler(route) {
        const keys = route.matched.map(item => {
          return item.meta.activeMenu || item.path
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
    ...mapGetters(['routes', 'sidebar']),
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
