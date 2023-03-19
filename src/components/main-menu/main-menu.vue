<script lang="ts" setup>
import { useLoginStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import { firstMenu, mapPathToMenu } from '@/utils/map-menus'
import { ref } from 'vue'
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const props = defineProps<{
  isFold: boolean
}>()

const router = useRouter()
const handleMenuItem = (item: any) => {
  const url = item.url
  router.push(url)
}
// 获取进入main页面需要默认打开的路由id （这样写有bug,刷新时会造成问题）
// const defaultRouteId = ref(firstMenu.id)
const route = useRoute()
const menu = mapPathToMenu(route.path, loginStore.userMenus)
const defaultRouteId = ref(menu.id)
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <h2 v-show="!isFold" class="title">后台管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :collapse="isFold"
        :default-active="defaultRouteId + ''"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <!-- 动态组件 -->
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuItem(subItem)"
                >{{ subItem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }
}
</style>
