import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <span className="ms-1">Copyright &copy; 2021 </span>
        <a
          href="https://cepdnaclk.github.io/e17-3yp-E-Parking-System/"
          target="_blank"
          rel="noopener noreferrer"
        >
          QuickPark
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
