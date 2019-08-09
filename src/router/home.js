import layout from '@/views/layout/layout.vue'
import index from '@/views/home/index'

const home = [
  {
    path: '/',
    name: 'home',
    component: layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: index,
        name: 'dashboard',
        meta: {
          displayName: '首页',
          requireAuth: true
        }
      }
    ]
  }
]

export default home
