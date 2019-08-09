import layout from '@/views/layout/layout.vue'
const mallProductPropertyCategoryList = r => require.ensure([], () => r(require('@/views/mall/mallProductPropertyCategory/list.vue')), 'group-mall-mallProductPropertyCategory')

const mallProductPropertyCategory = [
  {
    path: '/mall/mallProductpropertycategory',
    name: 'mall-mallProductPropertyCategory',
    component: layout,
    redirect: '/mall/mallProductpropertycategory/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: mallProductPropertyCategoryList,
        name: 'mall-mallProductPropertyCategory-list',
        meta: {
          displayName: '产品属性分类',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallProductPropertyCategory
