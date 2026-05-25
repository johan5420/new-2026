# Weather Dashboard

Weather Dashboard adalah aplikasi web modern untuk melihat prakiraan cuaca real-time dari seluruh dunia. Aplikasi ini menggunakan OpenWeatherMap API untuk mengambil data cuaca terkini.

## 🌟 Fitur Utama

### ✅ Fitur yang Tersedia

1. **Pencarian Kota Real-time**
   - Autocomplete suggestions saat mengetik
   - Validasi kota
   - Dukungan pencarian dalam berbagai bahasa

2. **Data Cuaca Lengkap**
   - Suhu saat ini
   - "Rasakan seperti" suhu
   - Kelembaban udara
   - Kecepatan dan arah angin
   - Tekanan udara
   - Jarak pandang
   - Deskripsi cuaca detail

3. **Prakiraan 5 Hari**
   - Prediksi cuaca harian
   - Ikon cuaca dinamis
   - Suhu minimum dan maksimum

4. **Informasi Tambahan**
   - Waktu matahari terbit dan terbenam
   - Koordinat geografis (latitude & longitude)
   - Zona waktu lokal
   - Update terakhir data

5. **Kota Populer Pintas**
   - Akses cepat ke kota-kota populer
   - Button untuk Jakarta, Tokyo, London, NYC, dan lainnya

6. **UI/UX Modern**
   - Design responsif (mobile, tablet, desktop)
   - Animasi smooth
   - Dark mode aesthetic
   - Loading indicators
   - Error handling yang user-friendly

## 🚀 Cara Menggunakan

### 1. Akses Aplikasi

```
Buka file: weather.html di browser Anda
```

### 2. Cari Kota

- Ketik nama kota di search box
- Pilih dari suggestions yang muncul
- Atau klik salah satu tombol kota populer
- Tekan Enter atau klik tombol "Cari"

### 3. Lihat Data Cuaca

- Informasi cuaca saat ini ditampilkan di card utama
- Scroll untuk melihat prakiraan 5 hari
- Lihat informasi matahari, koordinat, dan timezone

## 📁 Struktur File

```
.
├── weather.html          # File HTML utama
├── weather-style.css     # Styling dashboard
├── weather-script.js     # Logic dan API integration
└── README.md            # Dokumentasi
```

## 🔧 Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dan responsive design
- **JavaScript (ES6+)** - Logic dan API calls
- **OpenWeatherMap API** - Data cuaca real-time
- **Fetch API** - HTTP requests

## 📡 API Configuration

### OpenWeatherMap API

```javascript
const API_KEY = 'c8d5db6b6e59d72621ffc0b1b60c52c7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
```

**Endpoints yang Digunakan:**

1. **Current Weather**
   ```
   GET /weather?q={city}&appid={API_KEY}&units=metric&lang=id
   ```

2. **5-Day Forecast**
   ```
   GET /forecast?q={city}&appid={API_KEY}&units=metric&lang=id
   ```

3. **City Geocoding**
   ```
   GET /geo/1.0/direct?q={city}&limit=5&appid={API_KEY}
   ```

## 🎨 Desain & Responsivitas

### Breakpoints

- **Desktop**: > 900px
- **Tablet**: 600px - 900px
- **Mobile**: < 600px

### Warna Utama

- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Background: Linear gradient (Purple to Dark Purple)
- Text: `#333` (Dark Gray)

## 🌍 Kota Populer yang Tersedia

1. Jakarta, Indonesia
2. Surabaya, Indonesia
3. Bandung, Indonesia
4. Tokyo, Japan
5. London, UK
6. New York, USA
7. Sydney, Australia
8. Paris, France

## 📊 Informasi yang Ditampilkan

### Cuaca Saat Ini
- ❄️ Suhu
- 💧 Kelembaban
- 💨 Kecepatan Angin
- 🧭 Arah Angin
- 🌡️ Rasakan Seperti
- 🎯 Tekanan Udara
- 👁️ Jarak Pandang
- ☀️ Matahari Terbit/Terbenam
- 📍 Koordinat Geografis
- 🌍 Zona Waktu

## ⚠️ Catatan Penting

### API Key

- API key yang digunakan adalah free tier dari OpenWeatherMap
- Limit: 1000 calls/day, 1 call per 10 seconds
- Untuk production, gunakan API key pribadi Anda sendiri

### Menggunakan API Key Pribadi

1. Daftar di [openweathermap.org](https://openweathermap.org/api)
2. Dapatkan API key Anda
3. Ganti nilai `API_KEY` di file `weather-script.js`

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

## 🐛 Troubleshooting

### Masalah: "Kota tidak ditemukan"
- Pastikan nama kota dieja dengan benar
- Coba gunakan nama kota dalam bahasa Inggris
- Gunakan tombol kota populer sebagai referensi

### Masalah: Data tidak muncul
- Periksa koneksi internet Anda
- Pastikan browser mendukung Fetch API
- Buka developer console (F12) untuk melihat error
- Periksa API key masih valid

### Masalah: Suggestions tidak muncul
- Ketik minimal 2 karakter
- Periksa API key dan koneksi internet
- Browser harus support modern JavaScript

## 📱 Responsive Design

```
📱 Mobile (< 600px)
- Single column layout
- Touch-friendly buttons
- Optimized font sizes

📱 Tablet (600px - 900px)
- 2-3 column grid
- Balanced spacing
- Medium font sizes

🖥️ Desktop (> 900px)
- Multi-column grid
- Full features visible
- Large weather display
```

## 🚀 Future Enhancements

- [ ] Dark/Light mode toggle
- [ ] Favorite cities list
- [ ] Weather alerts
- [ ] Air quality index (AQI)
- [ ] Multiple language support
- [ ] Local storage untuk recent searches
- [ ] Charts dan graphs
- [ ] UV index display
- [ ] Precipitation probability

## 📄 Lisensi

Proyek ini free untuk digunakan dan dikembangkan.

Data cuaca disediakan oleh [OpenWeatherMap](https://openweathermap.org/)

## 👤 Kontribusi

Untuk menambah fitur atau memperbaiki bug, silakan buat pull request atau buka issue.

---

**Dibuat dengan ❤️ untuk weather enthusiasts**

© 2026 Weather Dashboard | All rights reserved