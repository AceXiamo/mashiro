<template>
  <div>
    <div class="main">
      <div class="border-x-30"></div>
      <div class="r-item">
        <div class="item" v-loading="loading">
          <div class="title">
            <div class="title-dot"></div>
            <span class="title-text">近期访问</span>
          </div>
          <div class="content">
            <div v-for="data in access">
              <span>{{ data.ipaddress }}</span> <span>{{ data.city }}</span>
              <span>{{ data.accessTime }}</span>
            </div>
          </div>
        </div>
        <div class="item" v-loading="loading">
          <div class="title">
            <div class="title-dot"></div>
            <span class="title-text">最近发布</span>
          </div>
          <div class="content-1">
            <div v-for="data in article">
              <span>{{ data.createTime }}</span> <span>{{ data.title }}</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <div class="title-dot"></div>
            <span class="title-text" style="color: #566270"
              >请写出一段体现你水平的代码</span
            >
          </div>
          <div
            style="position: absolute;display: flex;justify-content: center;align-items: center;top: 0;bottom: 0;left: 0;right: 0;color: white"
          >
            select * from tb
          </div>
        </div>
        <div class="item">
          <div
            style="position: absolute;display: flex;justify-content: center;align-items: center;top: 0;bottom: 0;left: 0;right: 0;color: white"
          >
            emmmmmmmmmm
          </div>
        </div>
      </div>
      <div class="border-x-30"></div>
      <div class="comment">
        <div class="title-first">
          <div class="line"></div>
          <span>最新评论</span>
        </div>

        <div
          class="comment-item bg-cyan light"
          v-loading="loading"
          v-if="loading"
        ></div>

        <div
          class="comment-item bg-cyan light"
          v-for="(data, index) in comment"
          :index="index"
          v-loading="loading"
        >
          <div>
            <div class="user">
              <div class="avatar">
                <img :src="data.avatar" />
              </div>
              <span class="nickname">{{
                data.nickname + ' ( ' + data.qq + ' ) '
              }}</span>
            </div>
            <span>在</span>
            <span>{{ '《 ' + data.blogTitle + ' 》' }}</span>
            <span>发表评论</span>
            <span><i class="fa fa-quote-left"></i></span>
            <div>
              <span>{{
                data.content.split(']')[data.content.split(']').length - 1]
              }}</span>
            </div>
            <span><i class="fa fa-quote-right"></i></span>
          </div>
          <span>发表于：{{ data.createTime }}</span>
        </div>

        <!-- <div class="comment-item bg-cyan light">
          <div>
            <div class="user">
              <div class="avatar">
                <img src="../../../static/avatar/emmm.jpg" />
              </div>
              <span class="nickname">xiamo（1499147526）</span>
            </div>
            <span>在</span>
            <span>{{ '《xxxx文章》' }}</span>
            <span>发表评论</span>
            <span><i class="fa fa-quote-left"></i></span>
            <div>
              <img src="../../../static/avatar/emmm.jpg" />
            </div>
            <span><i class="fa fa-quote-right"></i></span>
          </div>
          <span>发表于：{{ '2021-02-25 17:12:39' }}</span>
        </div> -->
      </div>
      <div class="border-x-30"></div>
    </div>
  </div>
</template>

<script>
import { index } from '@/js/api/common';
export default {
  name: 'main',
  data() {
    return {
      access: [],
      article: [],
      comment: [],
      loading: false
    };
  },
  created() {
    this.reload();
  },
  methods: {
    async reload() {
      this.loading = true;
      await index().then((response) => {
        if (response) {
          this.article = response.blog;
          this.access = response.accessLog;
          this.comment = response.comment;
        }
      });
      this.loading = false;
    }
  }
};
</script>

<style scoped lang="scss">
* {
  transition: all 0.5s;
}

