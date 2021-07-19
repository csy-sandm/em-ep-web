<template>
    <div class="index-container">
        <Map />
        <Header class="header-container"/>
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
import Header from '../../components/layout/header.vue'
import Left from './left/app.vue'
import Right from './right/app.vue'
export default {
  components: {
    Map,
    Header,
    Left,
    Right
  }
}

</script>

<style lang="scss" scoped>
.index-container{
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    .map {
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

    .left-container{
        left:10px;
    }
    .right-container{
        right:0;
    }
}

</style>
