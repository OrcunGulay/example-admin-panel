/* eslint-disable */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
// import { logo } from 'src/assets/brand/logo'
import logo from '../assets/images/logo.png'

import MainStore from 'src/stores/MainStore'

const AppHeader = () => {
  const dispatch = useDispatch()
  const [isToken, setIsToken] = React.useState(false)
  const [token, setToken] = React.useState(false)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  // console.log('Tojkeb' + token)
  React.useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setToken(localStorage.getItem('token'))

      setIsToken(true)
    } else {
      setIsToken(false)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('token')
      window.location.href = '/login'
    } catch (error) {
      console.error('An error occurred during sign-out:', error)
    }
  }
  const handleChangePassword = async () => {
    try {
      window.location.href = '#/password'
    } catch (error) {
      console.error('An error occurred during sign-out:', error)
    }
  }
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          <img src={logo} alt="Logo" height={48} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#/users">Kullanıcılar</CNavLink>
          </CNavItem>
          {isToken == true ? (
            <>
              <CNavItem>
                <CNavLink style={{ cursor: 'pointer' }} onClick={() => handleChangePassword()}>
                  Şifre Değiştir
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink style={{ cursor: 'pointer' }} onClick={() => handleSignOut()}>
                  Çıkış Yap
                </CNavLink>
              </CNavItem>
            </>
          ) : (
            <CNavItem>
              <CNavLink style={{ cursor: 'pointer' }} href="#/login">
                Giriş Yap
              </CNavLink>
            </CNavItem>
          )}
        </CHeaderNav>
        {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav> */}
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
