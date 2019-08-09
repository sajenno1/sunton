import layout from '@/views/layout/layout.vue'
const billList = r => require.ensure([], () => r(require('@/views/merchant/bill/list.vue')), 'group-merchant-manage')

const merchantBill = [
  {
    path: '/merchant/Bill',
    name: 'merchant-bill',
    component: layout,
    redirect: '/merchant/bill/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: billList,
        name: 'merchant-bill-list',
        meta: {
          displayName: '商户列表',
          requireAuth: true
        }
      }
    ]
  }
]

export default merchantBill
