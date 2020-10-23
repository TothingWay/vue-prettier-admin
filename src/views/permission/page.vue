<template>
  <switch-roles @change="handleRolesChange" />
</template>

<script>
import SwitchRoles from './components/SwitchRoles.vue'
export default {
  name: 'PermissionPage',
  components: { SwitchRoles },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: '/home' })
    }
  }
}
</script>
