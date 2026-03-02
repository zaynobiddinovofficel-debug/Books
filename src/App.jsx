import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MaterialDetail from './pages/MaterialDetail'
import Toast from './components/Toast'

export default function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/materials" element={<Dashboard />} />
        <Route path="/material/:id" element={<MaterialDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
