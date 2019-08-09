import layout from '@/views/layout/layout.vue'
const adminList = r => require.ensure([], () => r(require('@/views/system/admin/list.vue')), 'group-system-admin')
const chanegPassword = r => require.ensure([], () => r(require('@/views/system/admin/changePassword.vue')), 'group-system-admin-changePassword')
const personalData = r => require.ensure([], () => r(require('@/views/system/admin/personalData.vue')), 'group-system-admin-personalData')

const systemAdmin = [
  {
    path: '/system/admin',
    name: 'system-admin',
    component: layout,
    redirect: '/system/admin/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: adminList,
        name: 'system-admin-list',
        meta: {
          displayName: '管理员管理',
          requireAuth: true
        }
      },
      {
        path: 'changepassword',
        component: chanegPassword,
        name: 'system-admin-changePassword',
        meta: {
          displayName: '修改秘码',
          requireAuth: true
        }
      },
      {
        path: 'personaldata',
        component: personalData,
        name: 'system-admin-personalData',
        meta: {
          displayName: '个人资料',
          requireAuth: true
        }
      }
    ]
  }
]

export default systemAdmin
