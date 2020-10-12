<template>
  <a-layout-header>
    <Hamburger class="hamburger-container" :is-active="sidebar.opened" @toggle-click="toggleSideBar" />
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
.ant-layout-header {
  padding: 0;
  height: 50px;
  line-height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
}
</style>
