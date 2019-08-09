import layout from '@/views/layout/layout.vue'
const servicePromiseList = r => require.ensure([], () => r(require('@/views/mall/servicePromise/list.vue')), 'group-mall-servicePromise')

const mallServicePromise = [
  {
    path: '/mall/servicepromise',
    name: 'mall-servicePromise',
    component: layout,
    redirect: '/mall/servicepromise/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: servicePromiseList,
        name: 'mall-servicePromise-list',
        meta: {
          displayName: '服务承诺',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallServicePromise
