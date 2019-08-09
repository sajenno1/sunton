import layout from '@/views/layout/layout.vue'
const modules = r => require.ensure([], () => r(require('@/views/system/module/modules.vue')), 'group-system-module')

const systemModule = [
  {
    path: '/system/module',
    name: 'system-module',
    component: layout,
    redirect: '/system/module/modules',
    hidden: true,
    children: [
      {
        path: 'modules',
        component: modules,
        name: 'system-module-modules',
        meta: {
          displayName: '模块管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default systemModule
