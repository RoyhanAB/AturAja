# 🔄 Migration Guide - AyoAtur v1.0 → v2.0

Panduan untuk upgrade dari versi 1.0 ke versi 2.0 dengan fitur-fitur baru.

## 📋 Apa yang Baru?

### Fitur Baru di v2.0
- ✅ Real due date picker dengan calendar
- ✅ Advanced filter & sort system
- ✅ Keyboard shortcuts
- ✅ Export data (JSON/CSV)
- ✅ Enhanced dashboard dengan overdue tracking
- ✅ Improved task cards dengan due date indicators

### Breaking Changes
⚠️ **Database Schema Changes** - Perlu update database!

## 🗄️ Database Migration

### Step 1: Backup Data Lama
Sebelum migration, backup data existing:

```sql
-- Export existing tasks
COPY (SELECT * FROM tasks) TO '/path/to/backup/tasks_backup.csv' CSV HEADER;
```

### Step 2: Update Database Schema

Jalankan SQL berikut di Supabase SQL Editor:

```sql
-- Add new columns to existing tasks table
ALTER TABLE public.tasks 
ADD COLUMN IF NOT EXISTS due_date DATE,
ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP WITH TIME ZONE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_archived ON public.tasks(archived);

-- Update existing tasks (optional: set default due_date for high priority tasks)
-- Uncomment jika ingin set due date default untuk high priority tasks
-- UPDATE public.tasks 
-- SET due_date = CURRENT_DATE + INTERVAL '7 days'
-- WHERE priority = 'High' AND due_date IS NULL;
```

### Step 3: Verify Migration

```sql
-- Check if new columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'tasks' 
AND column_name IN ('due_date', 'archived', 'archived_at');

-- Should return 3 rows
```

## 📦 Code Update

### Step 1: Pull Latest Code

```bash
git pull origin main
```

### Step 2: Install Dependencies

```bash
npm install
```

Tidak ada dependency baru yang ditambahkan, tapi pastikan semua up-to-date.

### Step 3: Update Environment Variables

File `.env.local` tetap sama, tidak ada perubahan:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Test Locally

```bash
npm run dev
```

Buka http://localhost:5173 dan test:
- ✅ Login masih berfungsi
- ✅ Existing tasks muncul
- ✅ Bisa create task baru dengan due date
- ✅ Filter & sort bekerja
- ✅ Keyboard shortcuts aktif
- ✅ Export data berhasil

## 🔍 Compatibility Check

### Data Compatibility
- ✅ **Existing tasks**: Tetap berfungsi normal
- ✅ **Task positions**: Tidak berubah
- ✅ **User data**: Aman, RLS tetap aktif
- ⚠️ **Due dates**: Existing tasks tidak punya due date (null)

### Feature Compatibility
| Feature | v1.0 | v2.0 | Notes |
|---------|------|------|-------|
| Create Task | ✅ | ✅ | Sekarang dengan due date picker |
| Edit Task | ✅ | ✅ | Bisa update due date |
| Delete Task | ✅ | ✅ | Tidak berubah |
| Drag & Drop | ✅ | ✅ | Tidak berubah |
| Search | ✅ | ✅ | Tidak berubah |
| Analytics | ✅ | ✅ | Tidak berubah |
| Filter | ❌ | ✅ | **NEW** |
| Sort | ❌ | ✅ | **NEW** |
| Keyboard Shortcuts | ❌ | ✅ | **NEW** |
| Export | ❌ | ✅ | **NEW** |
| Overdue Tracking | ❌ | ✅ | **NEW** |

## 🚨 Common Issues & Solutions

### Issue 1: "Column due_date does not exist"
**Penyebab**: Database belum di-migrate

**Solusi**:
```sql
ALTER TABLE public.tasks ADD COLUMN due_date DATE;
```

### Issue 2: Existing tasks tidak muncul
**Penyebab**: RLS policy atau connection issue

**Solusi**:
1. Check Supabase connection di browser console
2. Verify RLS policies masih aktif
3. Re-login ke aplikasi

### Issue 3: Filter tidak bekerja
**Penyebab**: Browser cache

**Solusi**:
1. Hard refresh: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Restart dev server

### Issue 4: Keyboard shortcuts conflict
**Penyebab**: Browser extension atau OS shortcuts

**Solusi**:
1. Disable conflicting extensions
2. Check OS keyboard settings
3. Gunakan alternative shortcuts

## 📊 Data Migration (Optional)

### Migrate Old Mock Due Dates

Jika di v1.0 ada mock due dates di format string, convert ke real dates:

```sql
-- Example: Convert string dates to real dates
-- Adjust based on your data format
UPDATE public.tasks
SET due_date = CASE
  WHEN content LIKE '%urgent%' THEN CURRENT_DATE + INTERVAL '3 days'
  WHEN priority = 'High' THEN CURRENT_DATE + INTERVAL '7 days'
  WHEN priority = 'Medium' THEN CURRENT_DATE + INTERVAL '14 days'
  ELSE CURRENT_DATE + INTERVAL '30 days'
END
WHERE due_date IS NULL;
```

### Set Default Priorities

```sql
-- Set default priority for tasks without priority
UPDATE public.tasks
SET priority = 'Medium'
WHERE priority IS NULL OR priority = '';
```

## 🎯 Post-Migration Checklist

- [ ] Database schema updated
- [ ] Code pulled and dependencies installed
- [ ] Local testing passed
- [ ] All existing tasks visible
- [ ] New features working (filter, sort, export)
- [ ] Keyboard shortcuts functional
- [ ] Due dates can be set on new tasks
- [ ] Analytics showing correct data
- [ ] Export generates valid files
- [ ] No console errors

## 🔄 Rollback Plan

Jika ada masalah serius, rollback ke v1.0:

### Step 1: Restore Database
```sql
-- Remove new columns (data will be lost!)
ALTER TABLE public.tasks 
DROP COLUMN IF EXISTS due_date,
DROP COLUMN IF EXISTS archived,
DROP COLUMN IF EXISTS archived_at;
```

### Step 2: Restore Code
```bash
git checkout v1.0
npm install
npm run dev
```

### Step 3: Restore Data (if backed up)
```sql
-- Restore from backup
COPY tasks FROM '/path/to/backup/tasks_backup.csv' CSV HEADER;
```

## 📞 Support

Jika mengalami masalah saat migration:

1. **Check Logs**: Browser console dan Supabase logs
2. **Verify Database**: Pastikan schema sudah benar
3. **Test Incrementally**: Test satu fitur per satu
4. **Create Issue**: Jika bug, buat issue di GitHub dengan:
   - Error message
   - Steps to reproduce
   - Browser & OS info
   - Screenshot

## 🎉 Success!

Setelah migration berhasil:
1. ✅ Test semua fitur baru
2. ✅ Set due dates untuk existing tasks
3. ✅ Explore keyboard shortcuts
4. ✅ Try filter & sort
5. ✅ Export data untuk backup

**Selamat menggunakan AyoAtur v2.0! 🚀**

---

## 📝 Notes

- Migration bersifat **backward compatible** - data lama tetap aman
- New columns nullable - tidak break existing data
- Bisa migrate secara bertahap (tidak harus set due date untuk semua tasks)
- RLS policies tidak berubah - security tetap terjaga

## 🔮 Future Updates

Stay tuned untuk fitur-fitur berikutnya:
- Task comments & collaboration
- File attachments
- Dark/Light theme toggle
- Mobile app
- Team workspaces
- Notifications system

Check `README.md` untuk update terbaru!
