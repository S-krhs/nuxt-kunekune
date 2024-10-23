export type BaseApiResponse<T> = {
  data: T | null,
  error: string | Error | null,
  message: string | null,
}