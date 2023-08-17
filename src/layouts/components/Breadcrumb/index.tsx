import { useLocation, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStores } from 'src/stores'

const breadcrumbNameMap: Record<string, string> = {
  '/apps': 'Application List',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail'
}
const BreadcrumbNav = observer(() => {
  const { pathname } = useLocation()
  const {
    appStore: { themeConfig }
  } = useStores()
  const pathSnippets = pathname.split('/').filter((i) => i)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>
    }
  })
  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
      key: 'home'
    }
  ].concat(extraBreadcrumbItems)
  return <>{themeConfig.breadcrumb && <Breadcrumb items={breadcrumbItems} />}</>
})

export default BreadcrumbNav
