import layout from '@/views/layout/layout.vue'
const productPropertyList = r => require.ensure([], () => r(require('@/views/products/productProperty/list.vue')), 'group-products-productProperty')

const productsproductProperty = [
  {
    path: '/products/productproperty',
    name: 'products-productProperty',
    component: layout,
    redirect: '/products/productproperty/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: productPropertyList,
        name: 'products-productProperty-list',
        meta: {
          displayName: '产品属性类型',
          requireAuth: true
        }
      }
    ]
  }
]

export default productsproductProperty
