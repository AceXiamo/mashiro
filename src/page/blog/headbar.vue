<template>
  <div class="headbar" :class="[isTools ? 'dark' : '']">
    <div :class="['top', jsHover ? 'topJsHover' : '']">
      <div class="img_div">
        <img
          src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/star.png"
        />
      </div>
      <div class="title" @click="tolink('/')"><span>xiamo</span></div>
      <div :class="['menu', jsHover ? 'menuHover' : '']">
        <div class="item" v-for="(data, index) in menu" :index="index">
          <div
            :class="['item_font', data.name]"
            @mouseenter="itemHover(data.name)"
            @mouseleave="itemLeave(data.name)"
          >
            <div @click="tolink(data.link)">
              <i :class="[data.class]"></i>
              <span>{{ data.text }}</span>
            </div>
            <div class="item_font_strip"></div>
          </div>
        </div>
      </div>
      <div :class="['user-icon', jsHover ? 'user-icon-hover' : '']">
        <div class="icon-item" @click="toLogin">
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="tip-bar">
          <div class="user-tip">
            <div style="font-size: 15px">
              <div>
                Whether to
                <span style="font-size: 15px;font-weight: bold">log in</span>
                now?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/js/utils/auth';
export default {
  name: 'headbar',
  data() {
    return {
      isTools: false,
      jsHover: false,
      menu: [
        {
          name: 'main',
          text: '首页',
          class: 'fas fa-tree',
          index: 1,
          link: '/'
        },
        {
          name: 'shuoshuo',
          text: '说说',
          class: 'fas fa-star',
          index: 2,
          link: '/shuoshuo'
        },
        {
          name: 'suibi',
          text: '随笔',
          class: 'fas fa-broom',
          index: 2,
          link: '/tools'
        }
      ],
      scrollInterval: ''
    };
  },
  methods: {
    toLogin() {
      let _this = this;
      if (getToken()) {
        _this.$router.push('/admin');
        _this.$parent.type = 'admin';
      } else {
        let yOffset = window.pageYOffset;
        let yLess = 1;
        yLess = yOffset / 50;
        _this.scrollInterval = setInterval(function() {
          let yOffset = window.pageYOffset;
          if (yOffset > 1) {
            window.scrollTo(0, yOffset - yLess);
          } else {
            _this.$router.push('/login');
            _this.$parent.type = 'admin';
            clearInterval(_this.scrollInterval);
          }
        }, 10);
      }
    },
    tolink(link) {
      if (link == '/tools') {
        this.$emit('showSakura', false);
        this.isTools = true;
      } else {
        this.$emit('showSakura', true);
        this.isTools = false;
      }
      this.$router.push(link);
    },
    itemHover(name) {
      $('.' + name + '>.item_font_strip').css('width', '100%');
      $('.' + name).css('color', '#fe9600');
    },
    itemLeave(name) {
      $('.' + name + '>.item_font_strip').css('width', '0%');
      $('.' + name).css('color', 'unset');
    }
  }
};
</script>

<style scoped lang="scss">
.icon-item:hover + .tip-bar {
  top: 70px;
  opacity: 1;
  transition: 0.5s top, 0.5s opacity;
}

.tip-bar {
  pointer-events: none;
  position: absolute;
  right: -13px;
  top: 90px;
  opacity: 0;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.6));
  transition: 0.5s top, 0.5s opacity;
  .user-tip {
    color: black;
    width: 140px;
    height: 90px;
    background: white;
    clip-path: polygon(
      0.5% calc(3% + 15px),
      0% calc(6% + 15px),
      0% 94%,
      0.5% 97%,
      2.5% 100%,
      97.5% 100%,
      99.5% 97%,
      100% 94%,
      100% calc(6% + 15px),
      99.5% calc(3% + 15px),
      97.5% 15px,
      90% 15px,
      80% 0,
      70% 15px,
      2.5% 15px
    );
    > div {
      top: 15px;
      position: relative;
      padding: 15px;
    }
  }
}

.tip-bar-hover {
  opacity: 1;
  transition: 0.5s all;
}

.user-icon {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  font-size: 30px;
  margin-right: 50px;
  opacity: 0;
  transition: 0.5s all;
}

.user-icon-hover,
.top:hover .user-icon {
  opacity: 1;
  transition: 0.5s all;
}

.dark {
  color: white;

  .top:hover {
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 30px rgba(0, 0, 0, 1);
    transition: all 0.25s linear;
  }

  .topJsHover {
    background: rgba(0, 0, 0, 0.8);
  }
}

.item {
  position: relative;
  margin-right: 20px;
  font-weight: bolder;
  font-size: 18px;
  height: 100%;
  display: flex;
}

.menu {
  display: flex;
  margin-left: auto !important;
  margin-right: 50px;
  position: relative;
  left: -50px;
  opacity: 0;
  margin: 0 auto;
  transition: left 0.3s linear, opacity 0.3s linear;
}

.menuHover {
  left: -70px;
  opacity: 1;
}

.top:hover .menu {
  left: -70px;
  opacity: 1;
}

.item_font {
  align-self: center;
  width: auto;
  transition: color 0.2s linear;
}

/*.item_font::before {*/
.item_font_strip {
  height: 5px;
  width: 0%;
  position: absolute;
  background: #fe9600;
  bottom: 0px;
  transition: width 0.2s linear;
}

.headbar {
  max-width: 100vw;
  margin: -8px;
}

.img_div {
  align-self: center;
  margin-left: 35px !important;
}

.img_div > img {
  width: 35px;
  animation: img_spin 3s linear infinite;
}

.top:hover .img_div > img {
  /*animation: img_spin 3s linear infinite;*/
}

.top {
  height: 90px;
  position: relative;
  background: unset;
  box-shadow: unset;
  transition: background 0.25s linear, box-shadow 0.25s linear;
  display: flex;
}

.top:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
  transition: all 0.25s linear;
}

.topJsHover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
}

.top > div {
  margin-left: 15px;
}

.title {
  display: inline-block;
  align-self: center;
  font-size: 25px;
  font-weight: bolder;
}

/*.top::before {*/
/*  content: "";*/
/*  position: absolute;*/
/*  width: 100%;*/
/*  height: 90px;*/
/*  z-index: -1;*/
/*  transform: rotate(3deg);*/
/*  box-shadow: 0 10px 30px rgba(0, 0, 0, 1);*/
/*  bottom: 50px;*/
/*  margin: 0px;*/
/*  right: 20px;*/
/*}*/

/*.top::after {*/
/*  content: "";*/
/*  position: absolute;*/
/*  z-index: -1;*/
/*  width: 100%;*/
/*  height: 90px;*/
/*  transform: rotate(-3deg);*/
/*  box-shadow: 0 10px 30px rgba(0, 0, 0, 1);*/
/*  bottom: 50px;*/
/*  margin: 0px;*/
/*  left: 20px;*/
/*}*/
</style>
