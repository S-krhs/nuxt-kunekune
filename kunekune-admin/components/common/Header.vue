<script setup lang="ts">
  import { Monitor } from '@element-plus/icons-vue'
  import githubMark from '@/assets/images/icons/github-mark.png'
  import supabaseLogoIcon from '@/assets/images/icons/supabase-logo-icon.png'
  import vercelIconDark from '@/assets/images/icons/vercel-icon-dark.png'
  import { urlKunekuneDriven, urlGitHubRepository, urlVercelProjects, urlSupabaseProjects, urlErrorPage } from '@/constants/paths'
  import { openNewTab } from '@/utils/routes/pages'

  const { signOut: _signOut } = await useFetchAuth({ immediate: false })
  const iconSrc = "https://pbs.twimg.com/profile_images/1844529189346832384/6qLCsPk8_400x400.jpg"
  
  // サインアウト処理
  const { asyncWithLoading } = useLoading()
  const signOut = asyncWithLoading(_signOut)


</script>
<template>
  <header>
    <div class="header-wrapper">
      <ul class="header-content">
        <li>
          <span class="header-title">KUNEKUNE ADMIN</span>
        </li>
        <li class="items-right">
          <el-dropdown
            size="large"
            trigger="click"
            placement="bottom-end">
            <span class="el-dropdown-link">
              <el-image
                class="icon-user"
                alt="icon-user"
                :src="iconSrc" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="openNewTab(urlKunekuneDriven)">
                  <el-icon><monitor /></el-icon>
                  <span>サイトを開く</span>
                </el-dropdown-item>
                <el-dropdown-item @click="openNewTab(urlGitHubRepository)" divided>
                  <el-icon>
                    <img :src="githubMark" alt="github-mark" />
                  </el-icon>
                  <span>GitHub</span>
                </el-dropdown-item>
                <el-dropdown-item @click="openNewTab(urlVercelProjects)">
                  <el-icon>
                    <img :src="vercelIconDark" alt="vercel-icon-dark" />
                  </el-icon>
                  <span>Vercel</span>
                </el-dropdown-item>
                <el-dropdown-item @click="openNewTab(urlSupabaseProjects)">
                  <el-icon>
                    <img :src="supabaseLogoIcon" alt="supabase-logo-icon" />
                  </el-icon>
                  <span>Supabase</span>
                </el-dropdown-item>
                <el-dropdown-item @click="signOut" divided>
                  <el-icon>
                    <CommonIconsLogout />
                  </el-icon>
                  <span>ログアウト</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </header>
</template>
<style scoped>
.header-wrapper {
  height: 100%;
  width: 100%;
  padding-block: 8px;
  padding-inline: 24px;
  border-bottom: 1px solid #cccccc;
}
.header-content {
  display: flex;
  max-width: 1440px;
  height: 100%;
  margin: auto;
  align-items: center;
}
.header-content li {
  max-height: 100%;
  display: flex;
  align-items: center;
}
.header-content li.items-right {
  margin-left: auto;
}
.header-title {
  font-family: cursive;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.1em;
}
.icon-user {
  width: 36px;
  height: 36px;
  border-radius: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown-menu {
  width: 200px;
}
.el-dropdown-menu__item i {
  margin-right: 8px;
}
.el-icon img, .el-icon svg {
  height: 1em;
  width: 1em;
}
</style>