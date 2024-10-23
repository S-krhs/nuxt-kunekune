<script setup lang="ts">
  import { NuxtLink } from '#components'
  import type { FormInstance, FormRules } from 'element-plus'
import { urlErrorPage } from '~/constants/paths';

  definePageMeta({ layout: 'login-layout' })

  // 型宣言
  type SignInFormModel = {
    email: string
    password: string
  }

  // ログインフォーム
  const signInFormModel = ref<SignInFormModel>({
    email: '',
    password: '',
  })
  const signInFormRef = ref<FormInstance>()
  const signInFormRules = reactive<FormRules<SignInFormModel>>({
    email: [
      { required: true, message: 'Please input email.', trigger: ['blur', 'change'] },
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
    ],
    password: [
      { required: true, message: 'Please input password.', trigger: ['blur', 'change'] },
    ]
  })

  // 認証ステータス関連
  const { isPending, signIn, signOut: _signOut, executeUseFetchAuth } = await useFetchAuth({ immediate: false })
  const { isSignedIn } = useSession()

  // ローディング表示
  const { asyncWithLoading } = useLoading()

  // サインインエラー表示
  const signInError = ref<boolean>(false)

  // サインイン処理
  const _submitSignInFormSub = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
      signInError.value = true
    } else {
      await formEl.validate(async (valid) => {
        if (valid) { await signIn(signInFormModel.value.email, signInFormModel.value.password) }
        if (!isSignedIn.value) { signInError.value = true }
      })
    }
  }
  const submitSignInForm = asyncWithLoading(_submitSignInFormSub)

  // サインアウト処理
  const signOut = asyncWithLoading(_signOut)

  onBeforeMount(async () => {
    const execute = asyncWithLoading(executeUseFetchAuth)
    await execute()
  })
</script>

<template>
  <div class="page-wrapper">
    <CommonScreenInPending :is-pending="isPending">
      <section class="sign-in-section">
        <div class="sign-in-wrapper">
          <h1 class="sign-in-title">Sign In</h1>
          <div class="sign-in-message">
            <el-alert
              :title="'The email or password you entered is incorrect.\nPlease try again.'"
              type="error"
              :closable="false"
              show-icon
              v-if="signInError"
            />
            <el-alert
              :title="'You are already signed in.\nPlease continue using the current account or sign out.'"
              type="info"
              :closable="false"
              show-icon
              v-if="isSignedIn"
            />
          </div>
          <div class="sign-in-description" v-if="!isSignedIn">
            <p>Please enter your email and password.</p>
          </div>
          <el-form
            :model="signInFormModel"
            label-width="64px"
            class="sign-in-form"
            ref="signInFormRef"
            :rules="signInFormRules">
            <el-form-item label="email" prop="email" v-if="!isSignedIn">
              <el-input
                v-model="signInFormModel.email"
                type="email"
                maxlength="100"
                autocomplete="off" />
            </el-form-item>
            <el-form-item label="password" prop="password" v-if="!isSignedIn">
              <el-input
                v-model="signInFormModel.password"
                type="password"
                maxlength="100"
                autocomplete="off" />
            </el-form-item>
            <div class="sign-in-buttons-wrapper">
              <el-button
                type="primary"
                size="large"
                :tag="NuxtLink"
                to="/"
                v-if="isSignedIn">
                Continue
              </el-button>
              <el-button
                type="primary"
                size="large"
                @click="submitSignInForm(signInFormRef)"
                v-if="!isSignedIn">
                Sign In
              </el-button>
              <el-button
                type="default"
                size="large"
                :disabled="!isSignedIn"
                @click="signOut()">
                Sign Out
              </el-button>
            </div>
          </el-form>
        </div>
        <div class="sign-in-sub" v-if="!isSignedIn">
          <p>* To test limited features, use this account.</p>
          <p>sample@example.com / kunekune</p>
        </div>
      </section>
    </CommonScreenInPending>
  </div>
</template>

<style scoped>
.page-wrapper {
  width: 100%;
}
.sign-in-section {
  width: 480px;
  margin-inline: auto;
  margin-top: 160px;
}
.sign-in-wrapper {
  padding-inline: 40px;
  padding-block: 30px;
  border: 1px solid #cccccc;
}
.sign-in-title {
  text-align: center;
  margin-bottom: 20px;
}
.sign-in-message .el-alert {
  margin-block:16px;
  white-space: pre-wrap;
}
.sign-in-description {
  text-align: center;
  color: #333333;
  font-size: small;
  margin-bottom: 30px;
}
.sign-in-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.sign-in-form .el-form-item {
  width: 100%;
}
.sign-in-buttons-wrapper {
  margin: auto;
  margin-top: 12px;
  display: flex;
  gap: 20px;
  margin-bottom: 18px;
}
.sign-in-buttons-wrapper .el-button {
  width: 100px;
  text-decoration: none;
}
.sign-in-sub {
  margin: 8px;
  text-align: right;
  color: #cc3333;
  font-size: small;
}
</style>