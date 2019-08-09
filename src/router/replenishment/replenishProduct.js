import layout from '@/views/layout/layout.vue'
// import { replenishProductList } from '../../api';
const replenishProductList = r => require.ensure([], () => r(require('@/views/replenishment/replenishProduct/list.vue')), 'group-replenish-replenishProduct')

const replenishProduct = [
  {
    path: '/replenishment/replenishProduct',
    name: 'replenishment-replenishProduct',
    component: layout,
    redirect: '/replenishment/replenishProduct/list',
    children: [
      {
        path: 'list',
        name: 'replenishment-replenishProduct-list',
        component: replenishProductList,
        meta: {
          displayName: '补货产品管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default replenishProduct
