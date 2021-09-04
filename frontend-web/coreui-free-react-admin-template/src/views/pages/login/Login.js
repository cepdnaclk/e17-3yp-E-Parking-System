import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardImage,
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
import About from './../../../assets/images/about.jpg'

const Login = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="text-white bg-white py-0" style={{ width: '10%' }}>
                <CCardImage src={About} />
              </CCard>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 className="text-medium-dark">QuickPark</h1>
                    <p className="text-medium-emphasis">Welcome!</p>
                    <p className="text-medium-emphasis">Sign in to your account to get started</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" className="px-4 text-white">
                        Login
                      </CButton>
                    </div>
                    <div className="d-grid">
                      <CButton color="link" className="mt-1 px-0">
                        Forgot password?
                      </CButton>
                    </div>
                    <div className="d-grid px-5">
                      <Link to="/register">
                        <CButton color="link" shape="rounded-pill" className="mt-2 px-5 block">
                          Create Account
                        </CButton>
                      </Link>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
