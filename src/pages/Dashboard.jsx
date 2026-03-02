import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Eye, Edit, FileText, Layers } from "lucide-react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import MaterialModal from "../components/MaterialModal"

const CATEGORY_COLORS = {
  "Darslik": "bg-blue-100 text-blue-700",
  "O'quv qo'llanma": "bg-green-100 text-green-700",
  "Monografiya": "bg-orange-100 text-orange-700",
  "Taqdimot": "bg-yellow-100 text-yellow-700",
  "Maqola": "bg-red-100 text-red-700",
  "Video": "bg-pink-100 text-pink-700",
  "Boshqa": "bg-slate-100 text-slate-700",
}
const FILTER_TABS = ["Barchasi", "Darslik", "O'quv qo'llanma", "Monografiya", "Maqola", "Taqdimot", "Video", "Boshqa"]
function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg border border-slate-100 animate-pulse overflow-hidden">
      <div className="w-full h-80 bg-slate-200"></div> 
      <div className="p-3 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div> 
        <div className="h-3 bg-slate-100 rounded w-5/6"></div>   
        <div className="h-3 bg-slate-100 rounded w-1/2"></div>   
        <div className="flex gap-2 mt-2">
          <div className="h-8 bg-slate-200 rounded flex-1"></div> 
          <div className="h-8 w-10 bg-slate-200 rounded"></div>   
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("Barchasi")
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError("")

    fetch("https://json-api.uz/api/project/chizmachilik/materials")
      .then((res) => res.json())
      .then((res) => {
        setMaterials(res.data || [])
      })
      .catch(() => {
        setError("Materiallarni olishda xatolik yuz berdi")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const filtered = materials.filter(
    (m) =>
      m.title?.toLowerCase().includes(search.toLowerCase()) &&
      (activeTab === "Barchasi" || (m.resourceType || "Boshqa") === activeTab)
  )

  const openAdd = () => {
    setEditItem(null)
    setShowModal(true)
  }

  const openEdit = (e, item) => {
    e.stopPropagation()
    setEditItem(item)
    setShowModal(true)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header search={search} setSearch={setSearch} />
        <main className="flex-1 overflow-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-800">Materiallar Ro'yxati</h1>
              <p className="text-sm text-slate-500 mt-0.5">Kerakli materialni tanlang va ko'ring</p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-green-500 text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-green-600 transition"
            >
              <Plus size={16} /> Yangi Material
            </button>
          </div>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">
               {error} —{" "}
              <button onClick={() => window.location.reload()} className="underline font-medium">
                Qayta urinish
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {loading
              ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/material/${item.id}`)}
                  className="bg-white rounded-lg border border-slate-100 hover:border-blue-200 hover:shadow transition-all cursor-pointer group"
                >
                  <div className="w-full h-80 overflow-hidden rounded-t-lg">
                    <img
                      src={item.cover || "https://json-api.uz/mnt/file-1747846982055.jpg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://json-api.uz/mnt/file-1747846982055.jpg"
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">{item.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[item.resourceType] || "bg-slate-100 text-slate-700"
                          }`}
                      >
                        {item.resourceType || "Boshqa"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-2">{item.summary || "Tavsif mavjud emas"}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/material/${item.id}`) }}
                        className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white text-xs font-medium py-1.5 rounded hover:bg-blue-700 transition"
                      >
                        <Eye size={12} /> Ko'rish
                      </button>
                      <button
                        onClick={(e) => openEdit(e, item)}
                        className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 transition"
                      >
                        <Edit size={14} className="text-slate-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>

      {showModal && (
        <MaterialModal onClose={() => setShowModal(false)} onSuccess={() => window.location.reload()} editItem={editItem} />
      )}
    </div>
  )
}