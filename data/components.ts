
import { Component, ComponentType } from '../types';

export const ALL_COMPONENTS: Component[] = [
  // Motherboards
  {
    id: 'mb-01',
    type: ComponentType.Motherboard,
    name: 'ASUS ROG Strix B550-F Gaming',
    brand: 'ASUS',
    imageUrl: 'https://picsum.photos/seed/mb01/100/100',
    specs: { Socket: 'AM4', Chipset: 'B550', 'Form Factor': 'ATX' },
  },
  {
    id: 'mb-02',
    type: ComponentType.Motherboard,
    name: 'MSI MAG B660 Tomahawk WIFI',
    brand: 'MSI',
    imageUrl: 'https://picsum.photos/seed/mb02/100/100',
    specs: { Socket: 'LGA1700', Chipset: 'B660', 'Form Factor': 'ATX' },
  },
  {
    id: 'mb-03',
    type: ComponentType.Motherboard,
    name: 'Gigabyte Z690 AORUS Elite',
    brand: 'Gigabyte',
    imageUrl: 'https://picsum.photos/seed/mb03/100/100',
    specs: { Socket: 'LGA1700', Chipset: 'Z690', 'Form Factor': 'ATX' },
  },

  // CPUs
  {
    id: 'cpu-01',
    type: ComponentType.CPU,
    name: 'AMD Ryzen 5 5600X',
    brand: 'AMD',
    imageUrl: 'https://picsum.photos/seed/cpu01/100/100',
    specs: { Socket: 'AM4', Cores: '6', Threads: '12', 'TDP': '65W' },
  },
  {
    id: 'cpu-02',
    type: ComponentType.CPU,
    name: 'Intel Core i5-12600K',
    brand: 'Intel',
    imageUrl: 'https://picsum.photos/seed/cpu02/100/100',
    specs: { Socket: 'LGA1700', Cores: '10', Threads: '16', 'TDP': '125W' },
  },
   {
    id: 'cpu-03',
    type: ComponentType.CPU,
    name: 'AMD Ryzen 7 5800X',
    brand: 'AMD',
    imageUrl: 'https://picsum.photos/seed/cpu03/100/100',
    specs: { Socket: 'AM4', Cores: '8', Threads: '16', 'TDP': '105W' },
  },

  // RAM
  {
    id: 'ram-01',
    type: ComponentType.RAM,
    name: 'Corsair Vengeance LPX 16GB',
    brand: 'Corsair',
    imageUrl: 'https://picsum.photos/seed/ram01/100/100',
    specs: { Type: 'DDR4', Speed: '3200MHz', Size: '2x8GB' },
  },
  {
    id: 'ram-02',
    type: ComponentType.RAM,
    name: 'G.Skill Ripjaws V 32GB',
    brand: 'G.Skill',
    imageUrl: 'https://picsum.photos/seed/ram02/100/100',
    specs: { Type: 'DDR4', Speed: '3600MHz', Size: '2x16GB' },
  },

  // GPUs
  {
    id: 'gpu-01',
    type: ComponentType.GPU,
    name: 'NVIDIA GeForce RTX 3060',
    brand: 'NVIDIA',
    imageUrl: 'https://picsum.photos/seed/gpu01/100/100',
    specs: { VRAM: '12GB GDDR6', 'Interface': 'PCIe 4.0' },
  },
  {
    id: 'gpu-02',
    type: ComponentType.GPU,
    name: 'AMD Radeon RX 6700 XT',
    brand: 'AMD',
    imageUrl: 'https://picsum.photos/seed/gpu02/100/100',
    specs: { VRAM: '12GB GDDR6', 'Interface': 'PCIe 4.0' },
  },

  // Storage
  {
    id: 'sto-01',
    type: ComponentType.Storage,
    name: 'Samsung 970 Evo Plus 1TB',
    brand: 'Samsung',
    imageUrl: 'https://picsum.photos/seed/sto01/100/100',
    specs: { Type: 'NVMe M.2 SSD', Capacity: '1TB' },
  },
  {
    id: 'sto-02',
    type: ComponentType.Storage,
    name: 'Seagate Barracuda 2TB',
    brand: 'Seagate',
    imageUrl: 'https://picsum.photos/seed/sto02/100/100',
    specs: { Type: '3.5" HDD', Capacity: '2TB' },
  },

  // PSU
  {
    id: 'psu-01',
    type: ComponentType.PSU,
    name: 'Corsair RM750x',
    brand: 'Corsair',
    imageUrl: 'https://picsum.photos/seed/psu01/100/100',
    specs: { Wattage: '750W', Rating: '80+ Gold', Modularity: 'Fully Modular' },
  },
  {
    id: 'psu-02',
    type: ComponentType.PSU,
    name: 'EVGA SuperNOVA 650 G5',
    brand: 'EVGA',
    imageUrl: 'https://picsum.photos/seed/psu02/100/100',
    specs: { Wattage: '650W', Rating: '80+ Gold', Modularity: 'Fully Modular' },
  },

  // Case
  {
    id: 'case-01',
    type: ComponentType.Case,
    name: 'NZXT H510',
    brand: 'NZXT',
    imageUrl: 'https://picsum.photos/seed/case01/100/100',
    specs: { Type: 'Mid Tower', 'Motherboard Support': 'ATX' },
  },
  {
    id: 'case-02',
    type: ComponentType.Case,
    name: 'Lian Li PC-O11 Dynamic',
    brand: 'Lian Li',
    imageUrl: 'https://picsum.photos/seed/case02/100/100',
    specs: { Type: 'Mid Tower', 'Motherboard Support': 'ATX' },
  },
  
  // Cooler
  {
    id: 'cooler-01',
    type: ComponentType.Cooler,
    name: 'Noctua NH-D15',
    brand: 'Noctua',
    imageUrl: 'https://picsum.photos/seed/cooler01/100/100',
    specs: { Type: 'Air Cooler', 'Socket Support': 'AM4, LGA1700' },
  },
  {
    id: 'cooler-02',
    type: ComponentType.Cooler,
    name: 'Corsair H100i RGB Platinum',
    brand: 'Corsair',
    imageUrl: 'https://picsum.photos/seed/cooler02/100/100',
    specs: { Type: 'AIO Liquid Cooler', 'Socket Support': 'AM4, LGA1700' },
  },
];
