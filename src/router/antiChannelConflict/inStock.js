import layout from '@/views/layout/layout.vue'
const inStockList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/inStock/list.vue')), 'group-antiChannelConflict-inStock')
const addInStock = r => require.ensure([], () => r(require('@/views/antiChannelConflict/inStock/addBySKU.vue')), 'group-antiChannelConflict-addBySKU')
const detailReport = r => require.ensure([], () => r(require('@/views/antiChannelConflict/inStock/detailReport.vue')), 'group-antiChannelConflict-addBySKU')
// const addInStock = {templace: '@/views/antiChannelConflict/inStock/addBySKU.vue'}

const antiChannelConflictInStock = [
  {
    path: '/antichannelconflict/instock',
    name: 'antiChannelConflict-inStock',
    component: layout,
    redirect: '/antichannelconflict/instock/list',
    // keepAlive: true,
    children: [
      {
        path: 'list',
        component: inStockList,
        name: 'antiChannelConflict-inStock-list',
        meta: {
          // keepAlive: true,
          displayName: '入库单据查询',
          requireAuth: true
        }
      },
      {
        path: 'addBySKU',
        component: addInStock,
        name: 'antiChannelConflict-inStock-addBySKU',
        meta: {
          // keepAlive: true,
          displayName: '新增入库单'
          // requireAuth: true
        }
      },
      {
        path: 'detailReport',
        component: detailReport,
        name: 'antiChannelConflict-inStock-detailReport',
        meta: {
          // keepAlive: true,
          displayName: '入库明细查询'
        }
      }
    ]
  }
]

export default antiChannelConflictInStock
