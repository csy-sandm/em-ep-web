<template>
    <div class="left-content">
        <div class="work-finish">
            <ModuleTitle
                :title="'工单完成情况'"
                :pic-url="gongdanIcon"
            >
              <template v-slot:soltContent>
                <div class="more-info">
                  <div class="more-img">
                      <div class="div-content lastmonth"></div>
                  </div>
                  <div class="more-tip">上月</div>
                </div>
                <div class="more-info">
                  <div class="more-img">
                      <div class="div-content thismonth"></div>
                  </div>
                  <div class="more-tip">本月</div>
                </div>
              </template>
            </ModuleTitle>
            <div class="work-content">
                <div class="work-info" v-for="(item,index) of workInfo" :key="index">
                    <div class="work-title">
                        {{ item.name | resultFilter}}
                    </div>
                    <div class="thismonth">
                        {{ item.thismonth }}
                    </div>
                    <div class="lastmonth">
                        {{ item.lastmonth }}
                    </div>
                </div>
            </div>
        </div>
        <div class="assets">
            <ModuleTitle
                :title="'资产情况'"
                :pic-url="zichanIcon"
            />
            <div class="assets-content">
                <div class="assets-info" v-for="(item,index) of assetsInfo" :key="index">
                    <div class="assets-img">
                        <img :src="zhandianIcon" class="img-content" v-if="index === 0">
                        <img :src="shebeiIcon" class="img-content" v-if="index === 1">
                        <img :src="kehuIcon" class="img-content" v-if="index === 2">
                        <img :src="gongchengshiIcon" class="img-content" v-if="index === 3">
                        <img :src="bumenIcon" class="img-content" v-if="index === 4">
                    </div>
                    <div class="assets-detail">
                        <span class="assets-name">{{ item.name }}</span>
                        <span class="assets-value">{{ item.value}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-status">
            <ModuleTitle
                :title="'工单动态'"
                :pic-url="gongdandngtaiIcon"
            >
            <template v-slot:soltContent>
                <!-- <div class="more-info">
                  <div class="more-tip" style="color:#06BCFF;">更多</div>
                  <div class="more-img">
                      <img :src="moreIcon" class="img-content">
                  </div>
                </div> -->
              </template>
            </ModuleTitle>
            <div class="order-content">
                <div :class="['order-info', item.operate === '完成' ? 'order-finished' : 'order-unfinished']" v-for="(item,index) of rtWorlOrderList" :key="index">
                    <span class="order-name">{{ item.operator }}</span>
                    <span class="order-result">{{ item.operate }}</span>
                    <span class="order-time">{{ item.dataTime ? item.dataTime.substring(0,10) : ''}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleTitle from '../../components/moduleTitle'
import titleIcon from '../../../assets/img/title-icon.png'
import gongdanIcon from '../../../assets/img/icon-gongdan.png'
import zichanIcon from '../../../assets/img/icon-zichan.png'
import gongdandngtaiIcon from '../../../assets/img/icon-gongdandngtai.png'
import deviceIcon from '../../../assets/img/device.png'
import zhandianIcon from '../../../assets/img/icon-list-zhandian.png'
import shebeiIcon from '../../../assets/img/icon-list-shebei.png'
import kehuIcon from '../../../assets/img/icon-list-kehu.png'
import gongchengshiIcon from '../../../assets/img/icon-list-gongchengshi.png'
import bumenIcon from '../../../assets/img/icon-list-bumen.png'

import moreIcon from '../../../assets/img/more.png'

import {
  queryWorkOrdersSGY,
  queryWorkOrdersBY,
  queryZcqk,
  queryRtWorlOrder
} from '@/api/em-ep/homePageApi.js'

export default {
  components: {
    ModuleTitle
  },
  data () {
    return {
      titleIcon,
      gongdanIcon,
      zichanIcon,
      gongdandngtaiIcon,
      deviceIcon,
      zhandianIcon,
      shebeiIcon,
      kehuIcon,
      gongchengshiIcon,
      bumenIcon,
      moreIcon,
      workInfo: [
        {
          name: '正常完工',
          thismonth: '0',
          lastmonth: '0'
        },
        {
          name: '提前完工',
          thismonth: '0',
          lastmonth: '0'
        },
        {
          name: '延后完工',
          thismonth: '0',
          lastmonth: '0'
        },
        {
          name: '等待完工',
          thismonth: '0',
          lastmonth: '0'
        }
      ],
      assetsInfo: [
        {
          name: '站点数',
          value: 0
        },
        {
          name: '设备数',
          value: 0
        },
        {
          name: '客户数',
          value: 0
        },
        {
          name: '运维工程师',
          value: 0
        },
        {
          name: '运维部门',
          value: 0
        }
      ],
      zcqkList: {},
      rtWorlOrderList: []
    }
  },
  filters: {
    resultFilter (val) {
      if (val === '待处理') {
        return '等待完工'
      } else{
        return val
      }
    }
  },
  methods: {
    // 查询
    async queryRtWorlOrder () {
      const params = {}
      queryRtWorlOrder(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          if (response && response.resultEntity) {
            this.rtWorlOrderList = response.resultEntity.list
            console.log('rtWorlOrderListrtWorlOrderList', this.rtWorlOrderList)
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    // 查询
    async queryZcqk () {
      const params = {}
      queryZcqk(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          if (response && response.resultEntity) {
            this.zcqkList = response.resultEntity
            if (this.zcqkList && this.zcqkList.length > 0) {
              this.assetsInfo[0].value = this.zcqkList[0].siteNum
              this.assetsInfo[1].value = this.zcqkList[0].deviceNum
              this.assetsInfo[2].value = this.zcqkList[0].customerNum
              this.assetsInfo[3].value = this.zcqkList[0].ywgcsNum
              this.assetsInfo[4].value = this.zcqkList[0].departNum
            }
            console.log('responseresponse', response)
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    // 查询
    async queryWorkOrdersBY () {
      const params = {}
      queryWorkOrdersBY(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          if (response && response.resultEntity) {
            const workOrdersBYList = response.resultEntity
            if (workOrdersBYList && workOrdersBYList.length > 0) {
              for (let i = 0; i < workOrdersBYList.length; i++) {
                if (workOrdersBYList[i].orderStatus === '正常完工') {
                  this.workInfo[0].thismonth = workOrdersBYList[i].orderNum
                }
                if (workOrdersBYList[i].orderStatus === '提前完工') {
                  this.workInfo[1].thismonth = workOrdersBYList[i].orderNum
                }
                if (workOrdersBYList[i].orderStatus === '延后完工') {
                  this.workInfo[2].thismonth = workOrdersBYList[i].orderNum
                }
                if (workOrdersBYList[i].orderStatus === '待处理') {
                  this.workInfo[3].thismonth = workOrdersBYList[i].orderNum
                }
              }
            }
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    // 查询
    async queryWorkOrdersSGY () {
      const params = {}
      queryWorkOrdersSGY(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          if (response && response.resultEntity) {
            const workOrdersSGYList = response.resultEntity
            if (workOrdersSGYList && workOrdersSGYList.length > 0) {
              for (let i = 0; i < workOrdersSGYList.length; i++) {
                if (workOrdersSGYList[i].orderStatus === '正常完工') {
                  this.workInfo[0].lastmonth = workOrdersSGYList[i].orderNum
                }
                if (workOrdersSGYList[i].orderStatus === '提前完工') {
                  this.workInfo[1].lastmonth = workOrdersSGYList[i].orderNum
                }
                if (workOrdersSGYList[i].orderStatus === '延后完工') {
                  this.workInfo[2].lastmonth = workOrdersSGYList[i].orderNum
                }
                if (workOrdersSGYList[i].orderStatus === '待处理') {
                  this.workInfo[3].lastmonth = workOrdersSGYList[i].orderNum
                }
              }
            }
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    handleSwitchEvent () {
      // this.$router.push({ path: '/Main' })
    }
  },
  mounted () {
    this.queryRtWorlOrder()
    this.queryZcqk()
    this.queryWorkOrdersBY()
    this.queryWorkOrdersSGY()
  }
}
</script>

<style lang="scss" scoped>
    .left-content{
        height:100%;
        display: flex;
        flex-direction: column;
        .work-finish{
            height:190px;
            margin-top: 10px;
            .work-content{
                width: 100%;
                height: 125px;
                margin-top: 10px;
                .work-info{
                    width: 100px;
                    height: 100%;
                    background-color: rgba(4,36,79,0.7);
                    border-radius: 3px;
                    float: left;
                    margin-left: 10px;
                    .work-title{
                        color: white;
                        height: 40px;
                        line-height: 40px;
                    }
                    .thismonth{
                        color: #06BCFF;
                        height: 40px;
                        line-height: 40px;
                        font-size: 20px;
                    }
                    .lastmonth{
                        color: #1AD897;
                        height: 40px;
                        line-height: 40px;
                        font-size: 20px;
                    }
                }
            }
        }
        .assets{
            height:250px;
            margin-top: 10px;
            .assets-content{
                width: 100%;
                height: 200px;
                background: rgba(4,36,79,0.7);
                margin-top: 10px;
                .assets-info{
                    width: 33%;
                    height: 100px;
                    float: left;
                    .assets-img{
                        width: 50%;
                        height: 100px;
                        display:flex;
                        align-items:center;/*垂直居中*/
                        justify-content: center;/*水平居中*/
                        float: left;
                        .img-content{
                            width: 40px;
                            height: 40px;
                            background-size:100% 100%;
                        }
                    }
                    .assets-detail{
                        width: 50%;
                        height: 100px;
                        display:flex;
                        flex-direction: column;
                        // align-items:center;/*垂直居中*/
                        text-align: left;
                        justify-content: center;/*水平居中*/
                        float: left;
                        .assets-name{
                            height: 25px;
                            line-height: 25px;
                            font-size: 14px;
                            font-weight: 400;
                            color: #FFFFFF;
                        }
                        .assets-value{
                            height: 30px;
                            line-height: 30px;
                            font-size: 24px;
                            font-weight: 500;
                            color: #06BCFF;
                        }
                    }
                }
            }
        }
        .order-status{
            height: 100%;
            margin-top: 10px;
            .order-content{
                flex:1;
                display: flex;
                flex-direction: column;
                // height: 450px;
                height: calc(100vh - 630px);
                overflow-y: scroll;
                .order-info{
                    height: 40px;
                    width: 100%;
                    float: left;
                    margin-top: 10px;
                    .order-name{
                        width: 25%;
                        height: 40px;
                        line-height: 40px;
                        float: left;
                    }
                    .order-result{
                        width: 45%;
                        height: 40px;
                        line-height: 40px;
                        text-align: left;
                        float: left;
                    }
                    .order-time{
                        width: 30%;
                        height: 40px;
                        line-height: 40px;
                        float: left;
                    }
                }
                .order-finished{
                    color: #1AD897;
                    background: rgba(33,186,152,0.7);
                }
                .order-unfinished{
                    color: white;
                    background: rgba(4,36,79,0.7);
                }
            }
        }
    }

    ::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #155FB3;
    }
    ::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 4px;
        background: transparent;
    }

    .more-info{
      width: 60px;
      height: 40px;
      float: right;
      .more-img{
        width: 20px;
        height: 40px;
        display:flex;
        align-items:center;/*垂直居中*/
        justify-content: center;/*水平居中*/
        float: left;
        .div-content{
            width: 10px;
            height: 10px;
        }
        .img-content{
            width: 20px;
            height: 20px;
        }
        .thismonth{
          background: #2379EB;
        }
        .lastmonth{
          background: #1AD897;
        }
      }
      .more-tip{
        width: 40px;
        height: 40px;
        line-height: 40px;
        float: left;
        color: white;
      }
    }
</style>
