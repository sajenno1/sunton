import layout from '@/views/layout/layout.vue'
const awardList = r => require.ensure([], () => r(require('@/views/exhibitionHall/award/list.vue')), 'group-exhibitionHall-award')

const exhibitionHallAward = [
  {
    path: '/exhibitionHall/award',
    name: 'exhibitionHall-award',
    component: layout,
    redirect: '/exhibitionHall/award/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: awardList,
        name: 'exhibitionHall-award-list',
        meta: {
          displayName: '奖品管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default exhibitionHallAward
