<template>
  <div class="login-bar">
    <div class="background-img">
      <img
        src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/1.png"
        class="login-background"
      />
    </div>
    <div class="close-item" @click="toBlog">
      <i class="fas fa-times-circle"></i>
    </div>
    <div class="login_p">
      <div class="blog-img">
        <img
          src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/img/mashiro-logo-s.png"
        />
      </div>
      <div class="input" style="margin-top: 15px !important;">
        <span>username</span>
        <div class="input_p">
          <input type="text" name="username" id="username" v-model="username" />
        </div>
      </div>
      <div class="input">
        <span>password</span>
        <div class="input_p">
          <input type="text" name="password" id="password" v-model="password" />
        </div>
      </div>
      <div class="btn">
        <div></div>
        <a @click="login()">Login ~</a>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/js/api/sys';
import { setUser, removeUser } from '@/js/utils/authuser';
import { setToken, removeToken } from '@/js/utils/auth';
export default {
  name: 'login',
  data() {
    return {
      username: 'xiamo',
      password: 'xiamo'
    };
  },
  mounted() {
    this.$parent.type = 'admin';
  },
  methods: {
    toBlog() {
      this.$parent.type = 'blog';
    },
    async login() {
      this.init();
      let data = {
        userName: this.username,
        password: this.password
      };
      login(data).then((response) => {
        if (response) {
          setUser(response.data);
          setToken(response.data.token);
          this.$message({
            message: '登陆成功！',
            type: 'success'
          });
          this.$router.push('/admin');
        }
      });
    },
    init() {
      removeUser();
      removeToken();
    }
  },
  created() {
    // this.MacInfo();
  }
};
</script>

<style scoped>
* {
  transition: all 0.5s;
}

.blog-img {
  margin-top: 30px;
}

.blog-img > img {
  height: 50px;
}

.blog-name {
  font-size: 30px;
  animation: color-title 5s linear infinite;
}

.mashiro_title {
  /*color: #03a9f4;*/
  position: relative;
  top: 45px;
  font-size: 20px;
}

@keyframes color-title {
  0% {
    color: #03a9f4;
    filter: drop-shadow(0 0 15px #03a9f4);
  }
  20% {
    color: #5e00ff;
    filter: drop-shadow(0 0 15px #5e00ff);
  }
  40% {
    color: #1cbbb4;
    filter: drop-shadow(0 0 15px #1cbbb4);
  }
  60% {
    color: #42b983;
    filter: drop-shadow(0 0 15px #42b983);
  }
  80% {
    color: #8dc63f;
    filter: drop-shadow(0 0 15px #8dc63f);
  }
  100% {
    color: #dd514c;
    filter: drop-shadow(0 0 15px #dd514c);
  }
}

.close-item {
  position: absolute;
  right: 30px;
  top: 22px;
  font-size: 40px;
  transition: 0.2s all;
}

.close-item:hover {
  transform: scale(1.2);
  transition: 0.2s all;
}

.login-bar {
  min-width: 100vw;
  min-height: 100vh;
  margin: -8px;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.background-img {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
}

.login-background {
  position: absolute;
  min-height: 100vh;
  filter: blur(5px);
  transform: scale(1.02);
  overflow: hidden;
}

.login_p {
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 10%;
  right: 0;
  height: 400px;
  width: 550px;
  margin: auto;
  border-radius: 10px;
  /*box-shadow: 12px 18px 56px -13px black, 0px 0px 0px 0px white;*/
  /*transition: all 0.5s;*/
}

.login_p::before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  bottom: 10%;
  right: 0;
  height: 400px;
  width: 550px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 12px 18px 56px -13px black, 0px 0px 0px 0px white;
  background: rgba(255, 255, 255, 0.3);
  /*filter: blur(10px);*/
}

.login_p:hover {
  /*transform:translate(0px,-20px)*/
}

.btn {
  margin-top: 25px;
  position: relative;
  top: 30px;
  display: grid;
  grid-template-columns: 2.5fr 8fr;
  text-align: center;
}

.btn > a {
  margin-top: 25px;
  width: 78%;
  transform: translate(0%, 0%);
  height: 50px; /*高*/
  text-align: center; /*字体水平居中*/
  font-size: 20px; /*字体大小*/
  line-height: 50px; /*行高*/
  color: #fff;
  /*text-transform: uppercase; !*字体大写*!*/
  text-decoration: none; /*字体增加装饰：去除下划线*/
  font-family: sans-serif; /*非衬线体*/
  box-sizing: border-box; /*盒模型大小规则*/
  background: linear-gradient(
    90deg,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4
  ); /*渐变背景*/
  border-radius: 60px; /*边框圆角*/
  background-size: 1000%; /*背景大小*/
  z-index: 1; /*层叠定位*/
}

/*.btn > a:hover {*/
/*  !*animation: animate 8s linear infinite alternate; !*动画: 名称 时间 线性 循环 播放完回退播放*!*!*/
/*  animation: animate 8s linear infinite; !*动画: 名称 时间 线性 循环 播放完回退播放*!*/
/*}*/

.btn > a {
  /*animation: animate 8s linear infinite alternate; !*动画: 名称 时间 线性 循环 播放完回退播放*!*/
  animation: animate 8s linear infinite; /*动画: 名称 时间 线性 循环 播放完回退播放*/
}

@keyframes animate {
  0% {
    background-position: 0%; /*修改背景定位，实现渐变色炫光*/
  }
  50% {
    background-position: 100%;
  }
  100% {
    background-position: 0%;
  }
}

a::before {
  /*之前添加*/
  content: ''; /*内容*/
  position: absolute; /*绝对定位*/
  top: -5px; /*当设置对立的2个定位属性时，元素的大小将由对立的大小决定*/
  left: -5px;
  right: -5px;
  bottom: -5px; /*当设置对立的2个定位属性时，元素的大小将由对立的大小决定*/
  z-index: -1;
  background: linear-gradient(
    90deg,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4
  );
  border-radius: 40px;
  background-size: 1000%;
  filter: blur(20px); /*过渡：模糊*/
  opacity: 0; /*透明度*/
  transition: 1s; /*过渡时间*/
}

/*a:hover::before {*/
/*  filter: blur(20px);*/
/*  opacity: 1;*/
/*  animation: animate 8s linear infinite; !*注意动画名称统一*!*/
/*}*/

a:before {
  filter: blur(20px);
  opacity: 1;
  animation: animate 8s linear infinite; /*注意动画名称统一*/
}

.input {
  margin-top: 20px;
  position: relative;
  top: 30px;
  display: grid;
  grid-template-columns: 2.5fr 8fr;
  text-align: right;
}

.input > span {
  line-height: 45px;
  vertical-align: middle;
  margin-right: 10px;
}

.input_p {
  width: 78%;
}

input {
  outline-style: none;
  border: 0px;
  width: 100%;
  background: rgb(232, 240, 254);
  border-radius: 3px;
  box-shadow: 0px 0px 0px 0px black;
  height: 45px;
  text-indent: 15px;
}
</style>
