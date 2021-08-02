<template>
  <div class="footprint">
    <div class="setting-title">
      <i class="el-icon-s-tools"></i>
      <span>足迹</span>
    </div>
    <!--    <el-form ref="form" :model="selectform" label-width="80px" class="tb-form">-->
    <!--      <el-col :span="6">-->
    <!--        <el-form-item label="用户名">-->
    <!--          <el-input v-model="selectform.user_name"></el-input>-->
    <!--        </el-form-item>-->
    <!--      </el-col>-->
    <!--      <el-col :span="6">-->
    <!--        <el-form-item label="昵称">-->
    <!--          <el-input v-model="selectform.nickname"></el-input>-->
    <!--        </el-form-item>-->
    <!--      </el-col>-->
    <!--      <el-col :span="6">-->
    <!--        <el-form-item label="">-->
    <!--          <el-button type="success" icon="el-icon-check" circle @click="select"></el-button>-->
    <!--          <el-button type="danger" icon="el-icon-delete" circle @click="clean"></el-button>-->
    <!--          <el-button type="primary" icon="el-icon-plus" circle @click="add"></el-button>-->
    <!--        </el-form-item>-->
    <!--      </el-col>-->
    <!--    </el-form>-->
    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
      <el-table-column prop="ipaddress" label="ip" width="180">
      </el-table-column>
      <el-table-column prop="province" label="省"> </el-table-column>
      <el-table-column prop="city" label="市"> </el-table-column>
      <el-table-column prop="accessTime" label="访问时间" width="180">
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pagesize"
        :current-page="page"
        @current-change="pagechange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { list, count } from '@/js/api/admin/accessLog';
export default {
  name: 'footprint',
  data() {
    return {
      dialogtype: 'add',
      imageUrl: '',
      form: {},
      selectform: {},
      pagesize: 10,
      total: 0,
      page: 1,
      tableData: [
        {
          ipaddress: '127.0.0.1',
          province: '湖南',
          city: '株洲',
          access_time: '2021-03-23 11:12'
        },
        {
          ipaddress: '127.0.0.2',
          province: '湖南',
          city: '长沙',
          access_time: '2021-03-23 11:13'
        }
      ],
      showDialog: false,
      loading: false
    };
  },
  created() {
    this.reload();
  },
  methods: {
    pagechange(e) {
      this.page = e;
      this.reload();
    },
    async reload() {
      this.loading = true;
      let data = this.selectform;
      await count().then((response) => {
        if (response) {
          this.total = response;
        }
      });
      data.limit = this.pagesize;
      data.offset = (this.page - 1) * this.pagesize;
      await list(data).then((response) => {
        if (response) {
          console.log(response);
          this.tableData = response;
          this.loading = false;
        }
      });
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
      this.$message({
        showClose: true,
        message: '删除成功！',
        type: 'warning'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.footprint {
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

  .page {
    padding: 20px 0;
    text-align: center;
  }
}
</style>
