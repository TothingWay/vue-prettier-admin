<template>
  <a-layout-header :style="{ background: '#fff', padding: 0 }">
    <Hamburger :is-active="sidebar.opened" @toggle-click="toggleSideBar" />
  </a-layout-header>
</template>

<script>
import Hamburger from '/@/components/Hamburger/index.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
