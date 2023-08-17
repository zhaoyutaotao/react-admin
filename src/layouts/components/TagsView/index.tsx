import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStores } from 'src/stores'

const TagsView = observer(() => {
  const {
    appStore: { themeConfig }
  } = useStores()

  return (
    <>
      {themeConfig.tagsView && (
        <Tabs
          hideAdd
          defaultActiveKey="1"
          type="editable-card"
          items={new Array(30).fill(null).map((_, i) => {
            const id = String(i)
            return {
              label: `Tab-${id}`,
              key: id,
              disabled: i === 28
            }
          })}
        />
      )}
    </>
  )
})

export default TagsView
