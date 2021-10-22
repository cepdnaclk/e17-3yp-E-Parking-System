import React, { useState, useEffect } from 'react'
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
import axios from 'axios'
import About from './../../../assets/images/about.jpg'

// routes config
import routes from '../../../routes'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      history.push('/')
    }
  }, [history])

  async function loginData(e) {
    e.preventDefault()

    console.log(email, password)

    try {
      const { data } = await axios.post('http://44.199.161.77:5000/parkinglot/signin', {
        email,
        password,
      })

      localStorage.setItem('authToken', data.token)

      history.push('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="text-white bg-white py-0">
                <CCardImage src={About} />
              </CCard>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={loginData}>
                    <h1 className="text-medium-dark">QuickPark</h1>
                    <p className="text-medium-emphasis">Welcome!</p>
                    <p className="text-medium-emphasis">Sign in to your account to get started</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="E-mail"
                        autoComplete="email"
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton type="submit" color="success" className="w-100 mt-2 px-4 text-white">
                        Login
                      </CButton>
                    </div>
                    <div className="d-grid mt-5">
                      <p className="text-medium-emphasis">Don&apos;t have an account?</p>
                      <Link to="/register">
                        <CButton color="primary" className="w-100 px-4">
                          Register
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
