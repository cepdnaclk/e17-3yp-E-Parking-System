import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CButtonGroup,
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
import axios from 'axios'

const ParkingSpotWidgets = () => {
  const [visible, setVisible] = useState(false)
  const [spotID, setSpotID] = useState('A001')

  const [spotInfo, setSpotInfo] = useState([
    { spotno: 'A001', state: 'Not Occupied' },
    { spotno: 'A002', state: 'Not Occupied' },
    { spotno: 'A003', state: 'Not Occupied' },
    { spotno: 'A004', state: 'Not Occupied' },
    { spotno: 'A005', state: 'Not Occupied' },
    { spotno: 'A006', state: 'Not Occupied' },
    { spotno: 'A007', state: 'Not Occupied' },
    { spotno: 'A008', state: 'Not Occupied' },
    { spotno: 'A009', state: 'Not Occupied' },
    { spotno: 'A010', state: 'Not Occupied' },
  ])
  const [vehicleNumber, setVehicleNumber] = useState('Not Occupied')

  useEffect(() => {
    handleSpots()
    const interval = setInterval(() => {
      handleSpots()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    getSpotVehicle(spotID)
  }, [visible, spotID])

  function filterById(jsonObject, spotno) {
    return jsonObject.filter(function (jsonObject) {
      return jsonObject['spotno'] === spotno
    })[0]
  }

  function getSpotState(spot) {
    return filterById(spotInfo, spot)['state']
  }

  function getSpotVehicle(spot) {
    if (filterById(spotInfo, spot)['state'] === 'Occupied') {
      setVehicleNumber(filterById(spotInfo, spot)['vehiclenumber'])
    } else {
      setVehicleNumber('Not Occupied')
    }
  }

  async function handleSpots() {
    let result = localStorage.getItem('authToken')

    const config = {
      headers: {
        authorization: `bearer ${result}`,
      },
    }

    //alert(JSON.stringify(config))

    try {
      const { data } = await axios.get(`${window.BackendIP}/parkingspots/states`, config)
      setSpotInfo(data)
    } catch (error) {}
  }

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
            <CFormInput type="vehicleNumber" placeholder={vehicleNumber} disabled />
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
            <CRow>
              <CCol className="p-0">
                <CButtonGroup vertical className="w-100 bg-light">
                  {['A001', 'A002', 'A003', 'A004', 'A005', 'A006'].map((value) => (
                    <CButton
                      variant="outline"
                      key={value}
                      color="dark"
                      shape="rounded-0"
                      className={getSpotState(value) === 'Occupied' ? 'bg-success' : ''}
                      style={{ height: '3.2rem' }}
                      onClick={() => {
                        //vehicleData(value)
                        setSpotID(value)
                        setVisible(!visible)
                      }}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
              <CCol className="p-0" />
              <CCol className="p-0">
                <CButtonGroup vertical className="w-100 bg-light">
                  {['A007', 'A008', 'A009', 'A010'].map((value) => (
                    <CButton
                      variant="outline"
                      key={value}
                      color="dark"
                      shape="rounded-0"
                      className={getSpotState(value) === 'Occupied' ? 'bg-success' : ''}
                      style={{ height: '3.2rem' }}
                      onClick={() => {
                        //vehicleData(value)
                        setSpotID(value)
                        setVisible(!visible)
                      }}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={4} lg={4}>
        <CCard className="mb-4">
          <CCardHeader>Floor 2</CCardHeader>
          <CCardBody className="m-3 bg-secondary">
            <CRow>
              <CCol className="p-0">
                <CButtonGroup vertical className="w-100 bg-light">
                  {['B001', 'B002', 'B003', 'B004', 'B005', 'B006'].map((value) => (
                    <CButton
                      variant="outline"
                      key={value}
                      color="secondary"
                      shape="rounded-0"
                      className="w-100"
                      style={{ height: '3.2rem' }}
                      onClick={() => {
                        //vehicleData(value)
                        setSpotID(value)
                        setVisible(!visible)
                      }}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
              <CCol className="p-0" />
              <CCol className="p-0">
                <CButtonGroup vertical className="w-100 bg-light">
                  {['B007', 'B008', 'B009', 'B010'].map((value) => (
                    <CButton
                      variant="outline"
                      key={value}
                      color="secondary"
                      shape="rounded-0"
                      className="w-100"
                      style={{ height: '3.2rem' }}
                      onClick={() => {
                        //vehicleData(value)
                        setSpotID(value)
                        setVisible(!visible)
                      }}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={4} lg={4}>
        <CCard className="mb-4">
          <CCardHeader>Floor 3</CCardHeader>
          <CCardBody className="m-3 bg-secondary">
            <CRow>
              <CCol className="p-0">
                <CButtonGroup vertical className="w-100 bg-light">
                  {['C001', 'C002', 'C003', 'C004'].map((value) => (
                    <CButton
                      variant="outline"
                      key={value}
                      color="secondary"
                      shape="rounded-0"
                      className="w-100"
                      style={{ height: '3.2rem' }}
                      onClick={() => {
                        //vehicleData(value)
                        setSpotID(value)
                        setVisible(!visible)
                      }}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
              <CCol className="p-0" />
              <CCol className="p-0">
                <CButtonGroup vertical className="w-100 bg-light">
                  {['C005', 'C006', 'C007', 'C008'].map((value) => (
                    <CButton
                      variant="outline"
                      key={value}
                      color="secondary"
                      shape="rounded-0"
                      className="w-100"
                      style={{ height: '3.2rem' }}
                      onClick={() => {
                        //vehicleData(value)
                        setSpotID(value)
                        setVisible(!visible)
                      }}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ParkingSpotWidgets
