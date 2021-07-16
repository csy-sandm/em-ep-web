<template>
  <div class="map-container">
        <baidu-map class="map" :center="markerPoint" :zoom="16" @ready="handler" >
           <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
               <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" style="font-size:13px">
                   北京xxxx <br><br>
                   地址：北京市
               </bm-info-window>
            </bm-marker>
        </baidu-map>
  </div>
</template>

<script>
export default {
  data () {
    return {
      markerPoint: { lng: 116.4, lat: 39.9 },
      show: false
    }
  },
  methods: {
    // 给地图设置主题色，我设置的是黑夜主题
    handler ({ BMap, map }) {
      const mapStyle = { style: 'midnight' }
      map.setMapStyle(mapStyle)
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen () {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container{
    width: 100%;
    height: 100%;
    .map {
        width: 100vw;
        height: 100vh;
    }
}
</style>
