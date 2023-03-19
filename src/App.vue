<script setup lang="ts"></script>

<template>
  <div class="app">
    <h2 @click="btn">{{ foo }}</h2>
    <RouterView />
  </div>
</template>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
</style>
