import layout from '@/views/layout/layout.vue'
const outerChannelOrderList = r => require.ensure([], () => r(require('@/views/mall/channelOrder/outerChannelOrderList.vue')), 'group-mall-channelOrder')
const mineChannelOrderList = r => require.ensure([], () => r(require('@/views/mall/channelOrder/mineChannelOrderList.vue')), 'group-mall-channelOrder-mineChannelOrderList')

const mallOrder = [
  {
    path: '/mall/channelOrder',
    name: 'mall-channelOrder',
    component: layout,
    redirect: '/mall/channelOrder/outerChannelOrderList',
    hidden: true,
    children: [
      {
        path: 'outerChannelOrderList',
        component: outerChannelOrderList,
        name: 'mall-channelOrder-outerChannelOrderList',
        meta: {
          displayName: '渠道订单管理',
          requireAuth: true
        }
      },
      {
        path: 'mineChannelOrderList',
        component: mineChannelOrderList,
        name: 'mall-channelOrder-mineChannelOrderList',
        meta: {
          displayName: '我的订单管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default mallOrder
