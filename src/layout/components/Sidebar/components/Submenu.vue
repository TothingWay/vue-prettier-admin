<template>
  <a-sub-menu :key="item.path">
    <template #title>
      <Icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
      <span class="menu-title">{{ item.meta && item.meta.title }}</span>
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
    path: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log(this.item)
  },
  methods: {}
}
</script>
