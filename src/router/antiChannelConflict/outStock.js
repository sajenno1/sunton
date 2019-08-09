import layout from '@/views/layout/layout.vue'
const outStockList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/outStock/list.vue')), 'group-antiChannelConflict-outStock')

const antiChannelConflictOutStock = [
  {
    path: '/antichannelconflict/outstock',
    name: 'antiChannelConflict-outStock',
    component: layout,
    redirect: '/antichannelconflict/outstock/list',
    children: [
      {
        path: 'list',
        component: outStockList,
        name: 'antiChannelConflict-outStock-list',
        meta: {
          displayName: '出库单管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictOutStock
