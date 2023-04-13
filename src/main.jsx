import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import store from '@/Components/Redux/Store'
import './index.css'
import { Provider } from 'react-redux'
import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter basename='/property'>
        <Suspense fallback={<div className="font-bold text-lg italic h-screen w-screen flex items-center justify-center">Loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
)
