import layout from '@/views/layout/layout.vue'
const mallProductPropertyList = r => require.ensure([], () => r(require('@/views/mall/mallProductProperty/list.vue')), 'group-mall-mallProductProperty')

const mallProductProperty = [
  {
    path: '/mall/mallProductProperty',
    name: 'mall-mallProductProperty',
    component: layout,
    redirect: '/mall/mallProductProperty/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: mallProductPropertyList,
        name: 'mall-mallProductProperty-list',
        meta: {
          displayName: '产品属性类型',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallProductProperty
