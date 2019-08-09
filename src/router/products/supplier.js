import layout from '@/views/layout/layout.vue'
const supplierList = r => require.ensure([], () => r(require('@/views/products/supplier/list.vue')), 'group-products-supplier')

const productsSupplier = [
  {
    path: '/products/supplier',
    name: 'products-supplier',
    component: layout,
    redirect: '/products/supplier/list',
    children: [
      {
        path: 'list',
        name: 'products-supplier-list',
        component: supplierList,
        meta: {
          displayName: '供应商管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default productsSupplier
