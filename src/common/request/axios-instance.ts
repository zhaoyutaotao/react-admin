import { message } from 'antd'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IResponse } from 'src/services/interfaces'

const config = {
  // baseURL: '/',
  timeout: 30000
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    this.service.interceptors.request.use(
      (config: any) => {
        config.headers = { ...config.headers }
        if (this.isExcludeAuthorization(config.url ?? '')) {
          // 部分api路径排除携带token
          // config?.headers && delete config?.headers?.Authorization
        } else if (!config.headers.Authorization) {
          // 鉴权 token
          config.headers.Authorization = `Bearer test`
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
      async (error: AxiosError<any, any>) => {
        const { response } = error
        // 权限不通过，跳转到登录页
        if (response?.status === 403) {
          this.redirectToLogin()
          return
        }

        if (response?.data?.code > 0) {
          return Promise.reject(response?.data?.message ?? `服务异常`)
        }

        return Promise.reject(error)
      }
    )
  }

  private isExcludeAuthorization(url: string) {
    // 退出登录 loginOut 需要携带token,不做排除，以和login 区分
    if (url.includes('loginOut')) {
      return false
    }
    const excludePaths = ['/login']
    return excludePaths.some((item) => url.includes(item))
  }

  private redirectToLogin() {
    window.location.href = '/login'
  }

  get<T>(url: string, params?: object, _object = {}): Promise<IResponse<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<IResponse<T>> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<IResponse<T>> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<IResponse<T>> {
    return this.service.delete(url, { params, ..._object })
  }

  /**
   * 通用 get 方法，返回内容不需要符合 IResponse 接口规则
   * @param url
   * @param params
   * @returns
   */
  generalGet<T>(url: string, params?: object, config?: object): Promise<T> {
    return this.service.get(url, { params, ...config })
  }

  /**
   * 通用 post 方法，返回内容不需要符合 IResponse 接口规则
   * @param url
   * @param params
   * @returns
   */
  generalPost<T>(url: string, params?: object, config?: object): Promise<IResponse<T>> {
    return this.service.post(url, params, config)
  }
}

export default new RequestHttp(config)
