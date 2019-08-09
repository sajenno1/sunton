import layout from '@/views/layout/layout.vue'
const productPropertyCategoryList = r => require.ensure([], () => r(require('@/views/products/productPropertyCategory/list.vue')), 'group-products-productPropertyCategory')

const productsproductPropertyCategory = [
  {
    path: '/products/productpropertycategory',
    name: 'products-productPropertyCategory',
    component: layout,
    redirect: '/products/productpropertycategory/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: productPropertyCategoryList,
        name: 'products-productPropertyCategory-list',
        meta: {
          displayName: '产品属性类型',
          requireAuth: true
        }
      }
    ]
  }
]

export default productsproductPropertyCategory
