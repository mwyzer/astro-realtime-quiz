import type { QuizData, QuizQuestion } from '../types/quiz';

export type DifficultyLevel = 'Mudah' | 'Sedang' | 'Sulit';

export interface GenerateQuizOptions {
  topic: string;
  count: number;
  difficulty: DifficultyLevel;
  timeLimit: number;
  apiKey?: string;
}

interface RawQA {
  q: string;
  opts: [string, string, string, string];
  ans: number;
  exp: string;
}

const TOPIC_KNOWLEDGE_BANK: Record<string, { category: string; titlePrefix: string; items: RawQA[] }> = {
  sejarah_indonesia: {
    category: 'Edukasi',
    titlePrefix: 'Sejarah & Kemerdekaan Nusantara',
    items: [
      {
        q: 'Siapakah tokoh yang mengetik naskah Proklamasi Kemerdekaan Indonesia?',
        opts: ['Sayuti Melik', 'Sukarni', 'Achmad Soebardjo', 'B.M. Diah'],
        ans: 0,
        exp: 'Sayuti Melik mengetik naskah Proklamasi dari tulisan tangan Ir. Soekarno di rumah Laksamana Maeda.'
      },
      {
        q: 'Pada tanggal berapa Sumpah Pemuda diikrarkan di Jakarta?',
        opts: ['20 Mei 1908', '28 Oktober 1928', '17 Agustus 1945', '10 November 1945'],
        ans: 1,
        exp: 'Kongres Pemuda II melahirkan ikrar Sumpah Pemuda pada 28 Oktober 1928.'
      },
      {
        q: 'Kerajaan Hindu tertua di Indonesia yang terletak di Kalimantan Timur adalah...',
        opts: ['Tarumanegara', 'Majapahit', 'Kutai Martadipura', 'Sriwijaya'],
        ans: 2,
        exp: 'Kerajaan Kutai di tepi Sungai Mahakam (abad ke-4 M) meninggalkan prasasti Yupa.'
      },
      {
        q: 'Siapakah panglima besar TNI pertama yang memimpin perang gerilya mempertahankan kemerdekaan?',
        opts: ['Jenderal Soedirman', 'Jenderal A.H. Nasution', 'Bung Tomo', 'Gatot Soebroto'],
        ans: 0,
        exp: 'Jenderal Besar Soedirman memimpin perang gerilya meski dalam kondisi sakit paru-paru.'
      },
      {
        q: 'Peristiwa penculikan Soekarno dan Hatta oleh golongan muda sebelum proklamasi dibawa ke daerah...',
        opts: ['Linggarjati', 'Rengasdengklok', ' Kalijati', 'Ambarawa'],
        ans: 1,
        exp: 'Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945 agar Soekarno-Hatta segera memproklamasikan kemerdekaan.'
      },
      {
        q: 'Organisasi pergerakan nasional pertama yang berdiri pada 20 Mei 1908 dan diperingati sebagai Hari Kebangkitan Nasional adalah...',
        opts: ['Sarekat Islam', 'Indische Partij', 'Budi Utomo', 'Muhammadiyah'],
        ans: 2,
        exp: 'Budi Utomo didirikan oleh dr. Soetomo dan para mahasiswa STOVIA pada 20 Mei 1908.'
      },
      {
        q: 'Candi Borobudur dibangun pada masa kejayaan Wangsa...',
        opts: ['Sanjaya', 'Syailendra', 'Isyana', 'Rajasa'],
        ans: 1,
        exp: 'Candi Borobudur yang bercorak Buddha Mahayana dibangun pada masa Dinasti Syailendra sekitar abad ke-8.'
      },
      {
        q: 'Perundingan antara Indonesia dan Belanda yang dilaksanakan di atas kapal perang Amerika Serikat USS Renville terjadi pada tahun...',
        opts: ['1946', '1948', '1949', '1950'],
        ans: 1,
        exp: 'Perjanjian Renville ditandatangani pada 17 Januari 1948 di Teluk Jakarta.'
      },
      {
        q: 'Siapakah pahlawan nasional wanita dari Aceh yang memimpin perlawanan terhadap Belanda bersama Teuku Umar?',
        opts: ['Cut Nyak Dhien', 'R.A. Kartini', 'Dewi Sartika', 'Martha Christina Tiahahu'],
        ans: 0,
        exp: 'Cut Nyak Dhien memimpin perlawanan rakyat Aceh di hutan Meulaboh setelah gugurnya Teuku Umar.'
      },
      {
        q: 'Konferensi Asia-Afrika (KAA) tahun 1955 diselenggarakan di kota...',
        opts: ['Jakarta', 'Yogyakarta', 'Bandung', 'Bogor'],
        ans: 2,
        exp: 'KAA berlangsung pada 18-24 April 1955 di Gedung Merdeka, Bandung.'
      }
    ]
  },
  sepak_bola: {
    category: 'Pop Culture',
    titlePrefix: 'Arena Trivia Sepak Bola Dunia',
    items: [
      {
        q: 'Negara manakah yang paling banyak memenangkan trofi Piala Dunia FIFA sepanjang sejarah?',
        opts: ['Jerman', 'Italia', 'Brasil', 'Argentina'],
        ans: 2,
        exp: 'Brasil mengoleksi 5 gelar juara Piala Dunia (1958, 1962, 1970, 1994, dan 2002).'
      },
      {
        q: 'Siapakah pemain yang meraih trofi Ballon dOr terbanyak dalam sejarah sepak bola?',
        opts: ['Cristiano Ronaldo', 'Lionel Messi', 'Michel Platini', 'Johan Cruyff'],
        ans: 1,
        exp: 'Lionel Messi memegang rekor dengan 8 penghargaan Ballon dOr.'
      },
      {
        q: 'Klub sepak bola manakah yang dijuluki Los Blancos dan memegang rekor gelar Liga Champions terbanyak?',
        opts: ['FC Barcelona', 'AC Milan', 'Real Madrid', 'Bayern Munchen'],
        ans: 2,
        exp: 'Real Madrid adalah pemegang rekor juara Liga Champions UEFA terbanyak.'
      },
      {
        q: 'Berapa lama waktu normal pertandingan sepak bola resmi FIFA (tidak termasuk tambahan waktu)?',
        opts: ['80 Menit', '90 Menit', '100 Menit', '120 Menit'],
        ans: 1,
        exp: 'Pertandingan sepak bola normal terdiri dari 2 babak masing-masing 45 menit (total 90 menit).'
      },
      {
        q: 'Negara Asia pertama yang berhasil menembus babak Semifinal Piala Dunia FIFA pada tahun 2002 adalah...',
        opts: ['Jepang', 'Korea Selatan', 'Arab Saudi', 'Iran'],
        ans: 1,
        exp: 'Korea Selatan mencapai peringkat ke-4 pada Piala Dunia 2002 saat menjadi tuan rumah bersama Jepang.'
      },
      {
        q: 'Stadion kebanggaan Timnas Indonesia yang terletak di Senayan, Jakarta adalah...',
        opts: ['Stadion Gelora Bung Tomo', 'Stadion Gelora Bung Karno', 'Stadion Pakansari', 'Stadion Manahan'],
        ans: 1,
        exp: 'Stadion Utama Gelora Bung Karno (SUGBK) diresmikan pada tahun 1962 untuk Asian Games IV.'
      },
      {
        q: 'Istilah ketika seorang pemain berhasil mencetak 3 gol dalam satu pertandingan disebut...',
        opts: ['Brace', 'Hat-trick', 'Quattrick', 'Clean Sheet'],
        ans: 1,
        exp: 'Mencetak 3 gol dalam satu laga disebut Hat-trick, sedangkan 2 gol disebut Brace.'
      },
      {
        q: 'Siapakah pencetak gol terbanyak sepanjang masa dalam sejarah turnamen putaran final Piala Dunia FIFA (16 gol)?',
        opts: ['Ronaldo Nazario', 'Miroslav Klose', 'Gerd Muller', 'Kylian Mbappe'],
        ans: 1,
        exp: 'Striker timnas Jerman Miroslav Klose mencetak total 16 gol di empat edisi Piala Dunia (2002-2014).'
      },
      {
        q: 'Turnamen Piala Dunia FIFA 2022 yang dimenangkan oleh Argentina diselenggarakan di negara...',
        opts: ['Rusia', 'Qatar', 'Afrika Selatan', 'Brasil'],
        ans: 1,
        exp: 'Qatar menjadi negara Timur Tengah pertama yang menjadi tuan rumah Piala Dunia FIFA pada akhir 2022.'
      },
      {
        q: 'Berapa jumlah pemain dari satu tim yang boleh berada di atas lapangan saat kick-off dimulai?',
        opts: ['9 Pemain', '10 Pemain', '11 Pemain', '12 Pemain'],
        ans: 2,
        exp: 'Setiap tim sepak bola menurunkan 11 pemain inti (10 pemain lapangan dan 1 penjaga gawang).'
      }
    ]
  },
  kuliner_nusantara: {
    category: 'Umum',
    titlePrefix: 'Jelajah Kuliner & Rempah Nusantara',
    items: [
      {
        q: 'Makanan khas Sumatera Barat berbahan daging dan santan rempah yang pernah dinobatkan sebagai makanan terenak di dunia adalah...',
        opts: ['Gulai Tambusu', 'Rendang', 'Dendeng Balado', 'Sate Padang'],
        ans: 1,
        exp: 'Rendang dari Minangkabau terkenal karena proses memasaknya yang lama dengan santan dan rempah pilihan.'
      },
      {
        q: 'Pempek adalah hidangan olahan ikan dan sagu dengan kuah cuko yang berasal dari kota...',
        opts: ['Lampung', 'Palembang', 'Jambi', 'Bengkulu'],
        ans: 1,
        exp: 'Pempek merupakan ikon kuliner kota Palembang, Sumatera Selatan.'
      },
      {
        q: 'Gudeg yang memiliki cita rasa manis khas Yogyakarta terbuat dari bahan utama...',
        opts: ['Nangka Muda', 'Rebung Bambu', 'Jantung Pisang', 'Pepaya Muda'],
        ans: 0,
        exp: 'Gudeg dimasak berjam-jam dari nangka muda (gori) dengan santan dan gula aren.'
      },
      {
        q: 'Papeda yang bertekstur kenyal dan biasa disantap bersama Ikan Kuah Kuning terbuat dari...',
        opts: ['Tepung Beras', 'Pati Sagu', 'Singkong', 'Jagung Halus'],
        ans: 1,
        exp: 'Papeda adalah makanan pokok khas Maluku dan Papua yang terbuat dari pati sagu murni.'
      },
      {
        q: 'Sup daging berkuah hitam pekat khas Jawa Timur yang warna hitamnya berasal dari biji keluak adalah...',
        opts: ['Soto Lamongan', 'Rawon', 'Tongseng', 'Brongkos'],
        ans: 1,
        exp: 'Rawon menggunakan bumbu khas kluwek (keluak) yang menghasilkan warna hitam gurih.'
      },
      {
        q: 'Hidangan Coto Makassar dan Konro berasal dari provinsi...',
        opts: ['Sulawesi Utara', 'Sulawesi Selatan', 'Sulawesi Tengah', 'Gorontalo'],
        ans: 1,
        exp: 'Coto Makassar dan Sup Konro adalah kuliner legendaris dari Makassar, Sulawesi Selatan.'
      },
      {
        q: 'Kerak Telor adalah jajanan tradisional berbahan beras ketan dan telur bebek yang menjadi ikon budaya...',
        opts: ['Sunda', 'Betawi', 'Banten', 'Cirebon'],
        ans: 1,
        exp: 'Kerak Telor adalah kuliner asli masyarakat Betawi di Jakarta.'
      },
      {
        q: 'Ayam Betutu yang kaya akan bumbu base genep adalah hidangan tradisional dari pulau...',
        opts: ['Lombok', 'Bali', 'Madura', 'Flores'],
        ans: 1,
        exp: 'Ayam Betutu berasal dari Bali, dimasak utuh dengan bumbu rempah khas base genep.'
      },
      {
        q: 'Minuman hangat tradisional khas Jawa Tengah dan Yogyakarta yang berisi jahe, gula batu, serai, dan kayu secang sehingga berwarna merah adalah...',
        opts: ['Bajigur', 'Bandrek', 'Wedang Uwuh', 'Es Dawet'],
        ans: 2,
        exp: 'Wedang Uwuh berasal dari Imogiri, Yogyakarta; warna merah alaminya berasal dari serutan kayu secang.'
      },
      {
        q: 'Rempah asli Kepulauan Maluku yang pada masa lampau sangat diburu bangsa Eropa dan dijuluki emas hitam/emas aromatik adalah...',
        opts: ['Cengkeh dan Pala', 'Kayu Manis dan Kapulaga', 'Kunyit dan Kencur', 'Andaliman dan Kemiri'],
        ans: 0,
        exp: 'Cengkeh (Ternate/Tidore) dan Pala (Kepulauan Banda) adalah tanaman endemik Maluku.'
      }
    ]
  },
  biologi_alam: {
    category: 'Science',
    titlePrefix: 'Biologi, Tubuh Manusia & Ekosistem',
    items: [
      {
        q: 'Organel sel yang berfungsi sebagai pusat pembangkit energi (respirasi seluler) dan dijuluki The Powerhouse of the Cell adalah...',
        opts: ['Ribosom', 'Mitokondria', 'Lisosom', 'Badan Golgi'],
        ans: 1,
        exp: 'Mitokondria menghasilkan molekul energi ATP melalui proses respirasi seluler.'
      },
      {
        q: 'Zat hijau daun yang berperan menangkap energi cahaya matahari dalam proses fotosintesis disebut...',
        opts: ['Hemoglobin', 'Klorofil', 'Karotenoid', 'Stomata'],
        ans: 1,
        exp: 'Klorofil terdapat di dalam kloroplas dan menyerap cahaya untuk fotosintesis.'
      },
      {
        q: 'Bagian darah manusia yang bertugas melawan infeksi kuman, virus, dan bakteri adalah...',
        opts: ['Eritrosit (Sel Darah Merah)', 'Leukosit (Sel Darah Putih)', 'Trombosit (Keping Darah)', 'Plasma Darah'],
        ans: 1,
        exp: 'Leukosit (sel darah putih) merupakan komponen utama sistem kekebalan tubuh.'
      },
      {
        q: 'Hewan mamalia laut terbesar yang pernah hidup di Bumi adalah...',
        opts: ['Hiu Paus', 'Paus Biru', 'Paus Sperma', 'Orca'],
        ans: 1,
        exp: 'Paus Biru (Balaenoptera musculus) adalah mamalia terbesar dengan panjang mencapai 30 meter.'
      },
      {
        q: 'Berapa jumlah ruang pada jantung manusia yang sehat?',
        opts: ['2 Ruang', '3 Ruang', '4 Ruang', '5 Ruang'],
        ans: 2,
        exp: 'Jantung manusia memiliki 4 ruang: Serambi Kanan, Serambi Kiri, Bilik Kanan, dan Bilik Kiri.'
      },
      {
        q: 'Vitamin yang diproduksi secara alami oleh tubuh manusia ketika kulit terpapar sinar matahari pagi adalah...',
        opts: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
        ans: 2,
        exp: 'Paparan sinar UVB matahari membantu mengubah provitamin D di kulit menjadi Vitamin D3.'
      },
      {
        q: 'Tumbuhan langka raksasa yang mekar tanpa daun dan batang di hutan Sumatera serta mengeluarkan aroma bangkai adalah...',
        opts: ['Kantong Semar', 'Rafflesia arnoldii', 'Edelweiss Jawa', 'Anggrek Hitam'],
        ans: 1,
        exp: 'Rafflesia arnoldii merupakan bunga tunggal terbesar di dunia yang hidup sebagai parasit.'
      },
      {
        q: 'Simbiosis antara ikan badut (clownfish) dan anemon laut di mana ikan badut mendapat perlindungan dan anemon dibersihkan dari parasit disebut...',
        opts: ['Simbiosis Parasitisme', 'Simbiosis Komensalisme', 'Simbiosis Mutualisme', 'Simbiosis Amensalisme'],
        ans: 2,
        exp: 'Simbiosis mutualisme adalah hubungan timbal balik yang saling menguntungkan kedua spesies.'
      },
      {
        q: 'Tulang terpanjang dan terkuat di dalam rangka tubuh manusia terletak pada bagian...',
        opts: ['Tulang Lengan Atas (Humerus)', 'Tulang Belakang (Vertebra)', 'Tulang Paha (Femur)', 'Tulang Kering (Tibia)'],
        ans: 2,
        exp: 'Tulang paha (femur) adalah tulang terpanjang, terberat, dan terkuat di tubuh manusia.'
      },
      {
        q: 'Proses perubahan wujud serangga dari telur, ulat (larva), kepompong (pupa), hingga menjadi kupu-kupu dewasa disebut...',
        opts: ['Metamorfosis Sempurna', 'Metamorfosis Tidak Sempurna', 'Metagenesis', 'Mimba'],
        ans: 0,
        exp: 'Kupu-kupu mengalami metamorfosis sempurna karena melewati fase kepompong (pupa) yang sangat berbeda.'
      }
    ]
  },
  matematika_kilat: {
    category: 'Edukasi',
    titlePrefix: 'Tantangan Matematika & Hitung Cepat',
    items: [
      {
        q: 'Berapakah hasil dari 12 + 8 x 5 - 10?',
        opts: ['90', '42', '50', '38'],
        ans: 1,
        exp: 'Kerjakan perkalian lebih dulu: 8 x 5 = 40. Lalu 12 + 40 - 10 = 42.'
      },
      {
        q: 'Sebuah persegi memiliki keliling 36 cm. Berapakah luas persegi tersebut?',
        opts: ['64 cm²', '72 cm²', '81 cm²', '144 cm²'],
        ans: 2,
        exp: 'Panjang sisi = 36 / 4 = 9 cm. Luas persegi = sisi x sisi = 9 x 9 = 81 cm².'
      },
      {
        q: 'Bilangan prima terkecil yang juga merupakan bilangan genap adalah...',
        opts: ['0', '1', '2', '4'],
        ans: 2,
        exp: 'Angka 2 adalah satu-satunya bilangan prima yang genap.'
      },
      {
        q: 'Jika harga sebuah sepatu Rp200.000 mendapat diskon 25%, berapakah harga yang harus dibayar?',
        opts: ['Rp125.000', 'Rp150.000', 'Rp175.000', 'Rp160.000'],
        ans: 1,
        exp: 'Potongan diskon = 25% x 200.000 = Rp50.000. Harga bayar = 200.000 - 50.000 = Rp150.000.'
      },
      {
        q: 'Berapakah nilai dari akar kuadrat √144 ditambah √81?',
        opts: ['19', '21', '23', '25'],
        ans: 1,
        exp: '√144 = 12 dan √81 = 9. Maka 12 + 9 = 21.'
      },
      {
        q: 'Sebuah mobil melaju dengan kecepatan rata-rata 60 km/jam selama 2,5 jam. Berapa jarak yang ditempuh?',
        opts: ['120 km', '140 km', '150 km', '180 km'],
        ans: 2,
        exp: 'Jarak = Kecepatan x Waktu = 60 x 2,5 = 150 km.'
      },
      {
        q: 'Jumlah sudut-sudut di dalam sebuah segitiga datar selalu berjumlah...',
        opts: ['90 Derajat', '180 Derajat', '270 Derajat', '360 Derajat'],
        ans: 1,
        exp: 'Total ketiga sudut internal segitiga pada bidang datar selalu 180 derajat.'
      },
      {
        q: 'Berapakah nilai dari 2 pangkat 5 (2⁵)?',
        opts: ['10', '16', '32', '64'],
        ans: 2,
        exp: '2 x 2 x 2 x 2 x 2 = 32.'
      },
      {
        q: 'Kelipatan Persekutuan Terkecil (KPK) dari bilangan 6 dan 8 adalah...',
        opts: ['12', '16', '24', '48'],
        ans: 2,
        exp: 'Kelipatan 6 = (6, 12, 18, 24) dan kelipatan 8 = (8, 16, 24). KPK-nya adalah 24.'
      },
      {
        q: 'Jika 3x + 7 = 22, maka nilai x adalah...',
        opts: ['3', '4', '5', '6'],
        ans: 2,
        exp: '3x = 22 - 7 = 15, sehingga x = 15 / 3 = 5.'
      }
    ]
  },
  geografi_dunia: {
    category: 'Umum',
    titlePrefix: 'Eksplorasi Geografi & Benua Dunia',
    items: [
      {
        q: 'Sungai terpanjang di dunia yang mengalir melintasi benua Afrika hingga bermuara di Laut Mediterania adalah...',
        opts: ['Sungai Amazon', 'Sungai Nil', 'Sungai Yangtze', 'Sungai Mississippi'],
        ans: 1,
        exp: 'Sungai Nil di Afrika memiliki panjang sekitar 6.650 km.'
      },
      {
        q: 'Negara yang mendapat julukan Negeri Matahari Terbit (Land of the Rising Sun) adalah...',
        opts: ['Korea Selatan', 'Tiongkok', 'Jepang', 'Thailand'],
        ans: 2,
        exp: 'Jepang (Nihon/Nippon) secara harfiah berarti asal matahari terbit.'
      },
      {
        q: 'Gunung tertinggi di dunia di atas permukaan laut yang terletak di pegunungan Himalaya adalah...',
        opts: ['Gunung K2', 'Gunung Kilimanjaro', 'Gunung Everest', 'Gunung Elbrus'],
        ans: 2,
        exp: 'Puncak Gunung Everest berada di ketinggian 8.848,86 meter di atas permukaan laut.'
      },
      {
        q: 'Ibu kota negara Australia adalah...',
        opts: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        ans: 2,
        exp: 'Canberra dipilih sebagai ibu kota resmi Australia pada tahun 1908 sebagai kompromi antara Sydney dan Melbourne.'
      },
      {
        q: 'Benua terkecil di dunia berdasarkan luas daratannya adalah...',
        opts: ['Eropa', 'Australia', 'Antartika', 'Amerika Selatan'],
        ans: 1,
        exp: 'Benua Australia adalah benua terkecil dengan luas sekitar 7,7 juta km².'
      },
      {
        q: 'Terusan buatan yang menghubungkan Laut Mediterania dengan Laut Merah di negara Mesir adalah...',
        opts: ['Terusan Panama', 'Terusan Suez', 'Selat Gibraltar', 'Selat Hormuz'],
        ans: 1,
        exp: 'Terusan Suez dibuka pada tahun 1869 dan menjadi jalur pelayaran vital antara Eropa dan Asia.'
      },
      {
        q: 'Danau vulkanik terbesar di dunia yang berada di Pulau Sumatera, Indonesia adalah...',
        opts: ['Danau Singkarak', 'Danau Maninjau', 'Danau Toba', 'Danau Ranau'],
        ans: 2,
        exp: 'Danau Toba di Sumatera Utara terbentuk dari letusan supervulkan puluhan ribu tahun silam.'
      },
      {
        q: 'Negara dengan jumlah pulau terbanyak di dunia namun berbentuk negara kepulauan tropis terbesar di khatulistiwa adalah...',
        opts: ['Filipina', 'Indonesia', 'Maladewa', 'Madagaskar'],
        ans: 1,
        exp: 'Indonesia adalah negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau.'
      },
      {
        q: 'Gurun pasir panas terluas di dunia yang membentang di Afrika Utara adalah...',
        opts: ['Gurun Gobi', 'Gurun Kalahari', 'Gurun Sahara', 'Gurun Atacama'],
        ans: 2,
        exp: 'Gurun Sahara memiliki luas lebih dari 9 juta km² di Afrika Utara.'
      },
      {
        q: 'Garis khayal 0 derajat lintang yang membelah Bumi menjadi belahan Utara dan Selatan serta melewati kota Pontianak disebut...',
        opts: ['Garis Bujur Utama', 'Garis Khatulistiwa (Ekuator)', 'Garis Internasional', 'Garis Balik Utara'],
        ans: 1,
        exp: 'Garis Khatulistiwa (Equator) berada di lintang 0 derajat.'
      }
    ]
  },
  ai_cyber: {
    category: 'Technology',
    titlePrefix: 'Kecerdasan Buatan (AI) & Keamanan Siber',
    items: [
      {
        q: 'Apa kepanjangan dari LLM dalam teknologi kecerdasan buatan modern seperti Gemini dan GPT?',
        opts: ['Linear Logic Machine', 'Large Language Model', 'Local Learning Module', 'Laser Link Memory'],
        ans: 1,
        exp: 'Large Language Model (LLM) adalah model bahasa berukuran besar yang dilatih dengan miliaran parameter teks.'
      },
      {
        q: 'Serangan siber yang menipu korban melalui email atau tautan palsu agar menyerahkan password atau OTP disebut...',
        opts: ['DDoS', 'Phishing', 'Defacing', 'Overclocking'],
        ans: 1,
        exp: 'Phishing memancing korban dengan menyamar sebagai institusi resmi untuk mencuri kredensial.'
      },
      {
        q: 'Metode keamanan yang mewajibkan pengguna memasukkan dua bukti identitas berbeda saat login disebut...',
        opts: ['Single Sign-On', 'Two-Factor Authentication (2FA)', 'Incognito Mode', 'Firewall Proxy'],
        ans: 1,
        exp: '2FA menggabungkan sesuatu yang diketahui (password) dan sesuatu yang dimiliki (kode OTP/biometrik).'
      },
      {
        q: 'Ilmuwan komputer Inggris yang menciptakan tes untuk menguji apakah mesin dapat berpikir seperti manusia adalah...',
        opts: ['Alan Turing', 'Tim Berners-Lee', 'Dennis Ritchie', 'Linus Torvalds'],
        ans: 0,
        exp: 'Alan Turing memperkenalkan Turing Test pada tahun 1950 dalam makalah Computing Machinery and Intelligence.'
      },
      {
        q: 'Malware berbahaya yang mengenkripsi seluruh file di komputer korban lalu meminta uang tebusan disebut...',
        opts: ['Adware', 'Ransomware', 'Spyware', 'Keylogger'],
        ans: 1,
        exp: 'Ransomware mengunci data dengan enkripsi dan menuntut tebusan (ransom) untuk membuka kuncinya.'
      },
      {
        q: 'Unit pemrosesan perangkat keras yang paling banyak digunakan untuk melatih model Deep Learning karena kemampuan komputasi paralelnya adalah...',
        opts: ['HDD / SSD', 'GPU / TPU', 'Sound Card', 'Power Supply'],
        ans: 1,
        exp: 'GPU (Graphics Processing Unit) dan TPU (Tensor Processing Unit) memiliki ribuan core paralel untuk matriks AI.'
      },
      {
        q: 'Protokol jaringan web yang sudah dienkripsi dengan TLS/SSL sehingga aman dari penyadapan ditandai dengan awalan...',
        opts: ['ftp://', 'http://', 'https://', 'ws://'],
        ans: 2,
        exp: 'HTTPS (Hypertext Transfer Protocol Secure) mengenkripsi komunikasi antara browser dan server.'
      },
      {
        q: 'Fenomena ketika model AI memberikan jawaban yang terdengar meyakinkan tetapi faktanya salah atau dikarang disebut...',
        opts: ['Overfitting', 'Halusinasi AI (Hallucination)', ' Tokenisasi', ' Quantization'],
        ans: 1,
        exp: 'Halusinasi terjadi ketika model generatif memprediksi kata yang tampak logis namun tidak akurat secara faktual.'
      },
      {
        q: 'Dalam pemrograman AI dan Data Science, bahasa pemrograman yang paling populer digunakan bersama library PyTorch dan TensorFlow adalah...',
        opts: ['PHP', 'Python', 'COBOL', 'Pascal'],
        ans: 1,
        exp: 'Python menjadi standar utama riset AI karena ekosistem pustaka komputasi ilmiahnya yang sangat lengkap.'
      },
      {
        q: 'Teks instruksi atau pertanyaan yang kita berikan kepada model AI generatif untuk menghasilkan output disebut...',
        opts: ['Prompt', 'Kernel', 'Socket', 'Binary'],
        ans: 0,
        exp: 'Prompt adalah instruksi masukan yang diberikan pengguna kepada model AI.'
      }
    ]
  },
  anime_pop: {
    category: 'Pop Culture',
    titlePrefix: 'Trivia Anime, Manga & Budaya Pop',
    items: [
      {
        q: 'Dalam anime One Piece, apa nama buah iblis yang dimakan oleh Monkey D. Luffy?',
        opts: ['Mera Mera no Mi', 'Gomu Gomu no Mi (Hito Hito no Mi Model Nika)', 'Ope Ope no Mi', 'Yami Yami no Mi'],
        ans: 1,
        exp: 'Buah tersebut dikenal sebagai Gomu Gomu no Mi yang membuat tubuh Luffy elastis seperti karet.'
      },
      {
        q: 'Siapakah nama karakter utama di anime Naruto yang bercita-cita menjadi Hokage di Desa Konoha?',
        opts: ['Sasuke Uchiha', 'Naruto Uzumaki', 'Kakashi Hatake', 'Gaara'],
        ans: 1,
        exp: 'Naruto Uzumaki akhirnya berhasil mewujudkan impiannya menjadi Hokage Ketujuh.'
      },
      {
        q: 'Studio animasi legendaris Jepang yang didirikan oleh Hayao Miyazaki dan memproduksi film Spirited Away adalah...',
        opts: ['Studio Ghibli', 'ufotable', 'MAPPA', 'Kyoto Animation'],
        ans: 0,
        exp: 'Studio Ghibli memenangkan Piala Oscar melalui film Spirited Away (Sen to Chihiro no Kamikakushi).'
      },
      {
        q: 'Dalam serial Dragon Ball, berapa jumlah bola naga yang harus dikumpulkan untuk memanggil dewa naga Shenron?',
        opts: ['5 Bola Naga', '7 Bola Naga', '9 Bola Naga', '12 Bola Naga'],
        ans: 1,
        exp: 'Terdapat 7 Dragon Ball (berbintang 1 hingga 7) untuk memanggil Shenron.'
      },
      {
        q: 'Siapakah pencipta manga detektif populer Detective Conan (Case Closed)?',
        opts: ['Eiichiro Oda', 'Masashi Kishimoto', 'Gosho Aoyama', 'Akira Toriyama'],
        ans: 2,
        exp: 'Gosho Aoyama mulai menerbitkan manga Detective Conan sejak tahun 1994.'
      },
      {
        q: 'Dalam anime Attack on Titan (Shingeki no Kyojin), pasukan elit yang bertugas menjelajah ke luar dinding menggunakan 3D Maneuver Gear adalah...',
        opts: ['Military Police Brigade', 'Survey Corps (Pasukan Pengintai)', 'Garrison Regiment', 'Marley Warriors'],
        ans: 1,
        exp: 'Survey Corps (Chosa Heidan) berlambang Sayap Kebebasan (Wings of Freedom).'
      },
      {
        q: 'Apa nama jurus pernapasan awal yang dikuasai Tanjiro Kamado saat pertama kali menjadi pembasmi iblis di Demon Slayer?',
        opts: ['Pernapasan Petir', 'Pernapasan Air (Mizu no Kokyu)', 'Pernapasan Suara', 'Pernapasan Serangga'],
        ans: 1,
        exp: 'Tanjiro mempelajari Pernapasan Air dari gurunya, Sakonji Urokodaki.'
      },
      {
        q: 'Robot kucing dari abad ke-22 yang memiliki kantong ajaib dan sangat menyukai kue Dorayaki adalah...',
        opts: ['Astro Boy', 'Doraemon', 'Gundam RX-78', 'Totoro'],
        ans: 1,
        exp: 'Doraemon karya Fujiko F. Fujio datang dari masa depan untuk membantu Nobita Nobi.'
      },
      {
        q: 'Film anime karya Makoto Shinkai tentang dua remaja Taki dan Mitsuha yang saling bertukar tubuh melintasi waktu adalah...',
        opts: ['Weathering With You', 'Your Name (Kimi no Na wa)', 'Suzume', '5 Centimeters per Second'],
        ans: 1,
        exp: 'Your Name (Kimi no Na wa) dirilis pada tahun 2016 dan menjadi fenomena box office global.'
      },
      {
        q: 'Dalam serial Pokemon, apakah tipe elemen utama dari Pikachu?',
        opts: ['Api (Fire)', 'Air (Water)', 'Listrik (Electric)', 'Rumput (Grass)'],
        ans: 2,
        exp: 'Pikachu adalah Pokemon tipe Listrik dengan jurus andalan Thunderbolt.'
      }
    ]
  }
};

