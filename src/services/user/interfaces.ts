export interface LoginRequest {
  username: string
  password: string
}
export interface UserInfoResponse {
  token?: string
  userId?: string
  userName?: string
}
