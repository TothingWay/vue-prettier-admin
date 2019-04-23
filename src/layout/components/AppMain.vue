<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <el-scrollbar ref="scroll" class="scroll-main">
        <keep-alive :include="cachedViews">
          <router-view :key="key"/>
        </keep-alive>
      </el-scrollbar>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
let requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60) }
})()

export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
    ...mapGetters([
      'paginationPageSize',
      'paginationCurrentPage',
      'device'
    ])
  },
  methods: {
    easeInOutQuad(t, b, c, d) {
      t /= d / 2
      if (t < 1) {
        return c / 2 * t * t + b
      }
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    },
    scrollTo(to, duration, callback) {
      const that = this
      const wrap = this.$refs['scroll'].$refs['wrap']
      const start = wrap.scrollTop
      const change = to - start
      const increment = 20
      let currentTime = 0
      duration = (typeof (duration) === 'undefined') ? 500 : duration
      let animateScroll = function() {
        // increment the time
        currentTime += increment
        // find the value with the quadratic in-out easing function
        let val = that.easeInOutQuad(currentTime, start, change, duration)
        // move the document.body
        wrap.scrollTop = val
        // do the animation unless its over
        if (currentTime < duration) {
          requestAnimFrame(animateScroll)
        } else {
          if (callback && typeof (callback) === 'function') {
            // the animation is done so lets callback
            callback()
          }
        }
      }
      animateScroll()
    }
  },
  watch: {
    paginationCurrentPage() {
      this.scrollTo(0, 800)
    },
    paginationPageSize(val) {
      console.log(val)
      this.scrollTo(0, 800)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }
}

.scroll-main {
  height: 100%;
  overflow: hidden;
  background-color: #f5f7fa;
}
</style>
