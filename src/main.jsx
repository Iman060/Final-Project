
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router'
import { route } from './router/route'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={route} />
    </Provider>
      
)
