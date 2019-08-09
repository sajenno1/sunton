import layout from '@/views/layout/layout.vue'
const responseList = r => require.ensure([], () => r(require('@/views/antiFake/response/list.vue')), 'group-antiFake-response')

const antiFakeResponse = [
  {
    path: '/antifake/response',
    name: 'antiFake-response',
    component: layout,
    redirect: '/antifake/response/list',
    children: [
      {
        path: 'list',
        name: 'antiFake-response-list',
        component: responseList,
        meta: {
          displayName: '防伪查询列表',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiFakeResponse
