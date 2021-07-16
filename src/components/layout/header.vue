<template >
	<el-container class="header-style"  >
		<img class="project-title" src="../../assets/header/title.png" alt="title" >
	
		<div class="header-setting menu-box">
			<div style="width: 100%;height: 50%;color: #FFF;">{{dateTimeValue}}</div>
			<div style="width: 100%;height: 50%;color: #FFF;">
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
	import { getWeatherShow } from "@/api/mainApi.js";
	
	export default {
		data() {
			return {
				menuValue: '',
				dateTimeValue: '',
				userName: '',
				weatherList: {
			        high: "",
			        low: "",
			        type: "",
					fengxiang: "",
					fengli: ""
      			},
			}
		},
		methods: {
			// 首页时间和天气展示，天气请求的是线上的一个在线列表
			toMenu(value) {
				// Cookies.set("menuValue", value);
				this.$router.push(value);
			},
			loginOut() {
				localStorage.removeItem('userToken');
				this.$router.push("/login");
			},
			getDateTime() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				if (month < 10) {
					month = "0" + month;
				}
				var day = date.getDate();
				if (day < 10) {
					day = "0" + day;
				}
				var hour = date.getHours();
				var minute = date.getMinutes();
				if (minute < 10) {
					minute = "0" + minute;
				}
				var second = date.getSeconds();
				if (second < 10) {
					second = "0" + second;
				}

				this.dateTimeValue = year + "." + month + "." + day + " " + hour + ":" + minute + ":" + second + "";

			},
			getWeatherShow(){
				var  that = this;
				getWeatherShow('南京市').then(res =>{
				
					that.weatherList.high = res.data.forecast[0].high.substring(3);
					that.weatherList.low = res.data.forecast[0].low.substring(3);
					that.weatherList.type = res.data.forecast[0].type;
					that.weatherList.fengxiang = res.data.forecast[0].fengxiang;
					that.weatherList.fengli = res.data.forecast[0].fengli.slice(9,11);
				});
				
			}

		},
		watch: {
		
		},
		mounted() {
			setInterval(() => {
				this.getDateTime();
			}, 1000);
			this.userName = localStorage['userName'];
			this.getWeatherShow();
		},
		created() {

		}

	}
</script>

<style lang="scss" scoped>
	.header-style {
		width: 100%;
		height: 100%;
		line-height: 64px;
		text-align: center;
		color: white;
		//background: #3358A6;//纯色
		//background-image: linear-gradient(to right, #7884f0c5, #4f83e9ec);//渐变色
		//background-image: url('http://zsrbapp.zsnews.cn/upload/20190404/9c3bcb26382a1ec57fbb8e84c88dafdb.gif');//网络图片
		background-image: url('../../assets/header/top.gif');//本地图片
		background-size: 100%;

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
		height: 38px;
		margin-top: -5px;
		right: 12%;
		position: absolute;
	}

	.header-loginOut {
		height: 38px;
		position: absolute;
	}
</style>