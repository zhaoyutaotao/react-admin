import { useNavigate } from 'react-router'
import { Button } from 'antd'

const NoMenu: React.FC = () => {
  const navigate = useNavigate()

  return <Button onClick={() => navigate(-1)}>返回</Button>
}

export default NoMenu
