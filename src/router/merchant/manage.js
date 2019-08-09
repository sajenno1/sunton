import layout from '@/views/layout/layout.vue'
const manageList = r => require.ensure([], () => r(require('@/views/merchant/manage/list.vue')), 'group-merchant-manage')

const merchantManage = [
  {
    path: '/merchant/manage',
    name: 'merchant-manage',
    component: layout,
    redirect: '/merchant/manage/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: manageList,
        name: 'merchant-manage-list',
        meta: {
          displayName: '商户列表',
          requireAuth: true
        }
      }
    ]
  }
]

export default merchantManage
