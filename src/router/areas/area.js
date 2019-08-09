import layout from '@/views/layout/layout.vue'
const areaList = r => require.ensure([], () => r(require('@/views/areas/area/list.vue')), 'group-areas-area')

const areasArea = [
  {
    path: '/areas/area',
    name: 'areas-area',
    component: layout,
    redirect: '/areas/area/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: areaList,
        name: 'areas-area-list',
        meta: {
          displayName: '地区管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default areasArea
