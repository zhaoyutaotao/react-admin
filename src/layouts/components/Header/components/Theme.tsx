import { useEffect, useState } from 'react'
import { SkinOutlined } from '@ant-design/icons'
import { Radio, ColorPicker, Divider, Drawer, Switch, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStores } from 'src/stores'

const Theme = observer(() => {
  const {
    appStore: { themeConfig, setThemeConfig }
  } = useStores()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    // 是否灰色模式
    const style = themeConfig.isGray ? 'filter: grayscale(1)' : ''
    document.body.setAttribute('style', style)
  }, [themeConfig.isGray])

  useEffect(() => {
    // 是否色弱模式
    const style = themeConfig.isWeak ? 'filter: invert(80%)' : ''
    document.body.setAttribute('style', style)
  }, [themeConfig.isWeak])

  return (
    <div className="cursor-pointer text-xl">
      <Tooltip title="布局主题设置">
        <SkinOutlined onClick={() => setOpen(true)} />
      </Tooltip>
      <Drawer
        title="布局主题设置"
        onClose={() => {
          setOpen(false)
        }}
        open={open}
        width={350}
      >
        <h3 className="mb-3 font-medium">整体风格</h3>
        <div className="flex justify-between  pb-3 pt-3">
          <span>暗色模式</span>
          <Switch
            checked={themeConfig.isDark}
            onChange={(checked) => setThemeConfig({ isDark: checked })}
          />
        </div>
        <div className="flex justify-between  pb-3 pt-3">
          <span>灰色模式</span>
          <Switch
            checked={themeConfig.isGray}
            onChange={(checked) => setThemeConfig({ isGray: checked })}
          />
        </div>
        <div className="flex justify-between  pb-3 pt-3">
          <span>色弱模式</span>
          <Switch
            checked={themeConfig.isWeak}
            onChange={(checked) => setThemeConfig({ isWeak: checked })}
          />
        </div>
        <div className="flex justify-between pb-3 pt-3">
          <span>主题色</span>
          <ColorPicker
            presets={[
              {
                label: '默认',
                colors: [
                  '#F5222D',
                  '#FA8C16',
                  '#FADB14',
                  '#8BBB11',
                  '#52C41A',
                  '#13A8A8',
                  '#1677FF',
                  '#2F54EB',
                  '#722ED1',
                  '#EB2F96'
                ]
              }
            ]}
            onChange={(color) => setThemeConfig({ colorPrimary: color.toHexString() })}
          />
        </div>
        <Divider />
        <h3 className="mb-3 font-medium">导航模式</h3>
        <Radio.Group
          onChange={(e) => setThemeConfig({ navMode: e.target.value })}
          value={themeConfig.navMode}
        >
          <Radio value="side">侧边菜单</Radio>
          <Radio value="top">顶部菜单</Radio>
          <Radio value="mixed">混合菜单</Radio>
        </Radio.Group>
        <Divider />
        <h3 className="mb-3 font-medium">内容区域</h3>
        <div className="flex justify-between pb-3 pt-3">
          <span>面包屑导航</span>
          <Switch
            checked={themeConfig.isGray}
            onChange={(checked) => setThemeConfig({ breadcrumb: checked })}
          />
        </div>
        <div className="flex justify-between pb-3 pt-3">
          <span>标签栏</span>
          <Switch
            checked={themeConfig.isGray}
            onChange={(checked) => setThemeConfig({ tabs: checked })}
          />
        </div>
        <div className="flex justify-between pb-3 pt-3">
          <span>页脚</span>
          <Switch
            checked={themeConfig.footer}
            onChange={(checked) => setThemeConfig({ footer: checked })}
          />
        </div>
      </Drawer>
    </div>
  )
})

export default Theme
