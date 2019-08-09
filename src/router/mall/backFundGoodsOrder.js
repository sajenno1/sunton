import layout from '@/views/layout/layout.vue'
const backFundGoodsOrderList = r => require.ensure([], () => r(require('@/views/mall/backFundGoodsOrder/list.vue')), 'group-mall-backFundGoodsOrder')

const backFundGoodsOrder = [
  {
    path: '/mall/backFundGoodsOrder',
    name: 'mall-backFundGoodsOrder',
    component: layout,
    redirect: '/mall/backFundGoodsOrder/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: backFundGoodsOrderList,
        name: 'mall-backFundGoodsOrder-list',
        meta: {
          displayName: '退货退款管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default backFundGoodsOrder
