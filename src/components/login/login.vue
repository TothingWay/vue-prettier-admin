<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">Admin</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon type="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon type="password" />
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="password"></el-input>
        <span class="show-pwd" @click="showPwd">
          <icon type="eye" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { testLogin } from 'utils/validate'
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!testLogin(value)) {
        callback(new Error('用户名必须为5~16位,字母，数字，下划线，减号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!testLogin(value)) {
        callback(new Error('密码必须为5~16位字母，数字，下划线，减号'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePass
        }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginAction', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({
              path: '/'
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          // 表单验证失败
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.login /deep/ {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $login_bg;
  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 15px 12px 5px;
    color: $light_gray;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 0 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
