<template>
  <a-breadcrumb class="app-breadcrumb">
    <a-breadcrumb-item v-bind="$attrs" v-for="(item,index) in levelList" :key="item.path">
      <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
      <a v-else :class="{'no-redirect': item.components && item.components.default.name === 'Layout'}" @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { compile } from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  mounted() {
    // console.log(this.$refs.transitionGroup)
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.getBreadcrumbRoutes().filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isHome(first)) {
        matched = [{ path: '/home', meta: { title: 'Home' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    getBreadcrumbRoutes() {
      let currentRoutes = {}
      const first = this.$route.matched[0]
      let last = this.$route.matched[this.$route.matched.length - 1]
      const matched = []

      // The route with the meta.parent identity is traversed in reverse order
      for (let i = this.$route.matched.length - 1; i >= 0; i--) {
        const match = this.$route.matched[i]
        const meta = match.meta || {}
        matched.unshift(match)
        if (meta.parent) {
          last = match
          break
        }
      }

      // Fill in the missing levels of routing after degradation
      this.$route.matched.some(item => {
        if (item.path === first.path) {
          currentRoutes = item.children
          this.getParentRoute(currentRoutes, last, matched)
          return true
        }
      })
      matched.unshift(first)
      return matched
    },
    getParentRoute(currentRoutes, last, matched = []) {
      const meta = last.meta || {}
      currentRoutes.forEach((item) => {
        if (item.path === meta.parent) {
          matched.unshift(item)
          this.getParentRoute(currentRoutes, item, matched)
        }
      })
      return matched
    },
    isHome(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve Dynamic routing like /path/:id
      const { params } = this.$route
      var toPath = compile(path)
      return toPath(params)
    },
    handleLink(item) {
      if (!item.components || item.components.default.name !== 'Layout') {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  a {
    color: #303133;
  }
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
