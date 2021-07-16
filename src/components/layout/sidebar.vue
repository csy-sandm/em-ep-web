<!-- 7-1修改了侧边菜单栏的图标问题 -->
<template>
  <el-container class="sidebar-style">
    <side-nav class="tac" :routes="routes" :active-menu="menuValue"></side-nav>
  </el-container>
</template>
<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
<script>
  // import Cookies from 'js-cookie'
  import SideNav from '@/components/SideNav/index.vue'
  import myrequest from '@/utils/axios.js'
  import { initMenu } from "@/api/mainApi.js";

  export default {
    components: {
      SideNav
    },
    data() {
      return {
        menuValue: 'homePage',
        routes: []
      }
    },
    methods: {

      // 初始化的时候获取菜单
      initMenu() {
        initMenu().then((response) => {
        let resultCode = response.resultCode;
       
        if ("2000" === resultCode) {
          //这里根据查询结果，赋值给页面菜单
          this.routes = response.resultEntity
        } else {
          //这个分支是错误返回分支
          alert(response.resultMsg);
        }
      });
      
      }
    },
    watch: {},
    created() {
      this.initMenu();
    },
    mounted() {
      this.menuValue = this.$route.path.split("/")[1];
    },

  }
</script>

<style lang="scss" scoped>
  .sidebar-style {
    width: 100%;
    height: 100%;
    
    .tac {
      width: 100%;
      background: #313E5D;
    }
  }

  .el-menu {
    border-right: solid 0px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #FFF;
  }
  /deep/.el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