function matchTopicKey(topic: string): string | null {
  const t = topic.toLowerCase();
  if (t.includes('sejarah') || t.includes('kemerdekaan') || t.includes('pahlawan') || t.includes('kerajaan')) return 'sejarah_indonesia';
  if (t.includes('bola') || t.includes('fifa') || t.includes('olahraga') || t.includes('liga') || t.includes('futsal')) return 'sepak_bola';
  if (t.includes('kuliner') || t.includes('makanan') || t.includes('masakan') || t.includes('rempah') || t.includes('nusantara')) return 'kuliner_nusantara';
  if (t.includes('biologi') || t.includes('tubuh') || t.includes('hewan') || t.includes('tumbuhan') || t.includes('alam') || t.includes('ipa')) return 'biologi_alam';
  if (t.includes('matematika') || t.includes('hitung') || t.includes('angka') || t.includes('aljabar') || t.includes('logika')) return 'matematika_kilat';
  if (t.includes('geografi') || t.includes('negara') || t.includes('benua') || t.includes('ibukota') || t.includes('ibu kota') || t.includes('bumi')) return 'geografi_dunia';
  if (t.includes('ai') || t.includes('cyber') || t.includes('komputer') || t.includes('coding') || t.includes('teknologi') || t.includes('program')) return 'ai_cyber';
  if (t.includes('anime') || t.includes('manga') || t.includes('one piece') || t.includes('naruto') || t.includes('kartun') || t.includes('game')) return 'anime_pop';
  return null;
}

