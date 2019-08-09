import layout from '@/views/layout/layout.vue'
const productParamsList = r => require.ensure([], () => r(require('@/views/mall/productParamsTemplate/list.vue')), 'group-mall-product-params-template')

const mallProduct = [
  {
    path: '/mall/productparamstemplate',
    name: 'mall-productparamstemplate',
    component: layout,
    redirect: '/mall/productparamstemplate/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: productParamsList,
        name: 'mall-productparamstemplate-list',
        meta: {
          displayName: '商品参数管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallProduct
