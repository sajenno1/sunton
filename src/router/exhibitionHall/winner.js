import layout from '@/views/layout/layout.vue'
const winnerList = r => require.ensure([], () => r(require('@/views/exhibitionHall/winner/list.vue')), 'group-exhibitionHall-winner')

const exhibitionHallWinner = [
  {
    path: '/exhibitionHall/winner',
    name: 'exhibitionHall-winner',
    component: layout,
    redirect: '/exhibitionHall/winner/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: winnerList,
        name: 'exhibitionHall-winner-list',
        meta: {
          displayName: '奖品管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default exhibitionHallWinner
