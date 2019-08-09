import layout from '@/views/layout/layout.vue'
const antiChannelConflictCodeList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/antiChannelConflictCode/list.vue')), 'group-antiChannelConflict-antiChannelConflictCode')

const antiChannelConflictAntiChannelConflictCode = [
  {
    path: '/antichannelconflict/antichannelconflictcode',
    name: 'antiChannelConflict-antiChannelConflictCode',
    component: layout,
    redirect: '/antichannelconflict/antichannelconflictcode/list',
    children: [
      {
        path: 'list',
        component: antiChannelConflictCodeList,
        name: 'antiChannelConflict-antiChannelConflictCode-list',
        meta: {
          displayName: '防窜码列表',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictAntiChannelConflictCode
