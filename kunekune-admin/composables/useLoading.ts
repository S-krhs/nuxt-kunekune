export const useLoading = () => {
  const isTransmitting = useState('isTransmitting', () => false)
  const setTransmitting = (isTransmitting: Ref<boolean>) => (value: boolean) => isTransmitting.value = value

  return {
    isTransmitting: readonly(isTransmitting),
    setTransmitting: setTransmitting(isTransmitting),
  }
}

