import layout from '@/views/layout/layout.vue'
const resourceList = r => require.ensure([], () => r(require('@/views/updater/resource/list.vue')), 'group-updater-resource')
const updateList = r => require.ensure([], () => r(require('@/views/updater/resourceUpdate/list.vue')), 'group-updater-resourceUpdate')

const updaterResource = [
  {
    path: '/updater/resource',
    name: 'updater-resource',
    component: layout,
    redirect: '/updater/resource/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: resourceList,
        name: 'updater-resource-list',
        meta: {
          displayName: '资源管理',
          requireAuth: true
        }
      },
      {
        path: 'update/list',
        component: updateList,
        name: 'updater-resource-update-list',
        meta: {
          displayName: '资源升级管理',
          requireAuth: true
        }
      }
    ]
  }
]

export default updaterResource
