<template>
    <div class="left-content">
        <div class="work-finish">
            <ModuleTitle
                :title="'工单完成情况'"
                :pic-url="titleIcon"
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
                        {{ item.name }}
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
                :pic-url="titleIcon"
            />
            <div class="assets-content">
                <div class="assets-info" v-for="(item,index) of assetsInfo" :key="index">
                    <div class="assets-img">
                        <img :src="deviceIcon" class="img-content">
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
                :pic-url="titleIcon"
            >
            <template v-slot:soltContent>
                <div class="more-info">
                  <div class="more-tip" style="color:#06BCFF;">更多</div>
                  <div class="more-img">
                      <img :src="moreIcon" class="img-content">
                  </div>
                </div>
              </template>
            </ModuleTitle>
            <div class="order-content">
                <div :class="['order-info', item.result === 0 ? 'order-finished' : 'order-unfinished']" v-for="(item,index) of orderInfo" :key="index">
                    <span class="order-name">{{ item.name }}</span>
                    <span class="order-result">{{ item.result | resultFilter}}</span>
                    <span class="order-time">{{ item.time }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleTitle from '../../components/moduleTitle'
import titleIcon from '../../../assets/img/title-icon.png'
import deviceIcon from '../../../assets/img/device.png'
import moreIcon from '../../../assets/img/more.png'

export default {
  components: {
    ModuleTitle
  },
  data () {
    return {
      titleIcon,
      deviceIcon,
      moreIcon,
      workInfo: [
        {
          name: '正常完工',
          thismonth: '101',
          lastmonth: '52'
        },
        {
          name: '提前完工',
          thismonth: '101',
          lastmonth: '52'
        },
        {
          name: '延后完工',
          thismonth: '101',
          lastmonth: '52'
        },
        {
          name: '等待完工',
          thismonth: '101',
          lastmonth: '52'
        }
      ],
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
      ],
      orderInfo: [
        {
          name: '刘洋',
          result: 0,
          time: '05-15 15:57'
        },
        {
          name: '刘建国',
          result: 0,
          time: '05-15 15:57'
        },
        {
          name: '刘建国',
          result: 1,
          time: '05-15 15:57'
        },
        {
          name: '刘洋',
          result: 2,
          time: '05-15 15:57'
        }
      ]
    }
  },
  filters: {
    resultFilter (val) {
      if (Number(val) === 0) {
        return '完成了工单'
      } else if (Number(val) === 1) {
        return '接收了工单'
      } else {
        return '开始了工单'
      }
    }
  },
  methods: {
    handleSwitchEvent () {
      // this.$router.push({ path: '/Main' })
    }
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
                height: calc(100vh - 540px);
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
