<template>
  <div class="router-wrapper">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Empty',
  computed: {
    // cachedViews() { return this.$store.state.tagsView.cachedViews },
    key() {
      return this.$route.path
    }
  },
  created() { // 加入缓存
    /* const route = { name: this.$options.name, meta: { noCache: false }}
    this.$store.dispatch('tagsView/addCachedView', route) */
    // const route = this.$route.matched.find(item => item.name === this.$options.name)
    // if (route) this.$store.dispatch('tagsView/addCachedView', route)
  }
}
</script>

<style scoped>
.router-wrapper {
  min-height: calc(100vh - 124px);
}
</style>
