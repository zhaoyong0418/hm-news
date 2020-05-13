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
    ></hm-input>
    <hm-input type="text" placeholder="请输入密码" v-model="password"></hm-input>
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
          this.$router.push('./user')
        } else {
          alert('用户名或密码错误')
        }
      })
    }
  }
}
</script>

<style></style>
