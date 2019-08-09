import layout from '@/views/layout/layout.vue'
const replenishProductPropertyList = r => require.ensure([], () => r(require('@/views/replenishment/replenishProductProperty/list.vue')), 'group-replenishment-replenishProductProperty')

const replenishProductProperty = [
  {
    path: '/replenishment/replenishproductproperty',
    name: 'replenishment-replenishProductProperty',
    component: layout,
    redirect: '/replenishment/replenishProductProperty/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: replenishProductPropertyList,
        name: 'replenishment-replenishProductProperty-list',
        meta: {
          displayName: '补货产品属性管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default replenishProductProperty
