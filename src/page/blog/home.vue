<template>
  <div id="home">
    <div class="home-background-img">
      <img
        src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/1.png"
      />
    </div>
    <self></self>
    <contents></contents>
    <beian></beian>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      scrollv: 0
    };
  },
  mounted() {
    this.$parent.type = 'blog';
  },
  methods: {
    resetScrollv() {
      let yOffset = document.documentElement.scrollTop;
      this.scrollv = yOffset;
    }
  }
};
</script>

<style scoped>
self {
  position: relative;
  z-index: -1;
}

/*#home::before{*/
/*  content: '';*/
/*  position: absolute;*/
/*  top: 0;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*  right: 0;*/
/*  z-index: -1;*/
/*  background-attachment: fixed;*/
/*  background-image: url("https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/dot.gif");*/
/*}*/

#home {
  margin: -8px;
  /*background: url('../../static/image/1.png') no-repeat;*/
  /*background-size:100% 100%;*/
}

.home-background-img {
  height: 100vh;
  text-align: center;
}

.home-background-img img {
  height: 100%;
  min-width: 100vw;
  margin: 0 -100%;
}
.pc-tip-beian {
  position: relative !important;
  bottom: 45px;
}
</style>
