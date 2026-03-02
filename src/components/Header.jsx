import { Search, Bell, LogOut } from "lucide-react"

export default function Header({ search, setSearch }) {
  return (
    <header className="bg-white border-b px-6 py-3 flex items-center gap-4">
      <div className="flex-1 flex items-center gap-2 bg-gray-100 border rounded-xl px-3 py-2 max-w-md">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Material nomini qidiring..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2">
        <Search size={15} />
        Qidirish
      </button>
      <div className="flex items-center gap-3 ml-auto">
        <button className="relative p-2 rounded-xl hover:bg-gray-100">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">Farg'ona</p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-sm text-green-600 border border-green-200 px-2 py-1 rounded-xl hover:bg-green-50">
          <LogOut size={15} />
          Kirish
        </button>
      </div>
    </header>
  )
}