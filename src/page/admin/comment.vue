<template>
  <div class="comment">
    <div class="setting-title">
      <i class="el-icon-s-tools"></i>
      <span>评论</span>
    </div>
    <el-form ref="form" :model="selectform" label-width="80px" class="tb-form">
      <el-col :span="6">
        <el-form-item label="qq">
          <el-input v-model="selectform.qq"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="昵称">
          <el-input v-model="selectform.nickname"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="email">
          <el-input v-model="selectform.email"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="">
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            @click="select"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="clean"
          ></el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
      <el-table-column prop="ipAddress" label="ip"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="qq" label="QQ"> </el-table-column>
      <el-table-column prop="email" label="email" width="180">
      </el-table-column>
      <el-table-column prop="content" label="评论">
        <template slot-scope="scope">
          <span
            @click="commentdetail(scope.row)"
            style="white-space: nowrap;color: #03a9f4"
            >{{ scope.row.contenttext }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="blogTitle" label="评论文章">
        <template slot-scope="scope">
          <!-- @click="toBlog(scope.row.blogId)" -->
          <span style="white-space: nowrap;color: #03a9f4">{{
            scope.row.blogTitle
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="评论时间" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popover placement="right" width="240" trigger="click">
            <p>要删除这条评论吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                type="primary"
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
                >确定</el-button
              >
            </div>
            <el-button slot="reference" size="mini" type="danger" @click=""
              >删除
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      class="dialog"
      :title="dialogtype == 'add' ? '添加' : '编辑'"
      :visible.sync="showDialog"
      width="35%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px" class="dialog-form">
        <el-col :span="12">
          <el-form-item label="用户名">
            <el-input
              v-model="form.user_name"
              :disabled="dialogtype == 'edit'"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="showDialog = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      class="dialog"
      title="评论详情"
      :visible.sync="showcomment"
      width="35%"
    >
      <div>
        <div class="user">
          <img :src="commentavatar" />
          <span>{{ commentnickname }}</span>
        </div>
        <div class="comment-text">
          <i class="fas fa-quote-left"></i><span>{{ comment }}</span
          ><i class="fas fa-quote-right"></i>
        </div>
        <div class="detailimg" v-for="(res, index) in commentimg">
          <img :src="res" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, del } from '@/js/api/admin/commentDetail';
export default {
  name: 'comment',
  data() {
    return {
      dialogtype: 'add',
      imageUrl: '',
      form: {},
      selectform: {},
      tableData: [],
      showDialog: false,
      comment: '',
      commentnickname: '',
      commentavatar: '',
      commentimg: [],
      showcomment: false
    };
  },
  created() {
    this.reload();
  },
  methods: {
    toBlog(id) {
      this.$router.push({ path: '/admin/blogEdit', query: { id: id } });
    },
    async reload() {
      this.tableData = [];
      let this_ = this;
      this.loading = true;
      let data = this.selectform;
      let img = /\[img](\s\S*)\[\/img]/;
      await list(data).then((response) => {
        if (response) {
          if (response.length > 0) {
            response.forEach(function(res) {
              let comment = res.content;
              if (comment.indexOf('[img]') > -1) {
                res.contentimg = comment.match(img)[1].split('[/img][img]');
                let contenttext = res.content.split(']');
                res.contenttext = contenttext[contenttext.length - 1];
              } else {
                res.contenttext = comment;
              }
            });
            this.tableData = response;
          }
          this.loading = false;
        }
      });
    },
    commentdetail(row) {
      console.log(row);
      this.commentimg = row.contentimg;
      this.comment = row.contenttext;
      this.commentnickname = row.nickname;
      this.commentavatar = row.avatar;
      this.showcomment = true;
    },
    handleAvatarSuccess(res, file) {
      // File: file.raw
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleClose() {
      this.showDialog = false;
    },
    select() {
      this.reload();
      this.$message({
        showClose: true,
        message: '查找到以下数据！',
        type: 'success'
      });
    },
    clean() {
      this.selectform = {};
      this.reload();
      this.$message({
        showClose: true,
        message: '已清空数据！'
      });
    },
    handleDelete(index, row) {
      del(row.id).then((response) => {
        if (response) {
          this.$message({
            showClose: true,
            message: '删除成功！',
            type: 'warning'
          });
          this.reload();
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.comment {
  position: relative;
  animation: 0.5s bottomTotop;

  .setting-title {
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: bold;
  }

  .table-img {
    height: 80px;
    width: 80px;
    border-radius: 100%;
  }

  .dialog {
    .dialog-form {
      margin-right: 30px;
    }

    .user {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      img {
        height: 60px;
        width: 60px;
        border-radius: 100%;
        margin-right: 10px;
      }
    }

    .comment-text {
      svg {
        font-size: 13px;
      }
      span {
        margin: 0 10px;
      }
    }

    div:nth-child(3) {
      margin-left: 0px;
    }

    .detailimg {
      margin-top: 20px;
      background: #ffeb3b;
      display: inline-flex;
      margin-left: 10px;
      border-radius: 5px;

      img {
        padding: 3px;
        // width: 130px;
        max-height: 120px;
      }
    }
  }
}
</style>
