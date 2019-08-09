import layout from '@/views/layout/layout.vue'
const wechatExcellentInvoiceList = r => require.ensure([], () => r(require('@/views/wechatExcellent/invoice/list.vue')), 'group-wechatExcellent-wechatExcellentInvoice')

const wechatExcellentInvoice = [
  {
    path: '/wechatExcellent/invoice',
    name: 'wechatExcellent-invoice',
    component: layout,
    redirect: '/wechatExcellent/invoice/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: wechatExcellentInvoiceList,
        name: 'wechatExcellent-invoice-list',
        meta: {
          displayName: '经销商发货单管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default wechatExcellentInvoice
