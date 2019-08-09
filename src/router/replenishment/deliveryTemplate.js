import layout from '@/views/layout/layout.vue'
const deliveryTemplateList = r => require.ensure([], () => r(require('@/views/replenishment/deliveryTemplate/list.vue')), 'group-replenishment-deliveryTemplate')

const replenishmentDeliveryTemplate = [
  {
    path: '/replenishment/deliverytemplate',
    name: 'replenishment-deliveryTemplate',
    component: layout,
    redirect: '/replenishment/deliverytemplate/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: deliveryTemplateList,
        name: 'replenishment-deliveryTemplate-list',
        meta: {
          displayName: '运费模板',
          requireAuth: true
        }
      }
    ]
  }
]

export default replenishmentDeliveryTemplate
