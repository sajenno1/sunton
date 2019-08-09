import layout from '@/views/layout/layout.vue'
const queryList = r => require.ensure([], () => r(require('@/views/antiFake/query/list.vue')), 'group-antiFake-query')

const antiFakeQuery = [
  {
    path: '/antifake/query',
    name: 'antiFake-query',
    component: layout,
    redirect: '/antifake/query/list',
    children: [
      {
        path: 'list',
        name: 'antiFake-query-list',
        component: queryList,
        meta: {
          displayName: '防伪查询列表',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiFakeQuery
