<template>
  <div class="tools">
    <!-- proportionL<1左移 proportionR<1右移 -->
    <div id="bilibili-head" class="bilibili-head"
         :style="{'left':(proportionL<1 && proportionL!=''?-10*proportionL:(proportionR<1 && proportionR!=''?-10+-10*(1-proportionR):'-10'))+'vw',
         'transition':(proportionL <1 && proportionL!=''?'':(proportionR<1 && proportionR!=''?'':'.5s left'))}">
      <div class="ani">
        <!--        @mouseleave="mouseleave"-->
        <div class="img1" @mouseenter="mouseenter" id="bilibili"
             :style="{'opacity': (proportionL <1 && proportionL!=''?proportionL:(proportionR<1 && proportionR!=''?proportionR:1))}">
          <img src="../../static/bilibili/bg1.jpg">
        </div>
        <div class="img2"
             :style="{'opacity': 1-proportionL}"><img src="../../static/bilibili/bg2.jpg">
        </div>
        <div class="img3"
             :style="{'opacity': 1-proportionR}"><img src="../../static/bilibili/bg3.png"></div>
        <!--      -->
        <div class="img3 tree"
             :style="{'opacity': 1-proportionR}"><img src="../../static/bilibili/bg4.png"></div>
        <!--      -->
        <div class="img2"
             :style="{'opacity': 1-proportionL}"><img src="../../static/bilibili/bg5.png"></div>
        <!--      -->
        <div class="img4 tree"
             :style="{'opacity': (proportionL <1 && proportionL!=''?proportionL:(proportionR<1 && proportionR!=''?proportionR:1))}">
          <img src="../../static/bilibili/bg6.png"></div>
        <!--      -->
        <div class="img2 tree"
             :style="{'opacity': 1-proportionL}"><img src="../../static/bilibili/bg7.png"></div>
      </div>
      <canvas id="bilibili-canvas"></canvas>
    </div>
    <div class="title">
      <span></span>
    </div>
    <div class="tools-title">
      <div><span>1</span>.cubic-bezier（贝塞尔曲线）</div>
    </div>
    <div class="tools-content">
      <div>
        <div class="social-icon">
          <img
            src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/github.png"
          />
          <div class="social-background"></div>
        </div>
      </div>
      <div>
        <div class="social-icon">
          <img
            src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/qq.png"
          />
          <div class="social-background"></div>
        </div>
      </div>
      <div>
        <div class="social-icon">
          <img
            src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/bilibili.png"
          />
          <div class="social-background"></div>
        </div>
      </div>
      <div>
        <div class="social-icon">
          <img
            src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/wangyiyun.png"
          />
          <div class="social-background"></div>
        </div>
      </div>
      <div>
        <div class="social-icon">
          <img
            src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/sns/email.svg"
          />
          <div class="social-background"></div>
        </div>
      </div>
    </div>
    <div class="tools-code">
      <div class="ql-container ql-snow ql-bar">
        <div class="ql-editor" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tools",
    data() {
      return {
        fullWidth: document.documentElement.clientWidth,
        content: "" + '<pre class="ql-syntax" spellcheck="false">css:  transition: left 0.5s cubic-bezier(0.32, -0.02, 0.58, 1.49),top 0.5s cubic-bezier(0.32, -0.02, 0.58, 1.49);\n' +
          "" + '<span style="color:rgb(80,132,85)">//  https://cubic-bezier.com/?#.32,-0.02,.58,1.49  在线调试</span>\n' +
          "</pre>",
        editorOption: {
          placeholder: "编辑文章内容",
        },
        next_blog_img: "https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/10.jpg",
        next_blog_title: "emmmmmm",
        colors: ["208,182,213", "139,108,163", "159,198,232", "120,185,176"],
        proportionL: '',
        proportionR: '',
        firstClientX: '',
      };
    },
    created() {
      var this_ = this
      this.$emit('changeHeadCss');
      this.$nextTick(function () {
        // this.$emit("showSakura",false)
        this_.initCanvas()
      })
    },
    methods: {
      initCanvas() {
        const canvas = document.getElementById('bilibili-canvas');
        canvas.setAttribute('style', 'position: absolute;pointer-events: none;z-index: 4');
        const canP = document.getElementById('bilibili-head')
        const ctx = canvas.getContext('2d')
        const canvasW = canP.offsetWidth
        const canvasH = canP.offsetHeight
        const particles = []
        // 数量
        const maxParticles = 100
        const random = function (min, max) {
          return Math.random() * (max - min) + min
        }
        window.requestAnimationFrame = (function () {
          const FPS = 60
          return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callBack) {
              window.setTimeout(callBack, 1000 / FPS)
            }
        })()
        const Particle = function () {
          this.x = Math.random() * canvasW
          this.y = Math.random() * canvasH
          // 大小
          this.r = random(1, 3)
          // 透明图
          this.alpha = random(1, 1)
          // 下落速度
          this.velocity = {
            // x: random(-0.35, 0.35),
            // y: random(0.75, 1.5)
            x: random(-0.35, -0.10),
            y: random(0.75, 0.90)
          }
          this.draw = function () {
            ctx.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')'
            ctx.shadowColor = "rgba(255, 255, 255,1)";
            ctx.shadowBlur = 5;
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
            ctx.closePath()
            ctx.fill()
          }
          this.moving = function () {
            this.x += this.velocity.x
            this.y += this.velocity.y
            if (this.y > canvasH) {
              this.x = Math.random() * canvasW
              this.y = 0
            }
            this.draw()
          }
        }
        init()

        function init() {
          canvas.width = canvasW
          canvas.height = canvasH
          for (var i = 0; i < maxParticles; i++) {
            particles.push(new Particle())
          }
          animate()
        }

        function animate() {
          ctx.clearRect(0, 0, canvasW, canvasH)
          particles.forEach(function (particle) {
            particle.moving()
          })
          requestAnimationFrame(animate)
        }
      },
      mousemove(e) {
        if (this.firstClientX == '') {
          this.firstClientX = e.clientX
        }
        this.proportionL = e.clientX / this.firstClientX
        this.proportionR = (this.fullWidth - e.clientX) / (this.fullWidth - this.firstClientX)
      },
      mouseenter(e) {
        var this_ = this
        var timeOutId = null;
        this.firstClientX = e.clientX
        var bilibili = document.getElementById("bilibili")
        var move = function (ev) {
          this_.proportionL = ev.clientX / this_.firstClientX
          this_.proportionR = (this_.fullWidth - ev.clientX) / (this_.fullWidth - this_.firstClientX)

          bilibili.onmousemove = null;
          timeOutId = setTimeout(function () {
            bilibili.onmousemove = move;
          }, 10);
        }
        bilibili.onmousemove = move
        bilibili.onmouseleave = function () {
          clearTimeout(timeOutId);
          bilibili.onmouseup = bilibili.onmousemove = null;
          this_.firstClientX = ''
          this_.proportionL = ''
          this_.proportionR = ''
        }
      },
      mouseleave() {
        console.log(123)
        this.firstClientX = ''
        this.proportionL = ''
        this.proportionR = ''
      }
    },
    mounted() {
      window.scrollTo(0, 0);
      this.$parent.$refs.headbar.jsHover = true;
    },
    destroyed() {
      this.$parent.routerLink = this.$router.currentRoute.fullPath;
    },
  };
