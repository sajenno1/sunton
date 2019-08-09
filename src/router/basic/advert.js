import layout from '@/views/layout/layout.vue'
const advertList = r => require.ensure([], () => r(require('@/views/basic/advert/list.vue')), 'group-basic-advert')

const basicAdvert = [
  {
    path: '/basic/advert',
    name: 'basic-advert',
    component: layout,
    redirect: '/basic/advert/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: advertList,
        name: 'basic-advert-list',
        meta: {
          displayName: '广告管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default basicAdvert
