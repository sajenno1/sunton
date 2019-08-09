import layout from '@/views/layout/layout.vue'
const replenishProductBrandList = r => require.ensure([], () => r(require('@/views/replenishment/replenishProductBrand/list.vue')), 'group-replenishment-replenishProductBrand')

const replenishProductBrand = [
  {
    path: '/replenishment/replenishproductbrand',
    name: 'replenishment-replenishProductBrand',
    component: layout,
    redirect: '/replenishment/replenishProductBrand/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: replenishProductBrandList,
        name: 'replenishment-replenishProductBrand-list',
        meta: {
          displayName: '补货产品品牌管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default replenishProductBrand
