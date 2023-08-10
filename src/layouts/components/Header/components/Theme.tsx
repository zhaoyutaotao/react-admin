import { Drawer, Divider, Switch, Tooltip } from 'antd'
import { useState, useEffect } from 'react'
import { SkinOutlined } from '@ant-design/icons'
import { useStores } from 'src/stores'
import { observer } from 'mobx-react-lite'

const Theme = observer(() => {
  const {
    appStore: { themeConfig,setThemeConfig }
  } = useStores()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(()=>{
    // 是否灰色模式
    const style = themeConfig.isGray ? "filter: grayscale(1)": ''
    document.body.setAttribute("style", style)
  },[themeConfig.isGray])
console.log(themeConfig.isGray,'themeConfig.isGray');

  return (
    <div className="text-xl cursor-pointer">
      <Tooltip title="布局主题设置">
        <SkinOutlined onClick={() => setOpen(true)} />
      </Tooltip>
      <Drawer
        title="布局主题设置"
        onClose={() => {
          setOpen(false)
        }}
        open={open}
        width={300}
      >
        <h3 className="font-medium">整体风格设置</h3>
        <div>
          <div onClick={() => setThemeConfig({ isDark: false })}>亮色风格</div>
          <div onClick={() => setThemeConfig({ isDark: true })}>暗色风格</div>
          {/* 灰色模式 */}
          灰色模式<Switch checked={themeConfig.isGray} onChange={(checked)=>setThemeConfig({ isGray: checked })} />
        </div>
        <h3 className="font-medium">主题色</h3>
        <Divider />
        <h3 className="font-medium">导航模式</h3>
        <Divider />
        <h3 className="font-medium">内容区域</h3>
        面包屑导航
        标签栏
        顶栏
        页脚
        <Divider />
        <h3 className="font-medium">其他设置</h3>
      </Drawer>
    </div>
  )
})

export default Theme
