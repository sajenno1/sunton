import layout from '@/views/layout/layout.vue'
const warehouseList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/warehouse/list.vue')), 'group-antiChannelConflict-warehouse')

const antiChannelConflictWarehouse = [
  {
    path: '/antichannelconflict/warehouse',
    name: 'antiConnelConflict-warehouse',
    component: layout,
    redirect: '/antichannelconflict/warehouse/list',
    children: [
      {
        path: 'list',
        name: 'antiConnelConflict-warehouse-list',
        component: warehouseList,
        meta: {
          displayName: '仓库管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictWarehouse
