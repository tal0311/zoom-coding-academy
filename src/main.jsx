import { createRoot } from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store'
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router
      // Enabled future flags to silence warnings, though I'm not entirely sure what they do
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </Router>
  </Provider>
)
