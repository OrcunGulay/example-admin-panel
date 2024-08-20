/* eslint-disable */
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

const Password = () => {
  const [repeatPasword, setRepeatPassword] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  const adm = localStorage.getItem('user')
  const admin = JSON.parse(adm)
  const onChange = (password, repeatPasword) => {
    try {
      if (password === repeatPasword) {
        post('/api/admins/pass-change', { id: admin?.id, password }).then((res) => {
          if (res.result) {
            setMessage('Şifreniz başarıyla değiştirildi.')
            window.location.href="#/dashboard"
          }
        })
      } else {
        setMessage('Şifre ve tekrarı aynı olmalıdır.')
      }
    } catch (e) {
      setMessage('Hatalı bir giriş yapıldı.')
    }
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Şifre Değiştir</h1>
                  <p className="text-medium-emphasis">Hesabının şifresini değiştir.</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Yeni Şifre"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(e) => {
                        setRepeatPassword(e.target.value)
                      }}
                      type="password"
                      placeholder="Yeni Şifre Tekrar"
                      autoComplete="current-password"
                    />
                  </CInputGroup>
                  {message ? <p style={{ color: 'red' }}>{message}</p> : <></>}
                  <CRow>
                    <CCol xs={6}>
                      <CButton
                        style={{ marginTop: 10 }}
                        onClick={() => {
                          onChange(password, repeatPasword)
                        }}
                        color="primary"
                        className="px-4"
                      >
                        Değiştir
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
  )
}

export default Password
