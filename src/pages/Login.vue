<template>
  <div class="login">
    <hm-header>登陆</hm-header>
    <hm-logo></hm-logo>
    <hm-input
      type="text"
      placeholder="请输入账号"
      v-model="username"
      message="用户名错误"
      :rule="/^1\d{4,10}$/"
      ref="username"
    ></hm-input>
    <hm-input
      type="text"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码格式不正确"
      ref="password"
    ></hm-input>
    <hm-button @click="fn">登陆</hm-button>
    <div class="go-register">
      没有账号？去
      <router-link class="link" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  },
  methods: {
    async fn() {
      const result1 = this.$refs.username.validate(this.username)
      const result2 = this.$refs.password.validate(this.password)
      if (!result1 || !result2) {
        return
      }
      const res = await this.$axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          username: this.username,
          password: this.password
        }
      })
      const { data, message, statusCode } = res.data
      if (res.data.statusCode === 200) {
        this.$toast.success(message)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.user.id)
        this.$router.push('./user')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style scoped lang="less">
.go-register {
  padding: 0 20px;
  font-size: 18px;
  text-align: left;
  .link {
    color: orange;
  }
}
</style>
