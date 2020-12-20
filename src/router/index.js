import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import blog from '@/page/blog'
import shuoshuo from '@/page/shuoshuo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/shuoshuo',
      name: 'shuoshuo',
      component: shuoshuo
    }
  ]
})
