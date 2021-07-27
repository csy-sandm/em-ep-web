<template>
    <div class="right-content">
        <div class="general-info">
            <div class="general-left">
                <GaugeChart
                    id="generalLeft"
                    height="160px"
                />
                <div class="general-left-title">待处理报警</div>
            </div>
            <div class="general-right">
                <GaugeChart
                    id="generalRight"
                    height="160px"
                />
                <div class="general-right-title">待完成报警工单</div>
            </div>
        </div>

        <div class="alarm">
            <ModuleTitle
                :title="'工单动态'"
                :pic-url="titleIcon"
            />
            <div class="alarm-info">
                <div class="alarm-detail" v-for="(item,index) of alarmInfo" :key="index">
                    <el-tooltip class="item" effect="dark" placement="left">
                    <div slot="content">
                        <div style="width:400px;height:100%;">
                            <div style="width: 25%;height: 80px;line-height: 40px;float: left;color: #FFFC03;font-size: 15px;">
                                <div style="width: 100%;height: 40px;line-height: 60px;text-align: center;">{{ item.hour }}</div>
                                <div style="width: 100%;height: 40px;line-height: 20px;text-align: center;">{{ item.time }}</div>
                            </div>
                            <div style="font-size:15px;width: 65%;height: 100%;line-height:20px;margin: 20px 0px 20px 0px;text-align: left;overflow:hidden;float: left;margin: 20px 0px 20px 0px;color: #FFFC03;">
                                {{ item.result }}
                            </div>
                            <!-- <div class="alarm-more">
                                more
                            </div> -->
                        </div>
                    </div>
                    <div style="width:100%;height:100%">
                        <div class="alarm-time">
                            <div class="time-hour">{{ item.hour }}</div>
                            <div class="time-date">{{ item.time }}</div>
                        </div>
                        <div class="alarm-result">
                            {{ item.result }}
                        </div>
                        <!-- <div class="alarm-more">
                            more
                        </div> -->
                    </div>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleTitle from '../../components/moduleTitle'
import GaugeChart from '../../components/gaugeChart'
import titleIcon from '../../../assets/img/title-icon.png'

export default {
  components: {
    ModuleTitle,
    GaugeChart
  },
  data () {
    return {
      titleIcon,
      alarmInfo: [
        {
          hour: '14:42',
          time: '05/26',
          result: '总氮分钟监测值0,523mg/L，标准值2.0.00mg/L-14.000mg/L，请留意。仙林中总氮分钟监测值0,523mg/L，标准值2.0.00mg/L-14.000mg/L，请留意。仙林中'
        },
        {
          hour: '14:42',
          time: '05/26',
          result: '总氮分钟监测值0,523mg/L，标准值2.0.00mg/L-14.000mg/L，请留意。仙林中总氮分钟监测值0,523mg/L，标准值2.0.00mg/L-14.000mg/L，请留意。仙林中'
        },
        {
          hour: '14:42',
          time: '05/26',
          result: '总氮分钟监测值0,523mg/L，标准值2.0.00mg/L-14.000mg/L，请留意。仙林中'
        },
        {
          hour: '14:42',
          time: '05/26',
          result: '总氮分钟监测值0,523mg/L，标准值2.0.00mg/L-14.000mg/L，请留意。仙林中'
        },
        {
          hour: '14:42',
          time: '05/26',
          result: '总氮分钟监测值0,523mg/L，标准值2.0.00mg/L-14.000mg/L，请留意。仙林中'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.right-content{
    height:100%;
    display: flex;
    flex-direction: column;
    .general-info{
        width: 100%;
        height: 200px;
        margin-top: 50px;
        .general-left{
            width: 48%;
            height: 100%;
            float: left;
            background-color: rgba(4,36,79,0.7);
        }
        .general-left-title{
            height: 40px;
            width: 100%;
            line-height: 40px;
            color: white;
            text-align: center;
            float: left;
            font-size: 17px;
            background-color: rgba(4,36,79,0.7);
        }
        .general-right{
            width: 48%;
            height: 100%;
            float: left;
            margin-left: 2%;
            background-color: rgba(4,36,79,0.7);
        }
        .general-right-title{
            height: 40px;
            width: 100%;
            line-height: 40px;
            color: white;
            text-align: center;
            float: left;
            font-size: 17px;
            background-color: rgba(4,36,79,0.7);
        }
    }
    .alarm{
        width: 100%;
        height: 100%;
        margin-top: 10px;
        .alarm-info{
            flex:1;
            display: flex;
            flex-direction: column;
            // height: 450px;
            height: calc(100vh - 350px);
            overflow-y: scroll;
            .alarm-detail{
                width: 100%;
                height: 80px;
                margin-top: 10px;
                background-color: rgba(4,36,79,0.7);
                .alarm-time{
                    width: 25%;
                    height: 80px;
                    line-height: 40px;
                    float: left;
                    color: #30AFFF;
                    .time-hour{
                        width: 100%;
                        height: 40px;
                        line-height: 60px;
                    }
                    .time-date{
                        width: 100%;
                        height: 40px;
                        line-height: 20px;
                    }
                }
                .alarm-result{
                    width: 65%;
                    height: 40px;
                    margin: 20px 0px 20px 0px;
                    text-align: left;
                    overflow:hidden;
                    float: left;
                    margin: 20px 0px 20px 0px;
                    color: white;
                    font-size: 17px;
                }
                .alarm-more{
                    width: 10%;
                    height: 80px;
                    line-height: 80px;
                    text-align: center;
                    float: left;
                    color: #06BCFF;
                }
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

::v-deep .left .el-tooltip__popper{
  padding: 0px
}
</style>
