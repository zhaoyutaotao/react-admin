import { useNavigate } from 'react-router'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Checkbox, Form, Input, Flex } from 'antd'
import { login } from 'src/services/user'
import type { LoginRequest } from 'src/services/user/interfaces'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const { run, loading } = useRequest(login, {
    manual: true,
    onSuccess: () => {
      navigate('/home')
    }
  })

  const handleSubmit = (values: LoginRequest) => {
    run(values)
  }

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={handleSubmit}
    >
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
        <Input prefix={<UserOutlined />} placeholder="请输入用户名" autoComplete="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="请输入密码"
          autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <a href="">忘记密码</a>
        </Flex>
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
