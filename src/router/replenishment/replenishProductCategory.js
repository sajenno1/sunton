import layout from '@/views/layout/layout.vue'
const replenishProductCategoryList = r => require.ensure([], () => r(require('@/views/replenishment/replenishProductCategory/list.vue')), 'group-replenishment-replenishProductCategory')

const replenishProductCategory = [
  {
    path: '/replenishment/replenishproductcategory',
    name: 'replenishment-replenishProductCategory',
    component: layout,
    redirect: '/replenishment/replenishProductCategory/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: replenishProductCategoryList,
        name: 'replenishment-replenishProductCategory-list',
        meta: {
          displayName: '补货产品分类管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default replenishProductCategory
