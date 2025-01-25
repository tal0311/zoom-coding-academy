import './App.css'

import MeetingLobby from './pages/MeetingLobby'
import About from './pages/About'
import MeetingDetails from './pages/MeetingDetails'
import NotFoundPage from './pages/NotFoundPage'
import Whiteboard from './pages/Whiteboard'
import { useLocation, matchPath} from 'react-router-dom'

import { Route, Routes } from 'react-router'
import { AppHeader } from './cmps/AppHeader'

function App() {
  console.log('App Rules Test');

  return (
    <section className="app-container">
      <AppHeader />

      <main className="router main-layout">
        <Routes>
          <Route path="/" element={<RouteGuard><MeetingLobby /></RouteGuard>}>
            <Route path="meeting/:id" element={<RouteGuard><MeetingDetails /></RouteGuard>} />
          </Route>
          <Route path="/whiteboard" element={<RouteGuard><Whiteboard /></RouteGuard>}></Route>
          <Route path="/about" element={<RouteGuard><About /></RouteGuard>} />
        </Routes>
      </main>
    </section>
  )
}


function RouteGuard({ children }) {
  const location = useLocation();
  console.log(location);
  const allowedRoutes = ['/', '/meeting/:id', '/about', '/whiteboard'];
  const isAllowed = allowedRoutes.some((route) => matchPath(route, location.pathname));
  // If the current route is not allowed, navigate to the default route
  if (!isAllowed) {
    return <NotFoundPage />;
  }
  return children;
}

export default App
