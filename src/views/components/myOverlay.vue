<template>
  <bm-overlay
    ref="customOverlay"
    class="sample"
    pane="labelPane"
    @draw="draw">
    <div class="marker-info">
      <div class="marker-title">
        <span class="title-name">{{ data.name }}</span>
        <div class="info-close" @click="infoWindowClose()" >
          <img :src="close" class="img-content" />
        </div>
      </div>
      <div class="assets-content">
          <div class="assets-info">
              <div class="assets-img">
                  <img :src="leixingIcon" class="img-content">
              </div>
              <div class="assets-detail">
                  <span class="assets-name">站点类型</span>
                  <span class="assets-value">{{ data.siteType}}</span>
              </div>
          </div>
          <div class="assets-info">
              <div class="assets-img">
                  <img :src="bumenIcon" class="img-content">
              </div>
              <div class="assets-detail">
                  <span class="assets-name">运维责任部门 </span>
                  <span class="assets-value">{{ data.responsiblerDepart}}</span>
              </div>
          </div>
          <div class="assets-info">
              <div class="assets-img">
                  <img :src="zerenrenIcon" class="img-content">
              </div>
              <div class="assets-detail">
                  <span class="assets-name">运维责任人</span>
                  <span class="assets-value">{{ data.responsiblerPerson}}</span>
              </div>
          </div>
          <div class="assets-info">
              <div class="assets-img">
                  <img :src="dateIcon" class="img-content">
              </div>
              <div class="assets-detail">
                  <span class="assets-name">上次运维时间</span>
                  <span class="assets-value">{{ data.lastServicesTime ? data.lastServicesTime.substring(0,10) : ''}}</span>
              </div>
          </div>
          <!-- <div class="assets-info" v-for="(item,index) of data" :key="index">
              <div class="assets-img">
                  <img :src="noData" class="img-content">
              </div>
              <div class="assets-detail">
                  <span class="assets-name">{{ item.name }}</span>
                  <span class="assets-value">{{ item.value}}</span>
              </div>
          </div> -->
      </div>
    </div>
  </bm-overlay>
</template>

<script>
import noData from '../../assets/img/no-data.png'
import leixingIcon from '../../assets/img/icon-tc-leixing.png'
import bumenIcon from '../../assets/img/icon-list-bumen.png'
import zerenrenIcon from '../../assets/img/icon-tc-zerenren.png'
import dateIcon from '../../assets/img/icon-tc-date.png'

import close from '../../assets/img/close.png'
export default {
  props: ['text', 'position', 'active', 'data'],
  data () {
    return {
      noData,
      leixingIcon,
      bumenIcon,
      zerenrenIcon,
      dateIcon,
      close
    }
  },
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  mounted () {
    console.log('data', this.data)
  },
  methods: {
    infoWindowClose () {
      this.$emit('infoWindowClose')
    },
    draw ({ el, BMap, map }) {
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 190 + 'px'
      el.style.top = pixel.y - 220 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.sample {
  width: 400px;
  height: 180px;
  line-height: 40px;
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  position: absolute;
}

.marker-info{
  width: 400px;
  height: 180px;
  background: #153761;
  text-align: left;
  .marker-title{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #2379EB;
    .title-name{
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: white;
      margin-left: 10px;
      float: left;
    }
    .info-close{
      height: 40px;
      width: 40px;
      float: right;
      display:flex;
      align-items:center;/*垂直居中*/
      justify-content: center;/*水平居中*/
      .img-content{
          width: 10px;
          height: 10px;
          background-size:100% 100%;
      }
    }
  }
  .assets-content{
      width: 100%;
      height: 130px;
      margin-top: 10px;
      .assets-info{
          width: 50%;
          height: 60px;
          float: left;
          .assets-img{
              width: 40%;
              height: 60px;
              display:flex;
              align-items:center;/*垂直居中*/
              justify-content: center;/*水平居中*/
              float: left;
              .img-content{
                  width: 30px;
                  height: 30px;
                  background-size:100% 100%;
              }
          }
          .assets-detail{
              width: 60%;
              height: 60px;
              display:flex;
              flex-direction: column;
              justify-content: center;/*水平居中*/
              float: left;
              .assets-name{
                  height: 25px;
                  line-height: 25px;
                  font-size: 14px;
                  font-weight: 400;
                  color: #FFFFFF;
                  text-align: left;
              }
              .assets-value{
                  height: 25px;
                  line-height: 25px;
                  font-size: 17px;
                  font-weight: 500;
                  color: #06BCFF;
                  text-align: left;
              }
          }
      }
  }
}
</style>
