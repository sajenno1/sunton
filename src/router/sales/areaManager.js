import layout from '@/views/layout/layout.vue'
const posList = r => require.ensure([], () => r(require('@/views/sales/areaManager/list.vue')), 'group-sales-areaManager')

const salesAreaManager = [
  {
    path: '/sales/areaManager',
    name: 'sales-areaManager',
    component: layout,
    redirect: '/sales/areaManager/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: posList,
        name: 'sales-areaManager-list',
        meta: {
          displayName: '区域负责人管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default salesAreaManager
