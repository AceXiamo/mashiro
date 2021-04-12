<template>
  <div class="gallery" @click="closeImg">
    <div class="title">
      <div class="background"></div>
      <span>媒体库</span>
    </div>
    <div class="gallery-root" @click.stop>
      <vue-waterfall-easy
        :imgsArr="img"
        @scrollReachBottom="initImg"
        @click="clickImg"
        :maxCols="5"
      >
        <div
          class="img-info"
          slot-scope="props"
          style="text-align: center;font-size: 13px"
        >
          <p class="some-info">
            {{
              props.value.name +
                ' ' +
                (props.value.videosrc ? '(这是一个视频哦！)' : '')
            }}
          </p>
        </div>
      </vue-waterfall-easy>
    </div>
    <transition name="fade">
      <div class="mask" v-if="showImg"></div>
    </transition>
    <transition name="comment">
      <div class="model" v-if="showImg" @click.stop>
        <div class="close" @click="close">
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="content">
          <img :src="imgData.src" v-if="!imgData.videosrc" />
          <video
            :controls="true"
            v-else
            :autoplay="true"
            :src="imgData.videosrc"
          ></video>
        </div>
        <div class="info">
          <span @click="copyImg">点此复制url</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy';

export default {
  name: 'gallery',
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      img: [],
      initData: true,
      showImg: false,
      imgData: {},
      imgsH: document.documentElement.clientHeight - 275,
      keyup: null
    };
  },
  methods: {
    copyImg() {
      let url = this.imgData.src;
      if (this.imgData.videosrc != null && this.imgData.videosrc != '') {
        url = this.imgData.videosrc;
      }
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand('Copy'); // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      });
      oInput.remove();
    },
    close() {
      this.showImg = false;
    },
    closeImg() {
      if (this.showImg) this.showImg = false;
    },
    clickImg(event, img) {
      this.showImg = true;
      this.imgData = img.value;
    },
    initImg() {
      this.img = this.img.concat(this.testImg);
      this.img = this.img.concat(this.testImg);
    }
  },
  created() {
    this.toTop();
    let this_ = this;
    this.img = this.img.concat(this.testImg);
    this.img = this.img.concat(this.testImg);
    this.img = this.img.concat(this.testImg);
    document.onkeydown = function(e) {
      if (this_.showImg) {
        if (e.keyCode == 27) {
          this_.showImg = false;
        }
      }
    };
    window.onscroll = function() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        this_.initImg();
        // this_.initData = false
        //写后台加载数据的函数
      }
    };
  }
};
</script>

<style scoped lang="scss">
.gallery {
  /*border: 2px dashed;*/

  .title {
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 5px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    > span {
      z-index: 11;
    }

    .background {
      background: #8dc63f;
      width: 150px;
      height: 40px;
      position: absolute;
      z-index: 10;
      border-radius: 10px;
      transition: all 0.5s;
    }

    .background::after {
      content: '';
      background: #f199bc;
      width: 90px;
      height: 40px;
      position: absolute;
      z-index: 10;
      clip-path: polygon(0 0, 90% 0, 80% 100%, 0 100%);
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    .background:hover {
      width: 180px;
      transition: all 0.2s;
    }
  }

  .gallery-root {
    margin-top: 30px;
    transform: scale(0.98);
    height: 1500px;
  }
}
</style>
