<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          Only
          <a-tag class="permission-tag" color="pink">admin</a-tag> can see this
        </span>
        <a-tag v-permission="['admin']" class="permission-sourceCode" color="blue">
          v-permission="['admin']"
        </a-tag>
      </div>

      <div>
        <span v-permission="['editor']" class="permission-alert">
          Only
          <a-tag class="permission-tag" color="pink">editor</a-tag> can see this
        </span>
        <a-tag v-permission="['editor']" class="permission-sourceCode" color="blue">
          v-permission="['editor']"
        </a-tag>
      </div>

      <div>
        <span v-permission="['admin','editor']" class="permission-alert">
          Both
          <a-tag class="permission-tag" color="pink">admin</a-tag> and
          <a-tag class="permission-tag" color="pink">editor</a-tag> can see this
        </span>
        <a-tag v-permission="['admin','editor']" class="permission-sourceCode" color="blue">
          v-permission="['admin','editor']"
        </a-tag>
      </div>
    </div>

    <div :key="'checkPermission'+key" style="margin-top:60px;">
      <aside>
        In some cases, using v-permission will have no effect. For example: Element-UI's Tab component or a-table-column and other scenes that dynamically render dom. You can only do this with v-if.
        <br> e.g.
      </aside>

      <a-tabs type="card" style="width:550px;">
        <a-tab-pane v-if="checkPermission(['admin'])" key="Admin" tab="Admin">
          Admin can see this
          <a-tag class="permission-sourceCode" color="blue">
            v-if="checkPermission(['admin'])"
          </a-tag>
        </a-tab-pane>

        <a-tab-pane v-if="checkPermission(['editor'])" key="Editor" tab="Editor">
          Editor can see this
          <a-tag class="permission-sourceCode" color="blue">
            v-if="checkPermission(['editor'])"
          </a-tag>
        </a-tab-pane>

        <a-tab-pane v-if="checkPermission(['admin','editor'])" key="Admin-OR-Editor" tab="Admin-OR-Editor">
          Both admin or editor can see this
          <a-tag class="permission-sourceCode" color="blue">
            v-if="checkPermission(['admin','editor'])"
          </a-tag>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import permission from '/@/directive/permission/index.js' // 权限判断指令
import checkPermission from '/@/utils/permission' // 权限判断函数
import SwitchRoles from './components/SwitchRoles.vue'

export default {
  name: 'PermissionButton',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    checkPermission,
    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  :deep(.permission-alert) {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  :deep(.permission-sourceCode) {
    margin-left: 15px;
  }
  :deep(.permission-tag) {
    background-color: #ecf5ff;
  }
}

aside {
  background: #eef1f6;
  padding: 8px 24px;
  margin-bottom: 20px;
  border-radius: 2px;
  display: block;
  line-height: 32px;
  font-size: 16px;
  color: #2c3e50;
}
</style>

