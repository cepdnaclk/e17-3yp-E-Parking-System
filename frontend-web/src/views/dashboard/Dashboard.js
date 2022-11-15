import React, { lazy, useEffect, useState } from 'react'

import { CButton, CButtonGroup, CCard, CCardHeader, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import axios from 'axios'

/*import avatar1 from './../../assets/images/avatars/1.jpg'
import avatar2 from './../../assets/images/avatars/2.jpg'
import avatar3 from './../../assets/images/avatars/3.jpg'
import avatar4 from './../../assets/images/avatars/4.jpg'
import avatar5 from './../../assets/images/avatars/5.jpg'
import avatar6 from './../../assets/images/avatars/6.jpg'*/

const WidgetsDropdown = lazy(() => import('../components/widgets/WidgetsDropdown.js'))
//const Widgets = lazy(() => import('../components/widgets/Widgets.js'))

const Dashboard = () => {
  //State variables to store data for the graphs
  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0])

  //useEffect update every 5 seconds
  useEffect(() => {
    updateGraph()
    const interval = setInterval(() => {
      updateGraph()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  //async function to fetch data and handle graph updates
  async function updateGraph() {
    let result = localStorage.getItem('authToken')

    const config = {
      headers: {
        authorization: `bearer ${result}`,
      },
    }

    const graphData = (await axios.get(`${window.BackendIP}/assignto/getweeklycount`, config))[
      'data'
    ]

    var points = []

    for (const point of graphData) {
      points.push(point.count)
    }
    //alert(points)
    setWeeklyData(points)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h4 id="Today" className="card-title mb-0">
            Today
          </h4>
        </CCardHeader>
        <CCardBody>
          <WidgetsDropdown />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Day', 'Week'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Week'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartBar
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              datasets: [
                {
                  label: 'Count',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: weeklyData,
                  fill: true,
                },
              ],
            }}
            options={{
              animation: {
                duration: 0,
              },
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
