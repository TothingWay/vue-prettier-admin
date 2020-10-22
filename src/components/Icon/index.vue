<template>
  <SvgIcon :type="type" />
</template>

<script>
import { createFromIconfontCN } from '@ant-design/icons-vue'
import settings from '/@/settings'
const SvgIcon = createFromIconfontCN({
  scriptUrl: settings.iconfontUrl // 在 iconfont.cn 上生成
})

export default {
  components: {
    SvgIcon
  },
  props: {
    type: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
