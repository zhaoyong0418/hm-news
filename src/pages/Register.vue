<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <hm-input
      ref="username"
      placeholder="用户名/手机号码"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不对"
    ></hm-input>
    <hm-input
      ref="nickname"
      placeholder="昵称"
      v-model="nickname"
      :rule="/^[\u4e00-\u9fa5]{3,7}$/"
      message="用户的昵称必须是3-7位的中文"
    ></hm-input>
    <hm-input
      ref="password"
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="用户密码格式错误"
    ></hm-input>
    <hm-button @click="register">注册</hm-button>
    <div class="go-login">
      有账号？去
      <router-link class="link" to="/login">登陆</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      nickname: '',
      password: ''
    }
  },
  methods: {
    async register() {
      const result1 = this.$refs.username.validate(this.username)
      const result2 = this.$refs.nickname.validate(this.nickname)
      const result3 = this.$refs.password.validate(this.password)
      if (!result1 || !result2 || !result3) {
        return
      }
      const res = await this.$axios({
        method: 'post',
        url: '/register',
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      })
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        this.$router.push({
          name: 'login',
          params: { username: this.username, password: this.password }
        })
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  }
}
</script>

<style scoped lang="less">
.go-login {
  padding: 0 20px;
  font-size: 18px;
  text-align: left;
  .link {
    color: orange;
  }
}
</style>
