<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>名称：{{name}}</span>
    </div>
    <div>
      当前含有权限：{{roles.join(',')}}
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>
<style lang='scss' scoped>
</style>
