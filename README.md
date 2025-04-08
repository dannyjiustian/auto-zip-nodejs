# 📦 Folder Zipper (Node.js Version)

Script ini digunakan untuk:
- Menentukan nama folder via terminal
- Men-zip setiap file/folder di dalam folder tersebut (1 level child)
- Setiap item di-zip terpisah (file.zip, folder_a.zip, dst)
- Semua hasil zip dikumpulkan dalam 1 file zip akhir

---

## 📂 Contoh Struktur Awal

```
project_folder/
└── folder_data_yang_mau_di_zip/
    ├── data.pdf
    ├── folder_a/
    │   └── a.txt
    └── folder_b/
        └── b.txt
```

---

## 🎯 Hasil Akhir

```
folder_data_yang_mau_di_zip.zip
└── folder_data_yang_mau_di_zip/
    ├── data.zip         → berisi: data.pdf
    ├── folder_a.zip     → berisi: folder_a/a.txt
    └── folder_b.zip     → berisi: folder_b/b.txt
```

---

## ▶️ Cara Menjalankan

1. Install dependensi:
```bash
npm install fs-extra archiver readline-sync
```

2. Jalankan:
```bash
node script.js
```

3. Masukkan nama folder saat diminta, contoh:
```bash
Masukkan nama folder yang ingin di-zip: folder_data_yang_mau_di_zip
```

---

## 📦 Dependensi
- `fs-extra`
- `archiver`
- `readline-sync`
