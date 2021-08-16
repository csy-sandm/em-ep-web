<template >
	<el-container class="header-style"  >
		<!-- <img class="project-title" src="../../assets/header/title.png" alt="title" > -->
    <div class="logo">
        <img class="logo-img" :src="logoIcon" >
    </div>
		<!-- <div class="title">
			<div class="title-name">{{ companyName }}</div>
		</div> -->
		<div class="header-setting menu-box">
			<!-- <div style="width: 100%;height: 35px;line-height:40px;color: #FFF;">{{dateTimeValue}}</div> -->
      <div class="header-title"> {{weatherList.type}} </div>
      <div class="header-title"> {{`${weatherList.low} ~ ${weatherList.high}`}} </div>
      <div class="header-title"> {{weatherList.fengxiang}} </div>
			<!-- <div style="width: 100%;height: 35px;line-height:30px;color: #FFF;">
				<span style="position: relative;left: 0px;color: #FFF;"></span>
				<span style="position: relative;left: 5px;color: #FFF;">{{weatherList.fengxiang}}:{{weatherList.fengli}}</span>
				<span style="position: relative;left: 10px;color: #FFF;"></span>
			</div> -->
		</div>

		<div class="header-loginOut" style="right: 50px;font-size: 17px;" >
      <div class="user">
          <img class="user-img" :src="urerIcon" >
      </div>
			<div style="float: left;height: 70px;line-height:70px;font-size:17px;color:white">{{`${userName},欢迎登录`}}</div>
      <div class="logout" @click="loginOut();">
          <img class="logout-img" :src="logoutIcon" >
      </div>
		</div>
	</el-container>
</template>

<script>
// import Cookies from 'js-cookie'
import { getWeatherShow } from '@/api/mainApi.js'
import logoIcon from '../../assets/img/logo.png'
import urerIcon from '../../assets/img/urer.png'
import logoutIcon from '../../assets/img/logout.png'

export default {
  data () {
    return {
      logoIcon,
      urerIcon,
      logoutIcon,
      menuValue: '',
      dateTimeValue: '',
      userName: '',
      weatherList: {
        high: '',
        low: '',
        type: '',
        fengxiang: '',
        fengli: ''
      },
      companyName: '聚格环境在线监测平台'
    }
  },
  methods: {
    // 首页时间和天气展示，天气请求的是线上的一个在线列表
    toMenu (value) {
      // Cookies.set("menuValue", value);
      this.$router.push(value)
    },
    loginOut () {
      localStorage.removeItem('userToken')
      this.$router.push('/login')
    },
    getDateTime () {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      var hour = date.getHours()
      var minute = date.getMinutes()
      if (minute < 10) {
        minute = '0' + minute
      }
      var second = date.getSeconds()
      if (second < 10) {
        second = '0' + second
      }

      this.dateTimeValue = year + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + second + ''
    },
    getWeatherShow () {
      var that = this
      getWeatherShow('南京市').then(res => {
        that.weatherList.high = res.data.forecast[0].high.substring(3)
        that.weatherList.low = res.data.forecast[0].low.substring(3)
        that.weatherList.type = res.data.forecast[0].type
        that.weatherList.fengxiang = res.data.forecast[0].fengxiang
        that.weatherList.fengli = res.data.forecast[0].fengli.slice(9, 11)
      })
    }

  },
  watch: {

  },
  mounted () {
    setInterval(() => {
      this.getDateTime()
    }, 1000)
    this.userName = localStorage.userName
    this.getWeatherShow()
  },
  created () {

  }

}
</script>

<style lang="scss" scoped>
	.header-style {
    width: 100%;
    height: 70px;
    background: rgba(4, 36, 79, 0.85);
    box-shadow: 0px 0px 13px 2px rgba(0, 0, 0, 0.4);
    .logo{
      width: 450px;
      height: 70px;
      margin-left: 20px;
      float: left;
      display:flex;
      align-items:center;/*垂直居中*/
      justify-content: center;/*水平居中*/
      // background: rgba(63,103,237, 0.1);
      .logo-img{
          width: 100%;
          height: 40px;
          background-size:100% 100%;
      }
    }
	  .title{
      width: 15%;
      height: 70px;
      background: rgba(63,103,237, 0.1);
      float: left;
      .title-name{
        height: 70px;
        line-height: 70px;
        font-size: 25px;
        color: white;
        text-align: left;
      }
    }
		.project-title {
			float: left;
			margin-left: 30px;
			height: 110px;
    		margin-top: -28px;
		}

		.title-weather {
			display: inline-block;
			width: 500px;
			position: absolute;
			right: 20%;
		}

		.personal-info {
			position: absolute;
			right: 10px;
			width: 200px;
		}
	}

	.menu-box {
		position: relative;
		font-size: 12px;
	}

	.header-setting {
		height: 70px;
		right: 15%;
		position: absolute;
    .header-title{
      height: 70px;
      line-height: 70px;
      float: left;
      margin-left: 10px;
      color: white;
      font-size: 17px;
    }
	}

	.header-loginOut {
		height: 70px;
    line-height: 70px;
		position: absolute;
    .user{
      width: 50px;
      height: 70px;
      margin-left: 20px;
      float: left;
      display:flex;
      align-items:center;/*垂直居中*/
      justify-content: center;/*水平居中*/
      // background: rgba(63,103,237, 0.1);
      .user-img{
          width: 20px;
          height: 20px;
          background-size:100% 100%;
      }
    }
    .logout{
      width: 50px;
      height: 70px;
      margin-left: 10px;
      float: left;
      display:flex;
      align-items:center;/*垂直居中*/
      justify-content: center;/*水平居中*/
      // background: rgba(63,103,237, 0.1);
      .logout-img{
          width: 20px;
          height: 20px;
          background-size:100% 100%;
      }
    }
	}
</style>
