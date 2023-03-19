<script lang="ts" setup>
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores'
import { computed, ref, watch } from 'vue'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = ref<any[]>([])
watch(
  route,
  (newVal) => {
    console.log(newVal.path)
    breadcrumbs.value = mapPathToBreadcrumbs(newVal.path, userMenus)
  },
  { immediate: true }
)
// 使用计算属性实现
// const breadcrumbs = computed(() => mapPathToBreadcrumbs(route.path, userMenus))
</script>

<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.id">{{
        item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped></style>
