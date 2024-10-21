
import { Outlet } from 'react-router-dom'
import './App.css'
import Sidebar from './components/layouts/Sidebar'
import ProtectedRoute from './router/ProtectedRoute'


function App() {


  return (
    <ProtectedRoute>
   <div>
    <Sidebar/>
    
    <div className='mx-[16%]'>
    <Outlet/>
    </div>
    
   </div>
     </ProtectedRoute>
  )
}

export default App
