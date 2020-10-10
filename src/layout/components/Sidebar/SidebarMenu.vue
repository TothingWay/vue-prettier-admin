<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :path="resolvePath(onlyOneChild.path)"
  >
    <template v-if="item.children && item.children.length">
      <SidebarMenu
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </template>
  </component>
</template>

<script>
import path from 'path'
import { isExternal } from '/@/utils/validate'
import MenuItem from './components/MenuItem.vue'
import Submenu from './components/Submenu.vue'

export default {
  name: 'SidebarMenu',
  components: { MenuItem, Submenu },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {
      routeChildren: {},
      menuComponent: ''
    }
  },
  created() {
    if (this.hasOneShowingChild(this.item.children, this.item) && (!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren) && !this.item.alwaysShow) {
      this.menuComponent = 'MenuItem'
    } else {
      this.menuComponent = 'Submenu'
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang="scss">
.anticon {
  margin-right: 16px;
}
</style>
