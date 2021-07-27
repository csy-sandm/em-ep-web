<template>
    <div class="index-container">
        <Map class="map-info" />
        <Header class="header-container"/>
        <div class="menu-container" v-if="menuShow === true">
            <sidebar />
        </div>
        <div class="left-container" :style="`left:${leftDistance}px;top:${topDistance}px`">
            <div class="switch-info" v-if="menuShow === false">
                <img :src="menuOpen" class="switch-img" @click="handleSwitchEvent()">
            </div>
            <Left />
        </div>
        <div class="right-container">
            <Right />
        </div>
        <div class="main-container" v-if="infoShow === true">
            <el-container style="width: 100%; height: 100%">
				<el-main style="width: 100%; height: 100%;padding: 0px;">
					<router-view></router-view>
				</el-main>
			</el-container>
        </div>
    </div>
</template>

<script>
import Map from './map/app.vue'
import Header from '../../components/layout/header.vue'
import Left from './left/app.vue'
import Right from './right/app.vue'
import sidebar from '../../components/layout/sidebar.vue'
import menuOpen from '../../assets/img/menuOpen.png'

export default {
  components: {
    Map,
    Header,
    Left,
    Right,
    sidebar
  },
  data () {
    return {
      menuOpen,
      leftDistance: 10,
      topDistance: 70
    }
  },
  computed: {
    menuShow () {
      return this.$store.state.menuShowState
    },
    infoShow () {
      return this.$store.state.infoShowState
    }
  },
  watch: {
    menuShow (val) {
      if (val === true) {
        this.leftDistance = 210
        this.topDistance = 100
      } else {
        this.leftDistance = 10
        this.topDistance = 70
      }
      this.setInfoShowFalse()
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
    },
    setInfoShowFalse () {
      this.$store.commit('setInfoShowFalse')
    }
  }
}

</script>

<style lang="scss" scoped>
.index-container{
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    .map-info {
        width: 100%;
        height: 100%;
    }
    .header-container{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
    }

    .left-container,.right-container{
        width:450px;
        height: calc(100vh - 70px);
        top: 70px;
        position:absolute;
        pointer-events: auto;
        z-index: 9999;
    }

    .menu-container{
        width:200px;
        height: calc(100vh - 70px);
        top: 70px;
        position:absolute;
        pointer-events: auto;
        z-index: 9999;
    }

    .main-container{
        width:calc(100% - 200px);
        height: calc(100vh - 70px);
        top:70px;
        left: 200px;
        position:absolute;
        pointer-events: auto;
        z-index: 9999;
        background: rgb(243, 243, 243);
    }

    // .left-container{
    //     left:10px;
    // }
    .right-container{
        right:0px;
    }
    .menu-container{
        left:0px;
    }

    .switch-info{
      width: 35px;
      height: 35px;
      color: white;
      display:flex;
      align-items:center;/*垂直居中*/
      justify-content: center;/*水平居中*/
      margin-top: 10px;
      .switch-img{
          width: 35px;
          height: 35px;
          background-size:100% 100%;
      }
    }
}

</style>
