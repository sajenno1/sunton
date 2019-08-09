import layout from '@/views/layout/layout.vue'
const posList = r => require.ensure([], () => r(require('@/views/sales/pos/list.vue')), 'group-sales-pos')

const salesPOS = [
  {
    path: '/sales/pos',
    name: 'sales-pos',
    component: layout,
    redirect: '/sales/pos/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: posList,
        name: 'sales-pos-list',
        meta: {
          displayName: '销售站点管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default salesPOS
