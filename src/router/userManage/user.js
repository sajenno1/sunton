import layout from '@/views/layout/layout.vue'
const userList = r => require.ensure([], () => r(require('@/views/userManage/user/list.vue')), 'group-userManage-user')

const userManageUser = [
  {
    path: '/usermanage/user',
    name: 'userManage-user',
    component: layout,
    redirect: '/usermanage/user/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: userList,
        name: 'userManage-user-list',
        meta: {
          displayName: '用户管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default userManageUser
