import layout from '@/views/layout/layout.vue'
const templateMessageList = r => require.ensure([], () => r(require('@/views/system/templateMessage/list.vue')), 'group-system-templateMessage')

const systemTemplateMessage = [
  {
    path: '/system/templatemessage',
    name: 'system-templateMessage',
    component: layout,
    redirect: '/system/templatemessage/list',
    children: [
      {
        path: 'list',
        component: templateMessageList,
        name: 'system-templateMessage-list',
        meta: {
          displayName: '模板消息',
          requireAuth: true
        }
      }
    ]
  }
]

export default systemTemplateMessage
