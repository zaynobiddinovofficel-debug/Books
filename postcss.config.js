export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
// bu yerda esa postcss.config.js fayli yaratiladi, bu faylda Tailwind CSS va Autoprefixer plaginlari konfiguratsiya qilinadi. Tailwind CSS plaginini qo'shish orqali Tailwind CSS frameworkidan foydalanish mumkin bo'ladi, Autoprefixer plaginini qo'shish orqali esa CSS kodiga avtomatik ravishda vendor prefixlar qo'shiladi, bu esa brauzerlararo moslikni yaxshilaydi. Bu konfiguratsiya fayli PostCSS tomonidan ishlatiladi, bu esa CSS kodini optimallashtirish va transformatsiya qilish uchun kerak bo'ladi.