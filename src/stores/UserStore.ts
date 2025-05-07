import { makeAutoObservable, runInAction } from 'mobx'
import { getUserInfo } from 'src/services/user'
import type { UserInfoResponse } from 'src/services/user/interfaces'

class UserStore {
  /**
   * 用户信息
   */
  userInfo: UserInfoResponse = {}
  constructor() {
    makeAutoObservable(this)
    if (!location.pathname.includes('login')) {
      this.getUserInfo()
    }
  }
  /**
   * 获取用户信息
   */
  getUserInfo = async () => {
    try {
      const res = await getUserInfo()
      const { data } = res
      runInAction(() => {
        this.userInfo = data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

const userStore = new UserStore()

export default userStore
