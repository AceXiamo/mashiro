<template>
  <div class="setting">
<!--    <div class="options-title">-->
<!--      <div class="options-title-border-bottom"></div>-->
<!--      <span>设置</span>-->
<!--    </div>-->
    <div class="auto-title">
      <div class="background"></div>
      <span>设置</span>
    </div>
    <div class="setting-item">
      <div class="name">
        <i class="el-icon-picture-outline setting-icon"></i>
        <span>博客主页背景图</span>
      </div>
      <div class="value">
        <input type="file" id="fileExport" @change="handleFileChange" class="upload" ref="inputer">
        <img :src="backgroundimg"/>
      </div>
    </div>
    <div class="border-x-30"></div>
    <div class="setting-item">
      <div class="name">
        <i class="el-icon-ice-cream-round setting-icon"></i>
        <span>站点标题</span>
      </div>
      <div class="value">
        <span>Mashiro</span>
      </div>
    </div>
    <div class="border-x-30"></div>
    <div class="setting-item">
      <div class="name">
        <i class="el-icon-link setting-icon"></i>
        <span>站点地址</span>
      </div>
      <div class="value">
        <span class="link" @click="toLink">{{ link }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "setting",
    data(){
      return{
        link:"https://xiamoqwq.com",
        backgroundimg:"https://xiamo.oss-cn-shenzhen.aliyuncs.com/gitee-mashiro/1.png"
      }
    },
    methods:{
      toLink(){
        window.open(this.link)
      },
      async handleFileChange(e){
        let file = e.target.files[0]
        let formdata = new FormData()
        formdata.append('file', file)
        let res = await this.$axios.post('/api/common/uploadimg', formdata, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })
        console.log(res)
        this.backgroundimg = res.data.url
      }
    }
  }
</script>

<style scoped lang="scss">
  *{
    transition: all .5s;
  }

  .setting{
    /*border: 2px dashed;*/
    position: relative;
    overflow-x: hidden;
    padding-bottom: 30px;
    animation: .5s bottomTotop;
    .options-title {
      margin-top: 20px;
    }
    div:nth-child(2){
      margin-top:30px;
    }
    .setting-item{
      margin-top: 30px;
      display: flex;
      align-items: center;
      padding: 0 30px;
      >div{
        float: left;
      }
      .name{
        margin-right: 100px;
        width: 300px;
        color: #84B1ED;
        .setting-icon{
          color: #C89EC4;
          font-size: 20px;
          margin-left: 100px;
        }
        >span{
          margin-left: 5px;
        }
      }
      .value{
        text-align: center;
        position: relative;
        .upload{
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: 100%;
          opacity: 0;
        }
        .link{
          color: #AACD6E;
        }
        img{
          max-width: 500px;
          max-height: 500px;
          border-radius: 10px;
        }
      }
    }
  }
</style>
