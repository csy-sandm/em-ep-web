<template>
	<el-container  class="main-container">
    <Header class="header-container"/>
		<el-container class="inner-container">
      <el-aside width="200px" v-show="menuShow === true">
        <sidebar></sidebar>
      </el-aside>
      <div class="switch-info" v-if="menuShow === false">
          <img :src="menuOpen" class="switch-img" @click="handleSwitchEvent()">
      </div>
			<el-container style="width: 100%; height: 100%">
				<el-main style="width: 100%; height: 100%;padding: 10px;">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
import Header from './layout/header.vue'
import sidebar from './layout/sidebar.vue'
import menuOpen from '../assets/img/menuOpen.png'
export default {
  components: {
    Header,
    sidebar
  },
  computed: {
    menuShow () {
      return this.$store.state.menuShowState
    }
  },
  data () {
    return {
      menuOpen
    }
  },
  methods: {
    handleSwitchEvent () {
      if (this.menuShow === true) {
        this.setMenuShowFalse()
      } else {
        this.setMenuShowTrue()
      }
    },
    setMenuShowFalse () {
      this.$store.commit('setMenuShowFalse')
    },
    setMenuShowTrue () {
      this.$store.commit('setMenuShowTrue')
    }
  },
  created () {
    this.$router.push('/index')
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>

.switch-info{
  width: 35px;
  height: 35px;
  color: white;
  display:flex;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
  position: absolute;
  top: 70px;
  left: 0;
  z-index: 9999;
  .switch-img{
    width: 35px;
    height: 35px;
    background-size:100% 100%;
  }
}

.main-container {
	width: 100%;
	height: 100vh;
  .header-container{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 70px;
  }
	.el-header {
		padding: 0px !important;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-ms-flex-negative: 0;
		flex-shrink: 0;
	}
	.inner-container {
		height: calc(100% - 70px);
    margin-top: 70px;
    background: #F3F3F3;
	}
	.el-main {
		display: block;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		-ms-flex-preferred-size: auto;
		flex-basis: auto;
		/*overflow: auto;*/
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 0px !important;
	}
	.print-hidden-style{
		opacity:0;
	}
}

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }

  /* .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  } */

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>
