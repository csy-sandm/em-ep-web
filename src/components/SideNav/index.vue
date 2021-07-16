<template>
  <el-scrollbar style="height: 100%">
    <el-menu :default-active="activeMenu" router :background-color="menuStyle.backgroundColor"
      :text-color="menuStyle.textColor" :unique-opened="false" :active-text-color="menuStyle.activeTextColor"
      :collapse-transition="false" mode="vertical">
      <side-nav-item v-for="route in routes" :item="route" :key="route.routeName" :route-name="route.routeName">
      </side-nav-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import SideNavItem from './SideNavItem'
  export default {
    name: 'index',
    components: {
      SideNavItem
    },
    props: {
      routes: {
        type: Array,
        required: true
      },
      activeMenu: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        menuStyle: {
          backgroundColor: '#313E5D',
          textColor: '#A4A9C0',
          activeTextColor: '#FFCA00',
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-menu {
    border-right: none;
    text-align: left;

  }
</style>