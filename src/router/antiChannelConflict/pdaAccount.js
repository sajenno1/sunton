import layout from '@/views/layout/layout.vue'
const pdaAccountList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/pdaAccount/list.vue')), 'group-antiChannelConflict-pdaAccount')

const antiChannelConflictPDAAccount = [
  {
    path: '/antichannelconflict/pdaaccount',
    name: 'antiChannelConflict-pdaAccount',
    component: layout,
    redirect: '/antichannelconflict/pdaaccount/list',
    children: [
      {
        path: 'list',
        component: pdaAccountList,
        name: 'antiChannelConflict-pdaAccount-list',
        meta: {
          displayName: 'PDA账号管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictPDAAccount
