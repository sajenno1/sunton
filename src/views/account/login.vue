<template>
  <div id="app-body" @keyup.enter="signIn(loginForm)">
    <div class="login" v-show="appShow">
      <div class="loginBox">
        <div class="loginTitle">欢迎登录</div>
        <div class="loginDialog">
          <input type="text" v-model="loginForm.username" class="loginName" placeholder="请输入用户名">
          <input type="password" v-model="loginForm.password" class="loginPassword" placeholder="请输入密码">
        </div>
        <div class="loginButton" @click="signIn(loginForm)">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as api from '@/api'
// import axios from '@/http'
import { Wonder } from '@/../static/js/point-line.js'
import '@/../static/css/reset.css'
import '@/../static/css/login.css'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      wonder: null,
      pwdType: 'password',
      loading: false,
      // captcha: '',
      appShow: false
    }
  },
  methods: {
    ...mapActions({
      signIn: 'account/singIn'
    }),
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$http.post(api.login, this.loginForm).then(res => {
        localStorage.access_token = res.data.accessToken
      })
      // this.$store.dispatch('account/signIn', this.loginForm)
    },
    changeCaptcha () {
      // this.captcha = axios.defaults.host + '/Captcha?' + new Date().getTime()
    }
  },
  mounted () {
    this.changeCaptcha()
    // this.captcha = axios.defaults.baseURL + '/Captcha?' + new Date().getTime()
    this.wonder = new Wonder({
      el: '#app-body',
      dotsNumber: 100,
      lineMaxLength: 300,
      dotsAlpha: 0.5,
      speed: 1.5,
      clickWithDotsNumber: 5
    })
    this.appShow = true
  }
}
</script>

<style scoped>
  #app-body {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: url(~/static/images/bg_login_bg.jpg) center center no-repeat;
    background-size: cover;
  }
</style>

