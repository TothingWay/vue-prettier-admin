<template>
  <a-radio-group style="margin-bottom: 20px;" v-model:value="currentTheme">
    <a-radio-button value="Outlined">
      Outlined
    </a-radio-button>
    <a-radio-button value="Filled">
      Filled
    </a-radio-button>
    <a-radio-button value="TwoTone">
      Two Tone
    </a-radio-button>
  </a-radio-group>
  <a-card>
    <a-card-grid v-for="item in antdIcons" :key="item" class="icon-grid">
      <component :is="item"/>
    </a-card-grid>
  </a-card>
</template>

<script>
import * as antdIcons from '@ant-design/icons-vue'
const iconsList = Object.keys(antdIcons).map(iconName => antdIcons[iconName])
export default {
  name: 'AntdIcon',
  components: {
    ...antdIcons
  },
  data() {
    return {
      currentTheme: 'Outlined'
    }
  },
  computed: {
    antdIcons() {
      return iconsList.filter(icon => {
        if (this.currentTheme !== 'Outlined') {
          return icon.name.includes(this.currentTheme)
        }
        return ['Filled', 'TwoTone'].every(theme => !icon.name.includes(theme))
      }).map(Component => Component.displayName).filter(displayName => displayName)
    }
  },
  methods: {

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
