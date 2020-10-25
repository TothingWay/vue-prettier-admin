<template>
  <div>
    <div style="margin-bottom:15px;">Your roles: {{ roles }}</div>
    Switch roles:
    <a-radio-group v-model:value="switchRoles">
      <a-radio-button value="editor">editor</a-radio-button>
      <a-radio-button value="admin">admin</a-radio-button>
    </a-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
