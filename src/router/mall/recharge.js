import layout from '@/views/layout/layout.vue'
const mineRechargeList = r => require.ensure([], () => r(require('@/views/mall/recharge/mineList.vue')), 'group-mall-recharge-mineList')
const outerRechargeList = r => require.ensure([], () => r(require('@/views/mall/recharge/outerList.vue')), 'group-mall-recharge-outerList')
const addRecharge = r => require.ensure([], () => r(require('@/views/mall/recharge/add.vue')), 'group-mall-recharge-add')
const waterAccountList = r => require.ensure([], () => r(require('@/views/mall/recharge/waterAccountList.vue')), 'group-mall-recharge-waterAccountList')

const mallOrder = [
  {
    path: '/mall/recharge',
    name: 'mall-recharge',
    component: layout,
    redirect: '/mall/recharge/mineList',
    hidden: true,
    children: [
      {
        path: 'mineList',
        component: mineRechargeList,
        name: 'mall-recharge-mineList',
        meta: {
          displayName: '我的充值记录',
          requireAuth: true
        }
      },
      {
        path: 'outerList',
        component: outerRechargeList,
        name: 'mall-recharge-outerList',
        meta: {
          displayName: '渠道充值记录',
          requireAuth: true
        }
      },
      {
        path: 'waterAccountList',
        component: waterAccountList,
        name: 'mall-recharge-waterAccountList',
        meta: {
          displayName: '流水账',
          requireAuth: true
        }
      },
      {
        path: 'add',
        component: addRecharge,
        name: 'mall-recharge-add',
        meta: {
          displayName: '上传充值记录',
          requireAuth: true
        }
      } // ,
      // {
      //   path: 'mineChannelOrderList',
      //   component: mineChannelOrderList,
      //   name: 'mall-channelOrder-mineChannelOrderList',
      //   meta: {
      //     displayName: '我的订单管理',
      //     requireAuth: true
      //   }
      // },
      // {
      //   path: 'shoppingCartList',
      //   component: shoppingCartList,
      //   name: 'mall-channelOrder-shoppingCartList',
      //   meta: {
      //     displayName: '待购列表',
      //     requireAuth: true
      //   }
      // },
      // {
      //   path: 'productSearchList',
      //   component: productSearchList,
      //   name: 'mall-channelOrder-productSearchList',
      //   meta: {
      //     displayName: '商品列表',
      //     requireAuth: true
      //   }
      // }
    ]
  }
]

export default mallOrder
