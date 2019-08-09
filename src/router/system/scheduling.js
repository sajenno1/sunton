import layout from '@/views/layout/layout.vue'
const schedulingList = r => require.ensure([], () => r(require('@/views/system/scheduling/list.vue')), 'group-system-scheduling')

const systemScheduling = [
  {
    path: '/system/scheduling',
    name: 'system-scheduling',
    component: layout,
    redirect: '/system/scheduling/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: schedulingList,
        name: 'system-scheduling-list',
        meta: {
          displayName: '计划任务',
          requireAuth: true
        }
      }
    ]
  }
]

export default systemScheduling
