<template>
  <container footer>
    <div>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
    </div>
    <div class="footer" slot="footer">
      I'm the Sticky Footer.
    </div>
  </container>
</template>

<script>
export default {
  name: 'stickyFooter',
  data () {
    return {
    }
  }
}
</script>

<style lang='scss' scoped>
.footer {
  background: rgb(63, 76, 107);
  color: #fff;
  line-height: 50px;
  text-align: center;
}
</style>
