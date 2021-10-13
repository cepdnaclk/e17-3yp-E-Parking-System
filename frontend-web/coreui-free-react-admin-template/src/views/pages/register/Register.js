import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBuilding, cilLockLocked, cilMobile, cilUser } from '@coreui/icons'

import { logoBig } from 'src/assets/brand/logo-big'

const Register = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardHeader className="p-3">
                <CIcon className="sidebar-brand-full" icon={logoBig} height={50} />
              </CCardHeader>
              <CCardBody className="p-4">
                <CForm>
                  <h2>Register for QuickPark</h2>
                  <p className="text-medium-emphasis">
                    QuickPark requires hardware components at the car park premises to function
                    properly. Contact our support team at{' '}
                    <a href="mailto:support@quickpark.com">support@quickpark.com</a> to register for
                    our service.
                  </p>
                </CForm>
                <div className="d-grid mt-5">
                  <Link to="/login">
                    <CButton color="primary" className="w-100 px-4">
                      Go Back
                    </CButton>
                  </Link>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
