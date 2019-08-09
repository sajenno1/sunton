import layout from '@/views/layout/layout.vue'
const rechargeList = r => require.ensure([], () => r(require('@/views/merchant/recharge/list.vue')), 'group-merchant-recharge')

const merchantRecharge = [
  {
    path: '/merchant/Recharge',
    name: 'merchant-recharge',
    component: layout,
    redirect: '/merchant/recharge/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: rechargeList,
        name: 'merchant-recharge-list',
        meta: {
          displayName: '商户充值列表',
          requireAuth: true
        }
      }
    ]
  }
]

export default merchantRecharge
