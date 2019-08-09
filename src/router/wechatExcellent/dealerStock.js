import layout from '@/views/layout/layout.vue'
const dealerStockList = r => require.ensure([], () => r(require('@/views/wechatExcellent/dealerStock/list.vue')), 'group-wechatExcellent-dealerStock')

const wechatExcellentDealerStock = [
  {
    path: '/wechatExcellent/dealerStock',
    name: 'wechatExcellent-dealerStock',
    component: layout,
    redirect: '/wechatExcellent/dealerStock/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: dealerStockList,
        name: 'wechatExcellent-dealedealerStockrLevel-list',
        meta: {
          displayName: '经销商库存管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default wechatExcellentDealerStock
