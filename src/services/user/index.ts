import request from 'src/common/request'
import type { LoginRequest, UserInfoResponse } from './interfaces'

export const login = async (params: LoginRequest) => {
  return request.post<{ token: string }>('/api/auth/login', params)
}

export const logout = async () => {
  return request.get<string>('/api/auth/logout')
}

export const getUserInfo = async () => {
  return request.get<UserInfoResponse>('/api/system/user/userInfo')
}
