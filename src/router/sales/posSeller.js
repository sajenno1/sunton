import layout from '@/views/layout/layout.vue'
const posSellerList = r => require.ensure([], () => r(require('@/views/sales/posSeller/list.vue')), 'group-sales-posSeller')
const pendingList = r => require.ensure([], () => r(require('@/views/sales/posSeller/pendingList.vue')), 'group-sales-posSeller-pending')

const salesPOSSeller = [
  {
    path: '/sales/posSeller',
    name: 'sales-posSeller',
    component: layout,
    redirect: '/sales/posSeller/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: posSellerList,
        name: 'sales-posSeller-list',
        meta: {
          displayName: '销售会员管理',
          requireAuth: true
        }
      },
      {
        path: 'pendingList',
        component: pendingList,
        name: 'sales-posSeller-pendingList',
        meta: {
          displayName: '待审核销售会员',
          requireAuth: true
        }
      }
    ]
  }
]

export default salesPOSSeller
