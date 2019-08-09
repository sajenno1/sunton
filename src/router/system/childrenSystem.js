import layout from '@/views/layout/layout.vue'
const childrenSystemList = r => require.ensure([], () => r(require('@/views/system/childrenSystem/list.vue')), 'group-system-childrenSystem')

const childrenSystem = [
  {
    path: '/system/childrenSystem',
    name: 'system-childrenSystem',
    component: layout,
    redirect: '/system/childrenSystem/list',
    children: [
      {
        path: 'list',
        component: childrenSystemList,
        name: 'system-childrenSystem-list',
        meta: {
          displayName: '子系统管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default childrenSystem
