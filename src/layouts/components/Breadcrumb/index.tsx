import { useLocation, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStores } from 'src/stores'

const BreadcrumbNav = observer(() => {
  const { pathname } = useLocation()
  const {
    appStore: { themeConfig, breadcrumbNameMap }
  } = useStores()
  const pathSnippets = pathname.split('/').filter((i) => i)

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>
    }
  })

  return <>{themeConfig.breadcrumb && <Breadcrumb items={breadcrumbItems} />}</>
})

export default BreadcrumbNav
