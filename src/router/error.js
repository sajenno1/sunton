const view404 = r => require.ensure([], () => r(require('@/views/error/404.vue')), 'group-error-404')
const view500 = r => require.ensure([], () => r(require('@/views/error/500.vue')), 'group-error-500')

const error = [
  {
    path: '/404page',
    name: '404page',
    component: view404
  },
  {
    path: '/500page',
    name: '505page',
    component: view500
  }
]

export default error
