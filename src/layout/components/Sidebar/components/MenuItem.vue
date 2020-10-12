<template>
  <a-menu-item :key="path" @click="handleLink">
    <Icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
    <span class="menu-title">{{ item.meta && item.meta.title }}</span>
  </a-menu-item>
</template>

<script>
import { isExternal } from '/@/utils/validate'

export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      default() {
        return null
      }
    },
    path: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleLink() {
      if (isExternal(this.path)) {
        window.open(this.routePath)
      } else {
        this.$router.push(this.path)
      }
    }
  }
}
</script>
