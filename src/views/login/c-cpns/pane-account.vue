<script lang="ts" setup>
// 表单数据
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { TypeForm } from '@/utils/type'
import local from '@/utils/local'

const ruleForm = ref({
  username: local.getLocal('isRemPwd')?.username ?? '',
  password: local.getLocal('isRemPwd')?.password ?? ''
})

// 表单校验
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {
      pattern: /^[a-z0-9A-Z]{6,12}$/,
      message: '账号长度在6-12位',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在8-15位', trigger: 'blur' }
  ]
})
const ruleFormRef = ref<FormInstance>()
const loginAction = async (callback: (ruleForm: TypeForm) => void) => {
  await ruleFormRef.value?.validate((valid) => {
    if (valid) {
      // console.log('验证成功', ruleForm)
      callback(ruleForm.value)
    } else {
      // console.log('验证失败',fields)
      ElMessage.error('请正确输入账号和密码')
    }
  })
  // console.log(
  //   'loginAction~~~',
  //   ruleForm.value.username,
  //   ruleForm.value.password
  // )
}
// 把子组件的方法暴露出去
defineExpose({
  loginAction
})
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
