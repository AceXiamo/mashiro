<template>
  <div class="blog">
    <div class="background">
      <img src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/3.png">
    </div>
    <!--    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="height:600px;width: 50%;float:left" @change="onEditorChange"></quill-editor>-->

    <div class="ql-container ql-snow ql-bar blog-bar">
      <div class="ql-editor" v-html="content">
      </div>
    </div>

    <div class="next_blog blog-bar" :style="{'background':'url('+next_blog_img+') no-repeat 100%'}">
      <span>Previous Post</span>
      <span>{{next_blog_title}}</span>
      <div class="mask"></div>
    </div>

    <div class="split-line blog-bar" style="text-align: center">
      <img src="https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/avatar.jpg">
      <div class="blogger" style="color: #ABABAB"><span>xiamo</span></div>
      <span class="signature" style="color: #7d8588"><i class="fas fa-pencil-alt" style="margin-right: 8px;color: #fe9600"></i>がんばって！</span>
    </div>


  </div>
</template>

<script>
  export default {
    name: "blog",
    data() {
      return {
        content: '<p>123</p><h2>123</h2><p>123</p><pre class="ql-syntax" spellcheck="false">：asdfsdfsadfkljskfld\n' +
          '</pre><blockquote>123</blockquote><p>213213123</p><p>87976970</p><p>&lt;a&gt;123&lt;/a&gt;</p>',
        editorOption: {
          placeholder: '编辑文章内容'
        },
        next_blog_img: 'https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/10.jpg',
        next_blog_title: 'emmmmmm',
      }
    },
    methods: {
      // onEditorChange({editor, html, text}) {
      //   this.content = html;
      //   console.log(html)
      // },
    },
    mounted() {
      window.scrollTo(0, 0);
      this.$parent.$refs.headbar.jsHover = true;
    },
    destroyed() {
      this.$parent.routerLink = this.$router.currentRoute.fullPath;
    }
  }
</script>

<style scoped>
  .background {
    height: 400px;
    margin: 90px -8px -8px;
    overflow: hidden;
  }

  .background img {
    width: 100%;
  }

  .blog {
    height: 1500px;
  }

  .blog-bar {
    width: 40%;
    min-width: 780px;
    margin: 70px auto 0 auto;
    border: unset !important;
  }

  .ql-bar {
    min-height: 500px;
    height: auto
  }

  .next_blog {
    min-height: 140px;
    z-index: 1;
  }

  .next_blog span {
    position: absolute;
    margin-left: 60px;
    margin-top: 45px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, .7);
    z-index: 3;
  }

  .next_blog span:nth-child(2) {
    margin-top: 70px;
    text-transform: unset;
    color: #fff;
  }

  .next_blog:hover .mask {
    background: rgba(0, 0, 0, .2);
  }

  .mask {
    background: rgba(0, 0, 0, .4);
    height: 140px;
    width: 780px;
    position: absolute;
    z-index: 2;
    transition: background .15s linear;
  }

  .split-line {
    /*border-top: 1px dashed #ddd;*/
    /*border-bottom: 1px dashed #ddd;*/
    height: 230px;
    margin-bottom: 150px;
  }

  .split-line img {
    margin-top: 20px;
    height: 90px;
    border-radius: 100%;
  }

  .signature {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    top: 40px;
    position: relative;
    padding: 10px;
  }

  .blogger{
    position: relative;
    top: 10px;
  }
</style>
