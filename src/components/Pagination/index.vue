<template>
  <el-pagination
    class="pagination"
    background
    :current-page.sync="currentPage"
    :page-size.sync="pageSize"
    :layout="layout"
    :page-sizes="pageSizes"
    :total="total"
    v-bind="$attrs"
    :small="device === 'mobile'"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"/>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default() {
        return [20, 30, 50]
      }
    },
    limit: {
      type: Number,
      default: parseInt(Cookies.get('paginationPageSize'))
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next'
    },
    autoScroll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ]),
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        this.$store.commit('SET_PAGESIZE', val)
      }
    },
    handleCurrentChange(val) {
      let paginationCurrentPage = val * Math.random()
      if (this.autoScroll) {
        this.$store.commit('SET_CURRENTPAGE', paginationCurrentPage)
      }
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style lang='scss' scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
