import { create } from 'zustand'

export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Date.now()
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 3000)
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },
}))

//  bu yerda esa toastStore yaratiladi, bu store yordamida toast xabarlarini boshqarish mumkin bo'ladi. toasts state o'zgaruvchisi toast xabarlarini saqlaydi, addToast funksiyasi yangi toast qo'shadi va avtomatik ravishda 3 soniya o'tgach uni o'chiradi, removeToast funksiyasi esa ma'lum bir id ga ega bo'lgan toastni o'chiradi.