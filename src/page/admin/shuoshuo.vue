<template>
  <div class="shuoshuo">
    <div class="auto-title">
      <div class="background"></div>
      <span>说说</span>
    </div>
    <quill-editor
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      style="height:400px;width: 100%"
    ></quill-editor>
    <div class="btn">
      <div class="fabu">发布</div>
      <div class="fabu-shadow">发布</div>
    </div>
    <div class="title"><span>history</span></div>
    <div class="shuoshuo-p" v-for="(data, index) in shuoshuo">
      <div class="day">
        <span>{{ data.time }}</span>
        <span v-if="shuoshuoopen == data.id">
          <i class="fas fa-chevron-circle-up"></i>
        </span>
        <span v-if="shuoshuoopen != data.id" @click="open(data.id)">
          <i class="fas fa-chevron-circle-down"></i>
        </span>
      </div>
      <transition name="shuoshuo">
        <div v-if="shuoshuoopen == data.id">
          <div
            class="shuoshuo-history"
            v-for="(content, contentindex) of data.data"
          >
            <span class="time">发表于：{{ content.time }}</span>
            <div class="operate">
              <el-popover placement="top" width="160" trigger="hover">
                <div
                  style="height: 40px;display: flex;justify-content: center;align-items: center"
                >
                  修改这一条说说
                </div>
                <button slot="reference" class="login-out-btn">
                  <span class="change" @click="change(content)">修改</span>
                </button>
              </el-popover>
              <el-popover placement="top" width="160" trigger="hover">
                <div
                  style="height: 40px;display: flex;justify-content: center;align-items: center"
                >
                  隐藏这一条说说
                </div>
                <button slot="reference" class="login-out-btn">
                  <span class="hide" @click="hide(content)">隐藏</span>
                </button>
              </el-popover>
              <el-popover placement="top" width="160" trigger="hover">
                <div
                  style="height: 40px;display: flex;justify-content: center;align-items: center"
                >
                  删除这一条说说
                </div>
                <button slot="reference" class="login-out-btn">
                  <span class="del" @click="del(content)">删除</span>
                </button>
              </el-popover>
            </div>
            <div class="ql-content">
              <div class="ql-container ql-snow ql-bar">
                <div class="ql-editor" v-html="content.content"></div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shuoshuo',
  data() {
    return {
      editorOption: {
        placeholder: '编辑文章内容'
      },
      content: '',
      contents: '<h2>emmmmmm</h2>',
      shuoshuoopen: '1',
      shuoshuo: [
        {
          id: 1,
          time: '2021-03-19',
          data: [
            {
              time: '13:15',
              content: '<h2>emmmmmm</h2>'
            },
            {
              time: '13:15',
              content: '<h2>emmmmmm</h2>'
            },
            {
              time: '13:15',
              content: '<h2>emmmmmm</h2>'
            }
          ]
        },
        {
          id: 2,
          time: '2021-03-18',
          data: [
            {
              time: '13:16',
              content: '<h2>emmmmmm</h2>'
            }
          ]
        },
        {
          id: 3,
          time: '2021-03-17',
          data: [
            {
              time: '13:17',
              content: '<h2>emmmmmm</h2>'
            }
          ]
        },
        {
          id: 4,
          time: '2021-03-15',
          data: [
            {
              time: '13:18',
              content: '<h2>emmmmmm</h2>'
            }
          ]
        },
        {
          id: 5,
          time: '2021-03-13',
          data: [
            {
              time: '13:19',
              content: '<h2>emmmmmm</h2>'
            }
          ]
        }
      ]
    };
  },
  created() {
    this.toTop();
  },
  methods: {
    open(id) {
      this.shuoshuoopen = id;
    },
    change(data) {
      this.content = data.content;
      this.toTop();
    },
    hide(data) {
      this.$message({
        message: '隐藏成功啦！',
        type: 'success'
      });
    },
    del(data) {
      this.$message({
        message: '删除成功啦！',
        type: 'success'
      });
    }
  }
};
</script>

