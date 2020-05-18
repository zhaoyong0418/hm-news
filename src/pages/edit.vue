<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL+info.head_img" alt />
      <van-uploader :after-read="afterRead" :before-read="beforeRead" class="uploader" />
    </div>
    <hm-navbar title="昵称" :content="info.nickname" @click="showNickname"></hm-navbar>
    <hm-navbar title="密码" :content="info.password|password" @click="showPassword"></hm-navbar>
    <hm-navbar title="性别" :content="info.gender===1?'男':'女'" @click="showGender"></hm-navbar>
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="editNickname">
      <van-field placeholder="请输入用户名" v-model="nickname" />
    </van-dialog>
    <van-dialog v-model="show1" title="修改密码" show-cancel-button @confirm="editPassword">
      <van-field placeholder="请输入新密码" v-model="password" />
    </van-dialog>
    <van-dialog v-model="show2" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <div class="cropper-mask" v-show="showCropper">
      <vue-cropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
      ></vue-cropper>
      <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
      <van-button class="cancel" type="info" @click="cancel">取消</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      info: {},
      show: false,
      nickname: '',
      show1: false,
      password: '',
      show2: false,
      gender: 1,
      showCropper: false,
      img: ''
    }
  },
  methods: {
    cancel() {
      this.showCropper = false
      this.img = ''
    },
    crop() {
      this.$refs.cropper.getCropBlob(data => {
        const fd = new FormData()
        fd.append('file', data)
        this.$axios({
          method: 'post',
          url: '/upload',
          data: fd
        }).then(res => {
          const { statusCode, data } = res.data
          if (statusCode === 200) {
            this.showCropper = false
            this.img = ''
            this.editUser({
              head_img: data.url
            })
          }
        })
      })
    },
    beforeRead(file) {
      if (file.size / 1024 >= 200) {
        this.$toast.fail('文件不得超过200kb')
        return false
      }
      if (file.type !== 'image/jpeg') {
        this.$toast.fail('请上传 jpg 格式图片')
        return false
      }
      return true
    },
    afterRead(file) {
      this.showCropper = true
      this.img = file.content
    },
    showGender() {
      this.show2 = true
      this.gender = this.info.gender
    },
    showPassword() {
      this.show1 = true
    },
    editGender() {
      this.editUser({
        gender: this.gender
      })
    },
    editPassword() {
      this.editUser({
        password: this.password
      })
    },
    editUser(data) {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        data: data
      }).then(res => {
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.getInfo()
          this.$toast.success(message)
        }
      })
    },
    getInfo() {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      this.$axios({
        method: 'get',
        url: `/user/${user_id}`
      }).then(res => {
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.info = data
        }
      })
    },
    showNickname() {
      this.show = true
      this.nickname = this.info.nickname
    },
    editNickname() {
      this.editUser({
        nickname: this.nickname
      })
    }
  },
  filters: {
    password(input) {
      if (input) {
        return input.replace(/./g, '*')
      } else {
        return ''
      }
    }
  },
  created() {
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
.cropper-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .crop,
  .cancel {
    position: absolute;
    top: 0;
  }
  .crop {
    left: 0;
  }
  .cancel {
    right: 0;
  }
}
.avatar {
  position: relative;
  img {
    width: 70px;
    height: 70px;
    display: block;
    border-radius: 50%;
    margin: 30px auto;
  }
  .uploader {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}
</style>