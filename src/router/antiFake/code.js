import layout from '@/views/layout/layout.vue'
const codeList = r => require.ensure([], () => r(require('@/views/antiFake/code/list.vue')), 'group-antiFake-code')

const antiFakeCode = [
  {
    path: '/antifake/code',
    name: 'antiFake-code',
    component: layout,
    redirect: '/antifake/code/list',
    children: [
      {
        path: 'list',
        name: 'antiFake-code-list',
        component: codeList,
        meta: {
          displayName: '防伪码列表',
          requireAuth: true
        }
      }
    ]
  }
]

export default antiFakeCode
