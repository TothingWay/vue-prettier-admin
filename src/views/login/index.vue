<template>
  <div class="login-container">
    <div class="form-wrapper">
      <div class="login-title">Vue Prettier Admin</div>
      <a-form :model="loginForm" @submit.prevent>
        <a-form-item>
          <a-input size="large" v-model:value="loginForm.username" placeholder="Username">
            <template v-slot:prefix><UserOutlined/></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input size="large" v-model:value="loginForm.password" type="password" placeholder="Password">
            <template v-slot:prefix><LockOutlined/></template>
          </a-input>
        </a-form-item>
        <a-form-item style="margin-bottom: 0;">
          <a-button
            style="width: 100%;"
            type="primary"
            size="large"
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
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { setupCanvas, resizeCanvas } from '/@/utils/canvas-bg'

export default {
  name: 'Login',
  components: { UserOutlined, LockOutlined },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
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
    console.log(1)
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
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      })
      /* this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      }) */
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
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
  }

  .login-title {
    color: #eee;
    font-size: 40px;
    margin-bottom: 40px;
  }

  .ant-form {
    width: 500px;
    /* background:rgba(11, 44, 72, 0.88); */
    max-width: 100%;
    /* padding-left: 20px; */
    /* padding-right: 20px; */
    padding: 30px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 6px;
    :deep(.ant-form-item-control) {
      line-height: 50px;
      .anticon {
        color: #69c0ff;
      }

    }
    :deep(.ant-input) {
      /* border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgb(0 23 41);
      caret-color: #fff;
      color: #fff; */
      height: 50px;
    }
  }
}
</style>
