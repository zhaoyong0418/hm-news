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
  methods: {
    fn() {
      const result1 = this.$refs.username.validate(this.username)
      const result2 = this.$refs.password.validate(this.password)
      if (!result1 || !result2) {
        return
      }
      this.$axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.statusCode === 200) {
          this.$toast.success('登陆成功')
          this.$router.push('./user')
        } else {
          this.$toast.fail('登陆失败')
        }
      })
    }
  }
}
</script>

<style></style>
