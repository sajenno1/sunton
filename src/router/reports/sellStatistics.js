import layout from '@/views/layout/layout.vue'
const sellOrderReport = r => require.ensure([], () => r(require('@/views/reports/sellStatistics/sellOrderReport.vue')), 'group-sellStatistics-sellOrderReport')
const sellProductReport = r => require.ensure([], () => r(require('@/views/reports/sellStatistics/sellProductReport.vue')), 'group-sellStatistics-sellProductReport')
const sellDealerReport = r => require.ensure([], () => r(require('@/views/reports/sellStatistics/sellDealerReport.vue')), 'group-sellStatistics-sellDealerReport')

const sellStatistics = [
  {
    path: '/reports/sellStatistics',
    name: 'reports-sellStatistics',
    component: layout,
    redirect: '/reports/sellStatistics/sellOrderReport',
    meta: {
      keepAlive: true
    },
    hidden: true,
    children: [
      {
        path: 'sellOrderReport',
        component: sellOrderReport,
        name: 'reports-sellStatistics-sellOrderReport',
        meta: {
          keepAlive: true,
          displayName: '销售统计报表',
          requireAuth: true
        }
      },
      {
        path: 'sellProductReport',
        component: sellProductReport,
        name: 'reports-sellStatistics-sellProductReport',
        meta: {
          keepAlive: true,
          displayName: '产品统计报表',
          requireAuth: true
        }
      },
      {
        path: 'sellDealerReport',
        component: sellDealerReport,
        name: 'reports-sellStatistics-sellDealerReport',
        meta: {
          keepAlive: true,
          displayName: '客户统计报表',
          requireAuth: true
        }
      }
    ]
  }
]
export default sellStatistics
