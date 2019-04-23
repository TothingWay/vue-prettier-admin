<template>
  <div class="container">
    <div class="time">
      <span class="date">{{date}}</span>
      <span class="month-Year">{{monthAndYear}}</span>
    </div>
    <img class="daily-sentence-img" :src="imgUrl"/>
    <div class="word" v-html="word"></div>
  </div>
</template>

<script>
import dailySentence from '@/api/dailySentence'
import dayjs from 'dayjs'

export default {
  name: 'dashboard',
  data() {
    return {
      imgUrl: '',
      word: ''
    }
  },
  computed: {
    date() {
      return dayjs().date()
    },
    monthAndYear() {
      return dayjs().format('MMM') + '. ' + dayjs().year()
    }
  },
  created() {
    dailySentence.then(res => {
      let { img_url: imgUrl, word } = res.data.Body
      this.imgUrl = imgUrl
      this.word = word.replace(/\r\n/g, '<br>')
    })
  }
}
</script>

<style lang='scss' scoped>
.container {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 120px;
  .daily-sentence-img {
    width: 420px;
    max-width: 100%;
    display: block;
    margin-bottom: 30px;
  }
  .time {
    color: #409EFF;
    width: 420px;
    max-width: 100%;
    margin-bottom: 25px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  .date {
    font-size: 48px;
    padding-right: 12px;
  }
  .month-Year {
    font-size: 24px;
  }
  .word {
    width: 420px;
    max-width: 100%;
    line-height: 26px;
  }
}
</style>
