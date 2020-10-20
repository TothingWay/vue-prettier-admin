<template>
  <div class="login-container">
    <div class="form-wrapper">
      <div class="login-title">Vue Prettier Admin</div>
      <a-form ref="loginForm" :model="loginForm" autocomplete="on" :rules="loginRules" @submit.prevent>
        <a-form-item name="username">
          <a-input size="large" ref="username" v-model:value="loginForm.username" placeholder="Username" autocomplete="on">
            <template #prefix><UserOutlined/></template>
          </a-input>
        </a-form-item>
        <a-tooltip :visible="capsTooltip" :getPopupContainer="triggerNode => triggerNode.parentNode" overlayClassName="caps-tooltip" placement="right">
          <template v-slot:title>
            <span>Caps lock is On</span>
          </template>
          <a-form-item name="password">
            <a-input size="large" ref="password" v-model:value="loginForm.password" @keyup="checkCapslock" :type="passwordType" placeholder="Password" autocomplete="on">
              <template #prefix><LockOutlined/></template>
              <template #suffix>
                <EyeOutlined v-if="passwordType === 'password'" @click="showPwd"/>
                <EyeInvisibleOutlined v-else @click="showPwd"/>
              </template>
            </a-input>
          </a-form-item>
        </a-tooltip>
        <a-form-item style="margin-bottom: 0;">
          <a-button
            style="width: 100%;"
            type="primary"
            size="large"
            :loading="loading"
            @click="handleLogin"
          >
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import { setupCanvas, resizeCanvas } from '/@/utils/canvas-bg'

export default {
  name: 'Login',
  components: { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined },
  data() {
    const validatePassword = async(rule, value, callback) => {
      if (value.length < 6) {
        return Promise.reject('The password can not be less than 6 digits')
      } else {
        return Promise.resolve()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: 'Please enter your user name' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    setupCanvas()
    window.addEventListener('resize', resizeCanvas)
  },
  beforeUnmount() {
    window.removeEventListener('resize', resizeCanvas)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate().then(() => {
        this.loading = true
        this.$store.dispatch('user/login', this.loginForm)
          .then(() => {
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }).catch(() => {
        console.log('error submit!!')
        return false
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
	flex-direction: column;
	width: 100vw;
	height: calc(100vh - 13rem);
	position: relative;
	justify-content: flex-start;
  align-items: center;
  .form-wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    margin: -6vw 0 0 0;
    z-index: 100;
    line-height: 1;
    :deep(.ant-form-explain) {
      text-align: left;
    }
    :deep(.ant-input:not(:first-child)) {
      padding-left: 40px;
    }
    .anticon-eye, .anticon-eye-invisible {
      margin-right: 0;
    }
  }

  .login-title {
    color: #eee;
    font-size: 40px;
    margin-bottom: 40px;
  }

  .ant-form {
    width: 500px;
    max-width: 100%;
    padding: 30px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 6px;
    :deep(.ant-form-item-control) {
      line-height: 50px;
      .anticon {
        color: #69c0ff;
        font-size: 18px;
      }

    }
    :deep(.ant-input) {
      height: 50px;
    }
  }
}

:deep(.caps-tooltip) {
  top: 193px !important;
}
</style>
