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
  )
}