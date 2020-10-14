<template>
<div :class="classObj" class="app-wrapper">
  <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
  <Sidebar class="sidebar-container"/>
  <div class="main-container">
    <a-layout>
      <Navbar />
      <a-layout-content>
        <AppMain/>
      </a-layout-content>
    </a-layout>
  </div>
</div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from './components'
import { mapState } from 'vuex'
import { constantRoutes } from '/@/router'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  mixins: [ResizeMixin],
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  data() {
    return {
      constantRoutes
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {

  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;

  &:after {
    content: "";
    display: table;
    clear: both;
  }

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: $sideBarWidth;
  position: relative;

  .ant-layout {
    height: 100vh;
  }
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;

  :deep(.sidebar-menu) {
    height: 100vh;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
    .sidebar-menu {
      height: calc(100vh - 50px);
    }
  }
}

.hideSidebar {
  :deep(.sidebar-container) {
    width: 54px !important;
    .ant-menu-submenu-title, .ant-menu-item {
      text-overflow: unset;
    }
    .menu-title {
      display: none;
    }
    .ant-menu-submenu-arrow {
      display: none;
    }
    .anticon {
      margin-left: 4px;
    }
  }

  :deep(.main-container) {
    margin-left: 54px;
  }
}

.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform .28s;
    width: $sideBarWidth !important;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }
}

.withoutAnimation {

  .main-container,
  .sidebar-container {
    transition: none;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
