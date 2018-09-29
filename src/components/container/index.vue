<template>
  <scroll :full="full" :card="card" :scrollbar="scrollbar">
    <div class="sticky-container">
      <div class="sticky-wrap">
        <slot/>
      </div>
      <div class="sticky-footer" v-if="footer">
        <slot name="footer">
          I'm the Sticky Footer.
        </slot>
      </div>
    </div>
  </scroll>
</template>

<script>
export default {
  name: 'container',
  props: {
    full: {
      type: Boolean,
      default: true
    },
    card: {
      type: Boolean,
      default: true
    },
    scrollbar: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.sticky-container {
  display: flex;
  flex-flow: column;
  min-height: calc(100vh - 190px);
  .sticky-wrap {
    flex: 1;
  }
  .sticky-footer {
    padding-top: 25px;
  }
}
</style>
