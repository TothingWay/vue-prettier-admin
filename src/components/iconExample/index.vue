<template>
  <wrap>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="4" v-for="item in iconsMap" :key="item">
        <el-tooltip placement="top">
          <div slot="content">
            {{generateIconCode(item)}}
          </div>
          <div class="icon-item">
            <icon class-name="disabled" :type="item"/>
            <span>{{item}}</span>
          </div>
        </el-tooltip>
      </el-col>
    </el-row>
  </wrap>
</template>

<script>
export default {
  name: 'iconExample',
  data () {
    return {
      iconsMap: [
        'appreciate',
        'cascades',
        'delete',
        'discover',
        'edit',
        'favor_fill',
        'favor',
        'location_fill',
        'location',
        'qr_code',
        'scan',
        'warn_fill',
        'warn',
        'full',
        'global',
        'goods_fill',
        'goods',
        'medal_fill',
        'medal',
        'money_bag',
        'music_fill',
        'redpacket_fill',
        'skin_fill',
        'skin',
        'sports',
        'subscription'
      ]
    }
  },
  methods: {
    generateIconCode (name) {
      return `<icon type="${name}"/>`
    }
  }
}
</script>
<style lang='scss' scoped>
.icon-item {
  height: 110px;
  text-align: center;
  font-size: 28px;
  cursor: pointer;
}
span {
  display: block;
  font-size: 22px;
  margin-top: 10px;
}
.disabled{
  pointer-events: none;
}
</style>
