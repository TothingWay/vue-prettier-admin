<template>
  <div class="not-found">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" :src="img404" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">Not Found!</div>
        <div class="bullshit__headline">抱歉，你访问的页面不存在</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <a href="javascript:;" @click="back" class="bullshit__return-home">返回上一页</a>
      </div>
    </div>
  </div>
</template>

<script>
const img404 = require('assets/images/404.png')

export default {
  name: 'page401',
  data () {
    return {
      img404
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

<style rel="stylesheet/scss" lang="scss" scoped>
.not-found {
  background: #f0f2f5;
  height: 100%;
}

.wscn-http404 {
  position: relative;
  width: 100%;
  text-align: center;
  .pic-404 {
    position: relative;
    width: 400px;
    padding: 100px 0;
    overflow: hidden;
    display: inline-block;
    &__parent {
      width: 400px;
      height: 400px;
    }
  }
  .bullshit {
    position: relative;
    display: inline-block;
    text-align: left;
    width: 400px;
    padding: 200px 0 200px 100px;
    overflow: hidden;
    &__oops {
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
    &__headline {
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
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    .bullshit__return-home {
      text-decoration: none;
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
}

@media (max-width: 800px) {
  .wscn-http404 {
    .pic-404 {
      display: none;
    }
    .bullshit {
      max-width: 100%;
      padding-bottom: 0;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
}
</style>
