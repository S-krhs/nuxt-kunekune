import { useDropZone, type MaybeRefOrGetter } from '@vueuse/core'
export type ImageFileData = {
  url: string
  name: string
  size: number
  type: string
  lastModified: number
}

type UseImagesDropZoneOptions = {
  dropZoneRef: Ref<HTMLElement | null | undefined>
  multiple: boolean
}

export const useImagesDropZone = (opts: UseImagesDropZoneOptions) => {

  const filesData = ref<ImageFileData[]>([])

  const clearFilesData = () => filesData.value = []
  const onDrop = (files: File[] | null) => {
    if (files) {
      filesData.value = [
        ...filesData.value,
        ...files.map(file => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      }))
    ]
    }
  }
  const { isOverDropZone } = useDropZone(opts.dropZoneRef, {
    onDrop,
    dataTypes: ['image/jpeg','image/jpg', 'image/png', 'image/gif'],
    multiple: opts.multiple ?? true,
    preventDefaultForUnhandled: false,
  })

  return {
    filesData,
    clearFilesData,
    isOverDropZone: readonly(isOverDropZone),
  }
}