function buildSynthesizedTopicQuestions(topic: string, count: number, difficulty: DifficultyLevel, timeLimit: number): QuizQuestion[] {
  const cleanTopic = topic.trim() || 'Pengetahuan Umum';
  const templates: RawQA[] = [
    {
      q: `Manakah pernyataan yang paling tepat menjelaskan konsep utama dari "${cleanTopic}"?`,
      opts: [
        `Bidang atau topik yang mempelajari prinsip inti dan penerapan ${cleanTopic} secara sistematis`,
        `Metode pengacakan data tanpa struktur yang tidak berkaitan dengan ${cleanTopic}`,
        `Istilah kuno yang hanya digunakan pada abad ke-12 untuk navigasi laut`,
        `Satuan ukuran berat benda padat di luar angkasa`
      ],
      ans: 0,
      exp: `Pemahaman dasar mengenai ${cleanTopic} berfokus pada prinsip inti dan penerapannya secara terstruktur.`
    },
    {
      q: `Dalam mempelajari "${cleanTopic}", langkah pertama yang paling efektif dilakukan oleh pemula adalah...`,
      opts: [
        `Memahami definisi dasar, istilah kunci, dan contoh nyata dari ${cleanTopic}`,
        `Mengabaikan konsep dasar dan langsung menghafal angka acak`,
        `Menghapus seluruh referensi utama yang berkaitan dengan ${cleanTopic}`,
        `Mengganti topik dengan bidang yang sama sekali berlawanan`
      ],
      ans: 0,
      exp: `Menguasai konsep dan terminologi dasar mempermudah pemahaman tingkat lanjut pada ${cleanTopic}.`
    },
    {
      q: `Apa manfaat utama dari penguasaan materi "${cleanTopic}" dalam pemecahan masalah praktis?`,
      opts: [
        `Membantu menganalisis situasi dan mengambil keputusan berbasis pengetahuan ${cleanTopic}`,
        `Membuat proses kerja menjadi lebih lambat dan tanpa arah`,
        `Menghilangkan kebutuhan akan evaluasi dan pengujian data`,
        `Membatasi kreativitas tim dalam berkolaborasi`
      ],
      ans: 0,
      exp: `Pengetahuan ${cleanTopic} diterapkan untuk analisis yang akurat dan pengambilan keputusan yang tepat.`
    },
    {
      q: `Faktor manakah yang paling menentukan keberhasilan implementasi "${cleanTopic}" di dunia nyata?`,
      opts: [
        `Konsistensi evaluasi, ketepatan metode, dan adaptasi terhadap perkembangan ${cleanTopic}`,
        `Menghindari pembaruan informasi selama puluhan tahun`,
        `Mengandalkan tebakan semata tanpa data pendukung`,
        `Menolak kerja sama lintas disiplin ilmu`
      ],
      ans: 0,
      exp: `Evaluasi berkala dan ketepatan metode sangat krusial dalam penerapan ${cleanTopic}.`
    },
    {
      q: `Pada tingkat kesulitan ${difficulty}, indikator bahwa seseorang telah menguasai "${cleanTopic}" adalah...`,
      opts: [
        `Mampu menjelaskan kembali konsep ${cleanTopic} secara sederhana sekaligus menerapkannya pada kasus baru`,
        `Hanya bisa menyalin teks tanpa memahami maksud dari ${cleanTopic}`,
        `Tidak dapat membedakan antara fakta dan opini terkait ${cleanTopic}`,
        `Menghindari diskusi atau pertanyaan seputar ${cleanTopic}`
      ],
      ans: 0,
      exp: `Kemampuan menjelaskan secara sederhana (teknik Feynman) dan menerapkannya pada studi kasus adalah bukti penguasaan ${cleanTopic}.`
    }
  ];

  // Combine with general knowledge items if count > templates.length
  const extraPool = [
    ...TOPIC_KNOWLEDGE_BANK.sejarah_indonesia.items.slice(0, 2),
    ...TOPIC_KNOWLEDGE_BANK.biologi_alam.items.slice(0, 2),
    ...TOPIC_KNOWLEDGE_BANK.geografi_dunia.items.slice(0, 2),
    ...TOPIC_KNOWLEDGE_BANK.ai_cyber.items.slice(0, 2),
  ];

  const combined = [...templates, ...extraPool].slice(0, count);

  return combined.map((item, idx) => {
    // Rotate options deterministically so correct answer isn't always index 0
    const shift = idx % 4;
    const rotatedOpts: string[] = ['', '', '', ''];
    let newCorrectIdx = 0;
    for (let i = 0; i < 4; i++) {
      const targetPos = (i + shift) % 4;
      rotatedOpts[targetPos] = item.opts[i];
      if (i === item.ans) {
        newCorrectIdx = targetPos;
      }
    }

    return {
      id: `q_gen_${Date.now()}_${idx}`,
      text: item.q,
      options: rotatedOpts,
      correctIndex: newCorrectIdx,
      timeLimit,
      explanation: item.exp,
    };
  });
}

