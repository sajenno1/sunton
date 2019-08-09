import layout from '@/views/layout/layout.vue'
const dataList = r => require.ensure([], () => r(require('@/views/antiChannelConflict/checkUserAccount/list.vue')), 'group-products-product')

const testList = [
  {
    path: '/antiChannelconflict/checkUserAccount',
    name: 'antiChannelconflict-checkUserAccount',
    component: layout,
    redirect: '/antiChannelconflict/checkUserAccount/list',
    children: [
      {
        path: 'List',
        name: 'antiChannelconflict-checkUserAccount-List',
        component: dataList,
        meta: {
          displayName: '稽查人员管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default testList
