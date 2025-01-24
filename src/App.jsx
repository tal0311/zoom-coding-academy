
import './App.css'

import MeetingLobby from './pages/MeetingLobby'
import About from './pages/About'
import MeetingDetails from './pages/MeetingDetails'
import NotFoundPage from './pages/NotFoundPage'
import Whiteboard from './pages/Whiteboard'
import { NavLink, useLocation, matchPath } from 'react-router-dom'

import GIcon from './cmps/GIcon'





import { Route, Routes } from 'react-router'
import WbDetails from './pages/WbDetails'
import WbIndex from './pages/WbIndex'

function App() {
  console.log('App Rules Test');


  const routes = [
    {
      path: '/',
      name: 'Home'
    },

    {
      path: '/about',
      name: 'About'
    },
    {
      path: '/wb/dashboard',
      name: 'Whiteboard'
    }
  ]


  return (
    <section className="app-container">
      <header className="header bg-text bg-background-2 main-layout">
        <div className="grid items-center grid-flow-col h-full">

          <div className="logo">LOGO</div>
          <nav className=''>
            <ul className='grid grid-flow-col'>
              {routes.map((route, index) => (
                <li key={index}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="actions">


            <GIcon iconName='Home' />

            <span>help</span> | <span>calender</span> | <span>user-preview</span>
          </div>
        </div>
      </header>

      <main className="router main-layout">
        <Routes>
          <Route path="/" element={<RouteGuard><MeetingLobby /></RouteGuard>}>
            <Route path="meeting/:id" element={<RouteGuard><MeetingDetails /></RouteGuard>} />
          </Route>
          <Route path="/wb/dashboard/:folder?" element={<RouteGuard><WbIndex /></RouteGuard>}></Route>
          <Route path="/wb/:wbId" element={<RouteGuard><WbDetails /></RouteGuard>} />
          <Route path="/wb/:wbId" element={<RouteGuard><Whiteboard /></RouteGuard>} />
          <Route path="/about" element={<RouteGuard><About /></RouteGuard>} />
        </Routes>
      </main>
    </section>
  )
}


function RouteGuard({ children }) {
  const location = useLocation();
  console.log(location);
  const allowedRoutes = ['/', '/meeting/:id', '/about', '/wb/dashboard/:folder', 'wb/:wbId'];
  const isAllowed = allowedRoutes.some((route) => matchPath(route, location.pathname));
  // If the current route is not allowed, navigate to the default route
  if (!isAllowed) {
    return <NotFoundPage />;
  }
  return children;
}

export default App
