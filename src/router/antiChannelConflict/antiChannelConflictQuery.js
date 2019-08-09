import layout from '@/views/layout/layout.vue'
const antiChannelConflictQueryList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/antiChannelConflictQuery/list.vue')), 'group-antiChannelConflict-antiChannelConflictQuery')

const antiChannelConflictAntiChannelConflictQuery = [
  {
    path: '/antichannelconflict/antichannelconflictquery',
    name: 'antiChannelConflict-antiChannelConflictQuery',
    component: layout,
    redirect: '/antichannelconflict/antichannelconflictquery/list',
    children: [
      {
        path: 'list',
        component: antiChannelConflictQueryList,
        name: 'antiChannelConflict-antiChannelConflictQuery-list',
        meta: {
          displayName: '防窜码列表',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictAntiChannelConflictQuery
