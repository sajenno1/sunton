import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import home from './home'
import error from './error'
import account from './account'
import systemAdmin from './system/admin'
import systemModule from './system/module'
import systemRole from './system/role'
import merchantBill from './merchant/bill'
import merchantManage from './merchant/manage'
import merchantRecharge from './merchant/recharge'
import childrenSystem from './system/childrenSystem'
import checkUserAccount from './antiChannelConflict/checkUserAccount'
import antiChannelConflictDealer from './antiChannelConflict/dealer'
import antiChannelConflictDealerLevel from './antiChannelConflict/dealerLevel'
import antiChannelConflictInStock from './antiChannelConflict/inStock'
import antiChannelConflictOutStock from './antiChannelConflict/outStock'
import antiChannelConflictPDAAccount from './antiChannelConflict/pdaAccount'
import antiChannelConflictProductReturn from './antiChannelConflict/productReturn'
import antiChannelConflictWarehouse from './antiChannelConflict/warehouse'
import antiChannelConflictBeginningStock from './antiChannelConflict/beginningStock'
import antiChannelConflictStockQuery from './antiChannelConflict/StockQuery'
import antiFakeCode from './antiFake/code'
import antiFakeQuery from './antiFake/query'
import antiFakeResponse from './antiFake/response'
import issuerCode from './issuerCodes/code'
import issuerRecord from './issuerCodes/record'
import productBrand from './products/brand'
import productSupplier from './products/supplier'
import productProducts from './products/product'
import systemPayment from './system/payment'
import systemSms from './system/sms'
import mallDeliveryTemplate from './mall/deliveryTemplate'
import productsProductCategory from './products/productCategory'
import productsproductPropertyCategory from './products/productPropertyCategory'
import productsproductProperty from './products/productProperty'
import productsLabel from './products/productLabel'
import productSeries from './products/productSeries'
import systemSiteProps from './system/siteProps'
import systemOfficialAccount from './system/officialAccount'
import systemScheduling from './system/scheduling'
import userManageUser from './userManage/user'
import areasArea from './areas/area'
import basicAdvert from './basic/advert'
import basicExpress from './basic/express'
import mallServicePromise from './mall/servicePromise'
import mallOrder from './mall/order'
import systemTemplateMessage from './system/templateMessage'
import antiChannelConflictAntiChannelConflictCode from './antiChannelConflict/antiChannelConflictCode'
import antiChannelConflictAntiChannelConflictQuery from './antiChannelConflict/antiChannelConflictQuery'
import mallUserAddress from './mall/userAddress'
import mallProduct from './mall/mallProduct'
import mallProductBrand from './mall/mallBrand'
import mallProductCategory from './mall/mallProductCategory'
import mallProductProperty from './mall/mallProductProperty'
import mallProductPropertyCategory from './mall/mallProductPropertyCategory'
import mallChannelOrder from './mall/channelOrder'
import mallDealerCenter from './mall/dealercenter'
import mallRecharge from './mall/recharge'
import mallNotice from './mall/notice'
import mallNoticeType from './mall/noticeType'
import replenishOrder from './replenishment/replenishOrder'
import replenishProduct from './replenishment/replenishProduct'
import replenishmentDeliveryTemplate from './replenishment/deliveryTemplate'
import replenishProductBrand from './replenishment/replenishProductBrand'
import replenishProductCategory from './replenishment/replenishProductCategory'
import replenishProductProperty from './replenishment/replenishProductProperty'
import replenishProductPropertyCategory from './replenishment/replenishProductPropertyCategory'
import replenishProductPropertyValue from './replenishment/replenishProductPropertyValue'
import officialAccountsMenu from './officialAccounts/menu'
import marketingActivity from './marketing/activity'
import marketingAward from './marketing/award'
import marketingLotteryRecord from './marketing/lotteryRecord'
import exhibitionHallActivity from './exhibitionHall/activity'
import exhibitionHallActivityUser from './exhibitionHall/activityUser'
import exhibitionHallAward from './exhibitionHall/award'
import exhibitionHallWinner from './exhibitionHall/winner'
import updaterResource from './updater/resource'
import antiChannelConflictdealerUpdate from './antiChannelConflict/dealerUpdate'
import salesPOSSeller from './sales/posSeller'
import salesAreaManager from './sales/areaManager'
import salesPOS from './sales/pos'
import integral from './mall/integral'
import wechatExcellentProductDealer from './wechatExcellent/productDealer'
import wechatExcellentDealerBlack from './wechatExcellent/dealerBlack'
import wechatExcellentJoinInApply from './wechatExcellent/joinInApply'
import wechatExcellentNews from './wechatExcellent/news'
import wechatExcellentDealerStock from './wechatExcellent/dealerStock'
import wechatExcellentOrder from './wechatExcellent/order'
import wechatExcellentInvoice from './wechatExcellent/invoice'
import wechatExcellentConsumerFeedback from './wechatExcellent/consumerFeedback'
import systemExtendModule from './system/extendModule.js'
import reportsGoodsSale from './reports/goods'
import reportsSellStatistics from './reports/sellStatistics'
import backFundGoodsOrder from './mall/backFundGoodsOrder'

