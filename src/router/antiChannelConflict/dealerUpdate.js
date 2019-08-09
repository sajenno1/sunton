import layout from '@/views/layout/layout.vue'
const dealerUpdatePendingList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/dealerUpdate/pendingList.vue')), 'group-antiChannelConflict-dealerUpdate')

const antiChannelConflictdealerUpdate = [
  {
    path: '/antichannelconflict/dealerupdate',
    name: 'antiChannelConflict-dealerUpdate',
    component: layout,
    redirect: '/antichannelconflict/dealerupdate/pendingList',
    children: [
      {
        path: 'pendingList',
        component: dealerUpdatePendingList,
        name: 'antiChannelConflict-dealerUpdate-pendingList',
        meta: {
          displayName: '经销商升级管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictdealerUpdate
