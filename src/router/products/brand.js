import layout from '@/views/layout/layout.vue'
const brandList = r => require.ensure([], () => r(require('@/views/products/brand/list.vue')), 'group-products-brand')

const productsBrand = [
  {
    path: '/products/brand',
    name: 'products-brand',
    component: layout,
    redirect: '/products/brand/list',
    children: [
      {
        path: 'list',
        name: 'products-brand-list',
        component: brandList,
        meta: {
          displayName: '品牌管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default productsBrand
