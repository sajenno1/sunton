import layout from '@/views/layout/layout.vue'
const productLabelList = r => require.ensure([], () => r(require('@/views/products/productLabel/list.vue')), 'group-products-productLabel')

const productsLabel = [
  {
    path: '/products/productlabel',
    name: 'products-productlabel',
    component: layout,
    redirect: '/products/productlabel/list',
    children: [
      {
        path: 'list',
        name: 'products-productLabel-list',
        component: productLabelList,
        meta: {
          displayName: '产品标签管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default productsLabel
