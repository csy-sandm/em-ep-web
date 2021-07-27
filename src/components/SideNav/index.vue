<template>
  <el-scrollbar style="height: 100%">
    <div class="switch-info">
        <img :src="menuClose" class="switch-img" @click="handleSwitchEvent()">
    </div>

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
import menuClose from '../../assets/img/menuClose.png'

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
  data () {
    return {
      menuClose,
      menuStyle: {
        backgroundColor: '#0B2A54',
        textColor: 'white',
        activeTextColor: 'white'
      }
    }
  },

  computed: {
    menuShow () {
      return this.$store.state.menuShowState
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
  }
}
</script>

<style lang="scss" scoped>
  .el-menu {
    border-right: none;
    text-align: left;

  }

  .switch-info{
    width: 35px;
    height: 35px;
    color: white;
    display:flex;
    align-items:center;/*垂直居中*/
    justify-content: center;/*水平居中*/
    margin-top: 10px;
    margin-left: 160px;
    .switch-img{
        width: 35px;
        height: 35px;
        background-size:100% 100%;
    }
  }
</style>
