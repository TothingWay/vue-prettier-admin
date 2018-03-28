<template>
  <wrap>
    <el-input v-model="input"></el-input>
    <el-button plain @click="handleCopy(input, $event)">复制</el-button>
  </wrap>
</template>

<script>
import clip from 'utils/clipboard'
export default {
  name: 'clipboard',
  data () {
    return {
      input: 'https://github.com/TothingWay/admin-template.git'
    }
  },
  methods: {
    handleCopy (text, event) {
      clip(text, event)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
