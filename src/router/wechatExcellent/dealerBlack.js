import layout from '@/views/layout/layout.vue'
const dealerBlackList = r => require.ensure([], () => r(require('@/views/wechatExcellent/dealerBlack/list.vue')), 'group-wechatExcellent-dealerBlack')

const dealerBlack = [
  {
    path: '/wechatExcellent/dealerBlack',
    name: 'wechatExcellent-dealerBlack',
    component: layout,
    redirect: '/wechatExcellent/dealerBlack/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: dealerBlackList,
        name: 'wechatExcellent-dealerBlack-list',
        meta: {
          displayName: '黑名单管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default dealerBlack
