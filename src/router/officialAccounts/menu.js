import layout from '@/views/layout/layout.vue'
const menuList = r => require.ensure([], () => r(require('@/views/officialAccounts/menu/list.vue')), 'group-officialAccounts-manage')

const officialAccountsMenu = [
  {
    path: '/officialaccounts/menu',
    name: 'officialAccounts-menu',
    component: layout,
    redirect: '/officialaccounts/menu/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: menuList,
        name: 'officialAccounts-menu-list',
        meta: {
          displayName: '商户列表',
          requireAuth: true
        }
      }
    ]
  }
]

export default officialAccountsMenu
