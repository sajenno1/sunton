const login = r => require.ensure([], () => r(require('@/views/account/login.vue')), 'group-account')

const account = [
  {
    path: '/login',
    name: 'login',
    component: login
  }
]
// 导出默认值
export default account
