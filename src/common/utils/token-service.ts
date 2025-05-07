import Cookies from 'js-cookie'

const TOKEN_KEY = 'auth_token'
/**
 * 设置 Token
 * @param {string} token - 要存储的 Token 值
 * @param {number|Date} [expires] - 过期时间（天数或具体日期）
 */
export const setToken = (token: string, expires: number | Date = 7) => {
  Cookies.set(TOKEN_KEY, token, {
    expires,
    path: '/',
    secure: true,
    sameSite: 'Strict'
  })
}

/**
 * 获取 Token
 * @returns {string|undefined} - 返回存储的 Token 值
 */
export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY)
}

/**
 * 移除 Token
 */
export const removeToken = () => {
  Cookies.remove(TOKEN_KEY, { path: '/' })
}
