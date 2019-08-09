import layout from '@/views/layout/layout.vue'
const wechatExcellentOrderList = r => require.ensure([], () => r(require('@/views/wechatExcellent/order/list.vue')), 'group-wechatExcellent-wechatExcellentOrder')

const wechatExcellentOrder = [
  {
    path: '/wechatExcellent/order',
    name: 'wechatExcellent-order',
    component: layout,
    redirect: '/wechatExcellent/order/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: wechatExcellentOrderList,
        name: 'wechatExcellent-order-list',
        meta: {
          displayName: '经销商订单管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default wechatExcellentOrder