<style scoped lang="scss">
* {
  transition: all 0.5s;
}

.shuoshuo {
  position: relative;
  animation: 0.5s bottomTotop;

  .auto-title {
    margin-bottom: 50px;
  }

  .ql-content {
    margin-top: 20px;
    background-image: url('https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/%E6%8F%92%E7%94%BB/%E5%B0%8F%E5%9F%8B.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
    border-radius: 10px;
    border: 1px solid rgba(225, 225, 225, 1);

    .ql-bar {
      border: unset !important;
    }
  }

  .ql-content:hover {
    border: 1px solid rgba(250, 154, 0, 1);
    transition: border 0.2s;
  }

  .btn {
    position: relative;
    margin-top: 30px;
    display: flow-root;

    .fabu {
      float: right;
      margin-top: 70px;
      position: relative;
      background: linear-gradient(
        to right,
        rgba(249, 192, 12, 0.5),
        rgba(0, 185, 241, 0.5)
      );
      color: white;
      width: 180px;
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
      bottom: 3px;
      transition: all 0.5s;
      transform: translateZ(0) scale(1.02);
    }

    .fabu:hover + .fabu-shadow {
      opacity: 0.6;
      transition: all 0.5s;
      filter: blur(8px);
    }

    .fabu-shadow {
      right: 0;
      opacity: 0;
      position: absolute;
      top: 80px;
      background: linear-gradient(
        to right,
        rgba(249, 192, 12, 0.5),
        rgba(0, 185, 241, 0.5)
      );
      color: white;
      width: 180px;
      height: 50px;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s;
    }
  }

  .shuoshuo-p {
    overflow: hidden;
    transition: 0.5s all;

    .day {
      margin-top: 20px;
      font-weight: bold;
      font-size: 20px;
      background: rgba(165, 223, 249, 0.7);
      padding: 15px 10px;
      border-radius: 10px;

      span:nth-child(1) {
        margin-left: 10px;
      }

      span:nth-child(2) {
        margin-right: 10px;
        float: right;
      }
    }

    > div:nth-child(2) {
      margin-top: 30px !important;
    }

    .shuoshuo-history {
      margin-top: 30px;

      .time {
        font-size: 15px;
      }

      .operate {
        float: right;

        .login-out-btn {
          background: unset !important;
          border: unset !important;
          font-size: unset !important;
          color: unset !important;
        }

        .change {
          margin-right: 10px;
          color: #30a9de;
        }

        .hide {
          margin-right: 10px;
          color: #ffbc42;
        }

        .del {
          color: #e53a40;
        }
      }
    }
  }

  .title {
    margin-top: 60px;
    font-size: 30px;
    position: relative;
    position: relative;

    > span {
      margin-left: 20px;
    }
  }

  .title::before {
    content: '';
    position: absolute;
    background: #8ec0e4;
    width: 10px;
    height: 90%;
  }

  .area-content {
    min-width: 100%;
    max-width: 100%;
    min-height: 300px;
    color: rgba(6, 6, 6, 0.7);
    width: 100%;
    border: 1px solid rgba(225, 225, 225, 1);
    transition: border 0.2s;
    border-radius: 5px;
    padding: 20px;
    max-width: 100%;
    min-width: 100%;
    background-image: url('https://xiamo.oss-cn-shenzhen.aliyuncs.com/xiamo/%E6%8F%92%E7%94%BB/%E5%B0%8F%E5%9F%8B.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
    font-size: 13px;
  }

  .area-content:focus + .textarea-title > span {
    position: relative;
    top: -31px;
    left: -8px;
    color: white;
    display: inline-block;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 2px;
    background: rgba(250, 154, 0, 1);
    transition: all 0.2s;
  }

  .area-content:focus {
    border: 1px solid rgba(250, 154, 0, 1);
    outline: none;
    transition: border 0.2s;
  }
}
</style>
