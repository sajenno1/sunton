import layout from '@/views/layout/layout.vue'
const activityUserList = r => require.ensure([], () => r(require('@/views/exhibitionHall/activityUser/list.vue')), 'group-exhibitionHall-activityUser')

const exhibitionHallActivityUser = [
  {
    path: '/exhibitionHall/activityuser',
    name: 'exhibitionHall-activityUser',
    component: layout,
    redirect: '/exhibitionHall/activityuser/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: activityUserList,
        name: 'exhibitionHall-activityUser-list',
        meta: {
          displayName: '参与活动的用户',
          requireAuth: true
        }
      }
    ]
  }
]

export default exhibitionHallActivityUser
