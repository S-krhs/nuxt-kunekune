import axios, { type AxiosInstance } from 'axios'

export const useAxiosClient = () => {
  const config = useRuntimeConfig()
  const cdnURL = config.app.cdnURL
  const axiosClient: AxiosInstance = axios.create({
    baseURL: cdnURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 10000,
  })

  return { axiosClient }
}


/**
 * @todo エラーハンドリング
 */
