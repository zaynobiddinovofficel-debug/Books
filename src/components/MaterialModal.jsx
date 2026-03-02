import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useToastStore } from "../store/toastStore"

const BASE_URL = "https://json-api.uz/api/project/chizmachilik/materials"

export default function MaterialModal({ onClose, onSuccess, editItem }) {
  const { addToast } = useToastStore()

  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [resourceType, setResourceType] = useState("")
  const [cover, setCover] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || "")
      setSummary(editItem.summary || "")
      setResourceType(editItem.resourceType || "")
      setCover(editItem.cover || "")
    } else {
      setTitle("")
      setSummary("")
      setResourceType("")
      setCover("")
    }
  }, [editItem])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !resourceType.trim()) {
      addToast("Majburiy maydonlarni to‘ldiring", "error")
      return
    }

    setLoading(true)

    const payload = {
      title,
      summary,
      resourceType,
      cover,
    }

    try {
      const url = editItem ? `${BASE_URL}/${editItem.id}` : BASE_URL
      const method = editItem ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Server bilan muammo yuz berdi")

      addToast(
        editItem ? "Material muvaffaqiyatli yangilandi" : "Material muvaffaqiyatli qo‘shildi",
        "success"
      )

      onSuccess()   
      onClose()     
    } catch (err) {
      addToast(err.message || "Xatolik yuz berdi", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded hover:bg-slate-100 transition"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-bold mb-4">
          {editItem ? "Materialni tahrirlash" : "Yangi Material qo'shish"}
        </h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-slate-700">Sarlavha *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 mt-1 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Tavsif</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 mt-1 text-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Kategoriya *</label>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 mt-1 text-sm"
              required
            >
              <option value="">Tanlang</option>
              <option value="Darslik">Darslik</option>
              <option value="O'quv qo'llanma">O'quv qo'llanma</option>
              <option value="Monografiya">Monografiya</option>
              <option value="Taqdimot">Taqdimot</option>
              <option value="Maqola">Maqola</option>
              <option value="Video">Video</option>
              <option value="Boshqa">Boshqa</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Rasm URL</label>
            <input
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 mt-1 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-60 flex items-center justify-center"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : editItem ? (
              "Saqlash"
            ) : (
              "Qo'shish"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}