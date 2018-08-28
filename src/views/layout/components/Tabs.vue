<template>
  <div class="page-tabs">
    <el-tabs
      :value="currentPage"
      type="card"
      closable
      @contextmenu.native="handleContextmenu"
      @tab-click="handleClick"
      @edit="handleTabsEdit">

      <el-tab-pane
        v-for="(item, index) in pageOpenedList"
        :key="index"
        :label="item.title || '未命名'"
        :name="item.name">
      </el-tab-pane>

    </el-tabs>
    <ul ref="contextmenu" v-show="contextmenuFlag" :style="{left:contentmenuX+'px',top:contentmenuY+'px'}" class="contextmenu">
      <li @click="closeTabs"><icon type="close"/>{{ $t('tabs.close') }}</li>
      <li @click="closeOthersTabs"><icon type="closeOthers"/>{{ $t('tabs.closeOthers') }}</li>
      <li @click="closeAllTabs"><icon type="closeAll"/>{{ $t('tabs.closeAll') }}</li>
    </ul>
  </div>
</template>

<script>
import { generateTitle } from 'utils/i18n'
export default {
  name: 'pageTabs',
  computed: {
    pageOpenedList () {
      return this.$store.state.tabs.pageOpenedList
    },
    currentPage () {
      return this.$store.state.tabs.currentPage
    }
  },
  data () {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      tabName: 'index'
    }
  },
  watch: {
    $route: {
      handler () {
        this.addViewTabs()
        this.moveToCurrentTab()
      },
      immediate: true
    },
    contextmenuFlag (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted () {
    this.addViewTabs()
    document.querySelector('body').appendChild(this.$refs.contextmenu)
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    generateRoute () {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive (tabName) {
      return tabName === this.$route.name
    },
    /**
     * @description 点击 tab 标签触发
     */
    handleClick (tab, event) {
      // 找到点击的页面在 tab 列表里是哪个
      const page = this.pageOpenedList.find(page => page.name === tab.name)
      const { name, params, query } = page
      if (page) {
        this.$store.dispatch('currentPageSet', name)
        this.$router.push({ name, params, query })
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发
     */
    handleTabsEdit (tabName, action) {
      if (action === 'remove') {
        this.$store.dispatch('delTab', tabName).then((views) => {
          if (this.isActive(tabName)) {
            const latestView = views.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView)
            } else {
              this.$router.push('/')
            }
          }
        })
      }
    },
    /**
     * @description 右键 tab 标签触发
     */
    handleContextmenu (event) {
      let target = event.target
      // 解决右键标签关闭按钮报错
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tabName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    },
    addViewTabs () {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addTab', route)
    },
    moveToCurrentTab () {
      this.$store.dispatch('currentPageSet', this.$route.name)
    },
    closeMenu () {
      this.contextmenuFlag = false
    },
    closeTabs () {
      this.$store.dispatch('delTab', this.tabName).then((views) => {
        if (this.isActive(this.tabName)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTabs () {
      this.$router.push({
        name: this.tabName
      })
      this.$store.dispatch('delOthersTabs', this.tabName).then(() => {
        this.moveToCurrentTab()
      })
    },
    closeAllTabs () {
      this.$store.dispatch('delAllTabs')
      this.$router.push('/')
    }
  }
}
</script>

<style lang='scss' scoped>
.page-tabs /deep/{
  .el-tabs__content {
    display: none;
  }
  .el-tabs__header {
    margin: 0;
    background-color: #fff;
    user-select: none;
  }
  .el-tabs__nav {
    border-radius: 0;
    border-top: none;
  }
  .el-tabs__item.is-active {
    background-color: #f5f7fa;
    border-bottom-color: #f5f7fa;
  }
  .el-tabs__item.is-focus {
    box-shadow: none !important;
  }
  .el-tabs__nav {
    height: 40px;
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 100;
  position: absolute;
  list-style-type: none;
  border: 1px solid #cfd7e5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 5px 0;
  li {
    .icon {
      margin-right: 10px;
      &.icon-close {
        font-size: 16px;
        vertical-align: -3px;
      }
      &.icon-closeOthers {
        font-size: 13px;
        vertical-align: -1px;
      }
      &.icon-closeAll {
        padding-left: 2px;
      }
    }
    color: #606266;
    cursor: pointer;
    font-size: 14px;
    margin: 0;
    padding: 8px 20px 8px 15px;
    &:hover {
      background: #ecf5ff;
      color: #66b1ff;
    }
  }
}
</style>
