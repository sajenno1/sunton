import layout from '@/views/layout/layout.vue'
const joinInApplyList = r => require.ensure([], () => r(require('@/views/wechatExcellent/joinInApply/list.vue')), 'group-wechatExcellent-joinInApply')

const joinInApply = [
  {
    path: '/wechatExcellent/joinInApply',
    name: 'wechatExcellent-joinInApply',
    component: layout,
    redirect: '/wechatExcellent/joinInApply/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: joinInApplyList,
        name: 'wechatExcellent-joinInApply-list',
        meta: {
          displayName: '加盟申请管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default joinInApply