export async function generateQuizByTopic(options: GenerateQuizOptions): Promise<QuizData> {
  const { topic, count, difficulty, timeLimit, apiKey } = options;
  const cleanTopic = topic.trim() || 'Pengetahuan Umum';

  // 1. If user supplied a Gemini API Key, try live Gemini structured generation first
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const prompt = `Buat paket kuis pilihan ganda berbahasa Indonesia tentang topik: "${cleanTopic}".
Tingkat kesulitan: ${difficulty}.
Jumlah soal: ${count} pertanyaan.
Kembalikan HANYA format JSON murni tanpa markdown codeblock dengan skema berikut:
{
  "title": "Judul Kuis Menarik",
  "category": "Edukasi",
  "description": "Deskripsi singkat kuis",
  "questions": [
    {
      "text": "Teks pertanyaan?",
      "options": ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
      "correctIndex": 0,
      "explanation": "Penjelasan singkat mengapa jawaban tersebut benar"
    }
  ]
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: 'application/json',
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const parsed = JSON.parse(rawText);
        if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          return {
            id: 'quiz_ai_' + Date.now(),
            title: parsed.title || `Kuis AI: ${cleanTopic}`,
            description: parsed.description || `Paket soal otomatis bertema ${cleanTopic} (${difficulty})`,
            category: parsed.category || 'Edukasi',
            icon: 'Sparkles',
            questions: parsed.questions.slice(0, count).map((q: any, idx: number) => ({
              id: `q_ai_${Date.now()}_${idx}`,
              text: String(q.text || `Pertanyaan #${idx + 1}`),
              options: Array.isArray(q.options) && q.options.length >= 4
                ? q.options.slice(0, 4).map(String)
                : ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
              correctIndex: typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex <= 3 ? q.correctIndex : 0,
              timeLimit,
              explanation: q.explanation ? String(q.explanation) : '',
            })),
          };
        }
      }
    } catch {
      // Fall back to built-in Smart Knowledge Bank below
    }
  }

  // 2. Built-in Instant Smart Knowledge Bank (works 100% offline & zero API key needed)
  const matchedKey = matchTopicKey(cleanTopic);
  if (matchedKey && TOPIC_KNOWLEDGE_BANK[matchedKey]) {
    const bank = TOPIC_KNOWLEDGE_BANK[matchedKey];
    const selectedItems = bank.items.slice(0, count);
    return {
      id: 'quiz_gen_' + Date.now(),
      title: `${bank.titlePrefix} (${difficulty})`,
      description: `Paket kuis otomatis seputar ${cleanTopic} dengan tingkat kesulitan ${difficulty.toLowerCase()}.`,
      category: bank.category,
      icon: 'Sparkles',
      questions: selectedItems.map((item, idx) => ({
        id: `q_bank_${Date.now()}_${idx}`,
        text: item.q,
        options: [...item.opts],
        correctIndex: item.ans,
        timeLimit,
        explanation: item.exp,
      })),
    };
  }

  // 3. Custom Topic Synthesizer
  return {
    id: 'quiz_custom_' + Date.now(),
    title: `Eksplorasi Topik: ${cleanTopic}`,
    description: `Paket soal interaktif seputar ${cleanTopic} (${difficulty}).`,
    category: 'Edukasi',
    icon: 'Sparkles',
    questions: buildSynthesizedTopicQuestions(cleanTopic, count, difficulty, timeLimit),
  };
}

