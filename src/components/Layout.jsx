import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// The shared frame. <Outlet /> is where the matched child page appears.
function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout