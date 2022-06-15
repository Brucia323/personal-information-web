import { LockOutlined, UserOutlined } from '@ant-design/icons'
import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-form'
import '@ant-design/pro-form/dist/form.css'
import { Button, message } from 'antd'
import { FC, useEffect, useState } from 'react'
import { LoginFormType, LoginType } from '../../types'

const Login: FC<LoginType> = ({ login }) => {
  const [username, setUsername] = useState<string | null>()
  const [password, setPassword] = useState<string | null>()
  const [rememberPassword, setRememberPassword] = useState<boolean | null>()

  useEffect(() => {
    const user: LoginFormType = JSON.parse(
      window.localStorage.getItem('loggedAppUser')!
    )
    if (user) {
      setUsername(user.username)
      setPassword(user.password)
      setRememberPassword(user.rememberPassword)
    }
  }, [])

  const handleLogin = async (values: LoginFormType) => {
    const res: boolean =await login(values)
    if (res) {
      message.success('登录成功')
    } else {
      message.error('无效的用户名或密码')
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl='https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png'
        logo='https://github.githubassets.com/images/modules/logos_page/Octocat.png'
        title='Github'
        subTitle='https://github.com/ZZZCNY'
        onFinish={handleLogin}
      >
        <ProFormText
          name='username'
          initialValue={username}
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'用户名:'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name='password'
          initialValue={password}
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'密码:'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox
            noStyle
            name='rememberPassword'
            initialValue={rememberPassword}
          >
            记住密码
          </ProFormCheckbox>
        </div>
      </LoginFormPage>
    </div>
  )
}

export default Login
