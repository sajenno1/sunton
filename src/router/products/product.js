import layout from '@/views/layout/layout.vue'
const productList = r => require.ensure([], () => r(require('@/views/products/product/list.vue')), 'group-products-product')

const productsProduct = [
  {
    path: '/products/product',
    name: 'products-product',
    component: layout,
    redirect: '/products/product/list',
    children: [
      {
        path: 'list',
        name: 'products-product-list',
        component: productList,
        meta: {
          displayName: '产品管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default productsProduct
