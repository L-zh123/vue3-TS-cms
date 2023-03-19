<script lang="ts" setup>
import { useLoginStore } from '@/stores'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

const loginStore = useLoginStore()
const router = useRouter()
const handleExitClick = async () => {
  try {
    await ElMessageBox.confirm('确定要退出吗', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
    loginStore.delUserInfo()
    await router.replace('/login')
  }catch (e){
    console.log(e)
  }
}
</script>

<template>
  <div class="header-info">
    <div>
      <span class="info-icon">
        <el-icon><Message /></el-icon>
      </span>
      <span class="info-icon">
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span class="info-icon">
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="http://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
          <span>coderwhy</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick"
              ><span>退出系统</span></el-dropdown-item
            >
            <el-dropdown-item><span>个人信息</span></el-dropdown-item>
            <el-dropdown-item><span>修改密码</span></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
  .info-icon {
    padding: 0 5px;
  }
  .info {
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
