<template>
  <a-menu-item :key="path" @click="handleLink">
    <Icon v-if="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :type="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" />
    <span class="menu-title">{{ onlyOneChild.meta && onlyOneChild.meta.title }}</span>
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
    },
    onlyOneChild: {
      type: Object,
      default() {
        return null
      }
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
