<template>
  <div class="user">
    <div class="setting-title">
      <i class="el-icon-s-tools"></i>
      <span>用户</span>
    </div>
    <el-form ref="form" :model="selectform" label-width="80px" class="tb-form">
      <el-col :span="6">
        <el-form-item label="用户名">
          <el-input v-model="selectform.userName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="昵称">
          <el-input v-model="selectform.nickname"></el-input>
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
      <el-table-column prop="userName" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img class="table-img" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender == 1 ? '女' : '男' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑
          </el-button>
          <el-popover placement="right" width="240" trigger="click">
            <p>要删除该用户吗？</p>
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input
                v-model="form.userName"
                :disabled="dialogtype == 'edit'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称">
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input v-model="form.pwd" show-password></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="form.gender" placeholder="请选择">
                <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="头像">
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
            </el-form-item> </el-col
        ></el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { list, del, insert, update } from '@/js/api/admin/user';
import { getToken } from '@/js/utils/auth';
export default {
  name: 'user',
  data() {
    return {
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
      if (this.form.pwd) {
        this.form.password = this.form.pwd;
      }
      if (this.formrule()) {
        if (this.form.id) {
          update(this.form).then((response) => {
            if (response) {
              this.$message({
                showClose: true,
                message: '修改成功！',
                type: 'success'
              });
              this.close();
              this.reload();
            }
          });
        } else {
          if (!this.form.password) {
            this.$message({
              showClose: true,
              message: '密码不能为空！',
              type: 'error'
            });
            return false;
          }
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
        }
      }
    },
    formrule() {
      if (!this.form.userName) {
        this.$message({
          showClose: true,
          message: '用户名不能为空！',
          type: 'error'
        });
        return false;
      } else if (!this.form.nickname) {
        this.$message({
          showClose: true,
          message: '昵称不能为空！',
          type: 'error'
        });
        return false;
      } else if (!this.form.avatar) {
        this.$message({
          showClose: true,
          message: '请选择头像！',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.url;
      this.imageUrl = res.url;
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
      this.form = row;
      this.imageUrl = row.avatar;
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
.user {
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
  }
}
</style>
