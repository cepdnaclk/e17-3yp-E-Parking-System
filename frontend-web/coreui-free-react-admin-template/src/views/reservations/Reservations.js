import React, { lazy, useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import axios from 'axios'

const ReservationWidgets = lazy(() => import('../components/widgets/ReservationWidgets.js'))

const Reservations = () => {
  const [active, setActive] = useState([
    {
      reservationID: 'R001',
      parkingspotID: 'A005',
      dateandtime: '5.00pm',
    },
    {
      reservationID: 'R002',
      parkingspotID: 'A010',
      dateandtime: '1.00pm',
    },
  ])
  const [completed, setCompleted] = useState([])

  useEffect(() => {
    updateInfo()
    const interval = setInterval(() => {
      updateInfo()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  async function updateInfo() {
    const activeData = (await axios.get('http://localhost:5000/reservation/getoccupied'))['data']
    const completedData = (await axios.get('http://localhost:5000/reservation/getcompleted'))[
      'data'
    ]

    setActive(activeData)
    setCompleted(completedData)
  }

  return (
    <>
      <ReservationWidgets />
      <CCard className="mb-4">
        <CCardHeader>Active Reservations</CCardHeader>
        <CCardBody>
          <CTable color="info" align="middle" hover>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col">Reservation ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Spot ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {active.map((data, idx) => (
                <CTableRow key={idx}>
                  <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                  <CTableDataCell>{data.reservationID}</CTableDataCell>
                  <CTableDataCell>{data.parkingspotID}</CTableDataCell>
                  <CTableDataCell>{data.dateandtime}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Completed Reservations</CCardHeader>
        <CCardBody>
          <CTable color="success" align="middle" hover>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col">Reservation ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Spot ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {completed.map((data, idx) => (
                <CTableRow key={idx}>
                  <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                  <CTableDataCell>{data.reservationID}</CTableDataCell>
                  <CTableDataCell>{data.parkingspotID}</CTableDataCell>
                  <CTableDataCell>{data.dateandtime}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Reservations
