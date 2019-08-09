import layout from '@/views/layout/layout.vue'
const noticeList = r => require.ensure([], () => r(require('@/views/mall/notice/list.vue')), 'group-mall-notice')

const mallNotice = [
  {
    path: '/mall/notice',
    name: 'mall-notice',
    component: layout,
    redirect: '/mall/notice/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: noticeList,
        name: 'mall-notice-list',
        meta: {
          displayName: '消息管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallNotice
