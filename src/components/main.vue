<template>
	<el-container  class="main-container">
		<el-header class="header-box" style="height: 70px">
			<MainH></MainH>
		</el-header>
		<el-container class="inner-container">
      <el-aside width="200px">
        <sidebar></sidebar>
      </el-aside>
			<el-container style="width: 100%; height: 100%">
				<el-main style="width: 100%; height: 100%;padding: 10px;">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
import MainH from './layout/mainH.vue'
import sidebar from './layout/sidebar.vue'
export default {
  components: {
    MainH,
    sidebar
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
    // this.$router.push("/index")
  }
}
</script>

<style lang="scss" scoped>

/* .header-box{
	position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
} */
.main-container {
	width: 100%;
	height: 100vh;
	.el-header {
		padding: 0px !important;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-ms-flex-negative: 0;
		flex-shrink: 0;
	}
	.inner-container {
		height: calc(100% - 10vh);
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
