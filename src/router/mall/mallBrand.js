import layout from '@/views/layout/layout.vue'
const brandList = r => require.ensure([], () => r(require('@/views/mall/mallProductBrand/list.vue')), 'group-mall-mallProductBrand')

const mallProductBrand = [
  {
    path: '/mall/mallproductbrand',
    name: 'mall-mallProductBrand',
    component: layout,
    redirect: '/mall/mallProductBrand/list',
    children: [
      {
        path: 'list',
        name: 'mall-mallProductBrand-list',
        component: brandList,
        meta: {
          displayName: '品牌管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallProductBrand
