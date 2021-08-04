<template>
    <div class="index-container">
        <Map class="map-info" />
        <div class="left-container">
            <Left />
        </div>
        <div class="right-container">
            <Right />
        </div>
    </div>
</template>

<script>
import Map from './map/app.vue'
import Left from './left/app.vue'
import Right from './right/app.vue'
export default {
  components: {
    Map,
    Left,
    Right
  },
  data () {
    return {
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
.index-container{
    width: 100%;
    height: 100%;
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
        top: 30px;
        position:absolute;
        pointer-events: auto;
        z-index: 1000;
    }
    // .main-container{
    //     width:calc(100% - 200px);
    //     height: calc(100vh - 70px);
    //     top:70px;
    //     left: 200px;
    //     position:absolute;
    //     pointer-events: auto;
    //     z-index: 9999;
    //     background: rgb(243, 243, 243);
    // }

    .left-container{
        left:10px;
    }
    .right-container{
        right:0px;
    }
    // .menu-container{
    //     left:0px;
    // }
}

</style>
