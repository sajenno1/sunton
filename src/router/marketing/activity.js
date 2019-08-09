import layout from '@/views/layout/layout.vue'
const activityList = r => require.ensure([], () => r(require('@/views/marketing/activity/list.vue')), 'group-marketing-activity')

const marketingActivity = [
  {
    path: '/marketing/activity',
    name: 'marketing-activity',
    component: layout,
    redirect: '/marketing/activity/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: activityList,
        name: 'marketing-activity-list',
        meta: {
          displayName: '活动管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default marketingActivity
