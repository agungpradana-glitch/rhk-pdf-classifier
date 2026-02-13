# 📄 RHK PDF Classifier

Web application untuk membaca dan mengelompokkan RHK (Rencana Hal Kerja) dari file PDF secara otomatis.

## ✨ Fitur Utama

- 📤 **Upload PDF** - Upload file PDF langsung dari browser
- 🔍 **Deteksi RHK Otomatis** - Mendeteksi "RHK 1", "RHK 2", "RHK 3", "RHK 4" dari dokumen
- 📊 **Pengelompokan Cerdas** - Mengelompokkan konten berdasarkan kategori RHK
- 💾 **Export JSON** - Simpan hasil dalam format JSON untuk analisis lebih lanjut
- 🚀 **Client-side Processing** - Semua proses berjalan di browser (tidak perlu server)
- 📱 **Responsive Design** - Bekerja optimal di desktop dan mobile

## 🛠️ Tech Stack

- **HTML5** - Struktur halaman
- **CSS3** - Styling modern dengan gradient
- **JavaScript (Vanilla)** - Logic tanpa framework
- **PDF.js** - Library untuk parsing PDF dari Mozilla
- **Cloudflare Pages** - Hosting CDN

## 📋 Cara Menggunakan

1. **Buka aplikasi** di browser Anda
2. **Klik tombol upload** dan pilih file PDF
3. **Klik "Analisis PDF"** untuk memproses
4. **Lihat hasil pengelompokan** RHK 1, 2, 3, dan 4
5. **Export JSON** jika ingin menyimpan hasil

## 🚀 Deploy ke Cloudflare Pages

### Persiapan

1. Pastikan Anda sudah punya akun Cloudflare
2. Install Wrangler CLI:
```bash
npm install -g wrangler
```

### Deploy Steps

1. Clone repository:
```bash
git clone https://github.com/agungpradana-glitch/rhk-pdf-classifier.git
cd rhk-pdf-classifier
```

2. Login ke Cloudflare:
```bash
wrangler login
```

3. Deploy ke Cloudflare Pages:
```bash
wrangler pages deploy .
```

4. Atau gunakan GitHub Integration:
   - Push ke GitHub
   - Masuk ke Cloudflare Dashboard
   - Pilih Pages → Connect to Git
   - Pilih repository rhk-pdf-classifier
   - Build command: npm run build (atau kosongkan jika static)
   - Build output directory: . (root folder)

## 📁 Struktur File

rhk-pdf-classifier/
├── index.html          # Halaman utama
├── styles.css          # Stylesheet
├── script.js           # Logic aplikasi
├── wrangler.toml       # Konfigurasi Cloudflare
├── README.md           # Dokumentasi ini
└── package.json        # Metadata project

## 🔧 Cara Kerja

### 1. Ekstraksi Teks dari PDF
```javascript
// Menggunakan PDF.js untuk membaca setiap halaman
const pdf = await pdfjsLib.getDocument(file).promise;
```

### 2. Deteksi RHK
```javascript
// Mencari pola "RHK X" (X = 1,2,3,4)
const rhkPattern = /RHK\s+(\d+)/gi;
```

### 3. Pengelompokan
```javascript
// Mengelompokkan teks berdasarkan kategori RHK
classified.rhk1, classified.rhk2, etc.;
```

### 4. Export Hasil
```javascript
// Download sebagai file JSON
const blob = new Blob([jsonString], { type: 'application/json' });
```

## 📊 Contoh Output

```json
{
  "rhk1": [
    "Uraian aktivitas RHK 1...",
    "Uraian aktivitas RHK 1..."
  ],
  "rhk2": [
    "Uraian aktivitas RHK 2..."
  ],
  "rhk3": [],
  "rhk4": []
}
```

## 🐛 Troubleshooting

### PDF tidak terbaca
- Pastikan file PDF berformat text (bukan scan/image)
- Gunakan PDF dengan kandungan teks yang jelas

### RHK tidak terdeteksi
- Pastikan format RHK menggunakan "RHK 1", "RHK 2", dst
- Format harus persis dengan spasi

### Export gagal
- Gunakan browser modern (Chrome, Firefox, Safari, Edge)
- Pastikan JavaScript enabled

## 🔐 Privacy & Security

- ✅ Semua proses berjalan di browser lokal
- ✅ File PDF tidak dikirim ke server
- ✅ Data tidak disimpan di cloud
- ✅ Aman untuk dokumen sensitif

## 📝 Lisensi

MIT License - Bebas digunakan untuk keperluan komersial maupun pribadi

## 👨‍💻 Author

agungpradana-glitch

## 🤝 Kontribusi

Silakan fork repository ini dan submit pull request untuk improvement!

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat GitHub Issue atau hubungi developer.

---

**Versi**: 1.0.0
**Last Updated**: 2026-02-13
**Status**: Active ✅