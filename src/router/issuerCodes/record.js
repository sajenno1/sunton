import layout from '@/views/layout/layout.vue'
const recordList = r => require.ensure([], () => r(require('@/views/issuerCodes/record/list.vue')), 'group-issuer-record')

const issuerRecord = [
  {
    path: '/issuer/record',
    name: 'issuer-record',
    component: layout,
    redirect: '/issuer/record/list',
    children: [
      {
        path: 'list',
        name: 'issuer-record-list',
        component: recordList,
        meta: {
          displayName: '发行码',
          requireAuth: true
        }
      }
    ]
  }
]

export default issuerRecord
