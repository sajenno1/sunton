import layout from '@/views/layout/layout.vue'
const advertList = r => require.ensure([], () => r(require('@/views/basic/common/selectDimenSion.vue')), 'group-basic-common')

const basicAdvert = [
  {
    path: '/basic/common',
    name: 'basic-common',
    component: layout,
    redirect: '/basic/common/selectDimenSion',
    hidden: true,
    children: [
      {
        path: 'list',
        component: advertList,
        name: 'basic-common-list',
        meta: {
          displayName: '公共类',
          requireAuth: true
        }
      }
    ]
  }
]

export default basicAdvert