.main {
  position: relative;
  animation: 0.5s bottomTotop;
  .r-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .item:nth-child(n + 4) {
      margin-top: 30px;
    }

    .item {
      position: relative;
      min-height: 200px;
      margin: 0 10px;
      border-radius: 10px;
      transition: all 0.5s;

      .title {
        display: flow-root;
        position: relative;
        padding: 15px 15px 0 15px;

        .title-dot {
          float: left;
          height: 20px;
          width: 5px;
          border-radius: 10px;
          background: #ff7400;
          margin-right: 5px;
        }

        .title-text {
          line-height: 20px;
          float: left;
          font-size: 13px;
        }
      }
      .content {
        padding: 15px;
        > div:first-child {
          margin-top: 15px;
        }
        > div {
          text-align: left;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          margin-top: 10px;
          font-size: 12px;
          > span {
            white-space: nowrap;
          }
        }
      }
      .content-1 {
        > div:first-child {
          margin-top: 15px;
        }
        > div {
          display: grid;
          grid-template-columns: 1fr 1fr;
          text-align: center;
          margin-top: 10px;
          font-size: 13px;
        }
      }
    }

    .item:nth-child(4n-3) {
      background: rgba(220, 249, 0, 0.5);
      // box-shadow: 0 0 10px rgba(220, 249, 0, 1);
      .content,
      .content-1 {
        color: #ec7357;
      }
    }
    /*.item:nth-child(4n-3):hover{*/
    /*  box-shadow: 0 0 10px rgba(220,249,0, 1);*/
    /*  transition: all .5s;*/
    /*}*/

    .item:nth-child(4n-2) {
      background: rgba(255, 211, 0, 0.5);
      // box-shadow: 0 0 10px rgba(255, 211, 0, 1);
      .content,
      .content-1 {
        color: #d81159;
      }
    }
    /*.item:nth-child(4n-2):hover{*/
    /*  box-shadow: 0 0 10px rgba(255,211,0, 1);*/
    /*  transition: all .5s;*/
    /*}*/

    .item:nth-child(4n-1) {
      background: rgba(123, 114, 216, 0.5);
      // box-shadow: 0 0 10px rgba(123, 114, 216, 1);
    }
    /*.item:nth-child(4n-1):hover{*/
    /*  box-shadow: 0 0 10px rgba(123,114,216, 1);*/
    /*  transition: all .5s;*/
    /*}*/

    .item:nth-child(4n) {
      background: rgba(52, 207, 190, 0.5);
      // box-shadow: 0 0 10px rgba(52, 207, 190, 1);
    }
    /*.item:nth-child(4n):hover{*/
    /*  box-shadow: 0 0 10px rgba(52,207,190, 1);*/
    /*  transition: all .5s;*/
    /*}*/
  }
  .comment {
    .comment-item {
      min-height: 80px;
      border-radius: 15px;
      width: calc(100% - 20px);
      margin-right: 20px;
      padding: 20px;
      margin-top: 30px;
      display: inline-flex;
      align-items: center;
      position: relative;
      > div {
        display: inline-flex;
        align-items: center;
        span,
        div {
          white-space: nowrap;
          float: left;
        }
        > span:nth-child(2) {
          margin-left: 20px;
        }
        > span:nth-child(3) {
          color: #dd514c;
          margin-left: 5px;
        }
        > span:nth-child(4) {
          margin-left: 5px;
        }
        > span:nth-child(5) {
          font-size: 12px;
          margin-left: 20px;
        }
        > div:nth-child(6) {
          margin-left: 20px;
          max-width: 35%;
          span {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          img {
            max-width: 200px;
            max-height: 300px;
          }
        }
        > span:nth-child(7) {
          font-size: 12px;
          margin-left: 20px;
        }
        .user {
          display: inline-flex;
          align-items: center;
          .avatar {
            height: 70px;
            width: 70px;
            img {
              height: 100%;
              width: 100%;
              border-radius: 100%;
            }
          }
          .nickname {
            margin-left: 20px;
            color: #03a9f4;
          }
        }
      }
      > span:nth-child(2) {
        position: absolute;
        right: 20px;
        font-size: 12px;
        margin-left: 20px;
      }
    }
  }
}
</style>
