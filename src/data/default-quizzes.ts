import type { QuizData } from '../types/quiz';

export const DEFAULT_QUIZZES: QuizData[] = [
  {
    id: 'web-dev-trivia',
    title: '🌐 Web Development & Modern JS',
    description: 'Uji wawasan seputar JavaScript, React, Astro, dan web modern!',
    category: 'Technology',
    icon: 'Code2',
    questions: [
      {
        id: 'q1',
        text: 'Apa konsep utama yang membuat framework Astro sangat cepat secara default?',
        options: [
          'Virtual DOM ganda',
          'Islands Architecture (Zero JS by default)',
          'Single Page Application (SPA) total',
          'Serverless Database'
        ],
        correctIndex: 1,
        timeLimit: 15,
        explanation: 'Astro menggunakan konsep Islands Architecture di mana halaman HTML murni dikirimkan, dan JavaScript hanya dihidrasi di komponen pulau (island) yang interaktif.'
      },
      {
        id: 'q2',
        text: 'Manakah direktif Astro berikut yang menghidrasi komponen React HANYA saat elemen masuk ke viewport layar?',
        options: [
          'client:load',
          'client:idle',
          'client:visible',
          'client:only="react"'
        ],
        correctIndex: 2,
        timeLimit: 15,
        explanation: 'client:visible menggunakan Intersection Observer untuk memuat JS saat komponen mulai terlihat di viewport pengguna.'
      },
      {
        id: 'q3',
        text: 'Di React, hook manakah yang paling tepat digunakan untuk menyimpan referensi DOM atau nilai yang tidak memicu re-render?',
        options: [
          'useState',
          'useMemo',
          'useRef',
          'useCallback'
        ],
        correctIndex: 2,
        timeLimit: 15,
        explanation: 'useRef mengembalikan mutable ref object yang properti .current-nya persisten antar render tanpa memicu re-render ulang.'
      },
      {
        id: 'q4',
        text: 'Protokol apa yang umumnya digunakan untuk komunikasi dua arah real-time dengan latensi rendah pada web quiz ini?',
        options: [
          'HTTP Long Polling',
          'WebSocket (WS / WSS)',
          'FTP',
          'SMTP'
        ],
        correctIndex: 1,
        timeLimit: 15,
        explanation: 'WebSocket menyediakan koneksi full-duplex persistent melalui satu socket TCP tunggal.'
      },
      {
        id: 'q5',
        text: 'Library state management ultra-ringan apa yang direkomendasikan Astro untuk berbagi state antar berbagai framework island?',
        options: [
          'Redux Toolkit',
          'MobX',
          'Nano Stores',
          'Vuex'
        ],
        correctIndex: 2,
        timeLimit: 15,
        explanation: 'Nano Stores adalah state manager agnostik seberat ~1KB yang sangat ramah untuk multi-framework di Astro.'
      }
    ]
  },
  {
    id: 'general-science',
    title: '🚀 Sains & Pengetahuan Umum',
    description: 'Tantangan seru seputar sains, luar angkasa, dan teknologi.',
    category: 'Science',
    icon: 'Atom',
    questions: [
      {
        id: 'qs1',
        text: 'Berapakah kecepatan cahaya di ruang hampa udara (kira-kira)?',
        options: [
          '300.000 km/detik',
          '150.000 km/detik',
          '3.000 km/detik',
          '1.000.000 km/detik'
        ],
        correctIndex: 0,
        timeLimit: 15,
        explanation: 'Kecepatan cahaya (c) adalah sekitar 299.792 km/detik atau dibulatkan menjadi 300.000 km/detik.'
      },
      {
        id: 'qs2',
        text: 'Planet apakah di tata surya kita yang memiliki julukan "Planet Merah"?',
        options: [
          'Venus',
          'Jupiter',
          'Mars',
          'Merkurius'
        ],
        correctIndex: 2,
        timeLimit: 15,
        explanation: 'Mars dijuluki Planet Merah karena banyaknya kandungan besi oksida (karat) di permukaannya.'
      },
      {
        id: 'qs3',
        text: 'Bahasa pemrograman komputer tingkat tinggi pertama di dunia adalah...',
        options: [
          'C',
          'Fortran',
          'COBOL',
          'Assembly'
        ],
        correctIndex: 1,
        timeLimit: 15,
        explanation: 'Fortran (Formula Translation) dikembangkan oleh IBM pada tahun 1957.'
      }
    ]
  }
];
