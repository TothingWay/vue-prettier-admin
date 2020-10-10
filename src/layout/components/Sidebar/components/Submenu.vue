<template>
  <a-sub-menu :key="item.path">
    <template v-slot:title>
      <Icon v-if="item.meta.icon" :type="item.meta.icon" />
      <span>{{ item.meta.title }}</span>
    </template>
    <slot></slot>
  </a-sub-menu>
</template>

<script>
export default {
  name: 'Submenu',
  props: {
    item: {
      type: Object,
      default() {
        return null
      }
    },
    routeChildren: {
      type: Object,
      default() {
        return null
      }
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>
