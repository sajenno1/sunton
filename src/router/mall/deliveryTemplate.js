import layout from '@/views/layout/layout.vue'
const deliveryTemplateList = r => require.ensure([], () => r(require('@/views/mall/deliveryTemplate/list.vue')), 'group-mall-deliveryTemplate')

const mallDeliveryTemplate = [
  {
    path: '/mall/deliverytemplate',
    name: 'mall-deliveryTemplate',
    component: layout,
    redirect: '/mall/deliverytemplate/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: deliveryTemplateList,
        name: 'mall-deliveryTemplate-list',
        meta: {
          displayName: '运费模板',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallDeliveryTemplate
