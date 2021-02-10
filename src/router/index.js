import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import blog from '@/page/blog'
import shuoshuo from '@/page/shuoshuo'
import tools from '@/page/tools'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

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
    },
    {
      path: '/tools',
      name: 'tools',
      component: tools
    }
  ]
})
