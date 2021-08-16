<template class="login-html">
  <div  width= "1920px" height= "1080px" >
    <img src = "@/assets/img/login_bg.png" class = "backpng" >
    <div class="login login-text">
        <div class="header">
            登 录
        </div>
        <div class="input">
            <div class="input-border">
                <input type="text" class="border" name="userCode" v-model="userCode" placeholder="请输入登录账号">
            </div>
            <div class="input-border">
                <input :type="typePwd" class="border" name="passWord"
                    v-model="passWord"
                    show-password
                    @keyup.enter="login" placeholder="请输入登录密码">
                    <img  @click="showPwd" :src="eyeIcon"  class="eyeIcon" >
            </div>
        </div>
        <div class="action">
            <div class="btn-login" @click="login"> 登 录 </div>
        </div>
        <div class="icon" style="display:none">
            <i class="iconfont icon-qq"></i>
            <i class="iconfont icon-weibo"></i>
            <i class="iconfont icon-weixin"></i>
        </div>
    </div>
  </div>

</template>

<script>
import { loginIn } from '@/api/loginApi'
import eye_close from '@/assets/icon/eye_close.png'
import eye_open from '@/assets/icon/eye_open.png'

export default {
  name: 'validCode',
  props: {
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '40px'
    },
    length: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      typePwd: 'password',
      eyeIcon: eye_close,
      userCode: '',
      passWord: '',
      codeList: [],
      particularsForm: {}
    }
  },
  mounted () {
    // this.$router.push('/main')
  },
  methods: {
    /** 验证用户密码 */
    login () {
      localStorage.setItem('userToken', '1111')
      localStorage.setItem('userName', '1111')
      this.$router.push('/main')

      // const params = { userCode: this.userCode, passWord: this.passWord }
      // loginIn(params).then((response) => {
      //   const resultCode = response.resultCode
      //   if (resultCode === '2000') {
      //     // 存用户信息
      //     localStorage.setItem('userToken', response.resultEntity.userToken)
      //     localStorage.setItem('userName', response.resultEntity.userName)
      //     this.$router.push('/main')
      //   } else {
      //     // 这个分支是错误返回分支
      //     alert(response.resultMsg)
      //   }
      // })
    },
    showPwd () {
      this.typePwd = this.typePwd === 'password' ? 'text' : 'password'
      this.eyeIcon = this.eyeIcon === eye_close ? eye_open : eye_close
    }
  }
}
</script>

<style>
.eyeIcon{
  right: 70px;
  width:32px;
  height:32px;
  position: absolute;
}

.login-html {
  margin: 0;
  padding: 0;
  overflow-y: hidden;
  overflow-x: hidden;
}
.login-text{
    position: absolute;
    right: 10%;
    top: 20%;
}

.background-iframe{
    position: absolute;
    width: 101%;
    height: 100.3%;
    left: 0px;
    top: -2px;
}

.backpng{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
}

.text{
    color: white;
    font-size: 25px;
}

.login {
    width: 300px;
    background-color: rgba(41, 45, 62, 0.7);
    color: aliceblue;
    border-radius: 8px;
    padding: 50px;
}

.login .header {
    text-align: center;
    font-size: 30px;
    line-height: 100px;
}

.login .input input {
    background-color: rgb(41, 45, 62);
    border: 0px;
    width: 100%;
    text-align: center;
    font-size: 15px;
    color: aliceblue;
    outline: none;
}

.login .input input::placeholder {
    text-transform: uppercase;
}

.login .input-border {
    /*实现颜色从左到右渐变效果*/
    /* background-image: linear-gradient(to right, #e8198b, #3B65BB); */
    border: 1px solid #3B65BB;
    height: 45px;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s;
}

.login .input-border .border {
    /*这里使用了css3的calc()方法用于自动计算宽高*/
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    border-radius: 25px;
    font-size: 14px;
}

.login .btn-login {
    width: 100%;
    border: 1px solid #3B65BB;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;
    text-transform: uppercase;
    border-radius: 25px;
    cursor: pointer;
    transition: .3s;
}

.login .btn-login:hover {
    background-color: #3B65BB;
}

.login .icon {
    text-align: center;
    width: 100%;
    margin: 0 auto;
    margin-top: 18px;
    border-top: 1px dashed #eee;
    padding-top: 13px;
}

.login .icon i {
    font-size: 18px;
    color: rgb(187, 187, 187);
    cursor: pointer;
    padding: 0 5px;
}

.typePwd {
    type:

}

</style>
