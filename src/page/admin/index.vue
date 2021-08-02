<template>
  <div class="admin-index">
    <div class="background-img">
      <img
        src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/img/background.png"
      />
    </div>

    <div class="head-bar" @click="blog()">
      <div class="head-img">
        <img
          src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/%E6%8F%92%E7%94%BB/79601805_p0.png"
        />
      </div>
      <div class="head-info">
        <div class="star-icon">
          <img
            src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/star.png"
          />
        </div>
        <div class="info-msg">
          <span>Time:</span>
          <span>{{ time }}</span>
          <span>Status:</span>
          <span>博客已运行233天</span>
          <span>文章数:</span>
          <span>{{ 233 }}</span>
        </div>
        <div class="user">
          <div class="info">
            <span>又见面啦！</span>
            <span>{{ user.nickname }}</span>
          </div>
          <div class="avatar">
            <img :src="user.avatar" />
          </div>
          <div class="login-out">
            <!--            <i class="fas fa-angle-down"></i>-->
            <el-popover placement="top" width="160" trigger="hover">
              <p>要退出登陆吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" size="mini" @click="exit()"
                  >确定</el-button
                >
              </div>
              <button slot="reference" class="login-out-btn">
                <i class="fas fa-angle-down"></i>
              </button>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="admin-emmm">
        <div class="text">
          <!--          <span>听说世间崇拜年轻的猛兽，比如我</span>-->
        </div>
      </div>
    </div>
    <el-container class="admin-bar">
      <el-container>
        <el-aside width="200px">
          <div class="menu-bar">
            <el-menu
              :default-active="select_menu"
              class="el-menu-vertical-demo admin-menu"
              background-color="white"
              text-color="#EC6A5C"
              active-text-color="#FDD692"
              @open="handleOpen"
              @close="handleClose"
              @select="toLink"
            >
              <menulist :menudata="menu"></menulist>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <div class="admin-main">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <div class="bottom-img">
      <img src="../../../static/bilibili/2233.png" />
    </div>
  </div>
</template>

<script>
import { getUser } from '@/js/utils/authuser';
import { removeToken } from '@/js/utils/auth';
import menulist from './menulist';
export default {
  name: 'index',
  components: {
    menulist: menulist
  },
  data() {
    return {
      select_menu: '',
      time: '',
      menu: [],
      user: {},
      index: {}
    };
  },
  created() {
    this.toTop();
    this.reloadMenu();
    this.user = JSON.parse(getUser());
  },
  mounted() {
    let this_ = this;
    this.$parent.showSakura(false);
    this_.time = new Date().Format('yyyy-MM-dd hh:mm:ss');
    setInterval(function() {
      this_.time = new Date().Format('yyyy-MM-dd hh:mm:ss');
    }, 1000);
    let link = this.$router.currentRoute.fullPath;
    if (link.indexOf('gallery') > -1) {
      this.select_menu = '2';
    } else {
      this.select_menu = '1';
    }
  },
  methods: {
    // resetNum(num) {
    //   num = num.toString();
    //   if (num.split('.')[1] == null) {
    //     return num + '.00';
    //   }
    // },
    reloadMenu() {
      this.menu = [
        {
          index: '1',
          icon: 'el-icon-s-home',
          name: '首页',
          link: '/admin',
          isgroup: false,
          child: []
        },
        {
          index: '2',
          icon: 'el-icon-picture',
          name: '图库',
          link: '/admin/gallery',
          isgroup: false,
          child: []
        },
        {
          index: '3',
          icon: 'el-icon-tickets',
          name: 'blog',
          link: '/admin/blog',
          isgroup: false,
          child: []
        },
        {
          index: '4',
          icon: 'el-icon-s-promotion',
          name: '说说',
          link: '/admin/shuoshuo',
          isgroup: false,
          child: []
        },
        {
          index: '5',
          icon: 'el-icon-more',
          name: '',
          link: '/admin/setting',
          isgroup: true,
          child: [
            {
              index: '7',
              icon: 'el-icon-user-solid',
              name: '用户',
              link: '/admin/user',
              isgroup: false,
              child: []
            },
            {
              index: '8',
              icon: 'el-icon-lollipop',
              name: '表情',
              link: '/admin/emoji',
              isgroup: false,
              child: []
            },
            {
              index: '9',
              icon: 'el-icon-chat-line-square',
              name: '评论',
              link: '/admin/comment',
              isgroup: false,
              child: []
            },
            {
              index: '11',
              icon: 'el-icon-document',
              name: '文件',
              link: '/admin/file',
              isgroup: false,
              child: []
            },
            {
              index: '12',
              icon: 'el-icon-sugar',
              name: '足迹',
              link: '/admin/footprint',
              isgroup: false,
              child: []
            }
          ]
        }
      ];
    },
    toLink(index) {
      let data = this.menuData(this.menu, index);
      this.$router.push(data.link);
    },
    menuData(seldata, index) {
      let this_ = this;
      let thismenu = null;
      seldata.forEach(function(data) {
        if (data.index == index) {
          if (thismenu == null) {
            thismenu = data;
          }
        } else {
          if (data.child.length > 0) {
            if (thismenu == null) {
              thismenu = this_.menuData(data.child, index);
            }
          }
        }
      });
      return thismenu;
    },
    blog() {
      this.$router.push('/');
      // this.$parent.type = "blog"
    },
    exit() {
      removeToken();
      this.$router.push('/login');
    },
    handleOpen() {},
    handleClose() {}
  }
};
</script>

