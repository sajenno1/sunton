import layout from '@/views/layout/layout.vue'
const dealerCenterInformation = r => require.ensure([], () => r(require('@/views/mall/dealerCenter/information.vue')), 'group-dataCenter-information')

const mallOrder = [
  {
    path: '/mall/dealerCenter',
    name: 'mall-dealerCenter',
    component: layout,
    redirect: '/mall/dealerCenter/information',
    hidden: true,
    children: [
      {
        path: 'information',
        component: dealerCenterInformation,
        name: 'mall-channelOrder-information',
        meta: {
          displayName: '个人资料',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallOrder
