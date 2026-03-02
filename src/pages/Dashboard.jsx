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
// bu yerda esa Dashboard componenti yaratiladi, bu componentda materiallar ro'yxati ko'rsatiladi va foydalanuvchi yangi material qo'shishi yoki mavjud materialni tahrirlashi mumkin. useState va useEffect hooklari ishlatiladi, useNavigate hooki ham ishlatiladi, bu sahifalar orasida navigatsiya qilish uchun kerak bo'ladi. CATEGORY_COLORS va FILTER_TABS kabi konstantalar ham yaratiladi, bu kategoriyalarni ranglash va filtrlash uchun ishlatiladi. SkeletonCard komponenti esa loading holatida korsatadi va skleton carni chiqaradi foydalanuvchiga ma'lumot kelyotganini bildirish uchun.

export default function Dashboard() {
  const navigate = useNavigate()
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("Barchasi")
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)

  // bu yerda esa bir nechta state o'zgaruvchilar yaratiladi: materials (materiallar ro'yxati), loading (ma'lumot olinayotganini bildiradi), error (xatolik xabarini saqlaydi), search (qidiruv matni), activeTab (faol kategoriya), showModal (modalni ko'rsatish yoki yashirish), editItem (tahrirlanayotgan material ma'lumotlarini saqlaydi).

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
  //  Serverdan ma'lumot olinadi JSON formatiga o'giradi va state ga saqlanadi. Agar xatolik yuz bersa, error state ga xabar saqlanadi. loading state esa ma'lumot olinayotganini bildiradi va oxirida false ga o'zgartiriladi.
  const filtered = materials.filter(
    (m) =>
      m.title?.toLowerCase().includes(search.toLowerCase()) &&
      (activeTab === "Barchasi" || (m.resourceType || "Boshqa") === activeTab)
  )
  // Materials ro'yxatini search va activeTab ga ko'ra filtrlash. title ni kichik harflarga o'girib, search bilan solishtiriladi. activeTab "Barchasi" bo'lsa barcha materiallar ko'rsatiladi, aks holda resourceType activeTab ga teng bo'lgan materiallar ko'rsatiladi.

  const openAdd = () => {
    setEditItem(null)
    setShowModal(true)
  }

// Yangi material qo'shish uchun modalni ochish funksiyasi. editItem ni null ga o'rnatadi, chunki yangi material qo'shilmoqda, va showModal ni true ga o'zgartiradi.

  const openEdit = (e, item) => {
    e.stopPropagation()
    setEditItem(item)
    setShowModal(true)
  }

// Materialni tahrirlash uchun modalni ochish funksiyasi. e.stopPropagation() chaqiriladi, chunki bu funksiya material kartasining onClick hodisasidan chaqiriladi va sahifani navigatsiya qilishni oldini olish kerak. editItem ni tahrirlanayotgan materialga o'rnatadi va showModal ni true ga o'zgartiradi.

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
           {/* Har bir kategoriya uchun button chiqaradi va tanlangan kategoriya o'zgaradi keyin sahifa qayta yuklanadi serverdan ma'lumot olinmasa error chiqadi */}
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
                  {/* Agar loading bo'lsa, skeleton card ko'rsatiladi, bo'lmasa materiallar ya'ni kitoblar keyin card ustiga bossa detail page ga otvoradi, agar rasm ishlamasa defoult rasm ishlatiladi*/}
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

                    {/* bunda Category_Colors kategoriyalarga rang beradi ya'ni resourceType "Darslik yo O'quv qo'llanma" shunaqalarga rang beradi */}

                    <p className="text-xs text-slate-500 line-clamp-2 mb-2">{item.summary || "Tavsif mavjud emas"}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/material/${item.id}`) }}
                        className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white text-xs font-medium py-1.5 rounded hover:bg-blue-700 transition"
                      >
                        <Eye size={12} /> Ko'rish
                      </button>
                      
                      {/* Bu yerda eventPropagation hodisa bo'lyapti ya'ni: reactda (aslida browserda) eventlar ichkaridan tashqariga tarqaladi. qanaqa disek masalan; Agar cardni ko'rish uchun detail page ga otkazish uchun card ham button ham bosilsa, avval button onClick ishlaydi,keyin event cardga ham o'tadi, cardda onClick ham ishledi, bu bubbling deyiladi. bu yerda nima muammo dsek: agar e.stopPropagation() bo'lmasa, eye button bosilganda button navigate ishledi,keyin card navigate ishledi, keyin natijada 2 marta navigate chaqiriladi, bu degani double animation,double state change yoki keraksiz render keltirib chiqaradi, a stopPropagation() esa bu eventni yuqoriga chiqishini to'xtadi.*/} 

                       <button
                        onClick={(e) => openEdit(e, item)}
                        className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 transition"
                      >
                        <Edit size={14} className="text-slate-500" />
                      </button>

                      {/* bu yerda esa edit button ishlatilyapti chunki card ma'lumotlarini o'zgartirish uchun modal ochiladi, onClick da openEdit funksiyasi chaqiriladi va item parametri sifatida tahrirlanayotgan material uzatiladi. */}

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
    // bu yerda esa modal componenti chaqiriladi, showModal true bo'lsa, MaterialModal componenti render qilinadi. onClose prop sifatida setShowModal ni false ga o'zgartiradigan funksiya uzatiladi, onSuccess prop sifatida esa sahifani qayta yuklaydigan funksiya uzatiladi, editItem esa tahrirlanayotgan material ma'lumotlarini uzatadi. Modal ochilganda, foydalanuvchi yangi material qo'shishi yoki mavjud materialni tahrirlashi mumkin va har ikkala holatda ham sahifani yangiledi, yangi ma'lumotlar bilan yangilangan ro'yxat ko'rsatiladi.
  )
}