// ---------------------------------------------------------------------------
// Multi-Format Smart Text / CSV Question Importer
// ---------------------------------------------------------------------------
export function parseQuickImportText(rawText: string, defaultTimeLimit = 15): QuizQuestion[] {
  const results: QuizQuestion[] = [];
  const trimmed = rawText.trim();
  if (!trimmed) return results;

  const lines = trimmed
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // Format 1: Pipe (|) or Semicolon (;) or Tab delimited single-line rows
  // Example: Ibu kota Indonesia? | Jakarta | Bandung | Surabaya | Medan | A | 15
  const pipeLines = lines.filter((l) => l.includes('|') || l.split(';').length >= 5 || l.split('\t').length >= 5);
  if (pipeLines.length > 0 && pipeLines.length >= lines.length * 0.5) {
    pipeLines.forEach((line, idx) => {
      const sep = line.includes('|') ? '|' : line.includes('\t') ? '\t' : ';';
      const parts = line.split(sep).map((p) => p.trim());
      if (parts.length >= 5) {
        const qText = parts[0].replace(/^\d+[\.\)]\s*/, '');
        const opts = [parts[1], parts[2], parts[3], parts[4]].map((o) => o.replace(/^\*|\*$/g, '').trim());
        let correctIdx = 0;

        // Check if any option had an asterisk *
        [parts[1], parts[2], parts[3], parts[4]].forEach((rawOpt, oIdx) => {
          if (rawOpt.includes('*')) correctIdx = oIdx;
        });

        // Or check 6th column (A/B/C/D or 1/2/3/4 or 0/1/2/3)
        if (parts[5]) {
          const keyToken = parts[5].toUpperCase().trim();
          if (keyToken === 'A' || keyToken === '1') correctIdx = 0;
          else if (keyToken === 'B' || keyToken === '2') correctIdx = 1;
          else if (keyToken === 'C' || keyToken === '3') correctIdx = 2;
          else if (keyToken === 'D' || keyToken === '4') correctIdx = 3;
        }

        const parsedTime = parts[6] ? parseInt(parts[6], 10) : defaultTimeLimit;
        const explanation = parts[7] || '';

        results.push({
          id: `q_imp_${Date.now()}_${idx}`,
          text: qText,
          options: opts,
          correctIndex: correctIdx,
          timeLimit: !isNaN(parsedTime) && parsedTime >= 5 ? parsedTime : defaultTimeLimit,
          explanation,
        });
      }
    });
    if (results.length > 0) return results;
  }

  // Format 2: Multi-line block format
  // Question line followed by A. / B. / C. / D. (with * on correct option or "Kunci: B" / "Jawaban: B")
  let currentQ: string | null = null;
  let currentOpts: string[] = [];
  let currentCorrect = 0;
  let currentExp = '';

  const flushCurrent = () => {
    if (currentQ && currentOpts.length >= 2) {
      while (currentOpts.length < 4) {
        currentOpts.push(`Pilihan ${['A', 'B', 'C', 'D'][currentOpts.length]}`);
      }
      results.push({
        id: `q_blk_${Date.now()}_${results.length}`,
        text: currentQ,
        options: currentOpts.slice(0, 4),
        correctIndex: currentCorrect,
        timeLimit: defaultTimeLimit,
        explanation: currentExp,
      });
    }
    currentQ = null;
    currentOpts = [];
    currentCorrect = 0;
    currentExp = '';
  };

  for (const line of lines) {
    const optMatch = line.match(/^([A-Da-d])[\.\)\:]\s*(.+)$/);
    const keyMatch = line.match(/^(?:kunci|jawaban|answer)\s*[\:\=]\s*([A-Da-d1-4])/i);
    const expMatch = line.match(/^(?:penjelasan|pembahasan|explanation|info)\s*[\:\=]\s*(.+)$/i);

    if (optMatch && currentQ) {
      let optText = optMatch[2].trim();
      const idx = optMatch[1].toUpperCase().charCodeAt(0) - 65;
      if (optText.endsWith('*') || optText.startsWith('*') || optText.includes('(Benar)')) {
        currentCorrect = idx >= 0 && idx <= 3 ? idx : currentOpts.length;
        optText = optText.replace(/\*|\(Benar\)/gi, '').trim();
      }
      currentOpts.push(optText);
    } else if (keyMatch && currentQ) {
      const k = keyMatch[1].toUpperCase();
      if (k === 'A' || k === '1') currentCorrect = 0;
      else if (k === 'B' || k === '2') currentCorrect = 1;
      else if (k === 'C' || k === '3') currentCorrect = 2;
      else if (k === 'D' || k === '4') currentCorrect = 3;
    } else if (expMatch && currentQ) {
      currentExp = expMatch[1].trim();
    } else {
      // New question line
      if (currentQ && currentOpts.length >= 2) {
        flushCurrent();
      }
      currentQ = line.replace(/^(?:soal\s*#?\d*[\.\:\)]|\d+[\.\)])\s*/i, '').trim();
    }
  }

  flushCurrent();
  return results;
}

export const SAMPLE_IMPORT_TEXT = `1. Apakah nama satelit alami satu-satunya milik planet Bumi?
A. Phobos
B. Bulan (Moon) *
C. Titan
D. Europa
Penjelasan: Bulan adalah satelit alami satu-satunya yang mengorbit Bumi.

2. Hewan khas pulau Komodo di Nusa Tenggara Timur termasuk dalam kelompok...
A. Amfibi
B. Mamalia
C. Reptil *
D. Aves
Penjelasan: Komodo (Varanus komodoensis) adalah spesies kadal terbesar di dunia yang termasuk kelas Reptilia.

3. Ibu kota Provinsi Bali adalah? | Kuta | Ubud | Denpasar * | Singaraja | C | 15 | Denpasar merupakan ibu kota resmi Provinsi Bali.`;
