import Vue from 'vue';
import { getToken } from '@/js/utils/auth';

Date.prototype.Format = function(fmt) {
  // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
};
Vue.prototype.getImg = function(file) {
  let url = '';
  if (window.createObjectURL !== undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL !== undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL !== undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};
var scrollInterval;
Vue.prototype.toTop = function() {
  // let _this = this;
  // let yOffset = window.pageYOffset;
  // let yLess = 1;
  // yLess = yOffset / 35;
  // scrollInterval = setInterval(function() {
  //   let yOffset = window.pageYOffset;
  //   if (yOffset > 1) {
  //     window.scrollTo(0, yOffset - yLess);
  //   } else {
  //     clearInterval(scrollInterval);
  //   }
  // }, 10);
  window.scrollTo(0, 0);
};
Vue.prototype.randomNum = function(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
};
Vue.prototype.isPC = function() {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};
Vue.prototype.upload2 = async function(file) {
  let token = getToken();
  let formdata = new FormData();
  formdata.append('file', file);
  formdata.append('jsondata', '');
  let res = await this.$axios.post('/api/common/uploadimg', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token
    }
  });
  return res.data.url;
};
Vue.prototype.getQQInfo = async function(qq) {
  let res = await this.$axios.get('/qqInfo', {
    headers: {
      Accept: '/'
    },
    params: {
      get_nick: 1,
      uins: qq
    }
  });
  return res.data;
};
Vue.prototype.testImg = [
  {
    name: 'emm',
    src:
      'https://xiamo.oss-cn-shenzhen.aliyuncs.com/avatar/d1160924ab18972b10aa3be7e8cd7b899e510a0e.jpg'
  },
  {
    name: 'emm',
    src:
      'https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/%E6%8F%92%E7%94%BB/77276021_p0.jpg'
  },
  {
    name: 'emm',
    src:
      'https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/%E6%8F%92%E7%94%BB/85668505_p0.png'
  },
  {
    name: 'emm',
    src:
      'https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/%E6%8F%92%E7%94%BB/87252472_p0.jpg'
  },
  {
    name: 'emm',
    src:
      'https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/%E6%8F%92%E7%94%BB/87514106_p0.jpg'
  },
  {
    name: 'emm',
    src:
      'https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/%E6%8F%92%E7%94%BB/87924904_p0.jpg',
    videosrc:
      'https://xiamo.oss-cn-shenzhen.aliyuncs.com/video/%E8%BF%9E%E6%8E%A5%202020-11-03%2022-39-44_Trim_Trim.mp4'
  }
];
Vue.prototype.genderOptions = [
  {
    value: 0,
    label: '男'
  },
  {
    value: 1,
    label: '女'
  }
];
Vue.prototype.imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
Vue.prototype.videolist = ['mp4', 'm2v', 'mkv'];
Vue.prototype.DateMinus = function(date1, date2) {
  //date1:小日期   date2:大日期
  var sdate = new Date(date1);
  var now = new Date(date2);
  var days = now.getTime() - sdate.getTime();
  var day = parseInt(days / (1000 * 60 * 60 * 24));
  return day;
};
