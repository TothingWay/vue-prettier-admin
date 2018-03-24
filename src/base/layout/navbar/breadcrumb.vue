<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

export default {
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      console.log(this.$route.matched)

      const first = matched[0]
      console.log(first)
      if (first && first.name !== 'overview') {
        matched = [{path: '/overview', meta: { title: '总览' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
