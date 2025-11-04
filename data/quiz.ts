import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Apa kepanjangan dari CPU?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Power Unit",
      "Control Processing Unit",
    ],
    correctAnswer: "Central Processing Unit",
    explanation: "CPU adalah komponen utama komputer yang menjalankan instruksi. Sering disebut sebagai 'otak' komputer.",
  },
  {
    question: "Komponen mana yang bertanggung jawab untuk menyimpan data jangka panjang, bahkan saat listrik mati?",
    options: ["RAM", "CPU", "GPU", "SSD/HDD"],
    correctAnswer: "SSD/HDD",
    explanation: "Solid State Drives (SSD) dan Hard Disk Drives (HDD) digunakan untuk penyimpanan non-volatile, artinya data tetap tersimpan tanpa daya listrik.",
  },
  {
    question: "Apa kepanjangan dari RAM?",
    options: [
      "Read-Only Memory",
      "Random Access Memory",
      "Rapid Action Memory",
      "Real-time Access Memory",
    ],
    correctAnswer: "Random Access Memory",
    explanation: "RAM adalah memori volatil yang digunakan oleh CPU untuk menyimpan data yang sedang aktif digunakan, memungkinkan akses cepat.",
  },
  {
    question: "CPU AMD dengan soket AM4 akan cocok dipasang pada motherboard dengan tipe soket apa?",
    options: ["LGA1200", "LGA1700", "AM4", "TR4"],
    correctAnswer: "AM4",
    explanation: "Soket CPU dan soket motherboard harus cocok agar kompatibel. AM4 adalah soket populer untuk prosesor AMD Ryzen.",
  },
  {
    question: "Apa fungsi utama dari GPU?",
    options: [
      "Menjalankan sistem operasi",
      "Merender grafis dan gambar ke layar",
      "Menghubungkan ke internet",
      "Mendinginkan komputer",
    ],
    correctAnswer: "Merender grafis dan gambar ke layar",
    explanation: "Graphics Processing Unit (GPU) dikhususkan untuk pemrosesan paralel, membuatnya ideal untuk merender visual kompleks untuk game dan aplikasi.",
  },
];