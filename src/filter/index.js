import Vue from 'vue'
import Accounting from 'accounting'
import moment from 'moment'

Vue.filter('Currency', (value) => {
  return Accounting.formatMoney(value, '￥', 2)
})

Vue.filter('UnsignedCurrency', (value) => {
  return Accounting.formatMoney(value, '', 2)
})

Vue.filter('IntNumberSeparator', (value) => {
  return Accounting.formatMoney(value, '', 0)
})

Vue.filter('FormattersDate', (value) => {
  return value ? moment(value).format('YYYY-MM-DD') : ''
})

Vue.filter('FormattersDateTime', (value) => {
  return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''
})

Vue.filter('FormattersTime', (value) => {
  return value ? moment(value).format('HH:mm:ss') : ''
})
