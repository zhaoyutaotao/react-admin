import React, { Suspense } from 'react'
import { Spin } from 'antd'

/**
 * @description 路由懒加载
 * @param {Element} LazyComponent 需要加载的组件
 * @returns element
 */
const lazyLoad = (LazyComponent: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense
      fallback={
        // 定义在加载期间展示的备用内容，避免白屏
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        />
      }
    >
      <LazyComponent />
    </Suspense>
  )
}

export default lazyLoad
