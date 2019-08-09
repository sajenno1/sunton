import layout from '@/views/layout/layout.vue'
const outStockList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/stockQuery/list.vue')), 'group-antiChannelConflict-outStock')

const antiChannelConflictStockQuery = [
  {
    path: '/antichannelconflict/stockQuery',
    name: 'antiChannelConflict-stockQuery',
    component: layout,
    redirect: '/antichannelconflict/stockQuery/list',
    children: [
      {
        path: 'list',
        component: outStockList,
        name: 'antiChannelConflict-stockQuery-list',
        meta: {
          displayName: '库存查询',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictStockQuery
