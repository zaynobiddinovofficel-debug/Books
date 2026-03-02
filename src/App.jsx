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
    // bu yerda App componenti yaratiladi, bu componentda BrowserRouter, Routes va Route komponentlari yordamida saytning marshrutizatsiyasi tashkil etiladi. Bu marshrutizatsiya orqali foydalanuvchilar saytning turli sahifalariga o'tishlari mumkin bo'ladi. Har bir Route komponenti URL ga mos keladigan sahifani ko'rsatadi, masalan, "/" va "/materials" URL lari Dashboard sahifasini ko'rsatadi, "/material/:id" URL si esa MaterialDetail sahifasini ko'rsatadi. Agar foydalanuvchi mavjud bo'lmagan URL ga o'tishga harakat qilsa, "*" Route si orqali u avtomatik ravishda "/" URL ga yo'naltiriladi. Shuningdek, Toast komponenti ham App componentining ichida joylashgan bo'lib, bu komponent toast xabarlarini ko'rsatish uchun ishlatiladi.
  )
}
