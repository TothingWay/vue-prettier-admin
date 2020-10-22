<template>
  <a-card>
    <a-card-grid v-for="item in iconFonts" :key="item" class="icon-grid">
      <Icon :type="item" />
    </a-card-grid>
  </a-card>

</template>

<script>

export default {
  data() {
    return {
      iconFonts: []
    }
  },
  mounted() {
    const iconFontList = Array.from(document.querySelectorAll('body svg[style] symbol'))
    this.iconFonts = iconFontList.map(item => {
      return item.id
    })
  }
}
</script>

<style lang="scss" scoped>
.icon-grid {
  width: 10%;
  text-align: center;
  font-size: 32px;
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
