import layout from '@/views/layout/layout.vue'
const outStockList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/beginningStock/list.vue')), 'group-antiChannelConflict-outStock')
const addBySKU = r => require.ensure([], () => r(require('@/views/antiChannelConflict/beginningStock/addBySKU.vue')), 'group-antiChannelConflict-addBySKU')

const antiChannelConflictBeginningStock = [
  {
    path: '/antichannelconflict/beginningstock',
    name: 'antiChannelConflict-beginningStock',
    component: layout,
    redirect: '/antichannelconflict/beginningstock/list',
    children: [
      {
        path: 'list',
        component: outStockList,
        name: 'antiChannelConflict-beginningStock-list',
        meta: {
          displayName: '期初库存管理',
          requireAuth: true
        }
      },
      {
        path: 'addBySKU',
        component: addBySKU,
        name: 'antiChannelConflict-beginningStock-addBySKU',
        meta: {
          displayName: '新增期初',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictBeginningStock
