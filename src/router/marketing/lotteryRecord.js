import layout from '@/views/layout/layout.vue'
const lotteryRecordList = r => require.ensure([], () => r(require('@/views/marketing/lotteryRecord/list.vue')), 'group-marketing-lotteryRecord')

const marketingLotteryRecord = [
  {
    path: '/marketing/lotteryRecord',
    name: 'marketing-lotteryRecord',
    component: layout,
    redirect: '/marketing/lotteryRecord/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: lotteryRecordList,
        name: 'marketing-lotteryRecord-list',
        meta: {
          displayName: '抽奖记录管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default marketingLotteryRecord
