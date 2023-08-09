import screenfull from 'screenfull'
import { message, Tooltip } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

const Fullscreen = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen)

  useEffect(() => {
    // 监听change事件
    screenfull.on('change', () => {
      setFullScreen(screenfull.isFullscreen)
      return () => screenfull.off('change', () => {})
    })
  }, [])

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning('当前您的浏览器不支持全屏!')
    screenfull.toggle()
  }
  return (
    <div onClick={handleFullScreen} className="text-xl cursor-pointer">
      <Tooltip title="全屏">
        {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </Tooltip>
    </div>
  )
}
export default Fullscreen
