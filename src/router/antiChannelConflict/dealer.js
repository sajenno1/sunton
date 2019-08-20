/* eslint-disable */ 
import layout from '@/views/layout/layout.vue'
const dealerList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/dealer/list.vue')), 'group-antiChannelConflict-dealer')
const dealerTreeList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/dealer/treelist.vue')), 'group-antiChannelConflict-dealertree')
// const pendingList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/dealer/pendingList.vue')), 'group-antiChannelConflict-dealer-pending')
const dealerSellStoreList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/dealer/sellStoreList.vue')), 'group-antiChannelConflict-dealerSellStore')

const antiChannelConflictDealer = [
  {
    path: '/antichannelconflict/dealer',
    name: 'antiChannelConflict-dealer',
    component: layout,
    redirect: '/antichannelconflict/dealer/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: dealerList,
        name: 'antiChannelConflict-dealer-list',
        meta: {
          displayName: '经销商管理',
          requireAuth: true,
        }
      },
      // {
      //   path: 'pendinglist',
      //   component: pendingList,
      //   name: 'antiChannelConflict-dealer-pendingList',
      //   meta: {
      //     displayName: '待审核经销商',
      //     requireAuth: true
      //   }
      // },
      {
        path: 'treelist',
        component: dealerTreeList,
        name: 'antiChannelConflict-dealer-treelist',
        meta: {
          displayName: '经销商管理',
          requireAuth: true
        }
      },
      {
        path: 'sellStorelist',
        component: dealerSellStoreList,
        name: 'antiChannelConflict-sellStore-list',
        meta: {
          displayName: '门店管理',
          requireAuth: true
        }
      },
      {
        path: 'sellStorelist/:pid',
        component: dealerSellStoreList,
        name: 'antiChannelConflict-sellStore-list2',
        meta: {
          displayName: '门店管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiChannelConflictDealer
