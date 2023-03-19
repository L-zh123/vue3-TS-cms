<script lang="ts" setup>
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'
const width = ref('210px')
const isFold = ref(false)
const changeFold = (flag: boolean) => {
  width.value = flag ? '56px' : '210px'
  isFold.value = flag
}
</script>

<template>
  <div>
    <el-container class="main-content">
      <el-aside :width="width" class="el-aside">
        <main-menu :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px" class="el-header">
          <main-header @changeFold="changeFold" />
        </el-header>
        <el-main class="el-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.main-content {
  height: 100vh;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    background-color: #001529;
    transition: width 0.3s ease;
  }
  .el-header {
    background-color: #fff;
  }
  .el-main {
    //background-color: salmon;
  }
}
</style>
