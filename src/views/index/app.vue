<template>
    <div class="index-container">
        <Map />
        <Header class="header-container"/>
    </div>
</template>

<script>
import Map from './map/app.vue'
import Header from '../../components/layout/header.vue'
export default {
  components: {
    Map,
    Header
  }
}

</script>

<style lang="scss" scoped>
.index-container{
    width: 100%;
    height: 100%;
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
}
</style>
