<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar"/>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <el-dropdown class="user-container">
      <span class="el-dropdown-link">
        {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from './hamburger'
import Breadcrumb from './breadcrumb'
export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  components: {
    Hamburger,
    Breadcrumb
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .user-container {
    float: right;
    line-height: 50px;
    margin-right: 20px;
  }
}
</style>
