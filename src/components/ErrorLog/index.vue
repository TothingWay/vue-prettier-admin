<template>
  <div v-if="errorLogs.length > 0">
    <a-badge
      :dot="true"
      style="margin-right: 16px;"
      @click="dialogTableVisible = true"
    >
      <a-button class="btn-bug" size="small" type="danger">
        <BugOutlined />
      </a-button>
    </a-badge>

    <a-modal v-model:visible="dialogTableVisible" :footer="null" width="80%">
      <template #title>
        <span style="padding-right: 10px;">Error Log</span>
        <a-button size="small" type="primary" @click="clearAll">
          <template v-slot:icon><DeleteOutlined /></template>
          Clear All
        </a-button>
      </template>
      <a-table
        size="small"
        :data-source="errorLogs"
        :pagination="false"
        bordered
      >
        <a-table-column title="Message">
          <template v-slot="{ record }">
            <div>
              <div class="message-title">Msg:</div>
              <a-tag color="red">
                {{ record.err.message }}
              </a-tag>
            </div>
            <br />
            <div>
              <div class="message-title" style="padding-right: 10px;">
                Info:
              </div>
              <a-tag color="orange">
                {{ record.vm.$options.__hmrId }} error in {{ record.info }}
              </a-tag>
            </div>
            <br />
            <div>
              <div class="message-title" style="padding-right: 16px;">Url:</div>
              <a-tag color="green">
                {{ record.url }}
              </a-tag>
            </div>
          </template>
        </a-table-column>
        <a-table-column title="Stack">
          <template v-slot="{ record }">
            {{ record.err.stack }}
          </template>
        </a-table-column>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import { BugOutlined, DeleteOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    BugOutlined,
    DeleteOutlined
  },
  name: 'ErrorLog',
  data() {
    return {
      dialogTableVisible: false
    }
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs.map((item, index) => {
        return {
          ...item,
          key: index
        }
      })
    }
  },
  methods: {
    clearAll() {
      this.dialogTableVisible = false
      this.$store.dispatch('errorLog/clearErrorLog')
    }
  }
}
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
  margin-bottom: 5px;
}

.btn-bug {
  padding: 2px 7px;
  height: auto;
}
</style>
