<template>
  <div>
    <div v-for="data in menudata" :key="data.index">
      <el-submenu v-if="data.isgroup" :index="data.index">
        <template slot="title">
          <i :class="[data.icon]"></i>
          <span>{{ data.name }}</span>
        </template>
        <menulist :menudata="data.child"></menulist>
      </el-submenu>
      <el-menu-item v-else :index="data.index">
        <i :class="[data.icon]"></i>
        <span slot="title">{{ data.name }}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
  import menulist from './menulist'
  export default {
    components:{
      menulist:menulist
    },
    name: "menulist",
    props:['menudata'],
    data(){
      return{
      }
    },
  }
</script>

<style scoped>

</style>
