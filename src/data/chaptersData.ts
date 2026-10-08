import { Chapter } from '../types';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    slug: 'mengenal-pecahan',
    title: 'Bab 1: Misteri Pizza Kedai Kiki',
    subtitle: 'Mengenal Konsep Pecahan, Pembilang, dan Penyebut',
    storyDescription: 'Kiki Si Kelinci baru saja memanggang pizza lezat! Datang dua sahabat yang ingin berbagi sama rata. Bagaimana caranya?',
    themeColor: 'from-amber-500 to-orange-600',
    badgeId: 'badge_bab1',
    coverImage: '/src/assets/images/comic_pizza_intro_1791454180778.jpg',
    interactiveExplainer: {
      title: 'Dapur Potong Pizza Ajaib',
      description: 'Coba potong pizza menjadi 2, 4, atau 8 bagian sama besar, lalu ambil potongan untuk melihat pecahannya!',
      type: 'pizza',
    },
    panels: [
      {
        id: '1-1',
        order: 1,
        characterName: 'Kiki Kelinci',
        characterAvatar: 'kiki',
        narrative: 'Di sebuah kedai kecil di Hutan Ceria, aroma harum semerbak keluar dari oven...',
        dialogue: 'Horeee! Pizza keju spesialku sudah matang dengan sempurna! Bulat utuh dan wangi sekali! 🍕',
        illustrationType: 'comic-scene',
        imageSrc: '/src/assets/images/comic_pizza_intro_1791454180778.jpg',
        visualProps: { scene: 'kitchen_start', wholeItem: 'pizza' },
        tipBubble: 'Benda utuh bernilai 1 bagian utuh (1).'
      },
      {
        id: '1-2',
        order: 2,
        characterName: 'Bimo & Piko',
        characterAvatar: 'bimo',
        narrative: 'Tiba-tiba pintu kedai terbuka lebar. Bimo dan Piko datang dengan perut keroncongan!',
        dialogue: 'Kiki! Kami lapar sekali setelah berpetualang. Boleh kami minta pizzamu? Kami bagi berdua sama rata ya!',
        illustrationType: 'comic-scene',
        visualProps: { scene: 'friends_arrive' }
      },
      {
        id: '1-3',
        order: 3,
        characterName: 'Piko Burung Hantu',
        characterAvatar: 'piko',
        narrative: 'Piko mengeluarkan pisau pemotong pizza dengan mata berbinar.',
        dialogue: 'Untuk membagi adil kepada 2 orang, pizza 1 utuh ini harus dipotong menjadi 2 bagian yang SAMA BESAR! Sreeet!',
        illustrationType: 'pizza-slice',
        visualProps: { denominator: 2, numerator: 1, animatedCut: true },
        tipBubble: 'Kunci pecahan: Semua potongan HARUS SAMA BESAR (adil)!'
      },
      {
        id: '1-4',
        order: 4,
        characterName: 'Piko Burung Hantu',
        characterAvatar: 'piko',
        narrative: 'Piko mengangkat 1 potong pizza ke udara dan menjelaskan rahasia angka ajaib.',
        dialogue: 'Satu potong pizza ini disebut "Satu per Dua" atau Setengah, ditulis 1/2. Angka 1 di atas disebut PEMBILANG, dan angka 2 di bawah disebut PENYEBUT!',
        illustrationType: 'pizza-slice',
        visualProps: { denominator: 2, numerator: 1, showFormula: true },
        tipBubble: 'Pembilang = Bagian yang diambil/dimakan. Penyebut = Jumlah SEMUA potongan sama rata.'
      },
      {
        id: '1-5',
        order: 5,
        characterName: 'Kiki Kelinci',
        characterAvatar: 'kiki',
        narrative: 'Tiba-tiba datang lagi dua teman beruang kecil yang juga lapar!',
        dialogue: 'Aha! Berarti kalau pizza dipotong rata jadi 4 potong, lalu aku mengambil 1 potong, bagianku bernilai 1/4 (Satu per Empat)! Betul kan, Piko?',
        illustrationType: 'pizza-slice',
        visualProps: { denominator: 4, numerator: 1 },
        tipBubble: '1/4 dibaca "satu per empat" atau "seperempat".'
      },
      {
        id: '1-6',
        order: 6,
        characterName: 'Chef Dono',
        characterAvatar: 'chef',
        narrative: 'Chef Dono tersenyum bangga memberikan jempol koki keemasan.',
        dialogue: 'Tepat sekali! Kalau kamu makan 3 potong dari 4 potong yang ada, maka kamu makan 3/4 bagian! Sekarang, mari kita coba di dapur potong!',
        illustrationType: 'pizza-slice',
        visualProps: { denominator: 4, numerator: 3 }
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Sebuah semangka dipotong menjadi 4 bagian sama besar. Kiki memakan 1 bagian. Berapa nilai pecahan semangka yang dimakan Kiki?',
        fractionDisplay: { numerator: 1, denominator: 4 },
        options: [
          { id: 'a', text: '1/2', fraction: { numerator: 1, denominator: 2 }, isCorrect: false },
          { id: 'b', text: '1/4', fraction: { numerator: 1, denominator: 4 }, isCorrect: true },
          { id: 'c', text: '3/4', fraction: { numerator: 3, denominator: 4 }, isCorrect: false },
          { id: 'd', text: '4/1', fraction: { numerator: 4, denominator: 1 }, isCorrect: false },
        ],
        explanation: 'Semangka dipotong 4 sama besar (penyebut = 4), dan Kiki memakan 1 potong (pembilang = 1). Maka pecahannya adalah 1/4.',
        visualHint: '1 potong dari total 4 potong sama rata.'
      },
      {
        id: 'q1-2',
        question: 'Pada pecahan 3/8, manakah angka yang merupakan PENYEBUT?',
        options: [
          { id: 'a', text: 'Angka 3 (di atas)', isCorrect: false },
          { id: 'b', text: 'Angka 8 (di bawah)', isCorrect: true },
          { id: 'c', text: 'Garis pemisah', isCorrect: false },
          { id: 'd', text: 'Keduanya', isCorrect: false },
        ],
        explanation: 'Angka di bagian bawah pecahan disebut PENYEBUT (menunjukkan total seluruh bagian). Angka di bagian atas disebut PEMBILANG.',
        visualHint: 'Ingat: Pembilang di atas, Penyebut di bawah!'
      },
      {
        id: 'q1-3',
        question: 'Ibu membagi martabak menjadi 6 potong sama rata. Bimo memakan 2 potong. Bagian martabak yang dimakan Bimo adalah...',
        fractionDisplay: { numerator: 2, denominator: 6 },
        options: [
          { id: 'a', text: '2/6 bagian', fraction: { numerator: 2, denominator: 6 }, isCorrect: true },
          { id: 'b', text: '6/2 bagian', fraction: { numerator: 6, denominator: 2 }, isCorrect: false },
          { id: 'c', text: '4/6 bagian', fraction: { numerator: 4, denominator: 6 }, isCorrect: false },
          { id: 'd', text: '1/6 bagian', fraction: { numerator: 1, denominator: 6 }, isCorrect: false },
        ],
        explanation: 'Ada 6 bagian sama banyak (penyebut = 6), dan Bimo mengambil 2 bagian (pembilang = 2). Jadi 2/6 bagian martabak.',
        visualHint: 'Pembilang = 2, Penyebut = 6.'
      },
      {
        id: 'q1-4',
        question: 'Syarat utama agar potongan benda bisa disebut pecahan yang benar adalah...',
        options: [
          { id: 'a', text: 'Ukurannya harus bebas sembarang', isCorrect: false },
          { id: 'b', text: 'Semua potongan harus SAMA BESAR (adil)', isCorrect: true },
          { id: 'c', text: 'Harus dipotong berbentuk segitiga', isCorrect: false },
          { id: 'd', text: 'Harus ada rasa cokelatnya', isCorrect: false },
        ],
        explanation: 'Pecahan matematika mewakili bagian dari keseluruhan yang terbagi secara sama rata / adil (identik).',
        visualHint: 'Adil = Ukuran potongan sama persis!'
      }
    ]
  },
  {
    id: 2,
    slug: 'pecahan-senilai',
    title: 'Bab 2: Rahasia Cokelat Kembar',
    subtitle: 'Memahami Pecahan Senilai (Sama Nilai Meski Beda Wajah)',
    storyDescription: 'Bimo dan Kiki masing-masing membawa batang cokelat berukuran sama. Bimo makan 1/2, sedangkan Kiki makan 2/4. Siapa yang lebih banyak makan?',
    themeColor: 'from-amber-700 to-yellow-600',
    badgeId: 'badge_bab2',
    coverImage: '/src/assets/images/comic_chocolate_detective_1791454195396.jpg',
    interactiveExplainer: {
      title: 'Laboratorium Cokelat Senilai',
      description: 'Bandingkan batangan cokelat! Lihat bagaimana 1/2 memiliki luas yang persis sama dengan 2/4 dan 4/8!',
      type: 'chocolate',
    },
    panels: [
      {
        id: '2-1',
        order: 1,
        characterName: 'Bimo Petualang',
        characterAvatar: 'bimo',
        narrative: 'Di bawah pohon rindang, Bimo memamerkan cokelat batangnya yang panjang.',
        dialogue: 'Lihat cokelatku! Aku potong jadi 2 bagian besar, dan aku makan 1 potong! Artinya aku makan 1/2 cokelat!',
        illustrationType: 'chocolate-bar',
        visualProps: { splitCount: 2, eatenCount: 1 }
      },
      {
        id: '2-2',
        order: 2,
        characterName: 'Kiki Kelinci',
        characterAvatar: 'kiki',
        narrative: 'Kiki mengeluarkan cokelat dengan ukuran panjang dan tebal yang SAMA PERSIS.',
        dialogue: 'Cokelatku ukurannya persis sama denganmu, Bimo! Tapi aku memotongnya jadi 4 kotak kecil dan aku makan 2 kotak! Aku makan 2/4 cokelat. Berarti aku makan lebih banyak kan?',
        illustrationType: 'chocolate-bar',
        visualProps: { splitCount: 4, eatenCount: 2 }
      },
      {
        id: '2-3',
        order: 3,
        characterName: 'Piko Burung Hantu',
        characterAvatar: 'piko',
        narrative: 'Piko terbang mendekat sambil membawa kaca pembesar detektif.',
        dialogue: 'Tunggu dulu Kiki! Jangan terkecoh oleh banyaknya potongan! Coba kita sejajarkan kedua cokelat kalian berdampingan!',
        illustrationType: 'comic-scene',
        imageSrc: '/src/assets/images/comic_chocolate_detective_1791454195396.jpg',
        visualProps: { scene: 'magnifying_detective' }
      },
      {
        id: '2-4',
        order: 4,
        characterName: 'Piko Burung Hantu',
        characterAvatar: 'piko',
        narrative: 'Kedua cokelat diletakkan di atas meja secara sejajar...',
        dialogue: 'Tadaa! Perhatikan baik-baik: 1 potong milik Bimo (1/2) panjangnya SAMA PERSIS dengan 2 potong milik Kiki (2/4)! Kalian berdua makan cokelat sama banyaknya!',
        illustrationType: 'chocolate-bar',
        visualProps: { splitCount: 4, eatenCount: 2, compareWithHalf: true },
        tipBubble: '1/2 dan 2/4 disebut PECAHAN SENILAI karena nilainya sama besar.'
      },
      {
        id: '2-5',
        order: 5,
        characterName: 'Chef Dono',
        characterAvatar: 'chef',
        narrative: 'Chef Dono membagikan jurus kilat matematika.',
        dialogue: 'Trik koki pintar: Jika pembilang dan penyebut dikali atau dibagi dengan angka yang SAMA, hasilnya adalah pecahan senilai! Contoh: (1 × 2) / (2 × 2) = 2/4! Bahkan sama juga dengan 4/8!',
        illustrationType: 'chocolate-bar',
        visualProps: { splitCount: 8, eatenCount: 4 }
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Manakah pecahan di bawah ini yang SENILAI dengan 1/2?',
        fractionDisplay: { numerator: 1, denominator: 2 },
        options: [
          { id: 'a', text: '1/3', isCorrect: false },
          { id: 'b', text: '2/4', isCorrect: true },
          { id: 'c', text: '2/5', isCorrect: false },
          { id: 'd', text: '3/8', isCorrect: false },
        ],
        explanation: 'Jika pembilang (1) dikali 2 menjadi 2, dan penyebut (2) dikali 2 menjadi 4, didapat 2/4. Luas bagian 1/2 sama dengan 2/4!',
        visualHint: 'Kalikan atas dan bawah dengan 2: 1/2 = 2/4.'
      },
      {
        id: 'q2-2',
        question: 'Pecahan 2/6 senilai dengan...',
        fractionDisplay: { numerator: 2, denominator: 6 },
        options: [
          { id: 'a', text: '1/3', isCorrect: true },
          { id: 'b', text: '1/2', isCorrect: false },
          { id: 'c', text: '2/3', isCorrect: false },
          { id: 'd', text: '3/6', isCorrect: false },
        ],
        explanation: 'Bagi pembilang dan penyebut dengan 2: 2 ÷ 2 = 1, dan 6 ÷ 2 = 3. Hasilnya adalah 1/3 (disederhanakan).',
        visualHint: 'Sederhanakan dengan membagi 2 di atas dan bawah.'
      },
      {
        id: 'q2-3',
        question: 'Jika 3/4 diubah menjadi pecahan senilai dengan penyebut 8, maka pembilangnya adalah...',
        options: [
          { id: 'a', text: '5', isCorrect: false },
          { id: 'b', text: '6', isCorrect: true },
          { id: 'c', text: '7', isCorrect: false },
          { id: 'd', text: '8', isCorrect: false },
        ],
        explanation: 'Penyebut dari 4 menjadi 8 artinya dikali 2. Maka pembilang juga harus dikali 2: 3 × 2 = 6. Jadi 6/8.',
        visualHint: '4 × 2 = 8, maka 3 × 2 = ?'
      },
      {
        id: 'q2-4',
        question: 'Apakah 1/2 senilai dengan 5/10?',
        options: [
          { id: 'a', text: 'Ya, benar sekali (senilai)', isCorrect: true },
          { id: 'b', text: 'Tidak, 5/10 jauh lebih kecil', isCorrect: false },
          { id: 'c', text: 'Tidak, 5/10 jauh lebih besar', isCorrect: false },
          { id: 'd', text: 'Hanya senilai jika bendanya kue', isCorrect: false },
        ],
        explanation: 'Ya! 5 adalah setengah dari 10. Jika 1/2 dikali 5 atas dan bawah, hasilnya tepat 5/10.',
        visualHint: '1 × 5 = 5, 2 × 5 = 10.'
      }
    ]
  },
  {
    id: 3,
    slug: 'membandingkan-pecahan',
    title: 'Bab 3: Siapa yang Dapat Lebih Besar?',
    subtitle: 'Membandingkan dan Mengurutkan Ukuran Pecahan',
    storyDescription: 'Di meja makan, Kiki diberi pilihan kue bolu: 1/3 atau 1/6? Kiki mengira 1/6 lebih besar karena angka 6 lebih besar! Benarkah?',
    themeColor: 'from-blue-600 to-indigo-700',
    badgeId: 'badge_bab3',
    coverImage: '/src/assets/images/comic_balance_scale_1791459270661.jpg',
    interactiveExplainer: {
      title: 'Timbangan Ajaib Pecahan',
      description: 'Letakkan pecahan di piring timbangan kiri dan kanan! Lihat ke mana timbangan miring untuk mengetahui mana yang lebih berat/besar!',
      type: 'balance',
    },
    panels: [
      {
        id: '3-1',
        order: 1,
        characterName: 'Kiki Kelinci',
        characterAvatar: 'kiki',
        narrative: 'Chef Dono menawarkan dua piring kue bolu lezat.',
        dialogue: 'Pilihanku antara 1/3 kue bolu atau 1/6 kue bolu. Aku mau yang paling besar, jadi aku pilih 1/6 dong! Kan angka 6 lebih besar daripada 3! Hehehe!',
        illustrationType: 'comic-scene',
        imageSrc: '/src/assets/images/comic_balance_scale_1791459270661.jpg',
        visualProps: { scene: 'cake_choice' }
      },
      {
        id: '3-2',
        order: 2,
        characterName: 'Piko Burung Hantu',
        characterAvatar: 'piko',
        narrative: 'Piko langsung menepuk jidatnya sambil tersenyum geli.',
        dialogue: 'Eits, jangan tertipu angka Kiki! Ingat, penyebut itu artinya dibagikan ke berapa banyak teman! Kalau dibagi ke 6 anak, potongannya justru jadi LEBIH KECIL!',
        illustrationType: 'comic-scene',
        visualProps: { scene: 'facepalm' },
        tipBubble: 'Makin banyak orang yang membagi (penyebut besar), potongan kue makin kecil!'
      },
      {
        id: '3-3',
        order: 3,
        characterName: 'Piko Burung Hantu',
        characterAvatar: 'piko',
        narrative: 'Piko meletakkan dua kue di atas timbangan ajaib.',
        dialogue: 'Bayangkan 1 kue dibagi 3 orang vs 1 kue dibagi 6 orang. Tentu potongan untuk 3 orang jauh lebih tebal dan kenyang! Jadi, 1/3 LEBIH BESAR daripada 1/6 (1/3 > 1/6)!',
        illustrationType: 'balance-scale',
        visualProps: { leftFrac: { n: 1, d: 3 }, rightFrac: { n: 1, d: 6 } }
      },
      {
        id: '3-4',
        order: 4,
        characterName: 'Bimo Petualang',
        characterAvatar: 'bimo',
        narrative: 'Bimo kemudian bertanya bagaimana jika penyebutnya sama.',
        dialogue: 'Bagaimana kalau penyebutnya sama, Piko? Misalnya 2/5 kue bolu dibandingkan 4/5 kue bolu?',
        illustrationType: 'balance-scale',
        visualProps: { leftFrac: { n: 2, d: 5 }, rightFrac: { n: 4, d: 5 } }
      },
      {
        id: '3-5',
        order: 5,
        characterName: 'Chef Dono',
        characterAvatar: 'chef',
        narrative: 'Chef Dono membentangkan papan rumus tanda perbandingan.',
        dialogue: 'Jika penyebutnya sama (kue sama besar), cukup lihat pembilangnya! 4 potong tentu lebih banyak daripada 2 potong! Jadi 2/5 < 4/5 (Dua per lima lebih kecil dari empat per lima)!',
        illustrationType: 'comic-scene',
        visualProps: { scene: 'comparison_signs' },
        tipBubble: 'Tanda > artinya Lebih Besar. Tanda < artinya Lebih Kecil. Tanda = artinya Sama Dengan.'
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Manakah tanda yang tepat untuk mengisi titik-titik: 1/4 ... 1/2 ?',
        options: [
          { id: 'a', text: '< (Lebih Kecil)', isCorrect: true },
          { id: 'b', text: '> (Lebih Besar)', isCorrect: false },
          { id: 'c', text: '= (Sama Dengan)', isCorrect: false },
          { id: 'd', text: '+ (Tambah)', isCorrect: false },
        ],
        explanation: 'Kue dibagi 4 menghasilkan potongan yang lebih kecil daripada kue yang hanya dibagi 2. Jadi 1/4 < 1/2.',
        visualHint: 'Potongan 1/4 lebih kecil dari potongan 1/2.'
      },
      {
        id: 'q3-2',
        question: 'Bandingkan kedua pecahan ini: 5/8 ... 3/8',
        options: [
          { id: 'a', text: '5/8 < 3/8', isCorrect: false },
          { id: 'b', text: '5/8 > 3/8', isCorrect: true },
          { id: 'c', text: '5/8 = 3/8', isCorrect: false },
          { id: 'd', text: 'Tidak bisa dibandingkan', isCorrect: false },
        ],
        explanation: 'Karena penyebutnya sama-sama 8, kita bandingkan pembilangnya. Angka 5 lebih besar daripada 3, jadi 5/8 > 3/8.',
        visualHint: 'Penyebut sama (8), bandingkan 5 dan 3.'
      },
      {
        id: 'q3-3',
        question: 'Urutan pecahan dari yang TERKECIL ke terbesar adalah...',
        options: [
          { id: 'a', text: '1/2, 1/3, 1/4', isCorrect: false },
          { id: 'b', text: '1/4, 1/3, 1/2', isCorrect: true },
          { id: 'c', text: '1/3, 1/4, 1/2', isCorrect: false },
          { id: 'd', text: '1/2, 1/4, 1/3', isCorrect: false },
        ],
        explanation: 'Penyebut paling besar (4) menghasilkan potongan terkecil: 1/4 paling kecil, lalu 1/3, dan 1/2 paling besar.',
        visualHint: 'Makin besar penyebut, makin kecil nilainya (untuk pembilang 1).'
      },
      {
        id: 'q3-4',
        question: 'Siti memakan 3/7 semangka, Dayu memakan 2/7 semangka. Siapakah yang memakan lebih banyak semangka?',
        options: [
          { id: 'a', text: 'Siti (3/7)', isCorrect: true },
          { id: 'b', text: 'Dayu (2/7)', isCorrect: false },
          { id: 'c', text: 'Keduanya memakan sama banyak', isCorrect: false },
          { id: 'd', text: 'Tidak tahu', isCorrect: false },
        ],
        explanation: 'Penyebutnya sama (7). Siti makan 3 bagian sedangkan Dayu makan 2 bagian. 3/7 > 2/7, jadi Siti makan lebih banyak.',
        visualHint: '3 bagian > 2 bagian.'
      }
    ]
  },
  {
    id: 4,
    slug: 'penjumlahan-pengurangan-pecahan',
    title: 'Bab 4: Pesta Jus & Buah Ceria',
    subtitle: 'Penjumlahan dan Pengurangan Pecahan Berpenyebut Sama',
    storyDescription: 'Kiki dan teman-teman mengadakan pesta jus buah segar! Mereka mencampurkan jus jeruk ke dalam gelas ukur bersama-sama.',
    themeColor: 'from-emerald-600 to-teal-700',
    badgeId: 'badge_bab4',
    coverImage: '/src/assets/images/comic_juice_party_1791454236004.jpg',
    interactiveExplainer: {
      title: 'Gelas Takar Jus Ajaib',
      description: 'Tuangkan jus porsi pertama dan kedua ke dalam satu gelas takar! Amati bagaimana pecahan bertambah!',
      type: 'juice',
    },
    panels: [
      {
        id: '4-1',
        order: 1,
        characterName: 'Kiki Kelinci',
        characterAvatar: 'kiki',
        narrative: 'Hari sangat cerah, cocok sekali membuat pesta jus jeruk dingin!',
        dialogue: 'Aku menuang 2/5 liter jus jeruk manis ke dalam gelas takar besar ini! Lihat garis batasnya di angka 2!',
        illustrationType: 'juice-cup',
        visualProps: { capacity: 5, fillLevel: 2, label: '2/5 Liter' }
      },
      {
        id: '4-2',
        order: 2,
        characterName: 'Bimo Petualang',
        characterAvatar: 'bimo',
        narrative: 'Bimo datang membawa teko jus tambahan.',
        dialogue: 'Segar sekali! Aku tambahkan lagi 1/5 liter jus jeruk milikku ke gelas yang sama ya!',
        illustrationType: 'juice-cup',
        visualProps: { capacity: 5, fillLevel: 3, label: '2/5 + 1/5' }
      },
      {
        id: '4-3',
        order: 3,
        characterName: 'Kiki Kelinci',
        characterAvatar: 'kiki',
        narrative: 'Kiki bertanya-tanya menghitung hasil campurannya.',
        dialogue: 'Berapa total jus di gelas sekarang? Apakah 2/5 + 1/5 = 3/10 liter?',
        illustrationType: 'comic-scene',
        imageSrc: '/src/assets/images/comic_juice_party_1791454236004.jpg',
        visualProps: { scene: 'question_bubble' }
      },
      {
        id: '4-4',
        order: 4,
        characterName: 'Piko Burung Hantu',
        characterAvatar: 'piko',
        narrative: 'Piko segera melambaikan sayapnya dengan peringatan koki ramah.',
        dialogue: 'STOP! Jangan jumlahkan angka penyebutnya! Ukuran gelasnya tetap dibagi 5! Yang bertambah HANYA pembilangnya: 2 + 1 = 3! Jadi hasilnya 3/5 liter!',
        illustrationType: 'juice-cup',
        visualProps: { capacity: 5, fillLevel: 3, label: '3/5 Liter', showFormula: true },
        tipBubble: 'Aturan Emas: Pecahan berpenyebut sama, jumlahkan PEMBILANGNYA saja! Penyebut tetap sama!'
      },
      {
        id: '4-5',
        order: 5,
        characterName: 'Chef Dono',
        characterAvatar: 'chef',
        narrative: 'Chef Dono menunjukkan contoh pengurangan.',
        dialogue: 'Sama halnya dengan pengurangan! Jika ada 4/6 pizza lalu dimakan 1/6 pizza, sisa pizzanya adalah (4 - 1)/6 = 3/6 pizza (atau senilai dengan 1/2)! Mudah sekali kan?',
        illustrationType: 'pizza-slice',
        visualProps: { denominator: 6, numerator: 3 }
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Berapakah hasil dari 2/7 + 3/7 = ...',
        options: [
          { id: 'a', text: '5/14', isCorrect: false },
          { id: 'b', text: '5/7', isCorrect: true },
          { id: 'c', text: '6/7', isCorrect: false },
          { id: 'd', text: '5/0', isCorrect: false },
        ],
        explanation: 'Karena penyebutnya sudah sama (7), kita cukup menjumlahkan pembilangnya: 2 + 3 = 5. Penyebut tetap 7. Hasilnya 5/7.',
        visualHint: 'Jumlahkan atas saja: 2 + 3 = 5. Bawah tetap 7.'
      },
      {
        id: 'q4-2',
        question: 'Hitunglah pengurangan berikut: 5/9 - 2/9 = ...',
        options: [
          { id: 'a', text: '3/9', isCorrect: true },
          { id: 'b', text: '3/0', isCorrect: false },
          { id: 'c', text: '7/9', isCorrect: false },
          { id: 'd', text: '2/9', isCorrect: false },
        ],
        explanation: 'Penyebut sama (9), kurangkan pembilang: 5 - 2 = 3. Jadi hasilnya 3/9 (bisa juga disederhanakan jadi 1/3).',
        visualHint: '5 - 2 = 3. Penyebut tetap 9.'
      },
      {
        id: 'q4-3',
        question: 'Sebuah kue tart dipotong 8 sama rata. Ani makan 2/8 bagian, lalu Budi makan 4/8 bagian. Berapa bagian kue yang sudah dimakan?',
        options: [
          { id: 'a', text: '6/16 bagian', isCorrect: false },
          { id: 'b', text: '6/8 bagian', isCorrect: true },
          { id: 'c', text: '2/8 bagian', isCorrect: false },
          { id: 'd', text: '8/8 bagian', isCorrect: false },
        ],
        explanation: '2/8 + 4/8 = (2 + 4)/8 = 6/8 bagian kue sudah dimakan oleh Ani dan Budi.',
        visualHint: '2/8 + 4/8 = 6/8.'
      },
      {
        id: 'q4-4',
        question: 'Ibu memiliki 7/8 kg tepung terigu. Digunakan untuk membuat donat 3/8 kg. Berapa kg sisa tepung terigu Ibu?',
        options: [
          { id: 'a', text: '4/8 kg (atau 1/2 kg)', isCorrect: true },
          { id: 'b', text: '10/8 kg', isCorrect: false },
          { id: 'c', text: '4/0 kg', isCorrect: false },
          { id: 'd', text: '1/8 kg', isCorrect: false },
        ],
        explanation: '7/8 - 3/8 = (7 - 3)/8 = 4/8 kg tepung terigu. 4/8 senilai dengan 1/2 kg.',
        visualHint: '7/8 dikurang 3/8 = 4/8.'
      }
    ]
  },
  {
    id: 5,
    slug: 'pecahan-campuran-tantangan',
    title: 'Bab 5: Petualangan Harta Karun Roti',
    subtitle: 'Mengenal Pecahan Campuran & Tantangan Kelulusan',
    storyDescription: 'Kiki dan teman-teman menemukan 5 potong roti gandum di puncak bukit untuk dibagi berdua. Berapa roti yang didapat masing-masing?',
    themeColor: 'from-purple-600 to-pink-600',
    badgeId: 'badge_bab5',
    coverImage: '/src/assets/images/comic_treasure_bread_1791454246941.jpg',
    interactiveExplainer: {
      title: 'Pabrik Pembagi Roti Utuh & Sisa',
      description: 'Bagi roti gandum utuh dan lihat bagian bulat (utuh) beserta pecahan sisa yang membentuk Pecahan Campuran!',
      type: 'pizza',
    },
    panels: [
      {
        id: '5-1',
        order: 1,
        characterName: 'Bimo Petualang',
        characterAvatar: 'bimo',
        narrative: 'Di puncak Bukit Pelangi, Kiki dan Bimo menemukan keranjang berisi 5 potong roti bundar.',
        dialogue: 'Ada 5 roti utuh untuk kita berdua! Kalau kita bagi rata, bagaimana membaginya?',
        illustrationType: 'mixed-bread',
        visualProps: { wholeCount: 5, divideBetween: 2 }
      },
      {
        id: '5-2',
        order: 2,
        characterName: 'Kiki Kelinci',
        characterAvatar: 'kiki',
        narrative: 'Kiki mulai membagikan roti satu per satu.',
        dialogue: 'Aku dapat 2 roti utuh, kamu dapat 2 roti utuh. Nah, tersisa 1 roti lagi di tengah! Roti terakhir ini kita potong dua sama rata!',
        illustrationType: 'mixed-bread',
        visualProps: { wholeCount: 2, fractionPart: { n: 1, d: 2 } }
      },
      {
        id: '5-3',
        order: 3,
        characterName: 'Piko Burung Hantu',
        characterAvatar: 'piko',
        narrative: 'Piko menuliskan angka ajaib di atas papan kayu emas.',
        dialogue: 'Luar biasa! Masing-masing mendapatkan 2 roti utuh dan 1/2 roti lagi! Ini ditulis 2 1/2 dan disebut PECAHAN CAMPURAN (Dua Setengah)!',
        illustrationType: 'mixed-bread',
        visualProps: { mixedNumber: '2 1/2', showFormula: true },
        tipBubble: 'Pecahan campuran terdiri dari bilangan bulat (utuh) dan pecahan biasa.'
      },
      {
        id: '5-4',
        order: 4,
        characterName: 'Chef Dono',
        characterAvatar: 'chef',
        narrative: 'Chef Dono mengumumkan kelulusan para sahabat cilik.',
        dialogue: 'Kalian telah menyelesaikan seluruh petualangan pecahan dari awal hingga akhir! Bersiaplah mengikuti Tantangan Terakhir untuk merebut Mahkota Juara Pecahan!',
        illustrationType: 'comic-scene',
        imageSrc: '/src/assets/images/comic_treasure_bread_1791454246941.jpg',
        visualProps: { scene: 'grand_celebration' }
      }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Pecahan campuran dari 5/2 adalah...',
        options: [
          { id: 'a', text: '2 1/2', isCorrect: true },
          { id: 'b', text: '1 2/5', isCorrect: false },
          { id: 'c', text: '3 1/2', isCorrect: false },
          { id: 'd', text: '2 2/2', isCorrect: false },
        ],
        explanation: '5 dibagi 2 adalah 2 bersisa 1. Maka hasilnya 2 bilangan bulat utuh dan 1/2 pecahan sisa (2 1/2).',
        visualHint: '5 = 2 + 2 + 1, jadi 2 utuh dan 1/2.'
      },
      {
        id: 'q5-2',
        question: 'Pada pecahan campuran 3 1/4, angka 3 menunjukkan...',
        options: [
          { id: 'a', text: 'Pembilang', isCorrect: false },
          { id: 'b', text: 'Bilangan bulat (bagian utuh)', isCorrect: true },
          { id: 'c', text: 'Penyebut', isCorrect: false },
          { id: 'd', text: 'Sisa potongan', isCorrect: false },
        ],
        explanation: 'Angka 3 adalah bilangan bulat utuh (misalnya 3 kue utuh), sedangkan 1/4 adalah bagian pecahan tambahannya.',
        visualHint: 'Angka di depan pecahan adalah bilangan bulat utuh.'
      },
      {
        id: 'q5-3',
        question: 'Jika 1 1/2 diubah menjadi pecahan biasa, hasilnya adalah...',
        options: [
          { id: 'a', text: '2/2', isCorrect: false },
          { id: 'b', text: '3/2', isCorrect: true },
          { id: 'c', text: '4/2', isCorrect: false },
          { id: 'd', text: '1/2', isCorrect: false },
        ],
        explanation: 'Caranya: (Bilangan bulat × Penyebut) + Pembilang = (1 × 2) + 1 = 3. Jadi 3/2.',
        visualHint: '1 kue utuh = 2/2. Ditambah 1/2 = 3/2.'
      },
      {
        id: 'q5-4',
        question: 'Selamat! Mengapa belajar pecahan sangat berguna dalam kehidupan sehari-hari?',
        options: [
          { id: 'a', text: 'Untuk membagi makanan & resep secara adil bersama keluarga & teman', isCorrect: true },
          { id: 'b', text: 'Hanya untuk ujian sekolah saja', isCorrect: false },
          { id: 'c', text: 'Agar bisa makan pizza sendirian tanpa berbagi', isCorrect: false },
          { id: 'd', text: 'Tidak ada gunanya sama sekali', isCorrect: false },
        ],
        explanation: 'Pecahan membantu kita membagi benda, kue, resep masakan, waktu, dan uang dengan adil dan tepat setiap hari!',
        visualHint: 'Berbagi dengan adil adalah kunci pecahan!'
      }
    ]
  }
];
