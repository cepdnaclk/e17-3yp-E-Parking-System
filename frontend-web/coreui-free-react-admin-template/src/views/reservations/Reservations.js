import React, { lazy } from 'react'
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

const ReservationWidgets = lazy(() => import('../components/widgets/ReservationWidgets.js'))

const Reservations = () => {
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
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>R0345</CTableDataCell>
                <CTableDataCell>A004</CTableDataCell>
                <CTableDataCell>1.00pm</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>R0350</CTableDataCell>
                <CTableDataCell>B073</CTableDataCell>
                <CTableDataCell>6.00pm</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell>R0450</CTableDataCell>
                <CTableDataCell>B050</CTableDataCell>
                <CTableDataCell>5.00pm</CTableDataCell>
              </CTableRow>
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
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>R0345</CTableDataCell>
                <CTableDataCell>A004</CTableDataCell>
                <CTableDataCell>1.00pm</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>R0350</CTableDataCell>
                <CTableDataCell>B035</CTableDataCell>
                <CTableDataCell>3.00pm</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell>R0450</CTableDataCell>
                <CTableDataCell>B050</CTableDataCell>
                <CTableDataCell>5.00pm</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Reservations
