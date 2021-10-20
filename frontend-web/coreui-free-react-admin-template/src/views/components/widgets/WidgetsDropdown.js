import React, { useState, useEffect } from 'react'
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
import axios from 'axios'

const WidgetsDropdown = () => {
  const [users, setUsers] = useState('0')
  const [income, setIncome] = useState('0.00 LKR')

  useEffect(() => {
    const interval = setInterval(() => {
      handleUsers()
      handleIncome()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  async function handleUsers() {
    //Token thing
    //const usercount = axios.get("http://localhost/assignto/getcountall", {})
    const usercount = '900'
    setUsers(usercount)
  }

  async function handleIncome() {
    //Token thing
    //const totalincome = axios.get("http://localhost/assignto/getcountall", {})
    const totalincome = '900 LKR'
    setIncome(totalincome)
  }

  return (
    <CRow>
      <CCol sm={9} lg={6}>
        <CWidgetStatsF
          className="mb-4"
          color="primary"
          icon={<CIcon icon={cilUser} height={32} />}
          value={users}
          title="Users"
        />
      </CCol>
      <CCol sm={9} lg={6}>
        <CWidgetStatsF
          className="mb-4"
          color="success"
          icon={<CIcon icon={cilMoney} height={32} />}
          value={income}
          title="Income"
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
