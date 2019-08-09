import layout from '@/views/layout/layout.vue'
const noticeTypeList = r => require.ensure([], () => r(require('@/views/mall/noticeType/list.vue')), 'group-mall-noticeType')

const mallNoticeType = [
  {
    path: '/mall/noticetype',
    name: 'mall-noticetype',
    component: layout,
    redirect: '/mall/noticetype/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: noticeTypeList,
        name: 'mall-noticeType-list',
        meta: {
          displayName: '消息类型管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallNoticeType
