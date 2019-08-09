import layout from '@/views/layout/layout.vue'
const orderList = r => require.ensure([], () => r(require('@/views/mall/order/list.vue')), 'group-mall-order')

const mallOrder = [
  {
    path: '/mall/order',
    name: 'mall-order',
    component: layout,
    redirect: '/mall/order/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: orderList,
        name: 'mall-order-list',
        meta: {
          displayName: '订单管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallOrder
