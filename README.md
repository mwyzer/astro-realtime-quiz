# ⚡ AstroQuiz Live - Real-time Quiz Platform

Aplikasi kuis interaktif multiplayer secara real-time yang dibangun dengan **Astro** dan **React Islands**. Terinspirasi dari platform seperti *Kahoot* dan *Quizizz*, dengan optimasi performa tinggi dan nol JavaScript berlebih.

---

## 🌟 Fitur Utama

- **Islands Architecture (Astro + React):** Halaman publik, navigasi, dan bank soal disajikan secara statis (SSG / Zero JS) untuk kecepatan instan dan SEO maksimal. Arena bermain kuis dihidrasi sebagai React Island (`client:only="react"`).
- **Multiplayer Real-time via WebSocket:** Sinkronisasi instan antara Host (layar proyektor/komputer) dan peserta (smartphone/browser).
- **Anti-Cheat:** Kunci jawaban disimpan secara aman di sisi server; peserta hanya menerima opsi jawaban sampai batas waktu soal habis.
- **Skor Berbasis Kecepatan & Streak:** Peserta yang menjawab lebih cepat mendapatkan poin lebih tinggi, ditambah bonus kelipatan jawaban benar berturut-turut.
- **Audio Synthesizer (Web Audio API):** Efek suara interaktif (pop, countdown tick, correct, incorrect) tanpa memerlukan file audio eksternal.
- **Papan Skor & Efek Confetti:** Layar podium juara di akhir permainan lengkap dengan perayaan animasi confetti.

---

## 🚀 Cara Menjalankan

### 1. Jalankan Server Dev & WebSocket
Pastikan dependencies sudah terinstall, kemudian jalankan:

```bash
npm run dev
```

Perintah di atas akan menyalakan dua proses secara bersamaan:
* **Astro Dev Server** di `http://localhost:4321`
* **WebSocket Server** di `ws://localhost:3001`

### 2. Cara Menguji Kuis Secara Lokal (Dua Tab)

1. Buka **Tab 1** di browser: [http://localhost:4321/host](http://localhost:4321/host)
   - Pilih paket kuis yang diinginkan (misal: *Web Development & Modern JS*).
   - Klik **"Buka Room Kuis"**. Catat atau salin **PIN 6-digit** yang muncul di layar.
2. Buka **Tab 2** (atau jendela Incognito / HP yang satu jaringan): [http://localhost:4321/play](http://localhost:4321/play)
   - Masukkan PIN 6-digit tadi.
   - Ketik nama kamu dan pilih avatar emoji.
   - Klik **"Masuk Room"**.
3. Kembali ke **Tab 1 (Host)**:
   - Nama pemain akan langsung muncul secara animasi di lobby!
   - Klik **"Mulai Kuis"** dan selamat bermain!

---

## 📂 Struktur Direktori

```text
astro-realtime-quiz/
├── server/
│   └── ws-server.mjs          # Server WebSocket lokal (manajemen room, timer, scoring)
├── src/
│   ├── components/
│   │   └── react/
│   │       ├── HostRoom.tsx     # React Island untuk layar Host & proyektor
│   │       ├── PlayerRoom.tsx   # React Island untuk smartphone / layar peserta
│   │       └── SoundPlayer.ts   # Audio synth berbasis Web Audio API
│   ├── data/
│   │   └── default-quizzes.ts # Bank soal kuis
│   ├── layouts/
│   │   └── Layout.astro       # Layout dasar halaman web Astro
│   ├── pages/
│   │   ├── index.astro        # Beranda (Zero JS, super cepat)
│   │   ├── host.astro         # Halaman Host Room
│   │   ├── play.astro         # Halaman Peserta (Join & Main)
│   │   └── bank.astro         # Halaman Bank Soal publik (SSG)
│   └── types/
│       └── quiz.ts            # Definisi tipe TypeScript
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```
