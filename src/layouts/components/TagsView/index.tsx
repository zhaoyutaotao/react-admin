import { useNavigate } from 'react-router'
import {
  RedoOutlined,
  CloseOutlined,
  BorderHorizontalOutlined,
  BorderLeftOutlined,
  BorderInnerOutlined,
  BorderRightOutlined
} from '@ant-design/icons'
import { Tabs, Dropdown } from 'antd'
import type { TabsProps, MenuProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStores } from 'src/stores'

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
    handleTabOperation(
      (tag: { key: string; closable: boolean }) => tag.key !== targetKey || !tag.closable
    )
  }
  // 页签操作的方法
  const handleTabOperation = (filterFunc: (tag: any, index: number) => void) => {
    const newTagsList = tagsList?.filter(filterFunc)
    const lastTagKey = newTagsList?.at(-1)?.key as string
    navigate(lastTagKey)
    setTagActiveKey(lastTagKey)
    setTagsList(newTagsList)
  }

  // 右键菜单项
  const itemsRender = (key: string): MenuProps['items'] => [
    {
      label: '刷新页面',
      key: '1',
      icon: <RedoOutlined />,
      onClick: () => navigate(0)
    },
    {
      label: '关闭',
      key: '2',
      icon: <CloseOutlined />,
      disabled: key === '/home',
      onClick: () =>
        handleTabOperation(
          (tag: { key: string; closable: boolean }) => tag.key !== key || !tag.closable
        )
    },
    {
      label: '关闭其他',
      key: '3',
      icon: <BorderHorizontalOutlined />,
      onClick: () =>
        handleTabOperation(
          (tag: { key: string; closable: boolean }) => tag.key === key || !tag.closable
        )
    },
    {
      label: '关闭左侧',
      key: '4',
      icon: <BorderRightOutlined />,
      onClick: () =>
        handleTabOperation(
          (tag: { closable: boolean }, index: number) =>
            index >= tagsList?.findIndex((t) => t.key === key) || !tag.closable
        )
    },
    {
      label: '关闭右侧',
      key: '5',
      icon: <BorderLeftOutlined />,
      onClick: () =>
        handleTabOperation(
          (tag: { closable: boolean }, index: number) =>
            index <= tagsList?.findIndex((t) => t.key === key) || !tag.closable
        )
    },
    {
      label: '全部关闭',
      key: '6',
      icon: <BorderInnerOutlined />,
      onClick: () => handleTabOperation((tag: { closable: boolean }) => !tag.closable) // 这会过滤掉所有标签
    }
  ]

  // 替换 TabBar，用于二次封装标签头,添加右键事件Dropdown
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => {
    return (
      <DefaultTabBar {...props}>
        {(node) => {
          return (
            <Dropdown menu={{ items: itemsRender(node.key as string) }} trigger={['contextMenu']}>
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
