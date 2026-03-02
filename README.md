# Chizmachilik Materiallar Platformasi

Vite + React + Tailwind CSS + Zustand asosida qurilgan material boshqaruv dashboardi.

## O'rnatish

```bash
npm install
npm run dev
```

## Struktura

```
src/
  components/
    Header.jsx        — Qidiruv va foydalanuvchi header
    Sidebar.jsx       — Chap navigatsiya sidebar
    MaterialModal.jsx — Add/Edit modal (form + validation)
    Toast.jsx         — Global toast bildirishnomalari
  pages/
    Dashboard.jsx     — Asosiy sahifa (cards grid, filter, statistika)
    MaterialDetail.jsx — Material detail sahifasi (/material/:id)
  store/
    toastStore.js     — Zustand toast state
  App.jsx             — Router sozlamalari
  main.jsx            — Entry point
  index.css           — Tailwind import
```

## Funksionallar

- ✅ API dan materiallar ro'yxatini olish (GET /materials)
- ✅ Yangi material qo'shish (POST /materials)
- ✅ Materialni tahrirlash (PUT /materials/:id)
- ✅ Skeleton loading (animate-pulse)
- ✅ Error handling + qayta urinish
- ✅ Frontend search filtri
- ✅ Kategoriya filtrlari (tabs)
- ✅ Form validation — bo'sh field bo'lsa API ga request ketmaydi
- ✅ Toast bildirishnomalari (Zustand) — 3 soniyada yopiladi
- ✅ Detail page (/material/:id) — useParams, navigate(-1)
- ✅ Modal loader — faqat bosilgan button ichida
- ✅ Action tugagandan keyin list qayta fetch qilinadi
- ✅ Responsive layout

## API

Base URL: `https://json-api.uz/api/project/chizmachilik`
