import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCol, CRow, CWidgetStatsB } from '@coreui/react'
import axios from 'axios'

const ReservationWidgets = () => {
  const [reserved, setReserved] = useState(0)
  const [inUse, setInUse] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    updateReservations()
    const interval = setInterval(() => {
      updateReservations()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  async function updateReservations() {
    const totalSpots = (await axios.get('http://localhost:5000/parkingspots/count'))['data']
    const reservationCount = (await axios.get('http://localhost:5000/reservation/getcountall'))[
      'data'
    ]
    const occupiedCount = (await axios.get('http://localhost:5000/reservation/getOccupiedcount'))[
      'data'
    ]

    setTotal(totalSpots)
    setReserved(reservationCount)
    setInUse(occupiedCount)
  }

  const percent = (count, total) => (count * 100) / total

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol xs={12} sm={9} lg={6}>
            <CWidgetStatsB
              className="mb-1"
              progress={{ color: 'success', value: percent(reserved, total) }}
              title="Spots Reserved"
              value={`${reserved}/${total}`}
            />
          </CCol>
          <CCol xs={12} sm={9} lg={6}>
            <CWidgetStatsB
              className="mb-1"
              progress={{ color: 'info', value: percent(inUse, reserved) }}
              title="Reserved Spots in Use"
              value={`${inUse}/${reserved}`}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default ReservationWidgets
