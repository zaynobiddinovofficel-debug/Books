import { NavLink } from "react-router-dom"
import { Home, BookOpen, PlusCircle, Grid, User, Settings } from "lucide-react"

const links = [
  { to: "/", icon: Home, label: "Bosh sahifa" },
  { to: "/materials", icon: BookOpen, label: "Materiallar" },
  { to: "/add", icon: PlusCircle, label: "Yangi qo'shish" },
  { to: "/categories", icon: Grid, label: "Kategoriyalar" },
  { to: "/profile", icon: User, label: "Profil" },
  { to: "/settings", icon: Settings, label: "Sozlamalar" },
]

// bu yerda esa Sidebar componenti yaratiladi, bu componentda saytning yon paneli ko'rsatiladi. Bu panelda saytning logotipi va nomi, navigatsiya linklari va yordam uchun bog'lanish bo'limi mavjud bo'ladi. Navigatsiya linklari NavLink komponenti yordamida yaratiladi, bu komponent URL ga mos keladigan linkni faollashtiradi va unga maxsus sinf qo'shadi. Har bir link uchun ikonka va label mavjud bo'ladi. Yordam bo'limida foydalanuvchilarga yordam kerak bo'lsa, bog'lanish tugmasi taqdim etiladi.

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col">
      <div className="p-5 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">Chizmachilik</p>
            <p className="text-xs text-blue-500">Materiallar Platformasi</p>
          </div>
        </div>
      </div>

      {/* bu yerda esa saytning logotipi va nomi ko'rsatiladi, logotip uchun BookOpen ikonkasi ishlatiladi, sayt nomi va taglini esa matn elementlari yordamida ko'rsatiladi. Logotip va nom bir qatorga joylashtiriladi va ular orasida kichik bo'shliq mavjud bo'ladi. */}

      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

       {/* bu yerda esa navigatsiya linklari ko'rsatiladi, bu linklar links massividan olinadi va NavLink komponenti yordamida yaratiladi. Har bir link uchun ikonka va label mavjud bo'ladi, va agar link faol bo'lsa, unga maxsus sinf qo'shiladi. Linklar vertikal ravishda joylashtiriladi va ular orasida kichik bo'shliq mavjud bo'ladi. */}

      <div className="p-4">
        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <p className="text-sm font-semibold text-slate-700 mb-1">Yordam kerakmi?</p>
          <p className="text-xs text-slate-500 mb-3">Biz doim yordamga tayyormiz</p>
          <button className="w-full bg-blue-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-blue-700 transition">
            Bog'lanish
          </button>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 pb-4">© 2024 Chizmachilik Platformasi</p>
    </aside>
    // bu yerda esa yordam bo'limi va saytning pastki qismi ko'rsatiladi, yordam bo'limida foydalanuvchilarga yordam kerak bo'lsa, bog'lanish tugmasi taqdim etiladi. Saytning pastki qismida esa mualliflik huquqi ma'lumotlari ko'rsatiladi.
  )
}