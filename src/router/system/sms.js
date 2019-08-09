import layout from '@/views/layout/layout.vue'
const smsList = r => require.ensure([], () => r(require('@/views/system/sms/configList.vue')), 'group-system-sms')
const logList = r => require.ensure([], () => r(require('@/views/system/sms/logList.vue')), 'group-system-sms')

const systemSms = [
  {
    path: '/system/sms',
    name: 'system-sms',
    component: layout,
    redirect: '/system/sms/configlist',
    hidden: true,
    children: [
      {
        path: 'configlist',
        component: smsList,
        name: 'system-sms-configList',
        meta: {
          displayName: '短信配置',
          requireAuth: true
        }
      },
      {
        path: 'loglist',
        component: logList,
        name: 'system-sms-logList',
        meta: {
          displayName: '短信日志',
          requireAuth: true
        }
      }
    ]
  }
]

export default systemSms
