<template>
  <div>
    <icon type="hamburger" @click.native="toggleClick" class="hamburger" :class="{'is-active':isActive}"/>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger.icon {
  display: inline-block;
  cursor: pointer;
  width: 25px;
  height: 25px;
  transform: rotate(90deg);
  transition: .38s;
  transform-origin: 50% 50%;
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
