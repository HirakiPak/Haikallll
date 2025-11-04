import { TutorialStep } from '../types';
import { ComponentType } from '../types';

export const TUTORIAL_STEPS: TutorialStep[] = [
    {
        title: 'Selamat Datang di Tutorial Rakit PC!',
        component: 'Start',
        description: 'Panduan ini akan memandu Anda melalui langkah-langkah penting dalam merakit PC virtual.',
        details: 'Kita akan membahas pemasangan CPU, RAM, dan GPU ke motherboard, lalu menempatkannya di dalam casing. Mari kita mulai!'
    },
    {
        title: 'Langkah 1: Pasang CPU',
        component: ComponentType.CPU,
        description: 'CPU (Central Processing Unit) adalah otak dari komputer Anda.',
        details: 'Buka lengan penahan pada soket CPU motherboard dengan hati-hati. Sejajarkan segitiga pada CPU dengan segitiga pada soket, lalu letakkan dengan perlahan. Tutup kembali lengan penahan untuk mengamankannya.'
    },
    {
        title: 'Langkah 2: Pasang RAM',
        component: ComponentType.RAM,
        description: 'RAM (Random Access Memory) adalah penyimpanan data jangka pendek sistem Anda.',
        details: 'Buka klip pada slot RAM di motherboard Anda. Sejajarkan lekukan pada stik RAM dengan tonjolan di slot. Tekan kedua ujungnya dengan kuat hingga klip terkunci pada tempatnya.'
    },
    {
        title: 'Langkah 3: Pasang GPU',
        component: ComponentType.GPU,
        description: 'GPU (Graphics Processing Unit) merender semua visual yang Anda lihat di monitor.',
        details: 'Temukan slot PCIe panjang paling atas di motherboard Anda. Buka klip penahan di ujung slot. Sejajarkan konektor GPU dengan slot dan tekan dengan kuat hingga berbunyi klik.'
    },
    {
        title: 'Langkah 4: Pasang Motherboard',
        component: ComponentType.Motherboard,
        description: 'Sekarang, kita pasang motherboard yang sudah dirakit ke dalam casing.',
        details: 'Sejajarkan motherboard dengan baut standoff di dalam casing PC. Pastikan port I/O belakang pas melalui lubang di bagian belakang casing. Kencangkan dengan sekrup.'
    },
    {
        title: 'Langkah 5: Pasang Penyimpanan dan PSU',
        component: ComponentType.Storage,
        description: 'Pasang Penyimpanan (SSD/HDD) dan Power Supply Unit (PSU).',
        details: 'Pasang SSD/HDD di tempat drive yang ditentukan. Pasang PSU di bagian bawah atau atas casing, tergantung desain casing. Sekarang, Anda akan menghubungkan semua kabel daya dan data.'
    },
    {
        title: 'Selamat!',
        component: 'Start',
        description: 'Anda telah menyelesaikan perakitan dasar sebuah PC!',
        details: 'Dalam perakitan nyata, langkah selanjutnya adalah manajemen kabel, menutup casing, dan menginstal sistem operasi. Anda sekarang dapat menjelajahi mode Perakitan untuk membuat rakitan Anda sendiri!'
    },
];