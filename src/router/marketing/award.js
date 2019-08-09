import layout from '@/views/layout/layout.vue'
const awardList = r => require.ensure([], () => r(require('@/views/marketing/award/list.vue')), 'group-marketing-award')

const marketingAward = [
  {
    path: '/marketing/award',
    name: 'marketing-award',
    component: layout,
    redirect: '/marketing/award/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: awardList,
        name: 'marketing-award-list',
        meta: {
          displayName: '奖品管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default marketingAward
