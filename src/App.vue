<template>
  <div id="app">
    <div v-if="ispc">
      <transition name="fade">
        <div v-if="type == 'blog'">
          <a @click="scrollClick"
            ><img class="scroll" src="../static/image/scroll.png"
          /></a>
          <headbar ref="headbar" @showSakura="showSakura"></headbar>
          <transition name="fade">
            <router-view
              v-if="type == 'blog'"
              class="routerbar"
              @changeHeadCss="changeHeadCss"
              @isBlog="isBlog"
              @showSakura="showSakura"
            ></router-view>
          </transition>
        </div>
      </transition>
      <transition name="comment">
        <!-- z-index: 999; => z-index: auto;  3.23     -->
        <div
          v-if="type == 'admin'"
          style="position: absolute;z-index: auto;display: flex;justify-content: center;left: 0;right: 0;"
        >
          <transition name="fade">
            <router-view v-if="type == 'admin'"></router-view>
          </transition>
        </div>
      </transition>
    </div>
    <div v-if="!ispc" class="phone-tip">
      <div class="phone-tip-avatar">
        <img
          src="https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2021/02/f24e5044726e55558bcf30443eec62cb.png"
        />
        <div>
          <span>
            欢迎访问 Mashiro！
          </span>
        </div>
      </div>
      <div class="phone-tip-background">
        <img
          src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/%E6%8F%92%E7%94%BB/68405667_p2.png"
        />
      </div>
      <div class="phone-tip-icon">
        <img src="../static/gif/5-160914192R3.gif" />
      </div>
      <div class="phone-tip-info">
        <span>tips：暂时没有移动端版本，请使用PC浏览器访问</span>
      </div>
      <div class="phone-tip-link">
        <span @click="toMashiro">click here to Mashiro Blog</span>
      </div>
      <div class="phone-tip-beian">
        <img
          src="https://xiamo1024.cn/content/images/system/favicon_1589107358476_e1a6dc.png"
        />
        <span>湘ICP备20005613号-2 © 2021</span>
      </div>
    </div>
  </div>
</template>

<script>
import headbar from './page/blog/headbar';
import home from './page/blog/home';
import login from './page/admin/login';

export default {
  name: 'App',
  data() {
    return {
      transparency: '1',
      type: '',
      scrollInterval: '',
      scrollTop: 0,
      routerLink: '',
      ispc: true
    };
  },
  components: {
    headbar: headbar,
    home: home,
    login: login
  },
  watch: {
    type(newV, oldV) {
      if (newV == 'blog') {
        console.log(this.routerLink);
        if (
          this.routerLink.length > 1 &&
          this.routerLink.indexOf('admin') < 0 &&
          this.routerLink.indexOf('login') < 0
        ) {
          this.$router.push(this.routerLink);
        } else {
          this.$router.push('/');
        }
      }
    }
  },
  methods: {
    toMashiro() {
      window.open('https://xiamoqwq.com');
    },
    showSakura(is) {
      this.$nextTick(function() {
        let canvas_sakura = document.getElementById('canvas_sakura');
        if (canvas_sakura) {
          if (is) {
            canvas_sakura.style.display = 'block';
          } else {
            canvas_sakura.style.display = 'none';
          }
        }
      });
    },
    changeHeadCss() {
      // console.log("%c修改头部css", "color:red")
      this.$refs.headbar.isTools = true;
    },
    handleScroll() {
      try {
        this.routerLink = this.$router.currentRoute.fullPath;
        if (this.routerLink === '/') {
          if (this.type == 'blog') {
            if (window.pageYOffset > 0) {
              this.$refs.headbar.jsHover = true;
            } else {
              this.$refs.headbar.jsHover = false;
            }
          }
        }
        if (window.pageYOffset > 90) {
          $('.scroll').css('top', this.scrollTop + 'px');
        } else {
          $('.scroll').css('top', '-920px');
        }
      } catch (e) {}
    },
    scrollClick() {
      let _this = this;
      let yOffset = window.pageYOffset;
      let yLess = 1;
      yLess = yOffset / 50;
      _this.scrollInterval = setInterval(function() {
        let yOffset = window.pageYOffset;
        if (yOffset > 1) {
          window.scrollTo(0, yOffset - yLess);
        } else {
          clearInterval(_this.scrollInterval);
        }
      }, 10);
    },
    isBlog() {
      this.routerLink = this.$router.currentRoute.fullPath;
      if (this.routerLink.indexOf('admin') > -1) {
        this.type = 'admin';
      } else {
        this.type = 'blog';
      }
    },
    consoleEmoji() {
      console.log(
        '%cxiamo%cVue Sakura V1.0',
        'padding:4px 7px;margin: 5px 0;color:white;background:#2EC4B6;border-top-left-radius: 2px;border-bottom-left-radius: 2px',
        'color:white;padding:4px 7px;margin: 5px 0;background: #42D268;border-top-right-radius: 2px;border-bottom-right-radius: 2px'
      );
      console.log(
        '%c %cgitHub%cgithub.com/xm17906193/xiamo_vue_sakura',
        "background:url('https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/github.png') no-repeat center;background-size:80%;padding:4px 7px;margin: 5px 0;border-top-left-radius: 2px;border-bottom-left-radius: 2px;background-color:#F6B352;",
        'padding:4px 7px 4px 0;margin: 5px 0;background:#F6B352;color:white',
        'padding:4px 7px;margin: 5px 0;color:white;background:#A593E0;border-top-right-radius: 2px;border-bottom-right-radius: 2px'
      );
      console.log(
        '%cgitee%cgitee.com/xm17906193/xiamo_vue_sakura',
        'padding:4px 7px;margin: 5px 0;border-top-left-radius: 2px;border-bottom-left-radius: 2px;background:#F6B352;color:white',
        'padding:4px 7px;margin: 5px 0;color:white;background:#A593E0;border-top-right-radius: 2px;border-bottom-right-radius: 2px'
      );
      console.log(
        '%c ',
        "background:url('https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/avatar/xiamo.png') no-repeat center;background-size: 100%;font-size:120px;line-height:80px;"
      );
      // "margin-left:30px;background:#ABD0CE;color:white;padding:4px 7px;border-radius:2px"
    }
  },
  //创建
  created() {
    this.ispc = this.isPC();
    document.addEventListener('scroll', this.handleScroll, true);
    this.scrollTop = document.documentElement.clientHeight;
    if (this.scrollTop > 1000) {
      this.scrollTop = 1000 - this.scrollTop;
    } else {
      this.scrollTop = this.scrollTop - 1000;
    }
    this.$watch('routerLink', function(newValue, oldValue) {
      if (newValue === '/') {
        window.scrollTo(0, 0);
      }
    });
    this.consoleEmoji();
  },
  //加载完毕
  mounted() {
    this.isBlog();
    this.handleScroll();
  }
};
</script>

