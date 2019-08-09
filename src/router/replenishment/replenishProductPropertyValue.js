import layout from '@/views/layout/layout.vue'
const replenishProductPropertyValueList = r => require.ensure([], () => r(require('@/views/replenishment/replenishProductPropertyValue/list.vue')), 'group-replenishment-replenishProductPropertyValue')

const replenishProductPropertyValue = [
  {
    path: '/replenishment/replenishproductpropertyvalue',
    name: 'replenishment-replenishProductPropertyValue',
    component: layout,
    redirect: '/replenishment/replenishProductPropertyValue/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: replenishProductPropertyValueList,
        name: 'replenishment-replenishProductPropertyValue-list',
        meta: {
          displayName: '补货产品属性分类管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default replenishProductPropertyValue
