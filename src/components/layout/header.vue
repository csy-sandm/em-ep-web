<template >
	<el-container class="header-style"  >
		<!-- <img class="project-title" src="../../assets/header/title.png" alt="title" > -->
    <div class="logo">
        <img class="logo-img" :src="logoIcon" >
    </div>
		<div class="title">
			<div class="title-name">{{ companyName }}</div>
		</div>
		<div class="header-setting menu-box">
			<div style="width: 100%;height: 35px;line-height:40px;color: #FFF;">{{dateTimeValue}}</div>
			<div style="width: 100%;height: 35px;line-height:30px;color: #FFF;">
				<span style="position: relative;left: 0px;color: #FFF;">{{weatherList.type}}</span>
				<span style="position: relative;left: 5px;color: #FFF;">{{weatherList.fengxiang}}:{{weatherList.fengli}}</span>
				<span style="position: relative;left: 10px;color: #FFF;">{{weatherList.low}}/{{weatherList.high}}</span>
			</div>
		</div>
		<div class="header-loginOut" style="right: 100px;font-size: 15px;" width = "400px" >
			<span style="position: relative;left: 25px;color: #FFF;">{{userName}}</span>
			<span style="position: relative;left: 40px;color: #CCC;" @click="loginOut();">退出</span>
		</div>
	</el-container>
</template>

<script>
// import Cookies from 'js-cookie'
import { getWeatherShow } from '@/api/mainApi.js'
import logoIcon from '../../assets/img/logo.png'

export default {
  data () {
    return {
      logoIcon,
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
      width: 100px;
      height: 70px;
      float: left;
      display:flex;
      align-items:center;/*垂直居中*/
      justify-content: center;/*水平居中*/
      background: rgba(63,103,237, 0.1);
      .logo-img{
          width: 40px;
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
		right: 12%;
		position: absolute;
	}

	.header-loginOut {
		height: 70px;
    line-height: 70px;
		position: absolute;
	}
</style>
