import React, { useState, useEffect } from 'react'
import { CRow, CCol, CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMoney, cilUser } from '@coreui/icons'
import axios from 'axios'

const WidgetsDropdown = () => {
  const [users, setUsers] = useState('0')
  const [income, setIncome] = useState('0 LKR')

  useEffect(() => {
    const interval = setInterval(() => {
      handleUsers()
      handleIncome()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  async function handleUsers() {
    let result = localStorage.getItem('authToken')

    const config = {
      headers: {
        authorization: `bearer ${result}`,
      },
    }

    const usercount = (await axios.get('http://localhost:5000/assignto/getcountall', config))[
      'data'
    ]
    setUsers(usercount)
  }

  async function handleIncome() {
    let result = localStorage.getItem('authToken')

    const config = {
      headers: {
        authorization: `bearer ${result}`,
      },
    }

    const totalincome = (await axios.get('http://localhost:5000/assignto/getdailycost', config))[
      'data'
    ]
    setIncome(totalincome + ' LKR')
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
