import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsF,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions, cilMoney, cilUser } from '@coreui/icons'

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm={9} lg={6}>
        <CWidgetStatsF
          className="mb-4"
          color="primary"
          icon={<CIcon icon={cilUser} height={32} />}
          value="26K"
          title="Users"
        />
      </CCol>
      <CCol sm={9} lg={6}>
        <CWidgetStatsF
          className="mb-4"
          color="success"
          icon={<CIcon icon={cilMoney} height={32} />}
          value="5.5K"
          title="Income"
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
