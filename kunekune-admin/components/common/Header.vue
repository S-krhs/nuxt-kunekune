<script setup lang="ts">
  const { signOut } = await useFetchAuth({ immediate: false })
  const iconSrc = "https://pbs.twimg.com/profile_images/1844529189346832384/6qLCsPk8_400x400.jpg"
</script>
<template>
  <header>
    <div class="header-wrapper">
      <ul class="header-content">
        <li class="items-right">
          <el-dropdown trigger="click" placement="bottom-end">
            <span class="el-dropdown-link">
              <el-image
                class="icon-user"
                alt="icon-user"
                :src="iconSrc" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>

      
      <!-- <ElButton :icon="ElIconEditPen" type="success">
        button
      </ElButton> -->
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
  max-width: 1024px;
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
</style>