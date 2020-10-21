<template>
  <a-layout-header>
    <div class="left-menu-item">
      <Hamburger class="hamburger-container" :is-active="sidebar.opened" @toggle-click="toggleSideBar" />
      <Breadcrumb class="breadcrumb-container" />
    </div>

    <div class="right-menu-item">
      <MenuSearch />

      <Screenfull class="hover-effect"/>

      <a-dropdown :trigger="['hover', 'hover']" placement="bottomRight">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()"> Admin <DownOutlined style="margin-right: 0;"/> </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <router-link to="/"><HomeOutlined class="dropdown-icon"/>首页</router-link>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a target="_blank" href="https://github.com/TothingWay/vue-prettier-admin"><GithubOutlined class="dropdown-icon"/>项目地址</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="logout">
              <a href="javascript:;"><LogoutOutlined class="dropdown-icon"/>退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
import Hamburger from '/@/components/Hamburger/index.vue'
import MenuSearch from '/@/components/MenuSearch/index.vue'
import Breadcrumb from '/@/components/Breadcrumb/index.vue'
import Screenfull from '/@/components/Screenfull/index.vue'
import { DownOutlined, GithubOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    Hamburger,
    MenuSearch,
    Breadcrumb,
    Screenfull,
    DownOutlined,
    GithubOutlined,
    HomeOutlined,
    LogoutOutlined
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 50px;
  line-height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
}
.dropdown-icon {
  margin-right: 8px;
}

.ant-dropdown-link {
  display: block;
  line-height: 30px;
  height: 30px;
}

.right-menu-item, .left-menu-item {
  display: flex;
  padding-right: 16px;
  align-items: center;
}

.breadcrumb-container {
  margin-left: 5px;
}
</style>
