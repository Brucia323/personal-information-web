import { Layout } from 'antd'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Index from './pages/index/Index'
import Login from './pages/login/Login'
import fileService from './services/file'
import loginService from './services/login'
import userService from './services/user'
import { LoginFormType } from './types'

let user = window.sessionStorage.getItem('currentUser')
  ? JSON.parse(window.sessionStorage.getItem('currentUser')!).username
  : null

const App = () => {
  const navigate = useNavigate()

  const handleLogin = async (values: LoginFormType) => {
    try {
      const currentUser = await loginService.login({
        username: values.username,
        password: values.password,
      })
      if (values.rememberPassword) {
        window.localStorage.setItem('loggedAppUser', JSON.stringify(values))
      }
      window.sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
      user = currentUser.username
      userService.setToken(currentUser.token)
      fileService.setToken(currentUser.token)
      navigate('/', { replace: true })
      return true
    } catch (error) {
      return false
    }
  }

  const handleSignout = () => {
    user=null
    window.sessionStorage.clear()
    userService.setToken('')
    fileService.setToken('')
    navigate('/login', { replace: true })
  }

  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<Login login={handleLogin} />} />
        <Route
          path='*'
          element={
            user ? (
              <Index user={user} onSignout={handleSignout} />
            ) : (
              <Navigate to='/login' replace={true} />
            )
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
