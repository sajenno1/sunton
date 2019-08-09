import layout from '@/views/layout/layout.vue'
const activityList = r => require.ensure([], () => r(require('@/views/exhibitionHall/activity/list.vue')), 'group-exhibitionHall-activity')

const exhibitionHallActivity = [
  {
    path: '/exhibitionHall/activity',
    name: 'exhibitionHall-activity',
    component: layout,
    redirect: '/exhibitionHall/activity/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: activityList,
        name: 'exhibitionHall-activity-list',
        meta: {
          displayName: '活动管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default exhibitionHallActivity
