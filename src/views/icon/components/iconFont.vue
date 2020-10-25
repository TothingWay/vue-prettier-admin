<template>
  <a-card>
    <a-card-grid
      v-for="item in iconFonts"
      :key="item"
      class="icon-grid"
      v-clipboard:copy="rewriteText(item)"
      v-clipboard:success="clipboardSuccess"
    >
      <Icon :type="item" />
    </a-card-grid>
  </a-card>
</template>

<script>
import clipboard from '@/directive/clipboard'
export default {
  directives: {
    clipboard
  },
  data() {
    return {
      iconFonts: []
    }
  },
  mounted() {
    const iconFontList = Array.from(
      document.querySelectorAll('body svg[style] symbol')
    )
    this.iconFonts = iconFontList.map(item => {
      return item.id
    })
  },
  methods: {
    rewriteText(text) {
      return `<Icon type="${text}" />`
    },
    clipboardSuccess(event) {
      this.$message.success(`${event.text} copied`)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-grid {
  width: 10%;
  text-align: center;
  font-size: 32px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .icon-grid {
    width: 20%;
  }
}

@media (max-width: 576px) {
  .icon-grid {
    width: 25%;
  }
}
</style>
