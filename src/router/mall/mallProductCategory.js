import layout from '@/views/layout/layout.vue'
const mallProductCategoryList = r => require.ensure([], () => r(require('@/views/mall/mallProductCategory/list.vue')), 'group-mall-mallProductCategory')

const mallProductCategory = [
  {
    path: '/mall/mallproductcategory',
    name: 'mall-mallProductCategory',
    component: layout,
    redirect: '/mall/mallProductcategory/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: mallProductCategoryList,
        name: 'mall-mallProductCategory-list',
        meta: {
          displayName: '产品分类',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallProductCategory
