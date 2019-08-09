import layout from '@/views/layout/layout.vue'
const newsList = r => require.ensure([], () => r(require('@/views/wechatExcellent/news/list.vue')), 'group-wechatExcellent-news')

const wechatExcellentNews = [
  {
    path: '/wechatExcellent/news',
    name: 'wechatExcellent-news',
    component: layout,
    redirect: '/wechatExcellent/news/list',
    hidden: true,
    children: [
      {
        path: 'list',
        component: newsList,
        name: 'wechatExcellent-news-list',
        meta: {
          displayName: '新闻动态',
          requireAuth: true
        }
      }
    ]
  }
]

export default wechatExcellentNews
