<template>
  <div class="map-container">
        <baidu-map class="map" :center="markerPoint" :zoom="16" :scroll-wheel-zoom="true" @ready="handler">
           <div v-for="(marker,index) of markerList" :key="index">
              <bm-marker :position="marker.markerPoint" @click="infoWindowOpen(marker)"
              :icon="{url: `${mapMaker}`, size: {width: 32, height: 32}}"/>
           </div>
           <my-overlay
             v-if="show"
             :position="clickPoint"
             :data="clickInfo"
             @infoWindowClose="infoWindowClose">
           </my-overlay>
        </baidu-map>
  </div>
</template>

<script>
import MyOverlay from '../../components/myOverlay'
import mapMaker from '../../../assets/img/mapMaker.png'
import mapStyle from './map.js'
export default {
  components: {
    MyOverlay
  },
  data () {
    return {
      mapMaker,
      markerPoint: { lng: 116.4154785, lat: 39.91548784 },
      markerList: [
        {
          markerPoint: { lng: 116.4154785, lat: 39.91548784 },
          assetsInfo: [
            {
              name: '站点数111',
              value: 1111
            }
          ]
        },
        {
          markerPoint: { lng: 116.5154785, lat: 39.71548784 },
          assetsInfo: [
            {
              name: '站点数222',
              value: 222
            }
          ]
        },
        {
          markerPoint: { lng: 116.1154785, lat: 39.41548784 },
          assetsInfo: [
            {
              name: '站点数333',
              value: 3333
            }
          ]
        }
      ],
      show: false,
      clickInfo: [],
      clickPoint: {}
    }
  },
  methods: {
    // 给地图设置主题色，我设置的是黑夜主题
    handler ({ BMap, map }) {
      // const mapStyle = { style: 'midnight' }
      // map.setMapStyle(mapStyle)
      map.setMapStyle({
        styleJson: mapStyle
      })
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen (marker) {
      if (marker && marker.markerPoint) {
        this.clickPoint = marker.markerPoint
      }
      if (marker && marker.assetsInfo) {
        this.clickInfo = marker.assetsInfo
        console.log(this.clickInfo)
      }
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

// ::v-deep .BMap_pop img {
//   top:30px !important;
//   left:390px !important;
// }

// ::v-deep .BMap_top {
//   // display:none;
//   width: 0px!important;
//   height: 0px!important;
// }

// ::v-deep .BMap_bottom {
//   // display:none;
//   width: 0px!important;
//   height: 0px!important;
// }

// ::v-deep .BMap_center {
//   // display:none;
//   width: 0px!important;
//   height: 0px!important;
// }

/* 隐藏边角 */

// ::v-deep{
//   /*地图标题*/
// .BMap_bubble_title {
// 	color:white;
// 	font-size:13px;
// 	font-weight:bold;
// 	text-align:left;
// 	padding-left:5px;
// 	padding-top:5px;
// 	border-bottom:1px solid gray;
// 	background-color:#0066b3;
// }
// /* 消息内容 */
// .BMap_bubble_content {
// 	background-color:white;
// 	padding-left:5px;
// 	padding-top:5px;
// 	padding-bottom:10px;
// }
// /* 内容 */
// .BMap_pop div:nth-child(9) {
// 	top:35px !important;
// 	border-radius:7px;
// }
// /* 左上角删除按键 */
// .BMap_pop img {
// 	top:43px !important;
// 	left:215px !important;
// }
// .BMap_top {
// 	display:none;
// }
// .BMap_bottom {
// 	display:none;
// }
// .BMap_center {
// 	display:none;
// }
// /* 隐藏边角 */
// .BMap_pop div:nth-child(1) div {
// 	display:none;
// }
// .BMap_pop div:nth-child(3) {
// 	display:none;
// }
// .BMap_pop div:nth-child(7) {
// 	display:none;
// }
// }
</style>
