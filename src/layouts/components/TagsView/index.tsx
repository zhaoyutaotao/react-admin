import { useNavigate } from 'react-router-dom'
import { Tabs } from 'antd'
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
    const newTagsList = tagsList?.filter((item) => item.key !== targetKey)
    const lastTagKey = newTagsList?.at(-1)?.key as string
    navigate(lastTagKey)
    setTagActiveKey(lastTagKey)
    setTagsList(newTagsList)
  }

  return (
    <>
      {themeConfig.tagsView && (
        <Tabs
          hideAdd
          activeKey={tagActiveKey}
          type="editable-card"
          items={tagsList}
          onChange={onChange}
          onEdit={onEdit}
        />
      )}
    </>
  )
})

export default TagsView
