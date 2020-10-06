<template>
  <Icon v-if="icon" :type="icon" />
  <span v-if="title">{{ title }}</span>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
