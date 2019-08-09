import layout from '@/views/layout/layout.vue'
const productSeriesList = r => require.ensure([], () => r(require('@/views/products/productSeries/list.vue')), 'group-products-productSeries')

const productSeries = [
  {
    path: '/products/productseries',
    name: 'products-productseries',
    component: layout,
    redirect: '/products/productseries/list',
    children: [
      {
        path: 'list',
        name: 'products-productSeries-list',
        component: productSeriesList,
        meta: {
          displayName: '产品系列管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default productSeries
