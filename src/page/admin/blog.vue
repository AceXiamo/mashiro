<template>
  <div class="blog">
    <div class="auto-title">
      <div class="background"></div>
      <span>博客</span>
      <span @click="toEdit('')" class="add-icon">
        <i class="fas fa-plus-circle"></i>
      </span>
    </div>
    <div class="blogs" v-for="(data, index) in list">
      <div class="blog-img">
        <img :src="data.coverImg" />
      </div>
      <div class="blog-info">
        <div>
          <span>{{ data.title }}</span>
        </div>
        <div>
          <i class="fas fa-pencil-alt"></i
          ><span>{{ data.creatorNickname }}</span>
        </div>
        <div>
          <i class="far fa-clock"></i><span>{{ data.createTime }}</span>
        </div>
        <div>
          <i class="far fa-eye"></i><span>{{ data.view }}次点击</span>
        </div>
      </div>
      <div class="blog-operating">
        <div>
          <el-button type="primary" class="btn" round @click="toEdit(data.id)"
            >编辑</el-button
          >
        </div>
        <el-popover placement="left" width="240" trigger="click">
          <p>要删除该博客吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click="del(data.id)"
              >确定</el-button
            >
          </div>
          <el-button slot="reference" type="danger" class="btn" round
            >删除</el-button
          >
        </el-popover>
      </div>
    </div>
    <transition name="dialog-ani">
      <div class="blog-edit" @click="showEdit = false" v-if="showEdit">
        <blog-edit></blog-edit>
      </div>
    </transition>
  </div>
</template>

<script>
import { list, del } from '@/js/api/admin/blog';
import blogEdit from './blogEdit';

export default {
  name: 'blog',
  components: {
    'blog-edit': blogEdit
  },
  data() {
    return {
      loading: false,
      showEdit: false,
      page: 1,
      size: 10,
      list: []
    };
  },
  created() {
    this.toTop();
    this.reload();
  },
  methods: {
    reload() {
      let data = {
        page: (this.page - 1) * this.size,
        size: this.size
      };
      list(data).then((response) => {
        if (response) {
          this.list = response;
        }
      });
    },
    del(id) {
      del(id).then((response) => {
        if (response) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.reload();
        }
      });
    },
    toEdit(id) {
      console.log(id);
      if (id) {
        this.$router.push({ path: '/admin/blogEdit', query: { id: id } });
      } else {
        this.$router.push('/admin/blogEdit');
      }
    }
  }
};
</script>

<style scoped lang="scss">
* {
  transition: all 0.5s;
}

.blog {
  position: relative;
  animation: 0.5s bottomTotop;
  padding: 0 50px;
  /*border: 2px dashed;*/

  .blog-edit {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .options-title {
    margin-top: 20px;
    margin-bottom: 50px;

    svg {
      font-size: 18px;
      color: #58c9b9;
      cursor: pointer;
    }
  }

  .blogs {
    margin: 50px 0;
    display: flow-root;
    position: relative;
    height: 180px;

    .blog-img {
      height: 180px;
      width: 300px;
      overflow: hidden;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      transition: all 0.5s;
      position: absolute;

      img {
        height: 100%;
        transition: all 0.5s;
      }
    }

    .blog-img:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
      transition: all 0.5s;
      transform: translateZ(0) scale(1.01);
    }

    .blog-info {
      position: relative;
      left: 315px;

      > div {
        padding: 6px;
        font-size: 15px;
        filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.5));
        transition: all 0.5s;
      }

      > div:hover {
        filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 1));
        transform: translateZ(0) scale(1.01);
        transition: all 0.5s;
      }

      > div:nth-child(3),
      > div:nth-child(4) {
        color: #6e7783;

        svg {
          font-size: 14px;
        }

        span {
          font-size: 13px;
          margin-left: 5px;
        }
      }

      > div:nth-child(2) {
        color: #f1404b;

        svg {
          font-size: 13px;
        }

        span {
          margin-left: 5px;
        }
      }

      > div:first-child {
        font-weight: bold;
        font-size: 16px;
        width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .blog-operating {
      position: absolute;
      right: 0;
      top: 0;

      div:first-child {
        margin-bottom: 20px;
      }

      .btn {
        width: 90px;
        height: 35px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        transition: all 0.5s;
      }

      .btn:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        transform: translateZ(0) scale(1.05);
      }
    }
  }
}
</style>
