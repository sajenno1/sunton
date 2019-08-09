import layout from '@/views/layout/layout.vue'
const dealerLevelList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/dealerLevel/list.vue')), 'group-antiChannelConflict-dealerLevel')

const antiChannelConflictDealerLevel = [
  {
    path: '/antichannelconflict/dealerLevel',
    name: 'antiChannelConflict-dealerLevel',
    component: layout,
    redirect: '/antichannelconflict/dealerLevel/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: dealerLevelList,
        name: 'antiChannelConflict-dealerLevel-list',
        meta: {
          displayName: '经销商等级管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictDealerLevel
