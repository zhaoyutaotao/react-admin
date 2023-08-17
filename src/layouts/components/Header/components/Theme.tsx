import { useEffect, useState } from 'react'
import { SkinOutlined, CheckOutlined } from '@ant-design/icons'
import { ColorPicker, Divider, Drawer, Switch, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStores } from 'src/stores'
import { ThemeConfig } from 'src/stores/AppStore'

const themeData = [
  {
    label: '整体风格',
    children: [
      { label: '暗色模式', key: 'isDark', type: 'switch' },
      { label: '灰色模式', key: 'isGray', type: 'switch' },
      { label: '色弱模式', key: 'isWeak', type: 'switch' },
      { label: '主题色', key: 'colorPrimary', type: 'colorPicker' }
    ]
  },
  {
    label: '导航模式',
    type: 'nav',
    children: [
      {
        label: '侧边菜单',
        key: 'side',
        type: '',
        className:
          'w-11 h-9 mr-4 bg-gray-100 shadow-md rounded before:absolute before:top-0 before:left-0 before:bg-black before:w-3 before:h-full relative overflow-hidden after:h-2 after:w-full after:absolute after:top-0 after:left-0 after:bg-white before:z-10 cursor-pointer'
      },
      {
        label: '顶部菜单',
        key: 'top',
        type: '',
        className:
          'w-11 h-9 mr-4 bg-gray-100 shadow-md rounded relative overflow-hidden after:h-2 after:w-full after:absolute after:top-0 after:left-0 after:bg-black before:z-10 cursor-pointer'
      },
      {
        label: '混合菜单',
        key: 'mixed',
        type: '',
        className:
          'w-11 h-9 mr-4 bg-gray-100 shadow-md rounded before:absolute before:top-0 before:left-0 before:bg-white before:w-3 before:h-full relative overflow-hidden after:h-2 after:w-full after:absolute after:top-0 after:left-0 after:bg-black cursor-pointer'
      }
    ]
  },
  {
    label: '内容区域',
    children: [
      { label: '面包屑导航', key: 'breadcrumb', type: 'switch' },
      { label: '标签栏', key: 'tagsView', type: 'switch' },
      { label: '页脚', key: 'footer', type: 'switch' }
    ]
  }
]

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
        {themeData.map((item) => (
          <div key={item.label}>
            <Divider>{item.label}</Divider>
            {!item.type &&
              item.children.map((child) => (
                <div key={child.label} className="flex justify-between  pb-3 pt-3">
                  <span>{child.label}</span>
                  {child.type === 'switch' && (
                    <Switch
                      checked={themeConfig[child.key as keyof ThemeConfig] as boolean}
                      onChange={(checked) => setThemeConfig({ [child.key]: checked })}
                    />
                  )}
                  {child.type === 'colorPicker' && (
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
                      onChange={(color) => setThemeConfig({ [child.key]: color.toHexString() })}
                    />
                  )}
                </div>
              ))}
            {item.type === 'nav' && (
              <div className="flex">
                {item.children.map((child) => (
                  <div key={child.label}>
                    <Tooltip title={child.label}>
                      <div
                        onClick={() =>
                          setThemeConfig({ navMode: child.key as ThemeConfig['navMode'] })
                        }
                        className={child.className}
                      >
                        {themeConfig.navMode === child.key && (
                          <CheckOutlined className=" absolute right-2 bottom-1" />
                        )}
                      </div>
                    </Tooltip>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </Drawer>
    </div>
  )
})

export default Theme
