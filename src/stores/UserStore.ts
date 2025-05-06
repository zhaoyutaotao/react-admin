import { makeAutoObservable, runInAction } from 'mobx'
// import Cookies from 'js-cookie'
import { getUserInfo } from 'src/services/user'
import type { UserInfoResponse } from 'src/services/user/interfaces'

class UserStore {
  /**
   * 用户信息
   */
  userInfo: UserInfoResponse = {}
  constructor() {
    makeAutoObservable(this)
  }
  /**
   * 缓存用户token
   * @param token
   * @param expireDay
   */
  setPersistToken = (token: string, expires: number) => {
    console.log(token, expires)
    // Cookies.set('ticket', ticket ?? '', { expires: expireDay })
  }
  getUserInfo = async () => {
    try {
      const res = await getUserInfo()
      const { data } = res
      console.log(data)
      runInAction(() => {
        this.userInfo = res?.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

const userStore = new UserStore()

export default userStore
