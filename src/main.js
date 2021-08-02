// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './css/style.css';
import './css/autostyle.scss';
import './js/common.js';
import $ from 'jquery';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
import axios from 'axios';
Vue.prototype.$axios = axios;

// color-ui start
import './components/colorui/main.css';
import './components/colorui/icon.css';
import './components/colorui/animation.css';
// color-ui end

import VueQuillEditor from 'vue-quill-editor';
// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// import * as Quill from 'quill'; // 富文本基于quill

Vue.use(VueQuillEditor);

import self from './page/blog/self';
import contents from './page/blog/contents';
Vue.component('self', self);
Vue.component('contents', contents);

fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

// ElementUI Start
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// ElementUI End
import beian from '@/components/beian';
Vue.component('beian', beian);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
