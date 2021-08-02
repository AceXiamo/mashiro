import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/blog/home'
import blog from '@/page/blog/blog'
import shuoshuo from '@/page/blog/shuoshuo'
import tools from '@/page/blog/tools'

import login from '@/page/admin/login'
import admin from '@/page/admin/index'
import main from '@/page/admin/main'
import gallery from '@/page/admin/gallery'
import setting from '@/page/admin/setting'
import admin_blog from '@/page/admin/blog'
import blogEdit from '@/page/admin/blogEdit'
import admin_shuoshuo from '@/page/admin/shuoshuo'
import user from '@/page/admin/user'
import usertype from '@/page/admin/usertype'
import emoji from '@/page/admin/emoji'
import comment from '@/page/admin/comment'
import filetype from '@/page/admin/filetype'
import file from '@/page/admin/file'
import footprint from '@/page/admin/footprint'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/home'
    // },
    {
      path: '/',
      name: 'home',
      component: home,
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
    },

    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children:[
        {
          path: '',
          name: 'main',
          component: main,
        },{
          path: 'gallery',
          name: 'gallery',
          component: gallery,
        },{
          path: 'setting',
          name: 'setting',
          component: setting,
        },{
          path: 'blog',
          name: 'blog',
          component: admin_blog,
        },{
          path: 'blogEdit',
          name: 'blogEdit',
          component: blogEdit,
        },{
          path: 'shuoshuo',
          name: 'shuoshuo',
          component: admin_shuoshuo,
        },{
          path: 'user',
          name: 'user',
          component: user,
        },{
          path: 'usertype',
          name: 'usertype',
          component: usertype,
        },{
          path: 'file',
          name: 'file',
          component: file,
        },{
          path: 'filetype',
          name: 'filetype',
          component: filetype,
        },{
          path: 'comment',
          name: 'comment',
          component: comment,
        },{
          path: 'emoji',
          name: 'emoji',
          component: emoji,
        },{
          path: 'footprint',
          name: 'footprint',
          component: footprint,
        }
      ]
    },
  ]
})
