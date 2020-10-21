<template>
  <FullscreenExitOutlined v-if="isFullscreen" @click="click"/>
  <FullscreenOutlined v-else @click="click"/>
</template>

<script>
import screenfull from 'screenfull'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'

export default {
  name: 'Screenfull',
  components: {
    FullscreenExitOutlined,
    FullscreenOutlined
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        this.$message.warning('you browser can not work')
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
.anticon {
  font-size: 20px;
}
</style>
