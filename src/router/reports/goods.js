import layout from '@/views/layout/layout.vue'
const goodsSale = r => require.ensure([], () => r(require('@/views/reports/goods/goodsSale.vue')), 'group-reports-goods')
const monthSale = r => require.ensure([], () => r(require('@/views/reports/goods/monthSale.vue')), 'group-reports-goods')
const quarterSale = r => require.ensure([], () => r(require('@/views/reports/goods/quarterSale.vue')), 'group-reports-goods')
const yearSale = r => require.ensure([], () => r(require('@/views/reports/goods/yearSale.vue')), 'group-reports-goods')
const dealerSale = r => require.ensure([], () => r(require('@/views/reports/goods/dealerSale.vue')), 'group-reports-goods')

const goodsSaleReport = [
  {
    path: '/reports/goods',
    name: 'reports-goods',
    component: layout,
    redirect: '/reports/goods/goodsSale',
    meta: {
      keepAlive: true
    },
    hidden: true,
    children: [
      {
        path: 'goodsSale',
        component: goodsSale,
        name: 'reports-goods-goodsSale',
        meta: {
          keepAlive: true,
          displayName: '商品货号销售汇总',
          requireAuth: true
        }
      },
      {
        path: 'monthSale',
        component: monthSale,
        name: 'reports-goods-monthSale',
        meta: {
          displayName: '月度销售汇总',
          requireAuth: true
        }
      },
      {
        path: 'quarterSale',
        component: quarterSale,
        name: 'reports-goods-quarterSale',
        meta: {
          displayName: '季度销售汇总',
          requireAuth: true
        }
      },
      {
        path: 'yearSale',
        component: yearSale,
        name: 'reports-goods-yearSale',
        meta: {
          displayName: '年度销售汇总',
          requireAuth: true
        }
      },
      {
        path: 'dealerSale',
        component: dealerSale,
        name: 'reports-goods-dealerSale',
        meta: {
          displayName: '代理商销售汇总',
          requireAuth: true
        }
      }
    ]
  }
]

export default goodsSaleReport
