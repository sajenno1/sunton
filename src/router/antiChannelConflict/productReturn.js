import layout from '@/views/layout/layout.vue'
const productReturnList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/productReturn/list.vue')), 'group-antiChannelConflict-productReturn')

const antiChannelConflictProductReturn = [
  {
    path: '/antichannelconflict/productreturn',
    name: 'antiChannelConflict-productReturn',
    component: layout,
    redirect: '/antichannelconflict/productreturn/list',
    children: [
      {
        path: 'list',
        component: productReturnList,
        name: 'antiChannelConflict-productReturn-list',
        meta: {
          displayName: '退货单管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictProductReturn
