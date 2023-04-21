<template>
  <div class="login">
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登入</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const form = reactive({
  username: '',
  password: '',
})

const onSubmit = async () => {
  try {
    const data = await callApi.post('/login', form)
    const { token, code } = data as { token: string; code: number }
    if (code === 200) {
      localStorage.setItem('token', token)
      router.push('./system/home')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>
