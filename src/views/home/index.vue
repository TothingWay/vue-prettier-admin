<template>
  <div class="home">
    <div class="middle">
      <h1 class="title">{{name}}，欢迎回来</h1>
      <p class="disc">最近登录：{{formatDate(lastTime, 'YYYY-MM-DD hh:mm:ss')}}</p>
    </div>
    <img draggable="false" :src="welcomeBg" class="bg-img">
  </div>
</template>

<script>
import { formatDate } from 'utils'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      lastTime: new Date(),
      welcomeBg: require('assets/images/welcome.svg')
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    formatDate
  }
}
</script>
<style lang='scss' scoped>
.home {
  background: #f5f7fa;
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
@media screen and (max-width: 768px) {
  .middle {
    margin-left: 0;
    padding-left: 20px;
    padding-right: 20px;
  }
  .title {
    font-size: 24px;
  }
  .disc {
    font-size: 12px;
  }
}
</style>
