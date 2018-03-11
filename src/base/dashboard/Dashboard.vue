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
            <icon type="dashboard"/>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <icon type="dashboard"/>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <icon type="dashboard"/>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <icon type="dashboard"/>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </scroll>
    <div class="main" ref="main">
      <div class="header">
        <div class="btn-collapse" @click="toggleNav" :class="{rotate:isCollapse}">
          <icon type="menu"/>
        </div>
        <el-dropdown>
          <div class="el-dropdown-link">
            <div class="avatar">
              <img class="avatar-img" src="">
            </div>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>github</el-dropdown-item>
            <el-dropdown-item divided>Log Out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
    .icon {
      width: 16px;
      height: 16px;
      margin-left: 5px;
      margin-right: 10px;
      position: relative;
      top: 2px;
    }
  }
}

.nav:not(.el-menu--collapse) {
  width: 200px;
}
.main {
  transition: margin-left .28s;
  margin-left: 200px;
  height: 100%;
  .header {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    position: relative;
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
  .el-dropdown {
    position: absolute;
    right: 15px;
    top: 5px;
  }
  .el-icon-caret-bottom {
    position: relative;
    top: -13px;
  }
  .avatar {
    display: inline-block;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    background: #ccc;
    overflow: hidden;
    .avatar-img {
      width: 100%;
      height: 100%;
      border: none;
      outline: 0;
    }
  }
}
</style>
