import layout from '@/views/layout/layout.vue'
const officialAccountEdit = r => require.ensure([], () => r(require('@/views/system/officialAccount/edit.vue')), 'group-system-officialAccount')

const systemOfficialAccount = [
  {
    path: '/system/officialaccount',
    name: 'system-officialAccount',
    component: layout,
    redirect: '/system/officialaccount/edit',
    children: [
      {
        path: 'edit',
        component: officialAccountEdit,
        name: 'system-officialAccount-edit',
        meta: {
          displayName: '公众号配置',
          requireAuth: true
        }
      }
    ]
  }
]

export default systemOfficialAccount
