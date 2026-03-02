import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useToastStore } from "../store/toastStore"

const BASE_URL = "https://json-api.uz/api/project/chizmachilik/materials"

// bu yerda API endpointi uchun BASE_URL konstantasi yaratiladi, bu URL ga POST yoki PUT so'rovlarini yuborish orqali yangi material qo'shish yoki mavjud materialni tahrirlash mumkin bo'ladi.

export default function MaterialModal({ onClose, onSuccess, editItem }) {
  const { addToast } = useToastStore()

  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [resourceType, setResourceType] = useState("")
  const [cover, setCover] = useState("")
  const [loading, setLoading] = useState(false)

  // bu yerda esa MaterialModal componenti yaratiladi, bu componentda materialni tahrirlash uchun modal oynani ko'rsatadi. onClose va onSuccess propslari bu modalni boshqarish uchun kerak bo'ladi, editItem propsi esa tahrirlanayotgan material ma'lumotlarini saqlaydi. useState hooklari yordamida form maydonlari va loading holati boshqariladi, useToastStore esa toast xabarlarini ko'rsatish uchun ishlatiladi.

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

  // bu yerda esa useEffect hooki ishlatiladi, bu hook editItem o'zgarganda ishga tushadi. Agar editItem mavjud bo'lsa, form maydonlari editItem ma'lumotlari bilan to'ldiriladi, agar editItem bo'lmasa, form maydonlari bo'shatiladi. Bu modal yangi material qo'shish yoki mavjud materialni tahrirlash uchun moslashuvchan bo'lishini ta'minlaydi.

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

    // bu yerda esa handleSubmit funksiyasi yaratiladi, bu funksiya form submit qilinganda ishga tushadi. Bu funksiya avval form maydonlarini tekshiradi, agar title yoki resourceType maydonlari bo'sh bo'lsa, xatolik toast xabari ko'rsatadi va funksiyani to'xtatadi. Agar tekshiruvdan o'tsa, loading holati true ga o'rnatiladi va payload obyekti yaratiladi, bu obyektda form maydonlarining qiymatlari saqlanadi.

    try {
      const url = editItem ? `${BASE_URL}/${editItem.id}` : BASE_URL
      const method = editItem ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      
      // bu yerda esa fetch funksiyasi yordamida serverga so'rov yuboriladi, agar editItem mavjud bo'lsa, URL ga materialning id si qo'shiladi va PUT so'rovi yuboriladi, agar editItem bo'lmasa, POST so'rovi yuboriladi. So'rovning body qismida payload obyekti JSON formatida yuboriladi.

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

  // bu yerda esa fetch so'rovining natijasi tekshiriladi, agar so'rov muvaffaqiyatli bo'lmasa, xatolik tashlanadi. Agar so'rov muvaffaqiyatli bo'lsa, muvaffaqiyat toast xabari ko'rsatiladi, onSuccess callbacki chaqiriladi (bu odatda material ro'yxatini yangilash uchun ishlatiladi) va onClose callbacki chaqiriladi (bu modalni yopish uchun ishlatiladi). Agar xatolik yuz bersa, xatolik toast xabari ko'rsatiladi. Oxirida loading holati false ga o'rnatiladi, bu form submit jarayonining tugaganini bildiradi.

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

          {/* bu yerda esa form maydonlari yaratiladi, bu maydonlar title, summary, resourceType va cover uchun bo'ladi. title va resourceType maydonlari majburiy hisoblanadi, shuning uchun required atributi qo'shiladi. Har bir maydon uchun label va input elementlari yaratiladi, input elementlarining qiymati state o'zgaruvchilariga bog'lanadi va onChange hodisasi yordamida state yangilanadi. */}

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

          {/* bu yerda esa resourceType maydoni uchun select elementi yaratiladi, bu select elementida bir nechta kategoriya variantlari mavjud bo'ladi. Foydalanuvchi bu select elementidan materialning kategoriyasini tanlashi mumkin bo'ladi. */}

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
           {/* bu yerda esa submit buttoni yaratiladi, bu button form submit qilinganda handleSubmit funksiyasini chaqiradi. Buttonning matni loading holatiga va editItem mavjudligiga qarab o'zgaradi, agar loading true bo'lsa, button ichida spinner ko'rsatiladi, agar editItem mavjud bo'lsa, button matni "Saqlash" bo'ladi, agar editItem bo'lmasa, button matni "Qo'shish" bo'ladi. Button loading holatida bo'lsa, disabled atributi qo'shiladi va buttonning opacity si kamaytiriladi. */}
        </form>
      </div>
    </div>
  )
}