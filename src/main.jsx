import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App3'
import store from '@/Components/Redux/Store'
import './index.css'
import { Provider } from 'react-redux'
import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter basename='/property'>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
