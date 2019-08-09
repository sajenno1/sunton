import layout from '@/views/layout/layout.vue'
const extendModuleList = r => require.ensure([], () => r(require('@/views/system/extendModule/list.vue')), 'group-system-module')

const systemExtendModule = [
  {
    path: '/system/extendModule',
    name: 'system-extendModule',
    component: layout,
    redirect: '/system/extendModule/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: extendModuleList,
        name: 'system-extendModule-list',
        meta: {
          displayName: '可扩展模块',
          requireAuth: true
        }
      }
    ]
  }
]

export default systemExtendModule
