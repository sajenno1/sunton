import layout from '@/views/layout/layout.vue'
const codeList = r => require.ensure([], () => r(require('@/views/issuerCodes/code/list.vue')), 'group-issuer-code')

const issuerCode = [
  {
    path: '/issuer/code',
    name: 'issuer-code',
    component: layout,
    redirect: '/issuer/code/list',
    children: [
      {
        path: 'list',
        name: 'issuer-code-list',
        component: codeList,
        meta: {
          displayName: '发行码',
          requireAuth: true
        }
      }
    ]
  }
]

export default issuerCode
