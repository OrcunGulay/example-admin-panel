import React from 'react'
// import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { post } from 'src/networking/Server'

const Login = () => {
  const [phone, setPhone] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [isLogin, setIsLogin] = React.useState(true)
  const [admin, setAdmin] = React.useState()

  React.useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      if (admin?.degree == 1) {
        window.location.href = '/home'
      } else {
        window.location.href = `/dealerhome/${admin?.dealerId}`
      }
      // window.location.href = '/home'
      console.log(localStorage.getItem('user'))
    } else {
      setIsLogin(false)
    }
  }, [])
  console.log(localStorage.getItem('token'))
  const onLogin = (phone, password) => {
    try {
      post('admins-login', { phone, password }).then((res) => {
        if (res.result) {
          setIsLogin(true)
          setAdmin(res.admin)
          if (res.admin.degree == 1) {
            window.location.href = '/home'
          } else {
            window.location.href = `/dealerhome/${res?.admin?.dealerId}`
          }

          localStorage.setItem('token', res.token)
          localStorage.setItem('user', JSON.stringify(res.admin))
        } else {
          setMessage('Hatalı bir giriş yapıldı.')
        }
      })
    } catch (e) {
      setMessage('Hatalı bir giriş yapıldı.')
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {isLogin ? (
        <></>
      ) : (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Giriş Yap</h1>
                      <p className="text-medium-emphasis">Hesabına giriş yap.</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Telefon Numaranız"
                          autoComplete="phone"
                          onChange={(e) => {
                            setPhone(e.target.value)
                          }}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      {message ? <p style={{ color: 'red' }}>Hatalı bir giriş yapıldı.</p> : <></>}
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            style={{ marginTop: 10 }}
                            onClick={() => {
                              onLogin(phone, password)
                            }}
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </CButton>
                        </CCol>
                        {/*
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                      */}
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {/*
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
              */}
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  )
}

export default Login
