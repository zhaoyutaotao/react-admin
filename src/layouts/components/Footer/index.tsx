import { observer } from 'mobx-react-lite'
import { useStores } from 'src/stores'

const LayoutFooter = observer(() => {
  const {
    appStore: { themeConfig }
  } = useStores()
  return (
    <>
      {themeConfig.footer && (
        <div className="flex items-center justify-center pt-5 pb-5">
          <a href="#" target="_blank" rel="noreferrer">
            2023 © zhaoyt
          </a>
        </div>
      )}
    </>
  )
})

export default LayoutFooter
