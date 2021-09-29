import React, { lazy } from 'react'
import { CCard, CCardBody } from '@coreui/react'

const ParkingSpotWidgets = lazy(() => import('../components/widgets/ParkingSpotWidgets.js'))

const ParkingSpots = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <ParkingSpotWidgets />
        </CCardBody>
      </CCard>
    </>
  )
}

export default ParkingSpots
