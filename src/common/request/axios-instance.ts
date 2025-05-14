import { message } from 'antd'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from 'src/common/utils/token-service'
import { IResponse } from 'src/services/interfaces'

const config = {
  baseURL: import.meta.env.VITE_API_ROOT,
  timeout: 30000
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    this.service.interceptors.request.use(
      (config: any) => {
        if (!this.isExcludeAuthorization(config.url)) {
          // 获取存储的 Token
          const token = getToken()
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        if (data.code > 0) {
          const messageText = data.message ?? `服务异常`
          message.error(messageText)
          return Promise.reject(messageText)
        }
        return data
      },
      (error: AxiosError<IResponse<any>>) => {
        const { response } = error
        if (response) {
          const status = response.status
          if (status === 401 || status === 403) {
            this.redirectToLogin()
          } else {
            const messageText = response.data?.message ?? '服务异常'
            message.error(messageText)
          }
        } else {
          message.error('网络异常，请检查您的网络连接')
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * 判断当前请求是否需要排除 Authorization Token
   * @param url - 请求的 URL
   * @returns 如果需要排除，则返回 true；否则返回 false
   */
  private isExcludeAuthorization(url: string): boolean {
    // 定义不需要附加 Token 的接口路径列表
    const excludedPaths = ['/auth/login', '/auth/register']

    // 检查当前请求的 URL 是否包含在排除列表中
    return excludedPaths.some((path) => url.includes(path))
  }

  private redirectToLogin() {
    window.location.href = '/login'
  }

  get<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.service.get(url, { params, ...config })
  }
  post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.service.post(url, data, config)
  }
  put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.service.put(url, data, config)
  }
  delete<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.service.delete(url, { params, ...config })
  }
}

export default new RequestHttp(config)
