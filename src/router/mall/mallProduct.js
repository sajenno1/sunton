import layout from '@/views/layout/layout.vue'
const mallProductList = r => require.ensure([], () => r(require('@/views/mall/mallProduct/list.vue')), 'group-mall-mallProduct')

const mallProduct = [
  {
    path: '/mall/mallproduct',
    name: 'mall-mallProduct',
    component: layout,
    redirect: '/mall/mallProduct/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: mallProductList,
        name: 'mall-product-list',
        meta: {
          displayName: '商品管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallProduct
