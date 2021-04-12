<template>
  <div class="emoji">
    <div class="setting-title">
      <i class="el-icon-s-tools"></i>
      <span>表情图</span>
    </div>
    <el-form ref="form" :model="selectform" label-width="80px" class="tb-form">
      <el-col :span="6">
        <el-form-item label="">
          <!-- <el-button type="success" icon="el-icon-check" circle @click="select"></el-button> -->
          <!-- <el-button type="danger" icon="el-icon-delete" circle @click="clean"></el-button> -->
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            @click="add"
          ></el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="emoji_url" label="表情图">
        <template slot-scope="scope">
          <img
            @click="emojiclick(scope.row.emojiUrl)"
            class="table-img"
            :src="scope.row.emojiUrl"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑
          </el-button> -->
          <el-popover placement="right" width="240" trigger="click">
            <p>要删除吗？</p>
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
        <el-col :span="24">
          <el-form-item label="表情图">
            <el-upload
              class="avatar-uploader"
              action="/api/common/uploadimg"
              :headers="token"
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
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog class="dialog emojidialog" :visible.sync="showemoji" width="35%">
      <img class="emojiimg" :src="emojiurl" />
    </el-dialog>
  </div>
</template>

<script>
import { list, del, insert } from '@/js/api/admin/emoji';
import { getToken } from '@/js/utils/auth';
export default {
  name: 'emoji',
  data() {
    return {
      showemoji: false,
      emojiurl: '',
      dialogtype: 'add',
      imageUrl: '',
      form: {},
      selectform: {},
      tableData: [],
      showDialog: false,
      token: {},
      loading: false
    };
  },
  created() {
    this.reload();
    this.token = {
      Authorization: getToken()
    };
  },
  methods: {
    async reload() {
      this.loading = true;
      let data = this.selectform;
      await list(data).then((response) => {
        if (response) {
          console.log(response);
          this.tableData = response;
          this.loading = false;
        }
      });
    },
    close() {
      this.form = {};
      this.showDialog = false;
    },
    submit() {
      insert(this.form).then((response) => {
        if (response) {
          this.$message({
            showClose: true,
            message: '新增成功！',
            type: 'success'
          });
          this.close();
          this.reload();
        }
      });
    },
    emojiclick(url) {
      this.emojiurl = url;
      this.showemoji = true;
    },
    handleAvatarSuccess(res, file) {
      // File: file.raw
      this.form.emojiUrl = res.url;
      this.imageUrl = res.url;
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
      return isJPG;
    },
    handleClose() {
      this.showDialog = false;
    },
    select() {
      this.$message({
        showClose: true,
        message: '查找到以下数据！',
        type: 'success'
      });
    },
    clean() {
      this.selectform = {};
      this.$message({
        showClose: true,
        message: '已清空数据！'
      });
    },
    add() {
      this.form = {};
      this.imageUrl = '';
      this.dialogtype = 'add';
      this.showDialog = true;
    },
    handleEdit(index, row) {
      this.imageUrl = row.emoji_url;
      this.dialogtype = 'edit';
      this.showDialog = true;
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
.emoji {
  position: relative;
  animation: 0.5s bottomTotop;

  .setting-title {
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: bold;
  }

  .table-img {
    height: 80px;
  }

  .dialog {
    .dialog-form {
      margin-right: 30px;
    }
  }

  .emojidialog {
    text-align: center;
    .emojiimg {
      height: 300px;
    }
  }
}
</style>
