import { Spin } from 'antd'
import classNames from 'classnames'
import { motion } from 'framer-motion'

interface PageTransitionProps {
  children: React.ReactNode
  /**
   * 动画时长，默认为350ms
   */
  transitionDuration?: number
  /**
   * 额外的动画容器的css类名
   */
  wrapperClassName?: string
  /**
   * 加载动画
   */
  loading?: boolean
}
/**
 * 页面切换动效容器组件
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  transitionDuration = 0.35,
  wrapperClassName = '',
  children,
  loading = false
}) => {
  return (
    <motion.div
      className={classNames('page-container', wrapperClassName)}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: transitionDuration }}
    >
      <Spin spinning={loading}>{children}</Spin>
    </motion.div>
  )
}
