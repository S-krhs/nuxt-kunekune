<script setup lang="ts">
  import { PictureFilled, Upload } from '@element-plus/icons-vue'

  const dropZoneRef = ref<HTMLElement>()
  const options = {
    dropZoneRef: dropZoneRef,
    multiple: false,
  }
  const { filesData, isOverDropZone } = useImagesDropZone(options)

  const { signOut } = await useFetchAuth({ immediate: false })

</script>

<template>
  <div>
    <el-button :icon="Upload" type="success">
      Upload files
    </el-button>
    <div class="drop-zone" ref="dropZoneRef">
      <el-icon :size="48">
        <picture-filled />
      </el-icon>
      {{ isOverDropZone }}
    </div>
    <div>{{ filesData }}</div>
    <div>
      <div v-for="file in filesData">
        <img :src="file.url" :alt="file.name" :id="file.name">
      </div>
    </div>
  </div>

</template>

<style scoped>
.drop-zone {
  height: 300px;
  width: 480px;
  background-color: #eeeeee;
}
</style>