<style>
.phone-tip {
  position: absolute;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.phone-tip-beian {
  position: absolute;
  bottom: 20px;
  font-size: 12px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone-tip-beian img {
  height: 20px;
  animation: img_spin 3s linear infinite;
}

.phone-tip-beian span {
  margin-top: 4px;
  margin-left: 5px;
}

.phone-tip-link {
  position: absolute;
  width: 100vw;
  text-align: center;
  top: calc(30vh + 200px);
}

.phone-tip-link span {
  font-size: 13px;
  color: #30a9de;
  text-decoration: underline;
}

.phone-tip-avatar {
  position: absolute;
  top: calc(30vh - 130px);
  height: 100px;
  z-index: 999;
  text-align: center;
  width: 100vw;
}

.phone-tip-avatar span {
  font-size: 13px;
}

.phone-tip-avatar > img {
  height: 80px;
  border-radius: 100%;
  border: 1px dashed;
  padding: 2px;
}

.phone-tip-info {
  position: absolute;
  top: calc(30vh + 130px);
  width: 100vw;
  display: inline-flex;
  justify-content: center;
}

.phone-tip-info > span {
  font-size: 13px;
  padding: 10px;
  /*background: rgba(6,39,52,.5);*/
  background: linear-gradient(
    to bottom right,
    rgba(129, 251, 184, 0.5),
    rgba(40, 199, 111, 0.5)
  );
  /*color: #A593E0;*/
  color: #a593e0;
  border-radius: 5px;
}

.phone-tip-background {
  position: absolute;
  height: 100vh;
}

.phone-tip-background::after {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.01);
  content: '';
}

.phone-tip-background > img {
  position: absolute;
  height: 100vh;
}

.phone-tip-icon {
  position: relative;
  background: rgba(6, 39, 52, 1);
  width: 100vw;
  height: 100px;
  top: 30vh;
  text-align: center;
}

.phone-tip-icon > img {
  height: 100px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.headbar {
  position: fixed;
  width: 100%;
  z-index: 2001;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: rgba(255, 255, 0, 0.8);
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 0, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 0, 0.2) 50%,
    rgba(255, 255, 0, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}

.scroll {
  position: fixed;
  right: 55px;
  top: -920px;
  z-index: 99;
  transition: top 0.3s linear;
  animation: scrollMove 2.5s linear infinite;
}

.routerbar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
