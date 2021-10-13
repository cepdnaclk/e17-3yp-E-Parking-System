import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ParkingSpots = React.lazy(() => import('./views/parkingspots/ParkingSpots'))
const Reservations = React.lazy(() => import('./views/reservations/Reservations'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/parkingspots', name: 'Parking Spots', component: ParkingSpots },
  { path: '/reservations', name: 'Reservations', component: Reservations },
]

export default routes
