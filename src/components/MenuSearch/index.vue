<template>
  <div :class="{ show: show }" class="menu-search">
    <SearchOutlined @click.stop="click" />
    <a-select
      ref="menuSearchSelect"
      id="menu-search-select"
      class="menu-search-select"
      show-search
      v-model:value="search"
      placeholder="Search Menu"
      default-active-first-option
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      @search="querySearch"
      @change="change"
      size="default"
    >
      <a-select-option v-for="item in options" :key="item.path" :value="item">
        {{ item.title.join(' > ') }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import path from 'path'
import { SearchOutlined } from '@ant-design/icons-vue'

export default {
  name: 'MenuSearch',
  components: {
    SearchOutlined
  },
  data() {
    return {
      search: undefined,
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined
    }
  },
  computed: {
    routes() {
      return this.$store.getters.routes
    }
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      this.initFuse(list)
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    click() {
      this.show = !this.show
    },
    change(val) {
      this.$router.push(val.path)
      this.search = undefined
      this.options = []
      this.$nextTick(() => {
        this.show = false
      })
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]
          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            if (router.component.name !== 'Layout') {
              // except Layout menu
              res.push(data)
            }
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(
            router.children,
            data.path,
            data.title
          )
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    querySearch(query) {
      if (query !== undefined) {
        this.options = this.fuse.search(query).map(item => {
          return item.item
        })
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.anticon-search {
  margin-right: 0;
  font-size: 18px;
  vertical-align: -4px;
}
.menu-search {
  margin-right: 16px;

  :deep(.menu-search-select) {
    font-size: 14px;
    width: 0;
    overflow: hidden;
    background: transparent;
    transition: width 0.2s;
    border-radius: 0;
    display: inline-block;
    vertical-align: -9px;

    :deep(.ant-select-selection) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
    :deep(.ant-select-selection__rendered) {
      margin-left: 0;
      margin-right: 0;
    }
    :deep(.ant-select-selection__placeholder) {
      padding-left: 3px;
    }
  }

  &.show {
    :deep(.menu-search-select) {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
