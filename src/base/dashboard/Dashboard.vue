<template>
  <div class="dashboard">
    <scroll class="nav-scroll" :scrollbar="false" ref="navScroll">
      <el-menu
      default-active="1"
      class="nav"
      :collapse="isCollapse"
      background-color="#314155"
      text-color="#fff"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </scroll>
    <div class="main" ref="main">
      <div class="header">
        <div class="btn-collapse" @click="toggleNav" :class="{rotate:isCollapse}">
          <icon type="menu"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Scroll from 'base/scroll/Scroll'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    Scroll
  },
  methods: {
    toggleNav () {
      this.isCollapse = !this.isCollapse
      const toggle = this.isCollapse ? '64px' : '200px'
      this.$refs.navScroll.$el.style.width = toggle
      this.$refs.main.style.marginLeft = toggle
    }
  }
}
</script>
<style lang='scss' scoped>
.dashboard {
  height: 100%;
  overflow: hidden;
  .nav-scroll {
    width: 200px;
    transition: width .28s;
    background-color: #314155;
    position: fixed !important;
    top: 0;
    bottom: 0;
    left: 0;
    /deep/ .el-menu-item-group__title {
      display: none;
    }
    .el-menu {
      border-right: none;
    }
  }
  .main {
    transition: margin-left .28s;
    margin-left: 200px;
    height: 100%;
  }
}

.nav:not(.el-menu--collapse) {
  width: 200px;
}
.main {
  .header {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
  }
  .btn-collapse {
    cursor: pointer;
    display: inline-block;
    transition: all .38s;
    position: relative;
    top: 12px;
    left: 15px;
    .icon {
      width: 25px;
      height: 25px;
    }
    &.rotate {
      transform: rotate(90deg);
    }
  }
}
</style>
