<template>
  <div class="overview">
    <div class="middle">
      <h1 class="title">{{username}}，欢迎回来</h1>
      <p class="disc">最近登录：{{lastTime}}</p>
    </div>
    <img :src="welcomeBg" class="bg-img">
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: 'admin',
      lastTime: '2018-3-24 16:12:49',
      welcomeBg: require('assets/images/welcome.svg')
    }
  }
}
</script>
<style lang='scss' scoped>
.overview {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.middle {
  position: absolute;
  z-index: 2;
  top: 50%;
  margin-top: -86px;
  margin-left: 100px;
}
.title {
  font-size: 36px;
  margin-bottom: 14px;
  margin-top: 0;
}
.disc {
  font-size: 14px;
  color: #8392a1;
  margin: 0;
}
.bg-img {
  position: absolute;
  z-index: 1;
  height: 100%;
  right: 0;
  top: 0;
}
</style>
