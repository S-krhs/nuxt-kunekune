<script setup lang="ts">
  import { useFetchAuth } from '~/composables/useFetchAuth'

  // Types
  type LoginFormModel = {
    email: string
    password: string
  }
  // Hooks
  const loginFormModel = ref<LoginFormModel>({
    email: '',
    password: '',
  })
  const { signIn, signOut } = await useFetchAuth()
  // Logics

  // Lifecycles

</script>

<template>
  <div class="page-wrapper">
    <section class="login-section">
      <h1 class="login-title">Sign In</h1>
      <div class="login-description">
        <p>* Sample Account</p>
        <p>sample@example.com / kunekune</p>
      </div>
      <el-form
        :model="loginFormModel"
        label-width="auto"
        class="login-form">
        <el-form-item label="email" prop="email">
          <el-input
            v-model="loginFormModel.email"
            type="email"
            autocomplete="off" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input
            v-model="loginFormModel.password"
            type="password"
            autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <div class="login-buttons-wrapper">
            <el-button
              type="primary"
              size="large"
              @click="signIn(loginFormModel.email, loginFormModel.password)">
              Sign In
            </el-button>
            <el-button
              type="default"
              size="large"
              @click="signOut()">
              Sign Out
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </section>

  </div>
</template>

<style scoped>
.page-wrapper {
  width: 100%;
}
.login-section {
  width: 480px;
  margin-inline: auto;
  margin-top: 160px;

  padding-inline: 40px;
  padding-block: 30px;
  border: 1px solid #cccccc;
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
}
.login-description {
  text-align: center;
  color: #333333;
  font-size: small;
  margin-bottom: 30px;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.login-form .el-form-item {
  width: 100%;
}
.login-buttons-wrapper {
  margin: auto;
  margin-top: 12px;
  display: flex;
  gap: 20px;
}
.login-buttons-wrapper button {
  width: 100px;
}
</style>