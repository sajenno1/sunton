import layout from '@/views/layout/layout.vue'
const replenishProductPropertyCategoryList = r => require.ensure([], () => r(require('@/views/replenishment/replenishProductPropertyCategory/list.vue')), 'group-replenishment-replenishProductPropertyCategory')

const replenishProductPropertyCategory = [
  {
    path: '/replenishment/replenishproductpropertycategory',
    name: 'replenishment-replenishProductPropertyCategory',
    component: layout,
    redirect: '/replenishment/replenishProductPropertyCategory/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: replenishProductPropertyCategoryList,
        name: 'replenishment-replenishProductPropertyCategory-list',
        meta: {
          displayName: '补货产品属性分类管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default replenishProductPropertyCategory
