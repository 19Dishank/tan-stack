import { useState } from 'react'
import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Navbar from './UI/Navbar'
import Footer from './UI/Footer'
import Home from './components/Home'
import FetchOld from './components/FetchOld'
import FetchRQ from './components/FetchRQ'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import FetchIndv from './components/FetchIndv'
const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/trad',
          element: <FetchOld />
        },
        {
          path: '/rq',
          element: <FetchRQ />
        }, 
        {
          path: '/rq/:id',
          element: <FetchIndv />
        }
      ]
    }
  ])

  const queryClient = new QueryClient();


  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>

}
export default App;
