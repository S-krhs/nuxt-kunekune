<script setup lang="ts">
  import { useFetchAuth } from '~/composables/useFetchAuth'
  import { NuxtLink } from '#components'

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
  const { authStatus, loginError, signIn, signOut } = await useFetchAuth()
  const signedIn = computed<boolean>(() => authStatus.value==='success')
  // Logics

  // Lifecycles

</script>

<template>
  <div class="page-wrapper">
    <section
      class="login-section">
      <div class="login-wrapper">
        <h1 class="login-title">Sign In</h1>
        <div class="login-message">
          <el-alert
            title="The email or password you entered is incorrect. Please try again."
            type="error"
            :closable="false"
            show-icon
            v-if="loginError"
          />
          <el-alert
            title="You are already signed in. Please continue using the account or sign out."
            type="info"
            :closable="false"
            show-icon
            v-if="signedIn"
          />
        </div>
        <div class="login-description" v-if="!signedIn">
          <p>Please enter your email and password.</p>
        </div>
        <el-form
          :model="loginFormModel"
          label-width="64px"
          class="login-form">
          <el-form-item label="email" prop="email" v-if="!signedIn">
            <el-input
              v-model="loginFormModel.email"
              type="email"
              maxlength="100"
              autocomplete="off" />
          </el-form-item>
          <el-form-item label="password" prop="password" v-if="!signedIn">
            <el-input
              v-model="loginFormModel.password"
              type="password"
              maxlength="100"
              autocomplete="off" />
          </el-form-item>
          <div class="login-buttons-wrapper">
            <el-button
              type="primary"
              size="large"
              :tag="NuxtLink"
              to="/"
              v-if="signedIn">
              Continue
            </el-button>
            <el-button
              type="primary"
              size="large"
              @click="signIn(loginFormModel.email, loginFormModel.password)"
              v-if="!signedIn">
              Sign In
            </el-button>
            <el-button
              type="default"
              size="large"
              :disabled="!signedIn"
              @click="signOut()">
              Sign Out
            </el-button>
          </div>
        </el-form>
      </div>
      <div class="login-sub" v-if="!signedIn">
        <p>* To test limited features, use this account.</p>
        <p>sample@example.com / kunekune</p>
      </div>
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
}
.login-wrapper {
  padding-inline: 40px;
  padding-block: 30px;
  border: 1px solid #cccccc;
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
}
.login-message .el-alert {
  margin-block:16px;
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
  margin-bottom: 18px;
}
.login-buttons-wrapper .el-button {
  width: 100px;
  text-decoration: none;
}
.login-sub {
  margin: 8px;
  text-align: right;
  color: #cc3333;
  font-size: small;
}
</style>