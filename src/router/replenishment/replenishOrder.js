import layout from '@/views/layout/layout.vue'
const replenishOrderList = r => require.ensure([], () => r(require('@/views/replenishment/replenishOrder/list.vue')), 'group-replenishment-replenishOrder')

const replenishOrder = [
  {
    path: '/replenishment/replenishorder',
    name: 'replenishment-replenishOrder',
    component: layout,
    redirect: '/replenishment/replenishorder/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: replenishOrderList,
        name: 'replenishment-replenishOrder-list',
        meta: {
          displayName: '补货订单管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default replenishOrder
