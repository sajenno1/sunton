import layout from '@/views/layout/layout.vue'
const consumerFeedbackList = r => require.ensure([], () => r(require('@/views/wechatExcellent/consumerFeedback/list.vue')), 'group-wechatExcellent-consumerFeedback')

const wechatExcellentConsumerFeedback = [
  {
    path: '/wechatExcellent/consumerFeedback',
    name: 'wechatExcellent-consumerFeedback',
    component: layout,
    redirect: '/wechatExcellent/consumerFeedback/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: consumerFeedbackList,
        name: 'wechatExcellent-consumerFeedback-list',
        meta: {
          displayName: '消费者反馈',
          requireAuth: true
        }
      }
    ]
  }
]

export default wechatExcellentConsumerFeedback
