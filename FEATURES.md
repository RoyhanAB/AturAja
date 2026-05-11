# 🚀 Fitur-Fitur AyoAtur

Dokumentasi lengkap tentang semua fitur yang tersedia di AyoAtur.

## 📋 Daftar Isi
1. [Manajemen Tugas](#manajemen-tugas)
2. [Filter & Sort](#filter--sort)
3. [Keyboard Shortcuts](#keyboard-shortcuts)
4. [Export Data](#export-data)
5. [Dashboard & Analytics](#dashboard--analytics)

---

## 📝 Manajemen Tugas

### Membuat Tugas Baru
- Klik tombol **"+ Tugas Baru"** di topbar
- Atau gunakan shortcut `Ctrl/Cmd + K`
- Isi form dengan:
  - **Judul Tugas** (wajib)
  - **Deskripsi** (opsional)
  - **Prioritas**: Tinggi, Sedang, atau Rendah
  - **Label**: Pisahkan dengan koma (contoh: Frontend, Bug)
  - **Batas Waktu**: Pilih tanggal dari calendar picker

### Edit Tugas
- Klik icon **pensil** pada task card
- Update informasi yang diperlukan
- Klik **"Simpan Perubahan"**

### Hapus Tugas
- Klik icon **tempat sampah** pada task card
- Tugas akan langsung terhapus dengan konfirmasi toast

### Drag & Drop
- Klik dan tahan task card
- Drag ke kolom yang diinginkan:
  - **Backlog**: Tugas yang belum diprioritaskan
  - **Akan Dikerjakan**: Tugas yang siap dikerjakan
  - **Sedang Berjalan**: Tugas yang sedang dalam progress
  - **Selesai**: Tugas yang sudah selesai

---

## 🔍 Filter & Sort

### Mengakses Filter
- Klik tombol **"Filter & Sort"** di toolbar
- Badge merah menunjukkan jumlah filter aktif

### Filter Berdasarkan Prioritas
- ✅ Centang prioritas yang ingin ditampilkan:
  - 🔴 Tinggi
  - 🟡 Sedang
  - 🟢 Rendah
- Bisa memilih multiple prioritas sekaligus

### Filter Berdasarkan Label
- Klik label yang ingin difilter
- Label yang aktif akan berwarna biru
- Bisa memilih multiple label

### Filter Tugas Terlambat
- ✅ Centang **"Hanya Tugas Terlambat"**
- Menampilkan hanya tugas yang melewati due date

### Sorting
Pilih urutan tampilan tugas:
- **Posisi Default**: Urutan manual dari drag & drop
- **Prioritas**: Tinggi → Sedang → Rendah
- **Batas Waktu**: Deadline terdekat di atas
- **Tanggal Dibuat**: Tugas terbaru di atas

### Clear Filters
- Klik tombol **"Clear"** untuk reset semua filter

---

## ⌨️ Keyboard Shortcuts

### Navigasi Cepat
| Shortcut | Fungsi |
|----------|--------|
| `1` | Buka Dashboard |
| `2` | Buka Papan Kanban |
| `3` | Buka Analitik |
| `4` | Buka Pengaturan |

### Aksi Tugas
| Shortcut | Fungsi |
|----------|--------|
| `Ctrl/Cmd + K` | Buat tugas baru |
| `Ctrl/Cmd + F` | Fokus ke search bar |

### Utilitas
| Shortcut | Fungsi |
|----------|--------|
| `Ctrl/Cmd + /` | Tampilkan daftar shortcuts |
| `Esc` | Tutup modal/dialog |

### Tips Penggunaan
- Shortcuts bekerja di semua halaman
- Tidak aktif saat mengetik di input/textarea
- Gunakan `Ctrl` di Windows/Linux, `Cmd` di Mac

---

## 📤 Export Data

### Export ke JSON
**Kapan Menggunakan:**
- Backup lengkap semua data
- Migrasi ke sistem lain
- Analisis data dengan tools eksternal

**Isi Export:**
- Semua task dengan detail lengkap
- Struktur kolom
- Metadata (tanggal export, dll)

**Format File:**
```json
{
  "exportDate": "2024-01-15T10:30:00Z",
  "tasks": [...],
  "columns": {...}
}
```

### Export ke CSV
**Kapan Menggunakan:**
- Buka di Microsoft Excel / Google Sheets
- Buat laporan untuk stakeholder
- Analisis data dengan spreadsheet

**Kolom CSV:**
- ID
- Judul
- Deskripsi
- Prioritas
- Status
- Label
- Batas Waktu
- Tanggal Dibuat

**Tips:**
- File otomatis diberi nama dengan tanggal
- Format: `ayoatur-tasks-YYYY-MM-DD.csv`
- Encoding UTF-8 untuk karakter Indonesia

---

## 📊 Dashboard & Analytics

### Dashboard (Beranda)

#### Kartu Statistik
1. **Total Tugas**: Jumlah semua tugas aktif
2. **Tugas Selesai**: Tugas di kolom "Selesai"
3. **Prioritas Tinggi**: Tugas dengan prioritas tinggi
4. **Tugas Terlambat**: Tugas melewati due date (warna merah jika > 0)

#### Aktivitas Terakhir
- Menampilkan 5 tugas terbaru
- Informasi status dan due date
- Indikator overdue (merah) untuk tugas terlambat

### Analytics (Analitik)

#### Pie Chart - Tugas berdasarkan Status
- Visualisasi distribusi tugas per kolom
- Warna sesuai dengan kolom
- Hover untuk detail jumlah

#### Bar Chart - Tugas berdasarkan Prioritas
- Perbandingan jumlah tugas per prioritas
- Warna:
  - 🔴 Merah: Tinggi
  - 🟡 Kuning: Sedang
  - 🟢 Hijau: Rendah

---

## 💡 Tips & Best Practices

### Produktivitas
1. **Gunakan Keyboard Shortcuts** untuk navigasi cepat
2. **Set Due Date** untuk semua tugas penting
3. **Review Dashboard** setiap pagi untuk cek overdue tasks
4. **Filter by Priority** saat fokus pada tugas urgent

### Organisasi
1. **Gunakan Label** konsisten (contoh: Frontend, Backend, Bug, Feature)
2. **Prioritas Tinggi** hanya untuk tugas urgent & important
3. **Pindahkan ke Backlog** tugas yang tidak prioritas
4. **Archive/Delete** tugas yang sudah tidak relevan

### Kolaborasi
1. **Export CSV** untuk share progress dengan tim
2. **Screenshot Dashboard** untuk standup meeting
3. **Gunakan Deskripsi** untuk context yang jelas

### Backup
1. **Export JSON** secara berkala (mingguan/bulanan)
2. **Simpan file export** di cloud storage
3. **Test restore** dari backup sesekali

---

## 🐛 Troubleshooting

### Filter tidak bekerja?
- Pastikan ada tugas yang match dengan filter
- Coba clear filter dan set ulang
- Refresh halaman jika perlu

### Keyboard shortcuts tidak aktif?
- Pastikan tidak sedang mengetik di input
- Cek apakah browser extension memblokir shortcuts
- Gunakan `Ctrl/Cmd + /` untuk cek daftar shortcuts

### Export gagal?
- Cek browser permission untuk download
- Pastikan ada tugas untuk di-export
- Coba browser lain jika masalah persists

### Due date tidak muncul?
- Pastikan sudah set due date saat create/edit task
- Refresh halaman untuk sync data terbaru
- Cek database jika masalah berlanjut

---

## 🔄 Update & Changelog

Cek file `README.md` untuk changelog lengkap dan update terbaru.

## 📞 Support

Jika menemukan bug atau punya saran fitur:
1. Buat issue di GitHub repository
2. Sertakan screenshot jika memungkinkan
3. Jelaskan langkah untuk reproduce bug

---

**Happy Task Managing! 🎉**
