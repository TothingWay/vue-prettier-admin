<template>
  <SvgIcon :type="type" />
</template>

<script>
import { createFromIconfontCN } from '@ant-design/icons-vue'
const SvgIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1755020_ecxcxu2bte.js' // 在 iconfont.cn 上生成
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
