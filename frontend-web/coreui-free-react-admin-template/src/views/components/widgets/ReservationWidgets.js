import React from 'react'
import { CCard, CCardBody, CCol, CRow, CWidgetStatsB } from '@coreui/react'

const ReservationWidgets = () => {
  const percent = (count, total) => (count * 100) / total
  const reserved = 15
  const inUse = 3
  const total = 50

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
