import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const [isLogin, setIsLogin] = React.useState(false)
  React.useEffect(() => {
    if (localStorage.getItem('token') == null) {
      window.location.href = '#/login'
    } else {
      setIsLogin(true)
    }
  }, [])
  if (isLogin == false) return <>Giriş ekranına yönlendiriliyorsunuz</>
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
