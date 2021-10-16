import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCarAlt } from '@coreui/icons'

const ParkingSpotWidgets = () => {
  const percent = (count, total) => (count * 100) / total
  const reserved = 15
  const inUse = 3
  const total = 30
  const [visible, setVisible] = useState(false)
  const [spotID, setSpotID] = useState('err')

  const myModal = () => {
    return (
      <CModal alignment="center" visible={visible}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>{spotID}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormLabel htmlFor="vehicleNumber">Vehicle Number</CFormLabel>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilCarAlt} />
            </CInputGroupText>
            <CFormInput type="vehicleNumber" placeholder="Unoccupied" disabled />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setVisible(false)}>
            Shut Down
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }

  /*
  Clicking on a parking spot should open up a modal to
  1. Assign/Un-assign manually
  2. View Details
  3. Close the spot
  */
  return (
    <CRow>
      {myModal()}
      <CCol sm={4} lg={4}>
        <CCard className="mb-4">
          <CCardHeader>Floor 1</CCardHeader>
          <CCardBody className="m-3 bg-secondary">
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('A001')
                    setVisible(!visible)
                  }}
                >
                  A001
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('A002')
                    setVisible(!visible)
                  }}
                >
                  A002
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('A003')
                    setVisible(!visible)
                  }}
                >
                  A003
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-success">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem', color: '#fff' }}
                  onClick={() => {
                    setSpotID('A004')
                    setVisible(!visible)
                  }}
                >
                  A004
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('A005')
                    setVisible(!visible)
                  }}
                >
                  A005
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="bg-light w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('A006')
                    setVisible(!visible)
                  }}
                >
                  A006
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('A007')
                    setVisible(!visible)
                  }}
                >
                  A007
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('A008')
                    setVisible(!visible)
                  }}
                >
                  A008
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('A009')
                    setVisible(!visible)
                  }}
                >
                  A009
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0"></CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('A010')
                    setVisible(!visible)
                  }}
                >
                  A010
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0"></CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={4} lg={4}>
        <CCard className="mb-4">
          <CCardHeader>Floor 2</CCardHeader>
          <CCardBody className="m-3 bg-secondary">
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('B001')
                    setVisible(!visible)
                  }}
                >
                  B001
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('B002')
                    setVisible(!visible)
                  }}
                >
                  B002
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('B003')
                    setVisible(!visible)
                  }}
                >
                  B003
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-success">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem', color: '#fff' }}
                  onClick={() => {
                    setSpotID('B004')
                    setVisible(!visible)
                  }}
                >
                  B004
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('B005')
                    setVisible(!visible)
                  }}
                >
                  B005
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('B006')
                    setVisible(!visible)
                  }}
                >
                  B006
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('B007')
                    setVisible(!visible)
                  }}
                >
                  B007
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('B008')
                    setVisible(!visible)
                  }}
                >
                  B008
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('B009')
                    setVisible(!visible)
                  }}
                >
                  B009
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0"></CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('B010')
                    setVisible(!visible)
                  }}
                >
                  B010
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0"></CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={4} lg={4}>
        <CCard className="mb-4">
          <CCardHeader>Floor 3</CCardHeader>
          <CCardBody className="m-3 bg-secondary">
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('C001')
                    setVisible(!visible)
                  }}
                >
                  C001
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('C002')
                    setVisible(!visible)
                  }}
                >
                  C002
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('C003')
                    setVisible(!visible)
                  }}
                >
                  C003
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-success">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem', color: '#fff' }}
                  onClick={() => {
                    setSpotID('C004')
                    setVisible(!visible)
                  }}
                >
                  C004
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('C005')
                    setVisible(!visible)
                  }}
                >
                  C005
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('C006')
                    setVisible(!visible)
                  }}
                >
                  C006
                </CButton>
              </CCol>
            </CRow>
            <CRow className="">
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('C007')
                    setVisible(!visible)
                  }}
                >
                  C007
                </CButton>
              </CCol>
              <CCol className="p-0"></CCol>
              <CCol className="p-0 bg-light">
                <CButton
                  variant="outline"
                  color="secondary"
                  shape="rounded-0"
                  className="w-100"
                  style={{ height: '3.2rem' }}
                  onClick={() => {
                    setSpotID('C008')
                    setVisible(!visible)
                  }}
                >
                  C008
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ParkingSpotWidgets
