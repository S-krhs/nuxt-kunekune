<script setup lang="ts">
  import { Setting } from '@element-plus/icons-vue'

  const selectMenuItem = (index: string) => {
    navigateTo(index)
  }
</script>

<template>
  <menu>
    <el-menu
      class="sidemenu"
      @select="selectMenuItem">
      <el-menu-item index="/">
        <el-icon><setting /></el-icon>
        <span>トップページ</span>
      </el-menu-item>
      <el-menu-item index="/profile">
        <el-icon><setting /></el-icon>
        <span>プロフィール管理</span>
      </el-menu-item>
      <el-menu-item index="/diary">
        <el-icon><setting /></el-icon>
        <span>日記管理</span>
      </el-menu-item>
      <el-menu-item index="/blog">
        <el-icon><setting /></el-icon>
        <span>ブログ管理</span>
      </el-menu-item>
      <el-menu-item index="/works">
        <el-icon><setting /></el-icon>
        <span>イラスト管理</span>
      </el-menu-item>
    </el-menu>
  </menu>
</template>

<style scoped>
.sidemenu {
  --el-menu-bg-color: #333333;
  --el-menu-hover-bg-color: #666666;
  --el-menu-text-color: #ffffff;
  --el-menu-active-color: #00ccff;
  width: 100%;
  height: 100%;
  padding-block: 16px;
}
</style>