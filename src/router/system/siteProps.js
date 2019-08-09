import layout from '@/views/layout/layout.vue'
const sitePropsEdit = r => require.ensure([], () => r(require('@/views/system/siteProps/edit.vue')), 'group-system-siteProps')

const systemSiteProps = [
  {
    path: '/system/siteprops',
    name: 'system-siteProps',
    component: layout,
    redirect: '/system/siteprops/edit',
    children: [
      {
        path: 'edit',
        component: sitePropsEdit,
        name: 'system-siteProps-edit',
        meta: {
          displayName: '站点配置',
          requireAuth: true
        }
      }
    ]
  }
]

export default systemSiteProps