Vue.use(Router)

const router = new Router({
  routes: [
    ...home,
    ...error,
    ...account,
    ...systemRole,
    ...systemAdmin,
    ...systemModule,
    ...merchantBill,
    ...merchantManage,
    ...merchantRecharge,
    ...childrenSystem,
    ...antiChannelConflictDealer,
    ...antiChannelConflictDealerLevel,
    ...antiChannelConflictInStock,
    ...antiChannelConflictOutStock,
    ...antiChannelConflictPDAAccount,
    ...antiChannelConflictProductReturn,
    ...antiChannelConflictWarehouse,
    ...antiChannelConflictBeginningStock,
    ...antiChannelConflictStockQuery,
    ...antiFakeCode,
    ...antiFakeQuery,
    ...antiFakeResponse,
    ...issuerCode,
    ...issuerRecord,
    ...productBrand,
    ...productSupplier,
    ...productProducts,
    ...systemPayment,
    ...systemSms,
    ...mallDeliveryTemplate,
    ...productsProductCategory,
    ...productsproductPropertyCategory,
    ...productsproductProperty,
    ...productsLabel,
    ...productSeries,
    ...systemSiteProps,
    ...systemOfficialAccount,
    ...systemScheduling,
    ...userManageUser,
    ...areasArea,
    ...basicAdvert,
    ...basicExpress,
    ...mallServicePromise,
    ...mallOrder,
    ...systemTemplateMessage,
    ...antiChannelConflictAntiChannelConflictCode,
    ...antiChannelConflictAntiChannelConflictQuery,
    ...mallUserAddress,
    ...mallProduct,
    ...mallProductBrand,
    ...mallProductCategory,
    ...mallProductProperty,
    ...mallProductPropertyCategory,
    ...mallChannelOrder,
    ...mallDealerCenter,
    ...mallRecharge,
    ...mallNotice,
    ...mallNoticeType,
    ...replenishOrder,
    ...replenishProduct,
    ...replenishmentDeliveryTemplate,
    ...replenishProductBrand,
    ...replenishProductCategory,
    ...replenishProductProperty,
    ...replenishProductPropertyCategory,
    ...replenishProductPropertyValue,
    ...officialAccountsMenu,
    ...marketingActivity,
    ...marketingAward,
    ...marketingLotteryRecord,
    ...exhibitionHallActivity,
    ...exhibitionHallActivityUser,
    ...exhibitionHallAward,
    ...exhibitionHallWinner,
    ...updaterResource,
    ...checkUserAccount,
    ...updaterResource,
    ...antiChannelConflictdealerUpdate,
    ...salesPOSSeller,
    ...salesAreaManager,
    ...salesPOS,
    ...integral,
    ...wechatExcellentProductDealer,
    ...wechatExcellentDealerBlack,
    ...wechatExcellentJoinInApply,
    ...wechatExcellentNews,
    ...wechatExcellentDealerStock,
    ...wechatExcellentOrder,
    ...wechatExcellentInvoice,
    ...wechatExcellentConsumerFeedback,
    ...systemExtendModule,
    ...reportsGoodsSale,
    ...reportsSellStatistics,
    ...backFundGoodsOrder
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    store.dispatch('account/getAccessToken')
    if (store.state.account.access_token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
