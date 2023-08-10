import React from 'react'
import appStore from './AppStore'
import userStore from './UserStore'

const stores = {
  appStore,
  userStore
}

const StoresContext = React.createContext(stores)
export const useStores = () => React.useContext(StoresContext)
