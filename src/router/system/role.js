import layout from '@/views/layout/layout.vue'
const roleList = r => require.ensure([], () => r(require('@/views/system/role/list.vue')), 'group-system-role')

const systemRole = [
  {
    path: '/system/role',
    name: 'system-role',
    component: layout,
    redirect: '/system/role/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: roleList,
        name: 'system-role-list',
        meta: {
          displayName: '角色管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default systemRole
