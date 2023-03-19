<script lang="ts" setup>
import { ref } from 'vue'
import PaneAccount from '@/views/login/c-cpns/pane-account.vue'
import type { TypeForm } from '@/utils/type'
import { useLoginStore } from '@/stores'
import router from '@/router'
import local from '@/utils/local'
import { mapMenusToRoutes } from '@/utils/map-menus'
// 记住密码
const isRemPwd = ref<boolean>(local.getLocal('isRemPwd')?.isRemPwd || false)
// 登录模式
const selectMode = ref('account')
// 获取子组件的实例
// const accountRef = ref<InstanceType<typeof PaneAccount>>() // 这样写会导致报错,目前没有解决
const accountRef = ref()

const loginStore = useLoginStore()

// 提交表单
const loginSubmit = () => {
  if (selectMode.value === 'account') {
    // 账号密码登录
    accountRef.value.loginAction(async (account: TypeForm) => {
      // 发送登录请求
      // console.log(account.username, account.password)
      const id = await loginStore.accountLoginAction(account)
      // 获取用户信息
      const roleId = await loginStore.getUserInfo(id as number)
      // 获取权限菜单
      await loginStore.getUserMenuByRoleId(roleId)
      // 在路由跳转之前动态添加路由
      const routes = mapMenusToRoutes(loginStore.userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      // 登录成功后进行路由跳转
      await router.replace('/')
      // 记住密码的功能实现
      if (isRemPwd.value) {
        // 记住密码
        local.setLocal('isRemPwd', { ...account, isRemPwd: isRemPwd.value })
      } else {
        // 不记住密码
        local.removeLocal('isRemPwd')
      }
    })
  } else {
    // 手机号登录
  }

  console.log(selectMode.value)
}
</script>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="selectMode">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <PaneAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text"> 手机登录 </span>
            </div>
          </template>
          123
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <div class="login-btn">
      <el-button class="btn" type="primary" size="large" @click="loginSubmit"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  .tabs {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .text {
      margin-left: 5px;
    }
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .login-btn {
    width: 100%;
    .btn {
      width: 100%;
    }
  }
}
</style>
