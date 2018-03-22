<template>
  <scroll :scrollbar="false" :data="permissionRouters">
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item :routes="permissionRouters"></sidebar-item>
    </el-menu>
  </scroll>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './sidebarItem'
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'sidebar',
  components: {
    SidebarItem, Scroll
  },
  computed: {
    ...mapGetters([
      'permissionRouters',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar
    }
  }
}
</script>
