<template>
    <div :id="id" :style="style" />
</template>

<script>
// import echarts from 'echarts'
import * as echarts from 'echarts'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    height: {
      type: String,
      default: '280px'
    },
    top: {
      type: String,
      default: '15%'
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      chart: ''
    }
  },
  computed: {
    style () {
      return {
        width: '100%',
        height: this.height
      }
    },
    zoom () {
      let result = false
      if (this.chartData.dataX) {
        if (this.chartData.dataX.length > 10) {
          result = true
        }
      }
      return result
    }
  },
  watch: {
    chartData () {
      this.initChart()
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    dotArr () {
      const dataArr = []
      for (var i = 0; i < 80; i++) {
        if (i % 2 === 0) {
          dataArr.push({
            name: (i + 1).toString(),
            value: 1,
            itemStyle: {
              normal: {
                color: '#676a6c',
                borderWidth: 1,
                borderColor: '#676a6c'
              }
            }
          })
        } else {
          dataArr.push({
            name: (i + 1).toString(),
            value: 2,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0,
                borderColor: 'rgba(0,0,0,0)'
              }
            }
          })
        }
      }
      return dataArr
    },
    initChart () {
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById(this.id))
      const pieData = [{
        name: '待处理报警',
        value: 22
      }, {
        name: '待完成报警工单',
        value: 20
      }]

      var titleArr = []
      var seriesArr = []

      pieData.forEach(function (item, index) {
        titleArr.push({
          text: item.name,
          left: index * 50 + 25 + '%',
          top: '75%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '15',
            color: 'white',
            textAlign: 'center'
          }
        })
        seriesArr.push({
          type: 'pie',
          name: '外层细圆环',
          radius: ['46%', '47%'],
          center: [index * 50 + 25 + '%', '45%'],
          hoverAnimation: false,
          clockWise: false,
          itemStyle: {
            normal: {
              color: '#6e7175'
            }
          },
          label: {
            show: false
          },
          data: [100]
        }, {
          type: 'pie',
          name: '内层层细圆环',
          radius: ['34%', '35%'],
          center: [index * 50 + 25 + '%', '45%'],
          hoverAnimation: false,
          clockWise: false,
          itemStyle: {
            normal: {
              color: '#6e7175'
            }
          },
          label: {
            show: false
          },
          data: [100]
        }, {
          type: 'pie',
          zlevel: 3,
          silent: true,
          radius: ['30%', '31%'],
          center: [index * 50 + 25 + '%', '45%'],
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: _this.dotArr()
        })
      })

      seriesArr.push({
        name: pieData[0].name,
        type: 'pie',
        clockWise: false,
        radius: ['38%', '43%'],
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{
                offset: 0,
                color: '#0ff'
              },
              {
                offset: 1,
                color: '#5467df'
              }
              ]
            ),
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        hoverAnimation: false,
        center: [0 * 50 + 25 + '%', '45%'],
        data: [{
          value: pieData[0].value,
          label: {
            normal: {
              formatter: function (params) {
                return params.value
              },
              position: 'center',
              show: true,
              textStyle: {
                fontSize: '25',
                // fontWeight: 'bold',
                color: '#1cc7ff'
              }
            }
          }
        }]
      }, {
        name: pieData[1].name,
        type: 'pie',
        clockWise: false,
        radius: ['38%', '43%'],
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{
                offset: 0,
                color: '#0ff'
              },
              {
                offset: 1,
                color: '#5467df'
              }
              ]
            ),
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        hoverAnimation: false,
        center: [1 * 50 + 25 + '%', '45%'],
        data: [{
          value: pieData[1].value,
          label: {
            normal: {
              formatter: function (params) {
                return params.value
              },
              position: 'center',
              show: true,
              textStyle: {
                fontSize: '25',
                // fontWeight: 'bold',
                color: '#1cc7ff'
              }
            }
          }
        }, {
          value: pieData[1].value,
          name: 'invisible',
          itemStyle: {
            normal: {
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              color: 'rgba(0,0,0,0)'
            }
          }
        }]
      })
      const option = {
        grid: {
          left: '5%',
          right: '2%',
          bottom: '0%',
          top: '0%',
          containLabel: true
        },
        title: titleArr,
        series: seriesArr
      }
      this.chart.setOption(option, true)
      window.onresize = () => {
        _this.chart.resize()
      }
    }
  }
}
</script>

<style>

</style>
