import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: require('@/views/login/login.vue').default
  },
  {
    path: '/main',
    name: 'main',
    component: require('@/components/main.vue').default,
    children: [
      {
        path: '/index',
        name: 'index',
        component: require('@/views/index/app.vue').default
      },
      {
        path: '/bigScreen',
        name: 'BigScreen',
        component: require('@/views/bigScreen/bigScreen.vue').default
      },
      {
        path: '/alarmCaseInfo',
        name: 'AlarmCaseInfo',
        component: require('@/views/alarm/alarmCaseInfo.vue').default
      },
      {
        path: '/monitorAlarmData',
        name: 'MonitorAlarmData',
        component: require('@/views/alarm/monitorAlarmData.vue').default
      },
      {
        path: '/alarmAnalysis',
        name: 'AlarmAnalysis',
        component: require('@/views/analysis/alarmAnalysis.vue').default
      },
      {
        path: '/orderAnalysis',
        name: 'OrderAnalysis',
        component: require('@/views/analysis/orderAnalysis.vue').default
      },
      {
        path: '/customerInfo',
        name: 'CustomerInfo',
        component: require('@/views/baseinfo/customerInfo.vue').default
      },
      {
        path: '/deviceInfo',
        name: 'DeviceInfo',
        component: require('@/views/baseinfo/deviceInfo.vue').default
      },
      {
        path: '/siteInfo',
        name: 'SiteInfo',
        component: require('@/views/baseinfo/siteInfo.vue').default
      },
      {
        path: '/siteMonitorHis',
        name: 'SiteMonitorHis',
        component: require('@/views/monitor/siteMonitorHis.vue').default
      },
      {
        path: '/siteMonitorData',
        name: 'SiteMonitorData',
        component: require('@/views/monitor/siteMonitorData.vue').default
      },
      {
        path: '/alarmWorkorderInfo',
        name: 'AlarmWorkorderInfo',
        component: require('@/views/workorder/alarmWorkorderInfo.vue').default
      },
      {
        path: '/planWorkorderInfo',
        name: 'PlanWorkorderInfo',
        component: require('@/views/workorder/planWorkorderInfo.vue').default
      },
      {
        path: '/auditeOrder',
        name: 'AuditeOrder',
        component: require('@/views/workorder/auditeOrder.vue').default
      },
      {
        path: '/distributeOrder',
        name: 'DistributeOrder',
        component: require('@/views/workorder/distributeOrder.vue').default
      },

      {
        path: '/codeGenerator',
        name: 'CodeGenerator',
        component: require('@/views/sysManager/codeGenerator.vue').default
      },
      {
        path: '/departInfo',
        name: 'DepartInfo',
        component: require('@/views/sysManager/departInfo.vue').default
      },
      {
        path: '/accountInfo',
        name: 'AccountInfo',
        component: require('@/views/sysManager/accountInfo.vue').default
      },
      {
        path: '/roleInfo',
        name: 'RoleInfo',
        component: require('@/views/sysManager/roleInfo.vue').default
      },
      {
        path: '/menuInfo',
        name: 'MenuInfo',
        component: require('@/views/sysManager/menuInfo.vue').default
      },
      {
        path: '/sysParam',
        name: 'SysParam',
        component: require('@/views/sysManager/sysParam.vue').default
      },
      {
        path: '/dataDit',
        name: 'DataDit',
        component: require('@/views/sysManager/dataDit.vue').default
      },
      {
        path: '/loginLog',
        name: 'LoginLog',
        component: require('@/views/sysManager/loginLog.vue').default
      },
      {
        path: '/operateLog',
        name: 'OperateLog',
        component: require('@/views/sysManager/operateLog.vue').default
      }
    ]
  }
  // {
  //   path: '/Main',
  //   name: 'Main',
  //   component: require('@/components/main.vue').default
  // }

]

const router = new VueRouter({
  routes
})

export default router