<style scoped lang="scss">
* {
  transition: all 0.5s;
}

.admin-index {
  position: absolute;
  min-width: 1500px;
  width: 1500px;
  min-height: 100vh;
  top: 0;
  max-width: 100vw;
  /*overflow-x: hidden;*/
  /*transition: all .5s;*/

  .bottom-img {
    margin-top: 100px;
    text-align: center;
    height: 150px;
    img {
      height: 100%;
    }
  }
  .el-main {
    overflow: unset !important;
    overflow-x: hidden !important;
  }
  .background-img {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: -1;
    > img {
      height: 100%;
    }
  }
  .head-bar:hover {
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 1));
    transition: all 0.5s;
  }
  .head-bar {
    position: relative;
    transition: all 0.5s;
    .head-img {
      border-radius: 10px 10px 100% 100%;
      overflow: hidden;
      height: 275px;
      > img {
        width: 100%;
      }
    }
    .head-info {
      display: flex;
      align-items: center;
      white-space: nowrap;
      position: absolute;
      top: 10px;
      padding: 30px 30px 0 30px;
      width: calc(100% - 60px);
      .star-icon {
        float: left;
        margin-right: 20px;
        animation: img_spin 3s linear infinite;
        img {
          height: 45px;
          width: 45px;
        }
      }
      .info-msg {
        float: left;
        color: white;
        margin-right: 20px;
        span:nth-child(2n-1) {
          margin-right: 5px;
        }
        span:nth-child(2n) {
          margin-right: 20px;
          color: #ff9200;
          font-weight: bold;
        }
      }
      .user {
        position: absolute;
        right: 30px;
        display: flex;
        align-items: center;
        .info {
          float: left;
          margin-right: 20px;
          color: white;
          font-size: 18px;
          > span:nth-child(2) {
            color: #ffff00;
          }
        }
        .avatar {
          float: left;
          margin-right: 20px;
          img {
            height: 60px;
            width: 60px;
            border-radius: 100%;
          }
        }
        .login-out {
          z-index: 999;
          float: left;
          color: white;
          font-size: 24px;
          .login-out-btn {
            background: unset !important;
            border: unset !important;
            font-size: unset !important;
            color: unset !important;
          }
        }
      }
    }
    .admin-emmm {
      /*opacity: 0;*/
      color: white;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      animation: 2s bluetored infinite;
      /*transition: opacity .5s;*/
    }
    .text:hover {
      animation: 2s bluetored infinite;
    }
  }
  /*.head-bar:hover .admin-emmm{*/
  /*  opacity: 1;*/
  /*  transition: all 1s;*/
  /*}*/
  .admin-bar {
    .menu-bar {
      min-width: 200px;
      position: absolute;
      margin-top: 50px;
      .admin-menu {
        overflow: hidden;
        border-right: 4px solid #ec6a5c !important;
        border-left: 4px solid #ec6a5c;
        border-top: 4px solid #ec6a5c;
        // background: rgba(246, 179, 82, 0.6) !important;
        background: rgba(236, 106, 92, 1) !important;
        padding-bottom: 60px;
        clip-path: polygon(
          0 0,
          100% 0,
          100% 100%,
          99% 100%,
          98% 99.7%,
          91% calc(100% - 14px),
          90% calc(100% - 15px),
          89% calc(100% - 14px),
          80% 99.7%,
          79% 100%,
          78% 99.7%,
          71% calc(100% - 14px),
          70% calc(100% - 15px),
          69% calc(100% - 14px),
          60% 99.7%,
          59% 100%,
          58% 99.7%,
          51% calc(100% - 14px),
          50% calc(100% - 15px),
          49% calc(100% - 14px),
          40% 99.7%,
          39% 100%,
          38% 99.7%,
          31% calc(100% - 14px),
          30% calc(100% - 15px),
          29% calc(100% - 14px),
          20% 99.7%,
          19% 100%,
          18% 99.7%,
          11% calc(100% - 14px),
          10% calc(100% - 15px),
          9% calc(100% - 14px),
          1% 99.7%,
          0 100%
        );
        svg {
          color: white;
        }
      }
    }
  }
  .admin-main {
    margin-top: 30px;
    min-height: calc(100vh - 250px - 275px);
  }
}
@keyframes bluetored {
  0% {
    filter: drop-shadow(2px 2px 1px rgba(229, 58, 64, 1));
  }
  25% {
    filter: drop-shadow(-2px -2px 1px rgba(48, 169, 222, 1));
  }
  50% {
    filter: drop-shadow(2px 2px 1px rgba(239, 220, 5, 1));
  }
  75% {
    filter: drop-shadow(2px 2px 1px rgba(229, 58, 64, 1));
  }
  100% {
    filter: drop-shadow(2px 2px 1px rgba(48, 169, 222, 1));
  }
}
</style>
