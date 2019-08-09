import layout from '@/views/layout/layout.vue'
const expressList = r => require.ensure([], () => r(require('@/views/basic/express/list.vue')), 'group-basic-express')

const basicExpress = [
  {
    path: '/basic/express',
    name: 'basic-express',
    component: layout,
    redirect: '/basic/express/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: expressList,
        name: 'basic-express-list',
        meta: {
          displayName: '快递管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default basicExpress
