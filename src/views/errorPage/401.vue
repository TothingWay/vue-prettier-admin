<template>
  <div class="errPage-container">
    <div class="info">
      <h1 class="text-jumbo text-ginormous">Oops!</h1>
      <h2 class="text-tip">你没有权限去该页面</h2>
      <h6 class="text">如有不满请联系你领导</h6>
      <el-button @click="back" icon='arrow-left' class="back-btn">返回上一页</el-button>
    </div>
    <img class="err401" :src="err401" alt="401">
  </div>
</template>

<script>
import err401 from 'assets/images/401.png'

export default {
  name: 'page401',
  data () {
    return {
      err401
    }
  },
  methods: {
    back () {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  background-color: #f0f2f5;
  height: 100%;
  text-align: center;
  position: relative;
  .back-btn {
    background: #1482f0;
    border-radius: 100px;
    width: 110px;
    height: 36px;
    line-height: 33px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    padding: 0;
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.3s;
    animation-fill-mode: forwards;
  }
  .info {
    width: 280px;
    display: inline-block;
    text-align: left;
    padding-right: 100px;
  }
  .err401 {
    display: inline-block;
    width: 400px;
    position: relative;
    top: 100px;
  }
  .text-jumbo {
    font-size: 32px;
    font-weight: bold;
    line-height: 40px;
    color: #1482f0;
    opacity: 0;
    margin-bottom: 20px;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  .text-tip {
    font-size: 20px;
    line-height: 24px;
    color: #1482f0;
    opacity: 0;
    margin-bottom: 10px;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;

  }
  .text {
    font-size: 13px;
    line-height: 21px;
    color: grey;
    opacity: 0;
    margin-bottom: 30px;
    margin-top: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;
  }
  @keyframes slideUp {
    0% {
      transform: translateY(60px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

@media (max-width: 768px) {
  .errPage-container {
    .err401 {
      display: none;
    }
    .info {
      padding-left: 30px;
      padding-right: 30px;
      height: 205px;
      max-width: 100%;
      position: absolute;
      top: 180px;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
</style>
