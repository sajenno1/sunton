import layout from '@/views/layout/layout.vue'
const productCategoryList = r => require.ensure([], () => r(require('@/views/products/productCategory/list.vue')), 'group-products-productCategory')

const productsProductCategory = [
  {
    path: '/products/productcategory',
    name: 'products-productCategory',
    component: layout,
    redirect: '/products/productcategory/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: productCategoryList,
        name: 'products-productCategory-list',
        meta: {
          displayName: '产品分类',
          requireAuth: true
        }
      }
    ]
  }
]

export default productsProductCategory
