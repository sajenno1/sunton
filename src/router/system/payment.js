import layout from '@/views/layout/layout.vue'
const paymentList = r => require.ensure([], () => r(require('@/views/system/payment/configList.vue')), 'group-system-payment')

const systemPayment = [
  {
    path: '/system/payment',
    name: 'system-payment',
    component: layout,
    redirect: '/system/payment/configList',
    hidden: true,
    children: [
      {
        path: 'configList',
        component: paymentList,
        name: 'system-payment-list',
        meta: {
          displayName: '支付配置',
          requireAuth: true
        }
      }
    ]
  }
]

export default systemPayment
