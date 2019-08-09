import layout from '@/views/layout/layout.vue'
const productDealerList = r => require.ensure([], () => r(require('@/views/wechatExcellent/productDealer/list.vue')), 'group-wechatExcellent-productDealer')

const productsProductDealer = [
  {
    path: '/wechatExcellent/productDealer',
    name: 'wechatExcellent-productDealer',
    component: layout,
    redirect: '/wechatExcellent/productDealer/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: productDealerList,
        name: 'wechatExcellent-productDealer-list',
        meta: {
          displayName: '商品经销管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default productsProductDealer
