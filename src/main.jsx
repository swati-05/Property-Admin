import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from '@/Components/Redux/Store'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/property">
        <App />
      </BrowserRouter>

    </Provider>
  </React.StrictMode>,
)
