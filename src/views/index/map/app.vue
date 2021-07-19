<template>
  <div class="map-container">
        <baidu-map class="map" :center="markerPoint" :zoom="16" @ready="handler" >
           <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
               <!-- <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
                  <div class="marker-info">
                    <div class="marker-title">
                      <span class="title-name">义达铝业-义达排口</span>
                    </div>
                    <div class="assets-content">
                        <div class="assets-info" v-for="(item,index) of assetsInfo" :key="index">
                            <div class="assets-img">
                                <img :src="noData" class="img-content">
                            </div>
                            <div class="assets-detail">
                                <span class="assets-name">{{ item.name }}</span>
                                <span class="assets-value">{{ item.value}}</span>
                            </div>
                        </div>
                    </div>
                  </div>
               </bm-info-window> -->
            </bm-marker>
            <my-overlay
              :position="markerPoint"
              :data="assetsInfo"
              text="点击我">
            </my-overlay>
        </baidu-map>
  </div>
</template>

<script>
import MyOverlay from '../../components/myOverlay'
export default {
  components: {
    MyOverlay
  },
  data () {
    return {
      active: false,
      markerPoint: { lng: 116.4154785, lat: 39.91548784 },
      show: false,
      assetsInfo: [
        {
          name: '站点数',
          value: 35
        },
        {
          name: '设备数',
          value: 168
        },
        {
          name: '客户数',
          value: 245
        },
        {
          name: '运维工程师',
          value: 36
        },
        {
          name: '运维部门',
          value: 13
        }
      ]
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
      this.active = true
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
