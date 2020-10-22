<template>
  <a-tabs type="card">
    <a-tab-pane key="1" tab="Antd">
      <AntdIcon />
    </a-tab-pane>
    <a-tab-pane key="2" tab="IconFont">
      <IconFont />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import AntdIcon from './components/antdIcon.vue'
import IconFont from './components/iconFont.vue'
export default {
  components: {
    AntdIcon,
    IconFont
  }
}
</script>

<style lang="scss" scoped>

</style>
