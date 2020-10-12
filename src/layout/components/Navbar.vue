<template>
  <a-layout-header>
    <Hamburger class="hamburger-container" :is-active="sidebar.opened" @toggle-click="toggleSideBar" />

    <div class="right-menu-item">
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
            <a-menu-item>
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
import { DownOutlined, GithubOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    Hamburger,
    DownOutlined,
    GithubOutlined,
    HomeOutlined,
    LogoutOutlined
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
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

.right-menu-item {
  padding-right: 16px;
}
</style>
