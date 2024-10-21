
import './App.css'
import ProtectedRoute from './router/ProtectedRoute'

function App() {


  return (
    <ProtectedRoute>
        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </ProtectedRoute>
  )
}

export default App
