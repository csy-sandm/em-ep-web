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
    initChart () {
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById(this.id))
      const option = {
        series: [{
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: '#30AFFF',
              borderWidth: 1,
              borderColor: '#30AFFF'
            }
          },
          axisLine: {
            lineStyle: {
              width: 20
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: [
            {
              value: 60,
              name: '',
              detail: {
                offsetCenter: ['0%', '0%']
              }
            }
          ],
          title: {
            fontSize: 14
          },
          detail: {
            width: 50,
            height: 40,
            fontSize: 30,
            color: '#FFFC03',
            // borderColor: 'auto',
            borderRadius: 20
            // borderWidth: 1,
            // formatter: '{value}%'
          }
        }]
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
