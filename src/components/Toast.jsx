import { useToastStore } from "../store/toastStore"
import { X, CheckCircle, AlertCircle } from "lucide-react"

export default function Toast() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white min-w-[280px] max-w-sm transition-all duration-300 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span className="text-sm flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="hover:opacity-70 transition"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}