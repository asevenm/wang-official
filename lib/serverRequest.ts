import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建服务端专用的 axios 实例
const serverRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 服务端请求拦截器
serverRequest.interceptors.request.use(
  (config) => {
    // 服务端请求的特殊处理
    // 例如：添加服务端标识、处理认证等
    config.headers['X-Request-Source'] = 'server'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 服务端响应拦截器
serverRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    console.error('Server request error:', error)
    
    if (error.response) {
      const { status, data } = error.response
      console.error(`Server error ${status}:`, data)
    } else if (error.request) {
      console.error('Server network error')
    } else {
      console.error('Server request config error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

// 服务端通用请求方法
export const serverHttp = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return serverRequest.get(url, config)
  },
  
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return serverRequest.post(url, data, config)
  },
  
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return serverRequest.put(url, data, config)
  },
  
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return serverRequest.patch(url, data, config)
  },
  
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return serverRequest.delete(url, config)
  }
}

export default serverRequest
