import layout from '@/views/layout/layout.vue'
const userAddressList = r => require.ensure([], () => r(require('@/views/mall/userAddress/list.vue')), 'group-mall-userAddress')

const userAddress = [
  {
    path: '/mall/userAddress',
    name: 'mall-userAddress',
    component: layout,
    redirect: '/mall/userAddress/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: userAddressList,
        name: 'mall-userAddress-list',
        meta: {
          displayName: '收货地址管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default userAddress
