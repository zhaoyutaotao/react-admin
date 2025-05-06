import { Button } from 'antd'
import { useNavigate } from 'react-router'

const FullScreen: React.FC = () => {
  const navigate = useNavigate()
  
  return <Button onClick={() => navigate(-1)}>返回</Button>
}

export default FullScreen
