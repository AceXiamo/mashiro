<template>
  <div class="file" @click="close()">
    <div class="setting-title">
      <i class="el-icon-s-tools"></i>
      <span>文件</span>
    </div>
    <el-form ref="form" :model="selectform" label-width="80px" class="tb-form">
      <el-col :span="6">
        <el-form-item label="类型">
          <el-select v-model="selectform.typeId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="">
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            @click="select()"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="clean()"
          ></el-button>
          <el-button type="primary" icon="el-icon-plus" circle class="addfile">
            <input
              type="file"
              id="fileExport"
              @change="handleFileChange"
              class="upload"
              ref="inputer"
            />
          </el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="nickname" label="类型">
        <template slot-scope="scope">
          <span>{{
            scope.row.typeId == 0
              ? '图片'
              : scope.row.typeId == 1
              ? '视频'
              : '其他'
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="file">
        <template slot-scope="scope">
          <img
            @click.stop
            @click="showimg(scope.row)"
            v-if="scope.row.typeId == 0"
            class="table-img"
            :src="scope.row.url"
          />
          <img
            @click.stop
            @click="showimg(scope.row)"
            v-if="scope.row.typeId == 1"
            class="table-img"
            src="../../../static/icon/video.png"
          />
          <span
            style="white-space: nowrap"
            @click="copyUrl(scope.row.url)"
            v-if="scope.row.typeId == 2"
            >{{
              decodeURI(
                scope.row.url.split('/')[scope.row.url.split('/').length - 1]
              )
            }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
    <transition name="fade">
      <div
        class="mask"
        v-if="imgdialog"
        @touchmove.prevent
        @mousewheel.prevent
      ></div>
    </transition>
    <transition name="comment">
      <div class="model" v-if="imgdialog" @click.stop>
        <div class="close" @click="close">
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="content">
          <img :src="filedata.url" v-if="filedata.typeId == 0" />
          <video
            :controls="true"
            v-else
            :autoplay="true"
            :src="filedata.url"
            v-if="filedata.typeId == 1"
          ></video>
        </div>
        <div class="info">
          <span @click="copyUrl(filedata.url)">点此复制url</span>
        </div>
      </div>
    </transition>
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
import { list, del, insert } from '@/js/api/admin/file';
import { upload } from '@/js/api/common';
export default {
  name: 'file',
  data() {
    return {
      showMask: false,
      options: [
        {
          id: 0,
          name: '图片'
        },
        {
          id: 1,
          name: '视频'
        },
        {
          id: 2,
          name: '其他'
        }
      ],
      filedata: {},
      imgdialog: false,
      dialogtype: 'add',
      imageUrl: '',
      form: {},
      selectform: {},
      tableData: [
        {
          id: 1,
          type_id: 0,
          url:
            'https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2021/02/f24e5044726e55558bcf30443eec62cb.png',
          create_time: '2021-03-23 11:12'
        },
        {
          id: 2,
          type_id: 1,
          url:
            'https://xiamo.oss-cn-shenzhen.aliyuncs.com/video/%E8%BF%9E%E6%8E%A5%202020-11-03%2022-39-44_Trim_Trim.mp4',
          create_time: '2021-03-23 11:13'
        },
        {
          id: 3,
          type_id: 2,
          url:
            'https://xiamo.oss-cn-shenzhen.aliyuncs.com/video/%E8%BF%9E%E6%8E%A5%202020-11-03%2022-39-44_Trim_Trim.mp4',
          create_time: '2021-03-23 11:14'
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
    async reload() {
      this.tableData = [];
      this.loading = true;
      let data = this.selectform;
      await list(data).then((response) => {
        if (response) {
          this.tableData = response;
          this.loading = false;
        }
      });
    },
    submit(data) {
      insert(data).then((response) => {
        if (response) {
          this.$message({
            showClose: true,
            message: '上传成功！',
            type: 'success'
          });
          this.reload();
        }
      });
    },
    async handleFileChange(e) {
      let file = e.target.files[0];
      let path = e.target.value;
      let suffix;
      try {
        var flieArr = path.split('.');
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = '';
      }
      let data = {};
      this.showMask = true;
      // 图片
      if (this.imglist.indexOf(suffix) > -1) {
        data.typeId = 0;
        data.url = await this.upload(file);
      }
      // 视频
      else if (this.videolist.indexOf(suffix) > -1) {
        data.typeId = 1;
        data.url = await this.upload2(file);
      }
      // 其他
      else {
        data.typeId = 2;
        data.url = await this.upload2(file);
      }
      await this.submit(data);
      this.showMask = false;
    },
    close() {
      this.imgdialog = false;
    },
    async upload(file) {
      let url = '';
      let formdata = new FormData();
      formdata.append('file', file);
      formdata.append('jsondata', '');
      await upload(formdata).then((response) => {
        if (response) {
          url = response.url;
        }
      });
      return url;
    },
    showimg(row) {
      this.imgdialog = true;
      this.filedata = row;
    },
    copyUrl(fileurl) {
      let url = fileurl;
      if (!url) url = this.filedata.url;
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand('Copy'); // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      });
      oInput.remove();
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
.file {
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
  }

  .dialog {
    .dialog-form {
      margin-right: 30px;
    }
  }

  .addfile {
    position: relative;
    width: 41px;
    .upload {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      opacity: 0;
    }
  }
}
</style>
