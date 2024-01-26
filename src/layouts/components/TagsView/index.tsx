import { useNavigate } from 'react-router-dom'
import { Tabs, Dropdown } from 'antd'
import type { TabsProps, MenuProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStores } from 'src/stores'

// 右键菜单项
const items: MenuProps['items'] = [
  {
    label: '刷新页面',
    key: '1'
  },
  {
    label: '关闭',
    key: '2'
  },
  {
    label: '关闭其他',
    key: '3'
  },
  {
    label: '关闭右侧',
    key: '4'
  },
  {
    label: '全部关闭',
    key: '5'
  }
]

const TagsView = observer(() => {
  const {
    appStore: { themeConfig, tagActiveKey, tagsList, setTagsList, setTagActiveKey }
  } = useStores()
  const navigate = useNavigate()

  // 切换面板的回调
  const onChange = (newActiveKey: string) => {
    setTagActiveKey(newActiveKey)
    navigate(newActiveKey)
  }
  // 删除页签的回调
  const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string) => {
    const newTagsList = tagsList?.filter((item) => item.key !== targetKey)
    const lastTagKey = newTagsList?.at(-1)?.key as string
    navigate(lastTagKey)
    setTagActiveKey(lastTagKey)
    setTagsList(newTagsList)
  }

  // 右键点击tab菜单项
  const onMenuClick: MenuProps['onClick'] = (e) => {
    console.log(e,'eeeeeeeeee');
    const {key} =e
    switch (key) {
      case '1':
        // 刷新页面
        navigate(0)
        break
      case '2':
        // 关闭当前页
        onEdit(key)
        break
      case '3':
        // 关闭其他
        onEdit(key)
        break
      case '4':
        // 关闭右侧
        onEdit(key)
        break
      case '5':
        // 全部关闭
        onEdit(key)
        break
      default:
        break
    }
  }

  // 替换 TabBar，用于二次封装标签头,添加右键事件Dropdown
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => {
    console.log(props.editable.removeIcon,'propsprops');
    
   return (
      <DefaultTabBar {...props}>
        {(node) => {
          console.log(node,'node-----');
          
          return (
            <Dropdown menu={{ items, onClick: onMenuClick }} trigger={['contextMenu']}>
              {node}
            </Dropdown>
          )
        }}
      </DefaultTabBar>
    )
  }

  return (
    <>
      {themeConfig.tagsView && (
        <Tabs
          hideAdd
          activeKey={tagActiveKey}
          type="editable-card"
          items={tagsList}
          renderTabBar={renderTabBar}
          onChange={onChange}
          onEdit={onEdit}
        />
      )}
    </>
  )
})

export default TagsView