</script>

<style scoped lang="scss">
  .bilibili-head {
    overflow: hidden;
    /*background: rgba(0, 0, 0, .5);*/
    padding-top: 90px;
    /*padding-bottom: 20px;*/
    /*margin: 0px auto 20px;*/
    min-height: 150px;
    height: auto;
    width: 120vw;
    position: relative;
    /*box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);*/
    /*display: flex;*/
    /*align-items: center;*/
    .ani {
      position: relative;

      img {
        width: 100%;
      }

      .img1 {
        position: absolute;
        z-index: 4;
      }

      .img2 {
        position: absolute;
        z-index: 2;
      }

      .img3 {
        position: absolute;
        z-index: 2;
      }

      .img4 {
        position: absolute;
        z-index: 4;
        pointer-events: none;
      }

      .tree {
        filter: blur(2px);
      }
    }
  }

  .background {
    height: 400px;
    /*90*/
    margin: 20px -8px -8px;
    overflow: hidden;
  }

  .background img {
    width: 100%;
  }

  .ql-bar {
    border: unset !important;
  }

  .tools {
    overflow: hidden;
    height: 1500px;
    margin-bottom: 300px;
  }

  .tools-content {
    min-height: 150px;
    height: auto;
    width: 800px;
    margin: 20px auto 0px;
    border-radius: 10px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  .tools-content > div {
    position: relative;
  }

  .social-icon {
    height: 80px;
    width: 80px;
    /* background: rgba(85, 191, 252, 0.3); */
    background: unset;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    position: absolute;
    position: absolute;
    left: 0;
    right: 0;
    margin: 35px auto 0 auto;
    border-radius: 10px;
    z-index: 9;
    overflow: hidden;
  }

  .social-icon > img {
    height: 25px;
    width: 25px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 9;
    animation: icon-change-out 0.1s;

    /* background: unset;
    border-radius: 100%;
    padding: 5px;
    transition: background 0.3s; */
  }

  .social-icon:hover > img {
    animation: icon-change 0.3s ease-out;
    height: 30px;
    width: 30px;
    /* background: white;
    transition: background 0.3s; */
  }

  @keyframes icon-change {
    0% {
      height: 25px;
      width: 25px;
    }
    90% {
      height: 32px;
      width: 32px;
    }
    100% {
      height: 30px;
      width: 30px;
    }
  }

  @keyframes icon-change-out {
    0% {
      height: 30px;
      width: 30px;
    }
    100% {
      height: 25px;
      width: 25px;
    }
  }

  .social-background {
    height: 110px;
    width: 110px;
    /* background: rgba(85, 191, 252, 0.3); */
    background: rgba(192, 192, 192, 0.411);
    position: absolute;
    position: absolute;
    left: -230px;
    right: 0;
    bottom: 0;
    top: 150px;
    margin: 20px auto 0 auto;
    border-radius: 10px;
    z-index: 1;
    transform: rotate(45deg);
    transition: left 0.5s cubic-bezier(0.32, -0.02, 0.58, 1.49),
    top 0.5s cubic-bezier(0.32, -0.02, 0.58, 1.49);
  }

  .social-icon:hover .social-background {
    left: -15px;
    top: -35px;
    transition: all 0.5s cubic-bezier(0.32, -0.02, 0.58, 1.49);
  }

  .tools-title {
    height: 30px;
    width: 800px;
    margin: 70px auto 0px;
    position: relative;
  }

  .tools-title span {
    font-size: 20px;
    font-weight: bold;
  }

  .tools-title > div::before {
    content: "";
    width: 0px;
    height: 3px;
    position: absolute;
    bottom: 0;
    background: rgba(254, 150, 0, 1);
    transition: width 0.3s;
  }

  .tools-title:hover > div::before {
    width: 240px;
    transition: width 0.3s;
  }

  .tools-code {
    height: auto;
    width: 800px;
    margin: 20px auto 0px;
    position: relative;
  }
</style>
