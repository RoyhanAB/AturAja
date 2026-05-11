# 🚀 Quick Start Guide - AyoAtur

Panduan cepat untuk mulai menggunakan AyoAtur dalam 5 menit!

## 📋 Daftar Isi
1. [Setup Awal](#setup-awal)
2. [First Login](#first-login)
3. [Membuat Task Pertama](#membuat-task-pertama)
4. [Menggunakan Kanban Board](#menggunakan-kanban-board)
5. [Tips Produktivitas](#tips-produktivitas)

---

## 🔧 Setup Awal

### Prerequisites
- Node.js v18 atau lebih baru
- Akun Supabase (gratis)

### Installation (5 menit)

1. **Clone Repository**
```bash
git clone https://github.com/RoyhanAB/AyoAtur.git
cd AyoAtur
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Supabase**
   - Buka [supabase.com](https://supabase.com)
   - Create new project
   - Copy URL dan Anon Key

4. **Configure Environment**
   
   Buat file `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

5. **Setup Database**
   - Buka Supabase SQL Editor
   - Copy-paste isi file `setup.sql`
   - Run query

6. **Start App**
```bash
npm run dev
```

7. **Open Browser**
   - Buka http://localhost:5173
   - 🎉 Done!

---

## 👤 First Login

### Register Account

1. Klik **"Daftar"** di halaman login
2. Masukkan email & password
3. Check email untuk verifikasi (jika auto-confirm off)
4. Login dengan credentials

### First Time Setup

Setelah login, Anda akan melihat:
- ✅ Sidebar dengan menu navigasi
- ✅ Dashboard kosong (belum ada tasks)
- ✅ Topbar dengan search dan profile

---

## ✍️ Membuat Task Pertama

### Method 1: Tombol UI
1. Klik **"+ Tugas Baru"** di topbar
2. Isi form:
   - **Judul**: "Setup project environment"
   - **Deskripsi**: "Install dependencies dan configure"
   - **Prioritas**: Tinggi
   - **Label**: "Setup, DevOps"
   - **Batas Waktu**: Pilih tanggal dari calendar
3. Klik **"Simpan Tugas"**

### Method 2: Keyboard Shortcut ⚡
1. Tekan `Ctrl + K` (Windows) atau `Cmd + K` (Mac)
2. Isi form
3. Tekan `Enter` atau klik Simpan

### Hasil
- Task muncul di kolom **"Akan Dikerjakan"**
- Toast notification: "Tugas berhasil ditambahkan"
- Task counter di sidebar bertambah

---

## 📊 Menggunakan Kanban Board

### Navigasi ke Board
- Klik **"Papan Kanban"** di sidebar
- Atau tekan angka `2`

### Kolom-Kolom

1. **Backlog** (Abu-abu)
   - Tugas yang belum diprioritaskan
   - Ide atau future tasks

2. **Akan Dikerjakan** (Biru)
   - Tugas yang siap dikerjakan
   - Next in queue

3. **Sedang Berjalan** (Kuning)
   - Tugas yang sedang dikerjakan
   - Work in progress

4. **Selesai** (Hijau)
   - Tugas yang sudah selesai
   - Completed tasks

### Drag & Drop

**Memindahkan Task:**
1. Klik dan tahan task card
2. Drag ke kolom tujuan
3. Lepas mouse
4. ✅ Posisi otomatis tersimpan

**Tips:**
- Drag smooth dengan animasi
- Visual feedback saat dragging
- Auto-save ke database

### Edit Task

1. Klik icon **pensil** di task card
2. Update informasi
3. Klik **"Simpan Perubahan"**

### Delete Task

1. Klik icon **tempat sampah** di task card
2. Task langsung terhapus
3. Toast confirmation muncul

---

## 🎯 Tips Produktivitas

### 1. Gunakan Keyboard Shortcuts

**Paling Sering Dipakai:**
- `Ctrl/Cmd + K` → Buat task baru
- `Ctrl/Cmd + F` → Cari task
- `1-4` → Switch antar tab
- `Ctrl/Cmd + /` → Lihat semua shortcuts

### 2. Set Due Dates

**Kenapa Penting:**
- Track deadline
- Visual reminder (red = overdue)
- Sort by due date
- Dashboard alert

**Best Practice:**
- Set due date untuk semua tasks
- Review overdue tasks setiap pagi
- Prioritize tasks mendekati deadline

### 3. Gunakan Tags

**Contoh Tags:**
- `Frontend`, `Backend`, `Design`
- `Bug`, `Feature`, `Refactor`
- `Urgent`, `Research`, `Documentation`

**Manfaat:**
- Filter tasks by category
- Quick visual identification
- Better organization

### 4. Filter & Sort

**Use Cases:**

**Fokus pada Urgent:**
```
Filter: Priority = High
Sort: Due Date
```

**Review Progress:**
```
Filter: Tag = Feature
Sort: Created Date
```

**Check Overdue:**
```
Filter: Show Overdue Only
Sort: Due Date
```

### 5. Daily Workflow

**Morning Routine (5 menit):**
1. Buka Dashboard (`1`)
2. Check overdue tasks
3. Review today's tasks
4. Set priorities

**During Work:**
1. Buka Kanban (`2`)
2. Drag tasks ke "Sedang Berjalan"
3. Focus on 1-3 tasks max
4. Move to "Selesai" when done

**End of Day (3 menit):**
1. Move completed tasks
2. Update progress
3. Plan tomorrow's tasks
4. Export data (backup)

---

## 🎨 Customize Your Workflow

### Priority System

**High (🔴):**
- Urgent & Important
- Deadline < 3 days
- Blocking other tasks

**Medium (🟡):**
- Important but not urgent
- Deadline 3-7 days
- Regular work

**Low (🟢):**
- Nice to have
- No deadline
- Future improvements

### Column Usage

**Backlog:**
- Ideas
- Future features
- Low priority items

**Akan Dikerjakan:**
- Max 5-10 tasks
- Prioritized queue
- Ready to start

**Sedang Berjalan:**
- Max 3 tasks (WIP limit)
- Active work
- Focus area

**Selesai:**
- Completed this week
- Archive old tasks
- Review achievements

---

## 📱 Quick Actions Cheatsheet

| Action | Method 1 | Method 2 |
|--------|----------|----------|
| New Task | Click "+ Tugas Baru" | `Ctrl + K` |
| Search | Click search box | `Ctrl + F` |
| Dashboard | Click "Beranda" | Press `1` |
| Kanban | Click "Papan Kanban" | Press `2` |
| Analytics | Click "Analitik" | Press `3` |
| Settings | Click "Pengaturan" | Press `4` |
| Filter | Click "Filter & Sort" | - |
| Export | Click "Export" | - |
| Help | - | `Ctrl + /` |

---

## 🐛 Common Issues

### Task tidak muncul?
- ✅ Check filter settings
- ✅ Clear filters
- ✅ Refresh page

### Drag & drop tidak bekerja?
- ✅ Check browser compatibility
- ✅ Disable browser extensions
- ✅ Try different browser

### Keyboard shortcuts tidak aktif?
- ✅ Pastikan tidak sedang mengetik
- ✅ Check browser shortcuts conflict
- ✅ Try `Ctrl + /` untuk test

### Export gagal?
- ✅ Check browser download permission
- ✅ Pastikan ada tasks
- ✅ Try different format (JSON/CSV)

---

## 📚 Next Steps

Setelah familiar dengan basics:

1. **Explore Analytics** (`3`)
   - Lihat task distribution
   - Analyze productivity
   - Track progress

2. **Try Advanced Filters**
   - Combine multiple filters
   - Save common filter combinations
   - Use sort options

3. **Export Data**
   - Regular backups
   - Share with team
   - Analyze in Excel

4. **Read Full Documentation**
   - `FEATURES.md` - Detailed features
   - `README.md` - Complete guide
   - `CHANGELOG.md` - What's new

---

## 🎓 Learning Resources

### Video Tutorials (Coming Soon)
- [ ] Getting Started (5 min)
- [ ] Advanced Features (10 min)
- [ ] Tips & Tricks (5 min)

### Documentation
- ✅ [README.md](README.md) - Overview
- ✅ [FEATURES.md](FEATURES.md) - Feature guide
- ✅ [MIGRATION.md](MIGRATION.md) - Upgrade guide
- ✅ [CHANGELOG.md](CHANGELOG.md) - Version history

### Community
- GitHub Issues - Bug reports & features
- Discussions - Q&A and ideas

---

## 💡 Pro Tips

### Tip 1: Morning Dashboard Review
Start setiap hari dengan check dashboard untuk overview cepat.

### Tip 2: WIP Limit
Jangan terlalu banyak tasks di "Sedang Berjalan". Max 3 tasks untuk fokus.

### Tip 3: Weekly Export
Export data setiap Jumat untuk backup dan review.

### Tip 4: Tag Consistency
Gunakan tag yang konsisten. Buat list tag standard.

### Tip 5: Due Date Strategy
Set due date 1-2 hari sebelum actual deadline untuk buffer.

---

## 🎉 You're Ready!

Selamat! Anda sudah siap menggunakan AyoAtur untuk manage tasks.

**Remember:**
- Start simple, add complexity gradually
- Use keyboard shortcuts untuk speed
- Review dan adjust workflow regularly
- Export data untuk backup

**Happy Task Managing! 🚀**

---

## 📞 Need Help?

- 📖 Read [FEATURES.md](FEATURES.md) untuk detailed guide
- 🐛 Found a bug? Create [GitHub Issue](https://github.com/RoyhanAB/AyoAtur/issues)
- 💡 Have ideas? Start a [Discussion](https://github.com/RoyhanAB/AyoAtur/discussions)
- 📧 Contact: [your-email@example.com]

---

**Last Updated**: January 15, 2024
**Version**: 2.0.0
