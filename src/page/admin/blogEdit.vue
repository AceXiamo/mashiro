<template>
  <div class="blogEdit">
    <div class="auto-title">
      <div class="background"></div>
      <span>添加博客</span>
    </div>
    <div class="edit-bar">
      <quill-editor
        v-loading="loading"
        ref="myTextEditor"
        v-model="blog.content"
        :options="editorOption"
        @change="onEditorChange($event)"
        style="height:600px;width: 100%"
      ></quill-editor>
    </div>
    <div class="form">
      <div class="form-item">
        <div class="item-name">
          <span>背景图</span>
        </div>
        <div class="item-value">
          <input
            type="file"
            id="fileExport"
            @change="handleFileChange"
            class="upload"
            ref="inputer"
          />
          <i class="fas fa-plus-circle"></i>
          <img v-loading="loading" :src="blog.coverImg" />
        </div>
      </div>
    </div>
    <div class="btn-p">
      <div class="back" @click="back">
        <i class="fas fa-angle-left"></i>
      </div>
      <div class="fabu" @click="submit">发布</div>
      <div class="fabu-shadow"></div>
    </div>
    <transition name="fade">
      <div class="mask" v-if="showMask" @touchmove.prevent @mousewheel.prevent>
        <img
          class="loading-x"
          src="../../../static/gif/loading.png"
          width="100px"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { selectOne, insert, update } from '@/js/api/admin/blog';
import { upload } from '@/js/api/common';
import quillConfig from '@/js/quill-config.js';
export default {
  name: 'blogEdit',
  data() {
    return {
      showMask: false,
      loading: false,
      editorOption: quillConfig,
      blog: {
        coverImg: '',
        content: ''
      },
      imgFile: {}
    };
  },
  created() {
    console.log(quillConfig);
    this.toTop();
    let id = this.$route.query.id;
    if (id) {
      this.loading = true;
      selectOne(id).then((response) => {
        if (response) {
          this.blog = response;
          this.loading = false;
        }
      });
    }
  },
  methods: {
    async submit() {
      this.showMask = true;
      let titleReg = /\<h1>([\s\S]*)\<\/h1>/;
      if (this.blog.id) {
        if (this.blog.coverImg.indexOf('blob') > -1) {
          await this.upload();
        }
        let title = this.blog.content.match(titleReg)[1];
        this.blog.title = title;
        update(this.blog).then((response) => {
          if (response) {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.$router.push('/admin/blog');
            this.showMask = false;
          }
        });
      } else {
        await this.upload();
        let title = this.blog.content.match(titleReg)[1];
        this.blog.title = title;
        insert(this.blog).then((response) => {
          if (response) {
            this.$message({
              message: '发布成功！',
              type: 'success'
            });
          }
          this.$router.push('/admin/blog');
          this.showMask = false;
        });
      }
    },
    async upload() {
      let formdata = new FormData();
      formdata.append('file', this.imgFile);
      formdata.append('jsondata', '');
      await upload(formdata).then((response) => {
        if (response) {
          this.blog.coverImg = response.url;
        }
      });
    },
    back() {
      this.$router.push('/admin/blog');
    },
    onEditorChange({ editor, html, text }) {
      this.blog.content = html;
      this.blog.contentMini = text;
    },
    close() {
      this.$parent.showEdit = false;
    },
    async handleFileChange(e) {
      this.imgFile = e.target.files[0];
      this.blog.coverImg = this.getImg(this.imgFile);
    }
  }
};
</script>

<style scoped lang="scss">
* {
  transition: all 0.5s;
}

.blogEdit {
  min-height: 800px;
  background: white;
  border-radius: 10px;
  /*overflow: hidden;*/
  position: relative;
  animation: 0.5s bottomTotop;
  padding-bottom: 10px;

  .btn-p {
    position: relative;
    margin-top: 30px;
    display: flow-root;

    .back {
      float: right;
      position: relative;
      color: rgba(170, 171, 211, 0.6);
      border: 1px solid rgba(170, 171, 211, 0.6);
      width: 200px;
      height: 50px;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 0px;
      z-index: 99;
      transition: all 0.5s;
    }

    .back:hover {
      background: rgba(170, 171, 211, 0.6);
      color: white;
      transition: all 0.5s;
      /*svg{*/
      /*  animation: huxi 1.3s infinite;*/
      /*}*/
    }

    .fabu {
      float: right;
      margin-right: 30px;
      position: relative;
      background: linear-gradient(
        to right,
        rgba(249, 192, 12, 0.5),
        rgba(0, 185, 241, 0.5)
      );
      color: white;
      width: 200px;
      height: 50px;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 0px;
      z-index: 99;
      transition: all 0.5s;
    }

    .fabu:hover {
      /*box-shadow: 0 0px 20px rgba(0, 0, 0, .3);*/
      bottom: 3px;
      transition: all 0.5s;
      transform: translateZ(0) scale(1.04);
    }

    .fabu:hover + .fabu-shadow {
      opacity: 0.6;
      transition: all 0.5s;
      filter: blur(8px);
    }

    .fabu-shadow {
      right: 230px;
      opacity: 0;
      position: absolute;
      top: 10px;
      background: linear-gradient(
        to right,
        rgba(249, 192, 12, 0.5),
        rgba(0, 185, 241, 0.5)
      );
      color: white;
      width: 200px;
      height: 50px;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s;
    }
  }

  .edit-bar {
    margin-top: 50px;
  }

  .form {
    width: 600px;
    padding: 20px 20px 20px 0;
    margin-top: 70px;

    .form-item {
      display: flow-root;
      font-size: 15px;

      .item-name {
        width: 100px;
        float: left;
        font-size: 18px;
      }

      .item-value {
        // border: 1px dashed;
        min-height: 200px;
        width: 500px;
        float: left;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        .upload {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: 100%;
          opacity: 0;
        }

        .link {
          color: #aacd6e;
        }

        svg {
          position: absolute;
          font-size: 30px;
          z-index: 2;
          pointer-events: none;
        }

        img {
          z-index: 3;
          max-width: 500px;
          max-height: 500px;
          border-radius: 10px;
          pointer-events: none;
        }

        input {
          border-left: unset;
          border-top: unset;
          border-right: unset;
          border-bottom: 1px solid black !important;
          width: 100%;
          outline-style: none;
        }
      }
    }
  }

  /*.title {*/
  /*  margin-top: 20px;*/
  /*  font-size: 18px;*/
  /*  text-align: center;*/
  /*  color: #AAABD3;*/
  /*}*/

  /*.close {*/
  /*  font-size: 30px;*/
  /*  position: absolute;*/
  /*  right: 15px;*/
  /*  top: 10px;*/
  /*  color: #f9c00c;*/
  /*}*/
}
</style>
