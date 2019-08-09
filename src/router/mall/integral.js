import layout from '@/views/layout/layout.vue'
const integralList = r => require.ensure([], () => r(require('@/views/mall/integral/list.vue')), 'group-mall-integral')

const integral = [
  {
    path: '/mall/integral',
    name: 'mall-integral',
    component: layout,
    redirect: '/mall/integral/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: integralList,
        name: 'mall-integral-list',
        meta: {
          displayName: '积分管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default integral
