import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Edit, FileText, User, Tag, Eye } from "lucide-react"
import Sidebar from "../components/Sidebar"
import MaterialModal from "../components/MaterialModal"

function SkeletonDetail() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-48 w-full bg-slate-200 rounded-xl"></div>
      <div className="h-5 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-100 rounded w-1/2"></div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-xl"></div>
        ))}
      </div>
      <div className="h-3 bg-slate-100 rounded w-full mt-2"></div>
      <div className="h-3 bg-slate-100 rounded w-full"></div>
    </div>
  )
}

export default function MaterialDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [material, setMaterial] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError("")

    fetch("https://json-api.uz/api/project/chizmachilik/materials")
      .then((res) => res.json())
      .then((res) => {
        const found = (res.data || []).find((m) => String(m.id) === String(id))
        if (!found) {
          setError("Material topilmadi")
        } else {
          setMaterial(found)
        }
      })
      .catch(() => {
        setError("Serverdan ma'lumot olishda xatolik")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-4 transition"
        >
          <ArrowLeft size={16} /> Orqaga
        </button>

        <div className="max-w-xl mx-auto">
          {loading ? (
            <SkeletonDetail />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
               {error}{" "}
              <button onClick={() => window.location.reload()} className="underline font-medium">
                Qayta urinish
              </button>
            </div>
          ) : material ? (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-48 w-full relative overflow-hidden rounded-t-xl bg-slate-100">
                {material.cover ? (
                  <img
                    src={material.cover}
                    alt={material.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText size={36} className="text-slate-300" />
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-slate-800 line-clamp-2">{material.title}</h1>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-1 border border-slate-200 text-slate-600 text-xs sm:text-sm font-medium px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition"
                  >
                    <Edit size={13} /> Tahrirlash
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {material.summary || "Tavsif mavjud emas"}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: User, label: "Muallif", value: material.authors?.join(", ") || "—", color: "text-blue-600 bg-blue-50" },
                    { icon: Tag, label: "Kategoriya", value: material.resourceType || "—", color: "text-green-600 bg-green-50" },
                    { icon: Eye, label: "Ko'rishlar", value: material.views || "0", color: "text-purple-600 bg-purple-50" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-2 sm:p-3">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${color} flex items-center justify-center mb-1`}>
                        <Icon size={13} />
                      </div>
                      <p className="text-[9px] sm:text-xs text-slate-500">{label}</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="border border-slate-100 rounded-xl divide-y divide-slate-100">
                  {Object.entries(material)
                    .filter(([k]) => !["id", "cover", "authors"].includes(k))
                    .map(([key, val]) => (
                      <div key={key} className="flex px-3 sm:px-4 py-2 gap-3">
                        <span className="text-[9px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider w-24 shrink-0">
                          {key}
                        </span>
                        <span className="text-[10px] sm:text-sm text-slate-700 break-words flex-1">{val ?? "—"}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {showModal && material && (
        <MaterialModal onClose={() => setShowModal(false)} onSuccess={() => window.location.reload()} editItem={material} />
      )}
    </div>
  )
}